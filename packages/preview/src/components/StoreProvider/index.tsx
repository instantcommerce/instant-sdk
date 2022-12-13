import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStore } from '../../containers/Preview/getStore';
import { useConfig } from '../ConfigProvider';

import { StoreContext } from './context';

export * from './useStore';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { selectedStore } = useConfig();

  const { data } = useQuery(
    ['store', selectedStore],
    () => getStore(new URL(`https://${selectedStore?.hostname}`)),
    {
      suspense: false,
      enabled: !!selectedStore,
      useErrorBoundary: true,
    },
  );

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
};
