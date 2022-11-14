import React, { useEffect, useRef, useState } from "react";
import { render, Text, useApp, useInput } from "ink";
import { CommandModule } from "yargs";
import { fileURLToPath } from "url";
import { build } from "vite";
import path from "path";
import { createReadStream, existsSync } from "fs";
import { escapePath } from "dot-prop";
import glob from "glob";
import { useApiSdk } from "~/lib/api";
import { getProjectConfig } from "~/lib/getProjectConfig";

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

const __dirname = resolvePath(
  "../../instant-frontend/examples/block-extension"
);

const getBlockFiles = () =>
  glob.sync(path.join(__dirname, "src/blocks/**/index.tsx"));

const AskDeploy = ({ onDeploy }: { onDeploy(): void }) => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "y") {
      onDeploy();
    } else {
      exit();
    }
  });

  return <Text>Set up and deploy blocks? [y/n]</Text>;
};

export const Publish = () => {
  const apiSdk = useApiSdk();

  const [doDeploy, setDoDeploy] = useState(false);
  const [blocks, setBlocks] = useState<Array<string> | null>(null);
  const [isDone, setDone] = useState<boolean>(false);
  const [buildSuccess, setBuildSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [uploadingBlock, setUploadingBlock] = useState<string>();

  const config = useRef<ReturnType<typeof getProjectConfig>>();

  const buildBlocks = async () => {
    const output = await build({
      configFile: `${__dirname}/vite.config.ts`,
      root: __dirname,
      logLevel: "silent",
      build: {
        outDir: "dist",
      },
    });

    if (!("output" in output)) {
      throw new Error("No build output found");
    }

    return output.output;
  };

  const buildAndPublish = async () => {
    let buildOutput: Awaited<ReturnType<typeof buildBlocks>>;

    try {
      buildOutput = await buildBlocks();
      setBuildSuccess(true);
    } catch (err: any) {
      setError(err?.toString?.());
      return;
    }

    try {
      const manifestRaw = buildOutput.find(
        ({ fileName }) => fileName === "manifest.json"
      );

      if (!manifestRaw) {
        throw new Error("No manifest found");
      }

      const manifest = JSON.parse(
        // @ts-ignore
        manifestRaw.source
      );

      for (const [_, entry] of Object.entries(manifest) as any) {
        if (entry.isEntry) {
          const blockDir = path.dirname(entry.file);
          const blockName = blockDir.split(path.sep).pop()!;

          setUploadingBlock(blockName);

          const customizerSchema = buildOutput.find(
            ({ fileName }) =>
              fileName === path.join(blockDir, "customizerSchema.json")
            // @ts-ignore
          )?.source;
          const contentSchema = buildOutput.find(
            ({ fileName }) =>
              fileName === path.join(blockDir, "contentSchema.json")
            // @ts-ignore
          )?.source;
          const blockFile = createReadStream(
            path.join(__dirname, "dist", entry.file)
          );

          const entryName = escapePath(path.relative("src", entry.src));

          const existingBlockConfig = config.current!.get("blocks")?.[
            entryName
          ] as { id: string } | undefined;
          let blockIdToUpdate: string;

          if (existingBlockConfig) {
            blockIdToUpdate = existingBlockConfig.id;
          } else {
            blockIdToUpdate = await apiSdk
              .createOneBlock({ input: { block: { name: blockName } } })
              .then((res) => res.createOneBlock.id);

            config.current!.set("blocks", {
              ...config.current!.get("blocks"),
              [entryName]: {
                id: blockIdToUpdate,
              },
            });
          }

          const updatedBlock = await apiSdk.updateBlockVersion({
            input: {
              id: blockIdToUpdate,
              code: {
                file: blockFile,
              },
              contentSchema,
              customizerSchema,
            },
          });
        }
      }
    } catch (err: any) {
      setError(err?.toString?.());
      return;
    }

    setDone(true);
  };

  useEffect(() => {
    if (doDeploy) {
      buildAndPublish();
    }
  }, [doDeploy]);

  useEffect(() => {
    process.chdir(__dirname);

    if (!existsSync("./instant.config.json")) {
      setError(`No "instant.config.json" file found.`);
      return;
    }

    config.current = getProjectConfig("./");
    const blockFiles = getBlockFiles();

    if (config.current.has("blocks")) {
      let blocksInConfig = 0;

      blockFiles.forEach((file) => {
        const existingConfig =
          config.current!.get("blocks")?.[
            escapePath(path.relative("src", file))
          ];

        if (existingConfig) {
          blocksInConfig += 1;
        }
      });

      if (blocksInConfig === blockFiles.length) {
        setDoDeploy(true);
      }
    }

    setBlocks(blockFiles);
  }, []);

  if (error) {
    return <Text>An error occurred: {error}</Text>;
  }

  if (!doDeploy) {
    if (!blocks) {
      return <Text>Loading...</Text>;
    }

    if (!blocks.length) {
      return <Text>No blocks found</Text>;
    }

    return (
      <AskDeploy
        onDeploy={() => {
          setDoDeploy(true);
        }}
      />
    );
  }

  if (uploadingBlock) {
    return <Text>Uploading block {uploadingBlock}</Text>;
  }

  if (!buildSuccess || !isDone) {
    return <Text>Building...</Text>;
  }

  return <Text>Build successful.</Text>;
};

export const publish: CommandModule = {
  command: "publish",
  describe: "Publish blocks",
  handler: () => {
    render(<Publish />);
  },
};
