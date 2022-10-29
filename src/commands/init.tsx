import React, { FC, useEffect, useState } from "react";
import { existsSync, mkdirSync } from "fs";
import { render, Text } from "ink";
import { CommandModule } from "yargs";

export const Init: FC<{ name: string }> = ({ name }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const dir = `./${name}`;

    if (!existsSync(dir)) {
      mkdirSync(dir);
      setSuccess(true);
    } else {
      setError(`The directory "${name}" already exists.`);
    }
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!success) {
    <Text>Initializig project...</Text>;
  }

  return <Text>Initialized new project "{name}".</Text>;
};

export const init: CommandModule = {
  command: "init <name>",
  describe: "Initialize a new Instant project",
  handler: (argv) => {
    render(<Init name={argv["name"] as string} />);
  },
};
