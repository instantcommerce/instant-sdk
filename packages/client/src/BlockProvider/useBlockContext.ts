import { useContext } from 'react';

import { BlockContext } from './context';

export function useBlockContext() {
  const context = useContext(BlockContext);

  if (!context) {
    throw new Error('Expected block context not found');
  }

  return context;
}
