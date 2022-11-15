import React, { useEffect, useRef, useState } from "react";
import { Box, render, Static, Text, useApp, useInput, useStdout } from "ink";
import { CommandModule } from "yargs";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs";
import glob from "glob";
import { useApiSdk } from "~/lib/api";
import { getProjectConfig } from "~/lib/getProjectConfig";
import { getBlockNameFromPath } from "~/lib/getBlockNameFromPath";

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

const __dirname = resolvePath(
  "../../instant-frontend/examples/block-extension"
);

const getBlockFiles = () =>
  glob
    .sync(path.join(__dirname, "src/blocks/**/index.tsx"))
    .map((file) => getBlockNameFromPath(file));

const AskDeploy = ({
  blocks,
  onDeploy,
}: {
  blocks: string[];
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
      Set up blocks? [y/n]
      <Text dimColor> {blocks.join(", ")}</Text>
    </Text>
  );
};

export const Setup = ({
  blockNames: providedBlockNames,
}: {
  blockNames?: string[];
}) => {
  const apiSdk = useApiSdk();
  const { exit } = useApp();
  const { write } = useStdout();

  const [doDeploy, setDoDeploy] = useState(false);
  const [blocks, setBlocks] = useState<Array<string> | null>(null);
  const [isDone, setDone] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [createdBlocks, setCreatedBlocks] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const config = useRef<ReturnType<typeof getProjectConfig>>();

  const setupBlocks = async () => {
    if (!blocks) {
      exit();
      return;
    }

    for (const blockName of blocks) {
      try {
        const createdBlock = await apiSdk
          .createOneBlock({ input: { block: { name: blockName } } })
          .then((res) => res.createOneBlock);

        config.current!.set(`blocks.${blockName}`, {
          id: createdBlock.id,
        });

        setCreatedBlocks((previous) => [
          ...previous,
          { id: createdBlock.id, name: createdBlock.name },
        ]);
      } catch (err: any) {
        setError(
          `Error setting up block "${blockName}" (${err?.toString?.()})`
        );
        return;
      }
    }

    setDone(true);
  };

  useEffect(() => {
    if (doDeploy) {
      setupBlocks();
    }
  }, [doDeploy]);

  useEffect(() => {
    process.chdir(__dirname);

    if (!existsSync("./instant.config.json")) {
      setError(`No "instant.config.json" file found.`);
      return;
    }

    config.current = getProjectConfig("./");

    const blockNames = getBlockFiles().filter((blockName) => {
      if (providedBlockNames && !providedBlockNames.includes(blockName)) {
        return false;
      }

      if (config.current!.get(`blocks.${blockName}`)) {
        write(`Skipping block "${blockName}", already set up\n`);
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

  if (!doDeploy) {
    if (!blocks) {
      return <Text>Loading...</Text>;
    }

    if (!blocks.length) {
      return <Text>No blocks found to set up</Text>;
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

  if (!isDone) {
    return (
      <>
        <Static items={createdBlocks}>
          {(createdBlock) => (
            <Box key={createdBlock.id}>
              <Text>
                ✅{"  "}
                {createdBlock.name}
              </Text>
            </Box>
          )}
        </Static>

        <Box marginTop={1}>
          <Text>
            Setting up...
            {blocks ? `(${createdBlocks.length}/${blocks.length})` : ""}
          </Text>
        </Box>
      </>
    );
  }

  return (
    <Text color="green">
      {createdBlocks.length} block{createdBlocks.length === 1 ? "" : "s"} set up
      successfully
    </Text>
  );
};

export const setup: CommandModule = {
  command: "setup [blocknames..]",
  describe: "Setup block(s), comma-separated list of blocknames to limit",
  handler: (argv) => {
    render(<Setup blockNames={argv["blocknames"] as string[]} />);
  },
};
