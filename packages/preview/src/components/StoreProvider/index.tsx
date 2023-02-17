import { ReactNode, useEffect, useState } from 'react';
import { getStore } from '../../lib';
import { useConfig } from '../ConfigProvider';

import { StoreContext } from './context';

export * from './useStore';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [store, setStore] = useState<any>();

  const { selectedStore } = useConfig();

  const loadStore = async () => {
    setLoading(true);
    setError('');

    if (selectedStore?.hostname) {
      try {
        const store = await getStore(
          new URL(`https://${selectedStore?.hostname}`),
        );
        setStore(store);
      } catch (err) {
        setError(
          err?.toString?.() || 'An error occurred loading the selected store',
        );
      }
    } else {
      setStore(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStore();
  }, [selectedStore]);

  return (
    <StoreContext.Provider value={{ store, isLoading, error }}>
      {children}
    </StoreContext.Provider>
  );
};
