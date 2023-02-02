import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import * as babel from '@babel/core';
import glob from 'glob';
import Hashids from 'hashids';
/** @fixme This does not resolve */
// import { BlockSubtype, BlockType } from 'types/api';
import { ModuleNode, Plugin, PluginOption } from 'vite';
import {
  addRefreshWrapper,
  isRefreshBoundary,
  preambleCode,
} from './fast-refresh.js';

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)($|\\?)`;
const cssLangRE = new RegExp(cssLangs);

const SCHEMA_NAMES = ['customizerSchema', 'contentSchema'];

const viteClientId = 'node_modules/vite/dist/client/client.mjs';
const preamblePath = 'virtual:vite-plugin-instant-sdk/preamble';
const blocksManifestPath = 'virtual:vite-plugin-instant-sdk/blocks-manifest';

const hashids = new Hashids();

function invalidate(mod: ModuleNode, timestamp: number, seen: Set<ModuleNode>) {
  if (seen.has(mod)) {
    return;
  }
  seen.add(mod);
  mod.lastHMRTimestamp = timestamp;
  mod.transformResult = null;
  mod.ssrModule = null;
  mod.ssrError = null;
  mod.ssrTransformResult = null;
  mod.importers.forEach((importer) => {
    if (!importer.acceptedHmrDeps.has(mod)) {
      invalidate(importer, timestamp, seen);
    }
  });
}

/** Block subtype. */
enum BlockSubtype {
  All = 'ALL',
  CartSidebar = 'CART_SIDEBAR',
  None = 'NONE',
  Pdp = 'PDP',
}

enum BlockType {
  Component = 'COMPONENT',
  Page = 'PAGE',
  Section = 'SECTION',
}

const BLOCK_GLOBS = [
  {
    type: BlockType.Component,
    glob: 'src/components/**/index.tsx',
  },
  {
    type: BlockType.Section,
    glob: 'src/{sections,blocks}/**/index.tsx',
  },
  {
    type: BlockType.Page,
    glob: 'src/pages/**/index.tsx',
  },
];

const getBlockNameFromPath = (filePath: string) =>
  path.dirname(filePath).split(path.sep).pop()!;

const getBlockFiles = () => {
  const blocks = BLOCK_GLOBS.map(({ type, glob: pattern }) => {
    return glob.sync(path.resolve(pattern)).map((file) => ({
      type,
      name: getBlockNameFromPath(file),
      path: file,
    }));
  });

  return blocks.flat();
};

export default function vitePluginInstantSdk({
  blockIdsMap,
  entry,
}: {
  blockIdsMap?: Record<string, Record<'id', string>>;
  entry?: {
    type: BlockType;
    name: string;
    path: string;
  };
}): PluginOption {
  let projectRoot = process.cwd();
  let base = '/';
  let isProduction = true;
  let isSsr = false;
  let skipFastRefresh = false;
  let extractedSchemas = new Map<string, Map<string, string>>();

  // Support patterns like:
  // - import * as React from 'react';
  // - import React from 'react';
  // - import React, {useEffect} from 'react';
  const importReactRE = /(^|\n)import\s+(\*\s+as\s+)?React(,|\s+)/;

  // Any extension, including compound ones like '.bs.js'
  const fileExtensionRE = /\.[^/\s?]+$/;

  return [
    {
      name: 'vite-plugin-instant-sdk',
      enforce: 'post',
      config(config) {
        isSsr = !!config.build?.ssr;

        if (entry) {
          config.build = {
            ...config.build,
            rollupOptions: {
              input: {
                [entry.name]: fileURLToPath(
                  new URL(entry.path, import.meta.url),
                ),
              },
              output: {
                assetFileNames: '[name][extname]',
                entryFileNames: isSsr ? 'server.js' : 'index.js',
                manualChunks: !isSsr ? {} : undefined,
              },
              preserveEntrySignatures: 'strict',
              // external: ['@instantcommerce/sdk-remote-component'],
            },
            manifest: !isSsr,
          };
        }
      },
      configResolved(config) {
        base = config.base;
        isProduction = config.isProduction;
        skipFastRefresh ||= isProduction || config.command === 'build';
      },
      resolveId(id) {
        switch (id) {
          case preamblePath:
            return `\0${preamblePath}`;
          case blocksManifestPath:
            return `\0${blocksManifestPath}`;
          default:
        }
      },
      load(id) {
        switch (id) {
          case `\0${preamblePath}`:
            return preambleCode.replace(`__BASE__`, base);
          case `\0${blocksManifestPath}`: {
            const blocksManifest = Object.fromEntries(
              getBlockFiles().map((blockFile) => [
                path.join('src', path.relative('src', blockFile.path)),
                {
                  name: blockFile.name,
                  path: fileURLToPath(new URL(blockFile.path, import.meta.url)),
                  type: blockFile.type,
                  /** @todo get subtype from code */
                  subtype:
                    blockFile.type === BlockType.Component
                      ? BlockSubtype.CartSidebar
                      : blockFile.type === BlockType.Page
                      ? BlockSubtype.Pdp
                      : BlockSubtype.All,
                },
              ]),
            );

            return `window.__INSTANT_BLOCKS_MANIFEST__=JSON.parse(\`${JSON.stringify(
              blocksManifest,
            )}\`);`;
          }
          default:
        }
      },
      handleHotUpdate({ file, server, timestamp }) {
        const { moduleGraph } = server;

        const mods = moduleGraph.getModulesByFile(file);

        if (mods) {
          const invalidatedModules = new Set<ModuleNode>();

          for (const mod of mods) {
            invalidate(mod, timestamp, invalidatedModules);
          }
        }

        /** @todo just reloads now, improve to use react-refresh for actual HMR */
        server.ws.send({
          type: 'custom',
          event: 'worker-reload',
          data: {
            timestamp,
          },
        });
        return [];
      },
      async transform(code, id, options) {
        // if (id.endsWith(viteClientId)) {
        //   return `${code
        //     .replace(/function updateStyle/, 'function updateStyle_OLD')
        //     .replace(/function removeStyle/, 'function removeStyle_OLD')
        //     .replace(/export \{(.*), updateStyle(.*)\}/m, 'export {$1$2}')
        //     .replace(/export \{(.*), removeStyle(.*)\}/m, 'export {$1$2}')}
        // export function updateStyle(id, content) {
        //   self.updateStyle(id, content);
        // }
        // export function removeStyle(id) {
        //   self.removeStyle(id);
        // }`;
        // }

        let containsDefineBlock = false;

        const addPreamble = (code) => {
          if (!skipFastRefresh && containsDefineBlock) {
            return `import "${preamblePath}";${code}`;
          }

          return code;
        };

        const ssr = options?.ssr === true;
        // File extension could be mocked/overridden in querystring.
        const [filepath, querystring = ''] = id.split('?');
        const [extension = ''] =
          querystring.match(fileExtensionRE) ||
          filepath.match(fileExtensionRE) ||
          [];

        if (/\.(mjs|[tj]sx?)$/.test(extension)) {
          const isJSX = extension.endsWith('x');
          const isNodeModules = id.includes('/node_modules/');
          const plugins: any[] = [];

          if (!skipFastRefresh && !ssr && !isNodeModules) {
            // Modules with .js or .ts extension must import React.
            const isReactModule = isJSX || importReactRE.test(code);
            if (isReactModule) {
              plugins.push([
                await loadPlugin('react-refresh/babel'),
                { skipEnvCheck: true },
              ]);
            }
          }

          const schemas = new Map<string, string>();

          if (!isNodeModules && id.includes(projectRoot)) {
            const { types: t } = babel;

            const isDefineBlock = (node) =>
              node != null &&
              node.type === 'Identifier' &&
              [
                'defineBlock',
                'defineComponent',
                'definePage',
                'defineSection',
              ].includes(node.name);

            plugins.push({
              visitor: {
                /**
                 * By looking for only export default defineBlock we force
                 * only 1 defineBlock per file.
                 */
                ExportDefaultDeclaration(path) {
                  let defineBlock = path.node.declaration;

                  if (
                    !isDefineBlock(defineBlock.callee) &&
                    t.isIdentifier(defineBlock)
                  ) {
                    const declaration = path.scope.getBinding(defineBlock.name);

                    if (declaration) {
                      defineBlock = declaration.path.node.init;
                    }
                  }

                  if (isDefineBlock(defineBlock.callee)) {
                    containsDefineBlock = true;

                    if (
                      defineBlock.arguments.length === 1 &&
                      t.isObjectExpression(defineBlock.arguments[0])
                    ) {
                      defineBlock.arguments[0].properties.forEach(
                        (property) => {
                          if (
                            t.isObjectProperty(property) &&
                            t.isObjectExpression(property.value) &&
                            property.value.start &&
                            property.value.end
                          ) {
                            for (const schemaName of SCHEMA_NAMES) {
                              if (
                                t.isIdentifier(property.key, {
                                  name: schemaName,
                                })
                              ) {
                                schemas.set(
                                  schemaName,
                                  vm.runInNewContext(
                                    `JSON.stringify(${code.slice(
                                      property.value.start,
                                      property.value.end,
                                    )})`,
                                  ),
                                );
                                break;
                              }
                            }
                          }
                        },
                      );

                      if (isProduction) {
                        /** Remove define props, only keep what we need in prod */
                        defineBlock.arguments[0].properties =
                          defineBlock.arguments[0].properties.filter(
                            (property) =>
                              t.isIdentifier(property.key, {
                                name: 'component',
                              }),
                          );
                      }
                    }
                  }
                },
              },
            });
          }

          // Avoid parsing if no plugins exist.
          if (!plugins.length) {
            return addPreamble(code);
          }

          const isReasonReact = extension.endsWith('.bs.js');
          const result = await babel.transformAsync(code, {
            babelrc: false,
            configFile: false,
            ast: !isReasonReact,
            root: projectRoot,
            filename: id,
            sourceFileName: filepath,
            parserOpts: {
              sourceType: 'module',
              allowAwaitOutsideFunction: true,
            },
            generatorOpts: {
              decoratorsBeforeExport: true,
            },
            plugins,
            sourceMaps: true,
          });

          if (schemas.size) {
            extractedSchemas.set(id, schemas);
          }

          if (result) {
            let code = result.code!;
            if (/\$RefreshReg\$\(/.test(code)) {
              const accept = isReasonReact || isRefreshBoundary(result.ast!);
              code = addRefreshWrapper(code, id, accept);
            }

            return {
              code: addPreamble(code),
              map: result.map,
            };
          }
        }

        return addPreamble(code);
      },
      buildStart: function () {
        extractedSchemas.clear();
      },
      generateBundle: function (_, bundle) {
        if (isSsr) {
          return;
        }

        /** Emit extracted schemas */
        for (const [, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk' && chunk.isEntry && chunk.facadeModuleId) {
            const schemas = extractedSchemas.get(chunk.facadeModuleId);

            if (schemas) {
              for (const schema of schemas) {
                const schemaFileName = path.join(
                  path.dirname(chunk.name),
                  `${schema[0]}.json`,
                );

                this.emitFile({
                  type: 'asset',
                  fileName: schemaFileName,
                  name: path.join('src', schemaFileName),
                  source: schema[1],
                });

                // @ts-ignore
                chunk.viteMetadata.importedAssets.add(schemaFileName);
              }
            }
          }
        }
      },
    } as Plugin,
    {
      name: 'vite-plugin-instant-sdk-css',
      enforce: 'post',
      generateBundle: async function (_, bundle) {
        /** Scope emitted CSS */
        for (const [, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'asset' && cssLangRE.test(chunk.fileName)) {
            const id = path.dirname(chunk.name!).split(path.sep).pop();

            if (id && blockIdsMap?.[id]?.id) {
              /**
               * Create (short) hashed ID from Block UUID to prevent collisions,
               * make sure it starts with a letter to be a valid CSS classname.
               **/
              const hashedId = `b${hashids
                .encodeHex(blockIdsMap[id].id.replace(/-/g, ''))
                .substring(0, 8)}`;

              const postcssResult = await (await import('postcss'))
                .default([
                  (
                    (
                      await import('@instantcommerce/postcss-plugin-sdk')
                    ).default as any
                  )(hashedId) as any,
                ])
                .process(chunk.source, {
                  to: chunk.fileName,
                  from: chunk.fileName,
                });

              chunk.source = postcssResult.css;
            }
          }
        }
      },
    } as Plugin,
  ];
}

function loadPlugin(path: string): Promise<any> {
  return import(path).then((module) => module.default || module);
}
