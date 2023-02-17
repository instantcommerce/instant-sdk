import { createContext } from 'react';

export interface StoreContextValue {
  store?: any;
  isLoading: boolean;
  error?: string;
}

export const StoreContext = createContext<StoreContextValue | null>(null);
