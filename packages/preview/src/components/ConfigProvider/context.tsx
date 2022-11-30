import { createContext } from 'react';

export interface ConfigContextValue {
  leftPanelVisible: boolean;
  setLeftPanelVisible(value: boolean): void;
  rightPanelVisible: boolean;
  setRightPanelVisible(value: boolean): void;
  darkModeEnabled: boolean;
  setDarkModeEnabled(value: boolean): void;
  screenSize: number;
  setScreenSize(size: number): void;
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
    scale?: number;
  }): void;
  updateBookmarks(blockName: string): void;
  bookmarks: string[];
  scale?: number;
  setScale(value?: number): void;
  iframeWidth: number | string;
  setWidth(value: number | string): void;
  iframeHeight: number | string;
  setHeight(value: number | string): void;
  updateDimensions(value: number, reset?: boolean): void;
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);
