import { createContext } from 'react';

export interface ConfigContextValue {
  leftPanelVisible: boolean;
  setLeftPanelVisible(value: boolean): void;
  rightPanelVisible: boolean;
  setRightPanelVisible(value: boolean): void;
  darkModeEnabled: boolean;
  setDarkModeEnabled(value: boolean): void;
  screenSize: string;
  setScreenSize(size: string): void;
  selectedStore?: NonNullable<typeof window.__INSTANT_STORES__>[0];
  setSelectedStore(
    value: NonNullable<typeof window.__INSTANT_STORES__>[0],
  ): void;
  params: any;
  getUrl(params: any): string;
  updateConfig(value: {
    leftPanel?: boolean;
    rightPanel?: boolean;
    darkMode?: boolean;
  }): void;
  updateBookmarks(blockName: string): void;
  bookmarks: string[];
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);
