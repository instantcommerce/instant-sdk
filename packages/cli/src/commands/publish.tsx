/* eslint-disable jsx-a11y/accessible-emoji */
import { createReadStream, existsSync } from 'fs';
import path from 'path';
import React, { useEffect, useRef, useState } from 'react';
import { Box, render, Static, Text } from 'ink';
import { build } from 'vite';
import { CommandModule } from 'yargs';
import { dirname } from '~/config';
import { extractApiError, useApiSdk } from '~/lib/api';
import { BlockFragmentFragment } from '~/lib/api/sdk';
import { BlockFiles, getBlockFiles } from '~/lib/getBlockFiles';
import { getBlockNameFromPath } from '~/lib/getBlockNameFromPath';
import { getProjectConfig } from '~/lib/getProjectConfig';
import { getViteConfig } from '~/lib/getViteConfig';
import { parseContentSchema } from '~/lib/parseContentSchema';
import { parseCustomizerSchema } from '~/lib/parseCustomizerSchema';

export const Publish = ({
  blockNames: providedBlockNames,
}: {
  blockNames: string[];
}) => {
  const apiSdk = useApiSdk();

  const [blocks, setBlocks] = useState<BlockFiles | null>(null);
  const [isDone, setDone] = useState<boolean>(false);
  const [buildSuccess, setBuildSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [uploadedBlocks, setUploadedBlocks] = useState<
    Array<BlockFragmentFragment & { isUnchanged?: boolean }>
  >([]);

  const config = useRef<ReturnType<typeof getProjectConfig>>();

  const buildBlocks = async (entry: BlockFiles[number]) => {
    const outDir = `dist/${entry.type.toLowerCase()}s/${entry.name}`;

    const clientOutput = await build(
      await getViteConfig(
        'production',
        {
          logLevel: 'silent',
          build: {
            outDir,
            manifest: true,
          },
        },
        config.current!.get(`blocks`),
        entry,
      ),
    );

    const serverOutput = await build(
      await getViteConfig(
        'production',
        {
          logLevel: 'silent',
          build: {
            outDir,
            emptyOutDir: false,
            ssr: true,
            target: 'es2022',
            rollupOptions: {
              output: {
                format: 'es',
              },
            },
          },
          ssr: {
            noExternal: true,
            target: 'webworker',
          },
        },
        config.current!.get(`blocks`),
        entry,
      ),
    );

    if (!('output' in clientOutput) || !('output' in serverOutput)) {
      throw new Error('No build output found');
    }

    return clientOutput.output;
  };

  const buildAndPublish = async () => {
    let buildOutputs: Awaited<ReturnType<typeof buildBlocks>>[] = [];

    const entries = getBlockFiles();

    for (let i = 0; i < entries.length; i += 1) {
      try {
        buildOutputs.push(await buildBlocks(entries[i]!));
      } catch (err: any) {
        setError(err?.toString?.());
        return;
      }
    }

    setBuildSuccess(true);

    for (let i = 0; i < buildOutputs.length; i += 1) {
      const buildOutput = buildOutputs[i]!;
      let manifest;

      try {
        const manifestRaw = buildOutput.find(
          ({ fileName }) => fileName === 'manifest.json',
        );

        if (!manifestRaw) {
          throw new Error('No manifest found');
        }

        manifest = JSON.parse(
          // @ts-ignore
          manifestRaw.source,
        );
      } catch (err: any) {
        setError(err?.toString?.());
        return;
      }

      for (const [, entry] of Object.entries(manifest) as any) {
        if (entry.isEntry) {
          const blockName = getBlockNameFromPath(entry.src);
          let blockIdToUpdate: string;

          if (!blocks?.find(({ name }) => name === blockName)) {
            continue;
          }

          try {
            const customizerSchema = parseCustomizerSchema(
              JSON.parse(
                buildOutput.find(
                  ({ fileName }) => fileName === 'customizerSchema.json',
                  // @ts-ignore
                )?.source,
              ),
            );
            const contentSchema = parseContentSchema(
              JSON.parse(
                buildOutput.find(
                  ({ fileName }) => fileName === 'contentSchema.json',
                  // @ts-ignore
                )?.source,
              ),
              blockName,
            );
            const blockFile = createReadStream(
              path.join(dirname, 'dist/blocks', blockName, entry.file),
            );
            let cssFile;

            if (entry.css?.length) {
              /** There should be at most 1 CSS file because of bundling */
              cssFile = createReadStream(
                path.join(dirname, 'dist/blocks', blockName, entry.css[0]),
              );
            }

            const existingBlockConfig = config.current!.get(
              `blocks.${blockName}`,
            ) as { id: string };

            blockIdToUpdate = existingBlockConfig.id;

            const publishedBlock = await apiSdk.publishBlockVersion(
              {
                input: {
                  blockId: blockIdToUpdate,
                  sdkVersion: 2,
                  css: cssFile,
                  js: blockFile,
                  contentSchema,
                  customizerSchema,
                },
              },
              {
                'x-instant-organization': config.current!.get('organization')!,
              },
            );

            setUploadedBlocks((previous) => [
              ...previous,
              publishedBlock.publishBlockVersion,
            ]);
          } catch (err: any) {
            /** No changes to block detected */
            if (extractApiError(err)?.code === 422) {
              setUploadedBlocks((previous) => [
                ...previous,
                {
                  id: blockIdToUpdate,
                  name: blockName,
                  isUnchanged: true,
                },
              ]);
              continue;
            }

            setError(
              `Error publishing block "${blockName}" (${err?.toString?.()})`,
            );
            return;
          }
        }
      }
    }

    setDone(true);
  };

  useEffect(() => {
    if (blocks?.length) {
      buildAndPublish();
    }
  }, [blocks]);

  useEffect(() => {
    if (process.env['FORCE_DIR']) {
      process.chdir(dirname);
    }

    if (!existsSync('./instant.config.json')) {
      setError(
        `No "instant.config.json" file found, please run the \`add\` command first.`,
      );
      return;
    }

    config.current = getProjectConfig('./');

    if (!config.current.get('organization')) {
      setError(
        `Project not linked to an organization, please run the \`add\` command first.`,
      );
      return;
    }

    const blockFiles = getBlockFiles().filter(({ name: blockName }) => {
      if (providedBlockNames && !providedBlockNames.includes(blockName)) {
        return false;
      }

      if (!config.current!.get(`blocks.${blockName}`)) {
        setError(
          `Block not added: "${blockName}", please run the \`add\` command first`,
        );
        return false;
      }

      return true;
    });

    if (error) {
      return;
    }

    if (providedBlockNames) {
      for (const providedBlockName of providedBlockNames) {
        if (!blockFiles.find(({ name }) => name === providedBlockName)) {
          setError(`Block not found: "${providedBlockName}"`);
          break;
        }
      }
    }

    setBlocks(blockFiles);
  }, []);

  if (error) {
    return <Text>An error occurred: {error}</Text>;
  }

  if (!blocks) {
    return <Text>Loading...</Text>;
  }

  if (!blocks.length) {
    return <Text>No blocks found</Text>;
  }

  if (!buildSuccess) {
    return <Text>Building...</Text>;
  }

  if (!isDone) {
    return (
      <>
        <Static items={uploadedBlocks}>
          {(uploadedBlock) => (
            <Box key={uploadedBlock.id}>
              {uploadedBlock.isUnchanged ? (
                <Text dimColor>
                  ⏭️{'  '}
                  {uploadedBlock.name} (unchanged)
                </Text>
              ) : (
                <Text color="green">
                  ✅{'  '}
                  {uploadedBlock.name} (v{uploadedBlock.version?.tag})
                </Text>
              )}
            </Box>
          )}
        </Static>

        <Box marginTop={1}>
          <Text>
            Publishing...
            {blocks ? `(${uploadedBlocks.length}/${blocks.length})` : ''}
          </Text>
        </Box>
      </>
    );
  }

  return <Text>Publish successful</Text>;
};

export const publish: CommandModule = {
  command: 'publish [blocknames..]',
  describe:
    'Publish new version of block(s), space-separated list of blocknames to limit',
  handler: (argv) => {
    render(<Publish blockNames={argv['blocknames'] as string[]} />);
  },
};
