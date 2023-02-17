/* eslint-disable jsx-a11y/accessible-emoji */
import fs from 'fs';
import React, { useEffect, useRef, useState } from 'react';
import { Box, render, Static, Text, useApp, useInput, useStdout } from 'ink';
import { CommandModule } from 'yargs';
import { dirname, config as userConfig } from '~/config';
import { useApiSdk } from '~/lib/api';
import { BlockSubtype, BlockType } from '~/lib/api/sdk';
import { BlockFiles, getBlockFiles } from '~/lib/getBlockFiles';
import { getProjectConfig } from '~/lib/getProjectConfig';

const AskDeploy = ({
  blocks,
  onDeploy,
}: {
  blocks: BlockFiles;
  onDeploy(): void;
}) => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === 'y') {
      onDeploy();
    } else {
      exit();
    }
  });

  return (
    <Text>
      Set up blocks? [y/n]
      <Text dimColor> {blocks.map(({ name }) => name).join(', ')}</Text>
    </Text>
  );
};

export const Add = ({
  blockNames: providedBlockNames,
}: {
  blockNames?: string[];
}) => {
  const apiSdk = useApiSdk();
  const { exit } = useApp();
  const { write } = useStdout();

  const [doDeploy, setDoDeploy] = useState(false);
  const [blocks, setBlocks] = useState<BlockFiles | null>(null);
  const [isDone, setDone] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [createdBlocks, setCreatedBlocks] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const config = useRef<ReturnType<typeof getProjectConfig>>();

  const addBlocks = async () => {
    if (!blocks) {
      exit();
      return;
    }

    for (const block of blocks) {
      try {
        const createdBlock = await apiSdk
          .createOneBlock(
            {
              input: {
                block: {
                  name: block.name,
                  type: block.type,
                  subtype:
                    /** @todo get subtype from code */
                    block.type === BlockType.Component
                      ? BlockSubtype.CartSidebar
                      : block.type === BlockType.Page
                      ? BlockSubtype.Pdp
                      : BlockSubtype.All,
                },
              },
            },
            // @ts-expect-error
            {
              'x-instant-organization': config.current!.get('organization')!,
              'x-instant-store-id': undefined,
            },
          )
          .then((res) => res.createOneBlock);

        config.current!.set(`blocks.${block.name}`, {
          id: createdBlock.id,
        });

        setCreatedBlocks((previous) => [
          ...previous,
          { id: createdBlock.id, name: createdBlock.name },
        ]);
      } catch (err: any) {
        setError(
          `Error setting up block "${block.name}" (${err?.toString?.()})`,
        );
        return;
      }
    }

    setDone(true);
  };

  useEffect(() => {
    if (doDeploy) {
      addBlocks();
    }
  }, [doDeploy]);

  useEffect(() => {
    if (process.env['FORCE_DIR']) {
      process.chdir(dirname);
    }

    config.current = getProjectConfig('./');

    if (!userConfig.get('organization')) {
      setError(`No organization selected, run the \`select\` command first`);
      return;
    }

    if (!fs.existsSync('./instant.config.json')) {
      fs.writeFileSync(
        './instant.config.json',
        JSON.stringify(
          {
            organization: userConfig.get('organization'),
          },
          undefined,
          2,
        ),
      );
    } else if (!config.current.get('organization')) {
      config.current.set('organization', userConfig.get('organization'));
    }

    config.current = getProjectConfig('./');

    const blockFiles = getBlockFiles().filter(({ name: blockName }) => {
      if (providedBlockNames && !providedBlockNames.includes(blockName)) {
        return false;
      }

      if (config.current!.get(`blocks.${blockName}`)) {
        write(`Skipping block "${blockName}", already added\n`);
        return false;
      }

      return true;
    });

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

  if (!doDeploy) {
    if (!blocks) {
      return <Text>Loading...</Text>;
    }

    if (!blocks.length) {
      return <Text>No blocks found to add</Text>;
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
                ✅{'  '}
                {createdBlock.name}
              </Text>
            </Box>
          )}
        </Static>

        <Box marginTop={1}>
          <Text>
            Setting up...
            {blocks ? `(${createdBlocks.length}/${blocks.length})` : ''}
          </Text>
        </Box>
      </>
    );
  }

  return (
    <Text color="green">
      {createdBlocks.length} block{createdBlocks.length === 1 ? '' : 's'} added
      successfully
    </Text>
  );
};

export const add: CommandModule = {
  command: 'add [blocknames..]',
  describe:
    'Add block(s) to the platform, space-separated list of blocknames to limit',
  handler: (argv) => {
    render(<Add blockNames={argv['blocknames'] as string[]} />);
  },
};
