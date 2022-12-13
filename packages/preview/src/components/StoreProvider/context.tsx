import { createContext } from 'react';
import { PublicStore } from 'types/api';

export type StoreContextValue = PublicStore;

export const StoreContext = createContext<StoreContextValue | null>(null);
