import path from 'path';
import glob from 'glob';
import { dirname } from '~/config';
import { getBlockNameFromPath } from './getBlockNameFromPath';

export const getBlockFiles = () =>
  glob
    .sync(path.join(dirname, 'src/blocks/**/index.tsx'))
    .map((file) => getBlockNameFromPath(file));
