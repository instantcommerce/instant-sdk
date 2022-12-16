import { existsSync, mkdirSync, writeFileSync } from 'fs';
import React, { FC, useEffect, useState } from 'react';
import { render, Text } from 'ink';
import { CommandModule } from 'yargs';
import { blockTemplate } from '~/templates';

export const Generate: FC<{ schematic: string; name: string }> = ({
  schematic,
  name,
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let template: (name: string) => string;

    switch (schematic) {
      case 'block':
        template = blockTemplate;
        break;

      default:
        setError(
          `Invalid schematic "${schematic}", use one of the following values: "block"`,
        );
        return;
    }

    const dir = `./src/${schematic}s`;

    if (!existsSync('./instant.config.json')) {
      setError(
        `No "instant.config.json" file found, make sure to run this command in the root of an Instant SDK project.`,
      );
    } else {
      // Create directory if it does not exist yet
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }

      if (existsSync(`${dir}/${name}`)) {
        setError(`Folder "${dir}/${name}" already exists, aborting`);
        return;
      }

      mkdirSync(`${dir}/${name}`);
      writeFileSync(`${dir}/${name}/index.tsx`, template(name));
      setSuccess(true);
    }
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!success) {
    <Text>Generating files...</Text>;
  }

  return (
    <Text>
      Generated new {schematic} "{name}"
    </Text>
  );
};

export const generate: CommandModule = {
  command: 'generate <schematic> <name>',
  describe: 'Generate new Instant element',
  handler: (argv) => {
    render(
      <Generate
        schematic={argv['schematic'] as string}
        name={argv['name'] as string}
      />,
    );
  },
};
