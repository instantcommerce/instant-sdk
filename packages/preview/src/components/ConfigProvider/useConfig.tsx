import { useContext } from 'react';

import { ConfigContext } from './context';

export function useConfig() {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('Expected config context not found');
  }

  return context;
}
