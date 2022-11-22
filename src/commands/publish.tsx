import React, { useEffect, useRef, useState } from "react";
import { Box, render, Static, Text } from "ink";
import { CommandModule } from "yargs";
import { build } from "vite";
import path from "path";
import { createReadStream, existsSync } from "fs";
import { extractApiError, useApiSdk } from "~/lib/api";
import { getProjectConfig } from "~/lib/getProjectConfig";
import { BlockFragmentFragment } from "~/lib/api/sdk";
import { getBlockNameFromPath } from "~/lib/getBlockNameFromPath";
import { getBlockFiles } from "~/lib/getBlockFiles";
import { dirname } from "~/config";

export const Publish = ({
  blockNames: providedBlockNames,
}: {
  blockNames: string[];
}) => {
  const apiSdk = useApiSdk();

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
      configFile: `${dirname}/vite.config.ts`,
      root: dirname,
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
        const blockName = getBlockNameFromPath(entry.file);
        let blockIdToUpdate: string;

        if (!blocks?.includes(blockName)) {
          continue;
        }

        try {
          const customizerSchema = JSON.parse(
            buildOutput.find(
              ({ fileName }) =>
                fileName === path.join(blockDir, "customizerSchema.json")
              // @ts-ignore
            )?.source
          );
          const contentSchema = JSON.parse(
            buildOutput.find(
              ({ fileName }) =>
                fileName === path.join(blockDir, "contentSchema.json")
              // @ts-ignore
            )?.source
          );
          const blockFile = createReadStream(
            path.join(dirname, "dist", entry.file)
          );

          const existingBlockConfig = config.current!.get(
            `blocks.${blockName}`
          ) as { id: string };

          blockIdToUpdate = existingBlockConfig.id;

          const publishedBlock = await apiSdk.publishBlockVersion({
            input: {
              id: blockIdToUpdate,
              code: blockFile,
              contentSchema,
              customizerSchema,
            },
          });

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
            `Error publishing block "${blockName}" (${err?.toString?.()})`
          );
          return;
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
    if (process.env["FORCE_DIR"]) {
      process.chdir(dirname);
    }

    if (!existsSync("./instant.config.json")) {
      setError(`No "instant.config.json" file found.`);
      return;
    }

    config.current = getProjectConfig("./");

    const blockNames = getBlockFiles().filter((blockName) => {
      if (providedBlockNames && !providedBlockNames.includes(blockName)) {
        return false;
      }

      if (!config.current!.get(`blocks.${blockName}`)) {
        setError(
          `Block not added: "${blockName}", please run the add command first`
        );
        return false;
      }

      return true;
    });

    if (providedBlockNames) {
      for (const providedBlockName of providedBlockNames) {
        if (!blockNames.includes(providedBlockName)) {
          setError(`Block not found: "${providedBlockName}"`);
          break;
        }
      }
    }

    setBlocks(blockNames);
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
  command: "publish [blocknames..]",
  describe:
    "Publish new version of block(s), comma-separated list of blocknames to limit",
  handler: (argv) => {
    render(<Publish blockNames={argv["blocknames"] as string[]} />);
  },
};
