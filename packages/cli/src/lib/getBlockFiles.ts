import path from 'path';
import glob from 'glob';
import { dirname } from '~/config';
import { BlockType } from './api/sdk';
import { getBlockNameFromPath } from './getBlockNameFromPath';

const BLOCK_GLOBS = [
  {
    type: BlockType.Component,
    glob: 'src/components/**/index.tsx',
  },
  {
    type: BlockType.Section,
    glob: 'src/{sections,blocks}/**/index.tsx',
  },
  {
    type: BlockType.Page,
    glob: 'src/pages/**/index.tsx',
  },
];

export const getBlockFiles = () => {
  const blocks = BLOCK_GLOBS.map(({ type, glob: pattern }) => {
    return glob.sync(path.join(dirname, pattern)).map((file) => ({
      type,
      name: getBlockNameFromPath(file),
      path: file,
    }));
  });

  return blocks.flat();
};

export type BlockFiles = ReturnType<typeof getBlockFiles>;
