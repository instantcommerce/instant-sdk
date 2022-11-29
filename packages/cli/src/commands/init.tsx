import { existsSync, mkdirSync, writeFileSync } from 'fs';
import React, { FC, useEffect, useState } from 'react';
import { render, Text } from 'ink';
import { CommandModule } from 'yargs';
import { config } from '~/config';
import { blockTemplate, instantConfigTemplate } from '~/templates';

export const Init: FC<{ name: string }> = ({ name }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const dir = `./${name}`;

    if (existsSync(dir)) {
      setError(`The directory "${name}" already exists`);
    } else {
      mkdirSync(`${dir}/blocks/Hero`, { recursive: true });
      writeFileSync(
        `${dir}/instant.config.json`,
        instantConfigTemplate(
          config.get('organization'),
          config.get('storeId'),
        ),
      );
      writeFileSync(`${dir}/blocks/Hero/index.tsx`, blockTemplate('Hero'));
      setSuccess(true);
    }
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!success) {
    <Text>Initializig project...</Text>;
  }

  return <Text>Initialized new project "{name}"</Text>;
};

export const init: CommandModule = {
  command: 'init <name>',
  describe: 'Initialize a new Instant project',
  handler: (argv) => {
    render(<Init name={argv['name'] as string} />);
  },
};
