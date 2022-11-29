import { ReactNode, useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router';

import { IFRAME_DEFAULT_SIZE } from '../Resizable';
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
  {
    label: 'Responsive',
    w: IFRAME_DEFAULT_SIZE.width,
    h: IFRAME_DEFAULT_SIZE.height,
  },
  { label: 'iPhone 14 Pro', w: 393, h: 852 },
  { label: 'iPad Air', w: 820, h: 1180 },
  { label: 'Macbook Pro', w: 393, h: 852 },
  { label: 'Laptop', w: 393, h: 852 },
  { label: 'Full HD', w: 393, h: 852 },
  { label: '4k', w: 393, h: 852 },
].map((item, idx) => ({ ...item, value: `${idx}` }));

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [scale, setScale] = useState<number | undefined>(undefined);
  const [screenSize, setScreenSize] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [initializedConfig, setInitializedConfig] = useState(false);
  const [selectedStore, setSelectedStore] = useState(
    window.__INSTANT_STORES__?.[0],
  );
  const [iframeWidth, setWidth] = useState(IFRAME_DEFAULT_SIZE.width);
  const [iframeHeight, setHeight] = useState(IFRAME_DEFAULT_SIZE.height);

  const location = useLocation();

  const params = useMemo(
    () => qs.parse(location?.search?.substring(1)),
    [location],
  );

  const getUrl = (searchParams = {}) =>
    `${location?.pathname}?${qs.stringify({ ...params, ...searchParams })}`;

  useEffect(() => {
    if (typeof screenSize === 'number') {
      setWidth(screenSizes[screenSize].w);
      setHeight(screenSizes[screenSize].h);
    }
  }, [screenSize]);

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
      iframeWidth,
      iframeHeight,
      setWidth,
      setHeight,
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
    iframeWidth,
    iframeHeight,
    setWidth,
    setHeight,
  ]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};
