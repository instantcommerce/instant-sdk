import http from 'http';
import { parse } from 'url';
import React, { FC, useEffect, useRef, useState } from 'react';
import compression from 'compression';
import connect from 'connect';
import { Box, render, Text, useApp, useInput, useStdin } from 'ink';
import open from 'open';
import serveStatic from 'serve-static';
import { createServer, ViteDevServer } from 'vite';
import { CommandModule } from 'yargs';
import { dirname } from '~/config';
import { useApiSdk } from '~/lib/api';
import { getViteConfig } from '~/lib/getViteConfig';

const BLOCKS_MANIFEST =
  '@id/__x00__virtual:vite-plugin-instant-sdk/blocks-manifest';

type Stores = Array<{ id: string; name: string; hostname: string }>;

const Shortcuts = ({ address }: { address: string }) => {
  const { exit } = useApp();

  useInput((input) => {
    switch (input) {
      case 'q':
        exit();
        break;
      case 'o':
        open(address);
        break;
      default:
    }
  });

  return (
    <>
      <Text>Press "o" to open in browser</Text>
      <Text>Press "q" to quit</Text>
    </>
  );
};

export const Dev: FC = ({}) => {
  const apiSdk = useApiSdk();
  const { isRawModeSupported } = useStdin();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const viteDevServer = useRef<ViteDevServer>();
  const previewServer = useRef<http.Server>();

  const createDevServer = async () => {
    if (process.env['FORCE_DIR']) {
      process.chdir(dirname);
    }

    const server = await createServer(
      await getViteConfig('development', {
        server: {
          port: 5173,
        },
      }),
    );
    await server.listen();

    viteDevServer.current = server;

    return server;
  };

  const createPreviewServer = async (
    blockServerAddress: string,
    stores: Stores,
  ) => {
    return new Promise<void>(async (resolve) => {
      const app = connect();

      app.use(compression() as any);

      app.use((req, res, next) => {
        if (
          req.url &&
          ['/', '/preview.html'].includes(parse(req.url)?.pathname || '')
        ) {
          const _write = res.write;

          res.write = function (chunk, encoding: BufferEncoding) {
            const value: string = chunk.toString();
            res.removeHeader('Content-Length');

            return _write.call(
              res,
              value.replace(
                '<head>',
                `<head>
<script type="module" src="${blockServerAddress}/${BLOCKS_MANIFEST}"></script>
<script>window.__INSTANT_BLOCK_SERVER__=${JSON.stringify(
                  `${blockServerAddress}`,
                )};window.__INSTANT_STORES__=JSON.parse(\\'${JSON.stringify(
                  stores,
                )}\\');</script>`,
              ),
              encoding,
            );
          } as typeof _write;
        }

        next();
      });

      app.use(
        serveStatic(`${dirname}/../../packages/preview/dist`, {
          setHeaders: (res, path) => {
            if ((serveStatic.mime as any).lookup(path) === 'text/html') {
              /** Don't cache HTML */
              res.setHeader(
                'Cache-Control',
                'private, no-cache, no-store, max-age=0, must-revalidate',
              );
            }
          },
        }),
      );

      previewServer.current = http
        .createServer(app)
        .listen({ port: 3000 }, () => {
          resolve();
        });
    });
  };

  const getAddress = (server: http.Server) => {
    if (!server) {
      return '';
    }

    const address = server.address();

    return address && typeof address !== 'string'
      ? `http://${address.address !== '::' ? address.address : '127.0.0.1'}:${
          address.port
        }`
      : '';
  };

  const startServers = async () => {
    let stores: Stores = [];

    try {
      stores = (await apiSdk.stores()).stores.edges.map(({ node }) => ({
        id: node.id,
        name: node.name,
        hostname: node.domains.find((domain) => !!domain.isPrimary)?.hostname!,
      }));
    } catch (e) {
      console.log(e);
    }

    try {
      const devServer = await createDevServer();
      await createPreviewServer(getAddress(devServer.httpServer!), stores);
    } catch (e: any) {
      setError(e?.toString?.());
    }

    setSuccess(true);
  };

  useEffect(() => {
    startServers();

    return () => {
      if (previewServer.current) {
        previewServer.current.close();
      }
      if (viteDevServer.current) {
        viteDevServer.current.close();
      }
    };
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!success) {
    <Text>Starting dev server...</Text>;
  }

  return (
    <Box flexDirection="column">
      <Text>⚡️ Dev server running</Text>
      {isRawModeSupported && (
        <Shortcuts address={getAddress(previewServer.current!)} />
      )}
    </Box>
  );
};

export const dev: CommandModule = {
  command: 'dev',
  describe: 'Start the local development environment',
  handler: () => {
    render(<Dev />);
  },
};
