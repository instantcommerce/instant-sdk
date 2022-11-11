import React, { useEffect, useState } from "react";
import { render, Text } from "ink";
import { CommandModule } from "yargs";
import { fileURLToPath } from "url";
import { build } from "vite";
import path from "path";
import { createReadStream } from "fs";
import { useApiSdk } from "~/lib/api";

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

const __dirname = resolvePath(
  "../../instant-frontend/examples/block-extension"
);

export const Publish = () => {
  const apiSdk = useApiSdk();

  const [isDone, setDone] = useState<boolean>(false);
  const [buildSuccess, setBuildSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [uploadingBlock, setUploadingBlock] = useState<string>();

  const buildBlocks = async () => {
    process.chdir(__dirname);

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

          const customizerSchema = JSON.parse(
            buildOutput.find(
              ({ fileName }) =>
                fileName === path.join(blockDir, "customizerSchema.json")
              // @ts-ignore
            )?.source
          );
          const contentSchema = buildOutput.find(
            ({ fileName }) =>
              fileName === path.join(blockDir, "contentSchema.json")
            // @ts-ignore
          )?.source;
          const blockFile = createReadStream(
            path.join(__dirname, "dist", entry.file)
          );

          const createdBlock = await apiSdk
            .createOneBlock({ input: { block: { name: blockName } } })
            .then((res) => res.createOneBlock);

          const updatedBlock = await apiSdk.updateBlockVersion({
            input: {
              id: createdBlock.id,
              code: {
                file: blockFile,
              },
              contentSchema,
              customizerSchema,
            },
          });

          console.log(updatedBlock);
        }
      }
    } catch (err: any) {
      setError(err?.toString?.());
      return;
    }

    setDone(true);
  };

  useEffect(() => {
    buildAndPublish();
  }, []);

  if (error) {
    return <Text>An error occurred: {error}</Text>;
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
