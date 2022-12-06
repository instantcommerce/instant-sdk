import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React, { FC, useEffect, useState } from 'react';
import { Box, render, Text } from 'ink';
import { CommandModule } from 'yargs';

const TEMPLATES = ['ts-tailwind'];

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
};

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0]!;
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

const pkgInfo = pkgFromUserAgent((process.env as any).npm_config_user_agent);
const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

export const Init: FC<{ name: string; template: string }> = ({
  name,
  template,
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const dir = `./${name}`;
    const root = path.join(process.cwd(), dir);

    if (!TEMPLATES.includes(template)) {
      setError(`The template "${template}" does not exist`);
      return;
    }

    if (fs.existsSync(dir)) {
      setError(`The directory "${name}" already exists`);
      return;
    }

    fs.mkdirSync(dir);

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../',
      `templates/${template}`,
    );

    const write = (file: string, content?: string) => {
      const targetPath = path.join(root, renameFiles[file] ?? file);
      if (content) {
        fs.writeFileSync(targetPath, content);
      } else {
        copy(path.join(templateDir, file), targetPath);
      }
    };

    const files = fs.readdirSync(templateDir);
    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file);
    }

    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    );

    pkg.name = name;

    write('package.json', JSON.stringify(pkg, null, 2));

    setSuccess(true);
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!success) {
    <Text>Initializig project...</Text>;
  }

  return (
    <Box flexDirection="column">
      <Text>Initialized new project "{name}". To get started run:</Text>

      <Box marginTop={1} marginLeft={2} flexDirection="column">
        <Text>cd {path.relative(process.cwd(), `./${name}`)}</Text>
        {pkgManager === 'yarn' ? (
          <>
            <Text>yarn</Text>
            <Text>yarn dev</Text>
          </>
        ) : (
          <>
            <Text>{pkgManager} install</Text>
            <Text>{pkgManager} run dev</Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export const init: CommandModule = {
  command: 'init <name> <template>',
  describe: 'Initialize a new Instant project',
  handler: (argv) => {
    render(
      <Init
        name={argv['name'] as string}
        template={argv['template'] as string}
      />,
    );
  },
};
