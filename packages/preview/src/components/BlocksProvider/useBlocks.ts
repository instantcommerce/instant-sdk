import { useContext } from 'react';

import { BlocksContext } from './context';

export function useBlocks() {
  const context = useContext(BlocksContext);

  if (!context) {
    throw new Error('Expected blocks context not found');
  }

  return context;
}
