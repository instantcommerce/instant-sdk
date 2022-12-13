import { useContext } from 'react';

import { StoreContext } from './context';

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('Expected store context not found');
  }

  return context;
}
