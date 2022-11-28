import { ReactNode, useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router';

import { ConfigContext } from './context';

export * from './useConfig';

if (import.meta.env.DEV) {
  window.__INSTANT_STORES__ = [
    {
      id: '1',
      name: 'Electronics',
      hostname: 'electronics.instantcommerce.dev',
    },
    {
      id: '2',
      name: 'Fashion',
      hostname: 'fashion.instantcommerce.dev',
    },
  ];
}

export const screenSizes = [
  { label: 'Responsive', value: 'responsive', w: '100%', h: '100%' },
  { label: 'iPhone 14 Pro', value: 'iphone-14-pro', w: 393, h: 852 },
  { label: 'iPad Air', value: 'ipad-air', w: 820, h: 1180 },
  { label: 'Macbook Pro', value: 'macbook-pro', w: 393, h: 852 },
  { label: 'Laptop', value: 'laptop', w: 393, h: 852 },
  { label: 'Full HD', value: 'full-hd', w: 393, h: 852 },
  { label: '4k', value: '4-k', w: 393, h: 852 },
];

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [scale, setScale] = useState<number | undefined>(undefined);
  const [screenSize, setScreenSize] = useState(screenSizes[0]?.value);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [initializedConfig, setInitializedConfig] = useState(false);
  const [selectedStore, setSelectedStore] = useState(
    window.__INSTANT_STORES__?.[0],
  );

  const location = useLocation();

  const params = useMemo(
    () => qs.parse(location?.search?.substring(1)),
    [location],
  );

  const getUrl = (searchParams = {}) =>
    `${location?.pathname}?${qs.stringify({ ...params, ...searchParams })}`;

  useEffect(() => {
    const favouriteBlocks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]',
    );

    if (favouriteBlocks?.length) {
      setBookmarks(favouriteBlocks);
    }

    const userConfig = JSON.parse(localStorage.getItem('userConfig') || '{}');

    if (Object.keys(userConfig)?.length) {
      setLeftPanelVisible(userConfig?.leftPanel);
      setRightPanelVisible(userConfig?.rightPanel);
      setDarkModeEnabled(userConfig?.darkMode);
      setScale(userConfig?.scale);
    }

    setInitializedConfig(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (initializedConfig) {
      updateConfig({
        leftPanel: leftPanelVisible,
        rightPanel: rightPanelVisible,
        darkMode: darkModeEnabled,
        scale,
      });
    }
  }, [leftPanelVisible, rightPanelVisible, darkModeEnabled, scale]);

  const updateBookmarks = (blockName: string) => {
    if (bookmarks?.includes(blockName)) {
      setBookmarks(bookmarks?.filter((item) => item !== blockName));
    } else {
      setBookmarks([...bookmarks, blockName]);
    }
  };

  const updateConfig = (values: any) => {
    const currentConfig = localStorage.getItem('userConfig');
    let updatedValues = {};

    if (currentConfig) {
      updatedValues = {
        ...JSON.parse(currentConfig),
        ...values,
      };
    } else {
      updatedValues = values;
    }

    localStorage.setItem('userConfig', JSON.stringify(updatedValues));
  };

  const contextValue = useMemo(() => {
    return {
      leftPanelVisible,
      setLeftPanelVisible,
      rightPanelVisible,
      setRightPanelVisible,
      darkModeEnabled,
      setDarkModeEnabled,
      screenSize,
      setScreenSize,
      selectedStore,
      setSelectedStore,
      params,
      updateConfig,
      updateBookmarks,
      bookmarks,
      getUrl,
      scale,
      setScale,
    };
  }, [
    leftPanelVisible,
    setLeftPanelVisible,
    rightPanelVisible,
    setRightPanelVisible,
    darkModeEnabled,
    setDarkModeEnabled,
    screenSize,
    setScreenSize,
    selectedStore,
    setSelectedStore,
    params,
    updateConfig,
    updateBookmarks,
    bookmarks,
    getUrl,
    scale,
    setScale,
  ]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};
