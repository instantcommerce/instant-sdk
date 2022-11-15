import React, { useEffect, useRef, useState } from "react";
import { Box, render, Static, Text, useApp, useInput } from "ink";
import { CommandModule } from "yargs";
import { fileURLToPath } from "url";
import { build } from "vite";
import path from "path";
import { createReadStream, existsSync } from "fs";
import glob from "glob";
import { extractApiError, useApiSdk } from "~/lib/api";
import { getProjectConfig } from "~/lib/getProjectConfig";
import { BlockFragmentFragment } from "~/lib/api/sdk";

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

const __dirname = resolvePath(
  "../../instant-frontend/examples/block-extension"
);

const getBlockFiles = () =>
  glob
    .sync(path.join(__dirname, "src/blocks/**/index.tsx"))
    .map((file) => blockNameFromPath(file));

const blockNameFromPath = (filePath: string) =>
  path.dirname(filePath).split(path.sep).pop()!;

const AskDeploy = ({
  blocks,
  onDeploy,
}: {
  blocks?: string[];
  onDeploy(): void;
}) => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "y") {
      onDeploy();
    } else {
      exit();
    }
  });

  return (
    <Text>
      Set up and deploy new blocks? [y/n]
      {!!blocks && <Text dimColor> {blocks.join(", ")}</Text>}
    </Text>
  );
};

export const Publish = () => {
  const apiSdk = useApiSdk();

  const [doDeploy, setDoDeploy] = useState(false);
  const [blocks, setBlocks] = useState<Array<string> | null>(null);
  const [isDone, setDone] = useState<boolean>(false);
  const [buildSuccess, setBuildSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [uploadedBlocks, setUploadedBlocks] = useState<
    Array<BlockFragmentFragment & { isUnchanged?: boolean }>
  >([]);

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

    let manifest;

    try {
      const manifestRaw = buildOutput.find(
        ({ fileName }) => fileName === "manifest.json"
      );

      if (!manifestRaw) {
        throw new Error("No manifest found");
      }

      manifest = JSON.parse(
        // @ts-ignore
        manifestRaw.source
      );
    } catch (err: any) {
      setError(err?.toString?.());
      return;
    }

    for (const [_, entry] of Object.entries(manifest) as any) {
      if (entry.isEntry) {
        const blockDir = path.dirname(entry.file);
        const blockName = blockNameFromPath(entry.file);
        let blockIdToUpdate: string;

        try {
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

          const existingBlockConfig = config.current!.get(
            `blocks.${blockName}`
          ) as { id: string } | undefined;

          if (existingBlockConfig) {
            blockIdToUpdate = existingBlockConfig.id;
          } else {
            blockIdToUpdate = await apiSdk
              .createOneBlock({ input: { block: { name: blockName } } })
              .then((res) => res.createOneBlock.id);

            config.current!.set(`blocks.${blockName}`, {
              id: blockIdToUpdate,
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

          setUploadedBlocks((previous) => [
            ...previous,
            updatedBlock.updateBlockVersion,
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
            `Error publishing block "${blockName}" (${err?.toString?.()})`
          );
          return;
        }
      }
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
    const blockNames = getBlockFiles();

    if (config.current.has("blocks")) {
      let blocksInConfig = 0;

      blockNames.forEach((blockName) => {
        const existingConfig = config.current!.get(`blocks.${blockName}`);

        if (existingConfig) {
          blocksInConfig += 1;
        }
      });

      if (blocksInConfig === blockNames.length) {
        setDoDeploy(true);
      }
    }

    setBlocks(blockNames);
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
        blocks={blocks}
        onDeploy={() => {
          setDoDeploy(true);
        }}
      />
    );
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
                  ⏭️{"  "}
                  {uploadedBlock.name} (unchanged)
                </Text>
              ) : (
                <Text color="green">
                  ✅{"  "}
                  {uploadedBlock.name} (v{uploadedBlock.version?.tag})
                </Text>
              )}
            </Box>
          )}
        </Static>

        <Box marginTop={1}>
          <Text>
            Publishing...
            {blocks ? `(${uploadedBlocks.length}/${blocks.length})` : ""}
          </Text>
        </Box>
      </>
    );
  }

  return <Text>Publish successful</Text>;
};

export const publish: CommandModule = {
  command: "publish",
  describe: "Publish blocks",
  handler: () => {
    render(<Publish />);
  },
};
