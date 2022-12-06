declare interface Window {
  // extend the window
  __INSTANT_BLOCK_SERVER__: string;
  __INSTANT_BLOCKS_MANIFEST__: Record<
    string,
    {
      name: string;
      contentSchema?: any;
      customizationSchema?: any;
    }
  >;
  __INSTANT_STORES__?: Array<{
    id: string;
    name: string;
    hostname: string;
  }>;
  __INITIAL_USER_CONFIG__?: {
    leftPanel: boolean;
    rightPanel: boolean;
    darkMode: boolean;
    scale: number;
  };
}
