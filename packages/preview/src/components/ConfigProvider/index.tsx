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
    isDefault: true,
  },
  { label: 'iPhone 14 Pro', w: 393, h: 852 },
  { label: 'iPad Air', w: 820, h: 1180 },
  { label: 'Laptop', w: 1600, h: 900 },
  { label: 'Full HD', w: 1920, h: 1080 },
  { label: 'Macbook Pro', w: 2880, h: 1800 },
  { label: '4k', w: 3840, h: 2160 },
].map((item, idx) => ({ ...item, value: `${idx}` }));

export const scales = [
  {
    label: '50%',
    className:
      'scale-50 min-w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4',
  },
  {
    label: '75%',
    className:
      'scale-75 min-w-[133.33%] h-[133.33%] -translate-x-[12.5%] -translate-y-[12.5%]',
  },
  {
    label: '100%',
    className: '',
  },
  {
    label: '125%',
    className:
      'scale-125 w-[80%] h-[80%] translate-x-[12.5%] translate-y-[12.5%]',
  },
  {
    label: '150%',
    className:
      'scale-150 w-[66.66%] h-[66.66%] translate-x-1/4 translate-y-1/4',
  },
].map((item, idx) => ({ ...item, value: `${idx}` }));

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [leftPanelVisible, setLeftPanelVisible] = useState(
    !!window.__INITIAL_USER_CONFIG__?.leftPanel,
  );
  const [rightPanelVisible, setRightPanelVisible] = useState(
    !!window.__INITIAL_USER_CONFIG__?.rightPanel,
  );
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    !!window.__INITIAL_USER_CONFIG__?.darkMode,
  );
  const [scale, setScale] = useState(
    window.__INITIAL_USER_CONFIG__?.scale || 2,
  );
  const [screenSize, setScreenSize] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
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

  const updateDimensions = (size: number, reset = false) => {
    if (size || reset) {
      setWidth(screenSizes[screenSize].w);
      setHeight(screenSizes[screenSize].h);
    }
  };

  useEffect(() => {
    updateDimensions(screenSize);
  }, [screenSize]);

  useEffect(() => {
    const favouriteBlocks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]',
    );

    if (favouriteBlocks?.length) {
      setBookmarks(favouriteBlocks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    updateConfig({
      leftPanel: leftPanelVisible,
      rightPanel: rightPanelVisible,
      darkMode: darkModeEnabled,
      scale,
    });
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
      updateDimensions,
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
    updateDimensions,
  ]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};
