import React, { FC, useEffect, useRef, useState } from "react";
import { Box, render, Text, useApp, useInput } from "ink";
import { CommandModule } from "yargs";
import open from "open";
import { fileURLToPath, parse } from "url";
import { createServer, ViteDevServer } from "vite";
import connect from "connect";
import http from "http";
import compression from "compression";
import serveStatic from "serve-static";

const BLOCKS_MANIFEST =
  "@id/__x00__virtual:vite-plugin-instant-sdk/blocks-manifest";

const __dirname = fileURLToPath(
  new URL("../../instant-frontend/examples/block-extension", import.meta.url)
);

export const Dev: FC = ({}) => {
  const { exit } = useApp();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const viteDevServer = useRef<ViteDevServer>();
  const previewServer = useRef<http.Server>();

  useInput((input) => {
    switch (input) {
      case "q":
        exit();
        break;
      case "o":
        open(getAddress(previewServer.current!));
        break;
      default:
    }
  });

  const createDevServer = async () => {
    process.chdir(__dirname);

    const server = await createServer({
      configFile: `${__dirname}/vite.config.ts`,
      root: __dirname,
      server: {
        port: 5173,
      },
    });
    await server.listen();

    viteDevServer.current = server;

    return server;
  };

  const createPreviewServer = async (blockServerAddress: string) => {
    return new Promise<void>(async (resolve) => {
      const app = connect();

      app.use(compression() as any);

      app.use((req, res, next) => {
        if (
          req.url &&
          ["/", "/preview.html"].includes(parse(req.url)?.pathname || "")
        ) {
          const _write = res.write;

          res.write = function (chunk, encoding: BufferEncoding) {
            const value: string = chunk.toString();
            res.removeHeader("Content-Length");

            return _write.call(
              res,
              value.replace(
                "<head>",
                `<head>
<script type="module" src="${blockServerAddress}/${BLOCKS_MANIFEST}"></script>
<script>window.__INSTANT_BLOCK_SERVER__=${JSON.stringify(
                  `${blockServerAddress}`
                )};</script>`
              ),
              encoding
            );
          } as typeof _write;
        }

        next();
      });

      app.use(
        serveStatic(`${__dirname}/../../packages/ui-preview/dist`, {
          setHeaders: (res, path) => {
            if ((serveStatic.mime as any).lookup(path) === "text/html") {
              /** Don't cache HTML */
              res.setHeader(
                "Cache-Control",
                "private, no-cache, no-store, max-age=0, must-revalidate"
              );
            }
          },
        })
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
      return "";
    }

    const address = server.address();

    return address && typeof address !== "string"
      ? `http://${address.address !== "::" ? address.address : "127.0.0.1"}:${
          address.port
        }`
      : "";
  };

  const startServers = async () => {
    const devServer = await createDevServer();
    await createPreviewServer(getAddress(devServer.httpServer!));

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
      <Text>Press "o" to open in browser</Text>
      <Text>Press "q" to quit</Text>
    </Box>
  );
};

export const dev: CommandModule = {
  command: "dev",
  describe: "Start the local development environment",
  handler: () => {
    render(<Dev />);
  },
};
