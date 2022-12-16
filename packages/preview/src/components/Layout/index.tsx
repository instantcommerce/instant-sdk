import { ReactNode, useEffect, useState } from 'react';
import {
  CaretCircleDoubleLeft,
  Moon,
  CaretCircleDoubleRight,
  Sun,
} from 'phosphor-react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
  Button,
  useConfig,
  Select,
  Tooltip,
  screenSizes,
  PreviewWrapper,
  IFRAME_DEFAULT_SIZE,
} from '..';
import { scales } from '../ConfigProvider';
import { RightPanel } from './RightPanel';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

export const Layout = ({ children }: { children: ReactNode }) => {
  const [iframeSize, setIframeSize] = useState(IFRAME_DEFAULT_SIZE);

  const {
    rightPanelVisible,
    darkModeEnabled,
    setDarkModeEnabled,
    leftPanelVisible,
    setLeftPanelVisible,
    params,
    scale,
    setScale,
    iframeWidth,
    iframeHeight,
    setWidth,
    setHeight,
    screenSize,
    setScreenSize,
    updateDimensions,
  } = useConfig();

  useEffect(() => {
    setIframeSize({ width: iframeWidth, height: iframeHeight });
  }, [iframeWidth, iframeHeight]);

  return params?.viewMode === 'fullScreen' ? (
    <div className="h-full w-full">{children}</div>
  ) : (
    <div className="flex flex-1 flex-col w-full h-full">
      <TopBar />

      <div className="flex flex-row flex-1 relative h-full min-h-0">
        <SideBar
          className={twJoin(
            'absolute left-0 transition-transform',
            leftPanelVisible ? 'translate-x-0' : '-translate-x-full',
          )}
        />

        <main
          className={twJoin(
            darkModeEnabled ? 'bg-[#1E1E1E]' : 'bg-gray-50',
            rightPanelVisible && 'pr-96',
            leftPanelVisible && 'pl-[12.5rem]',
            'flex flex-row flex-1 min-w-0 ',
          )}
        >
          <div
            id="preview-wrapper"
            className="flex flex-col flex-1 min-w-0 overflow-auto"
          >
            <div id="preview-top-bar" className="sticky top-0 z-50 p-2">
              <div className="relative w-full h-full flex items-center justify-between">
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => {
                      setLeftPanelVisible(!leftPanelVisible);
                    }}
                    variant={darkModeEnabled ? 'dark' : 'white'}
                    iconOnly
                  >
                    {leftPanelVisible ? (
                      <CaretCircleDoubleLeft size={18} />
                    ) : (
                      <CaretCircleDoubleRight size={18} />
                    )}
                  </Button>

                  <Select
                    className={twMerge(
                      'text-xs text-[13px] h-[30px] shadow-none',
                      darkModeEnabled
                        ? 'border-gray-800 hover:border-gray-700 focus:border-gray-700'
                        : 'border-white hover:border-primary-100 focus:border-gray-200',
                    )}
                    itemClassName="text-[13px]"
                    options={[[screenSizes[0]], screenSizes.slice(1)]}
                    defaultValue={screenSizes[0].value}
                    value={`${screenSize}`}
                    variant={darkModeEnabled ? 'dark' : 'light'}
                    onValueChange={(val) => {
                      const value = Number(val);
                      const reset = !value;

                      setScreenSize(value);

                      if (reset) {
                        updateDimensions(value, reset);
                      }
                    }}
                  />
                </div>

                <div
                  className={twMerge(
                    'flex gap-1.5 items-center text-xs absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4',
                    darkModeEnabled ? 'text-primary-300' : 'text-primary-700',
                  )}
                >
                  <input
                    className={twMerge(
                      'w-[38px] text-center bg-transparent outline-none rounded focus:ring-1 px-[3px] py-px [-moz-appearance]-none',
                      darkModeEnabled
                        ? 'focus:bg-gray-800 ring-gray-700'
                        : 'focus:bg-primary-100 ring-primary-200',
                    )}
                    value={iframeSize.width}
                    type="number"
                    min={1}
                    max={9999}
                    onChange={(e) => {
                      setWidth(
                        Math.max(1, Math.min(9999, parseInt(e.target.value))),
                      );
                    }}
                  />
                  <span
                    className={
                      darkModeEnabled ? 'text-gray-400' : 'text-gray-600'
                    }
                  >
                    x
                  </span>

                  <input
                    className={twMerge(
                      'w-[38px] text-center bg-transparent outline-none rounded focus:ring-1 px-[3px] py-px [-moz-appearance]-none',
                      darkModeEnabled
                        ? 'focus:bg-gray-800 ring-gray-700'
                        : 'focus:bg-primary-100 ring-primary-200',
                    )}
                    value={iframeSize.height}
                    type="number"
                    min={1}
                    max={9999}
                    onChange={(e) => {
                      setHeight(
                        Math.max(1, Math.min(9999, parseInt(e.target.value))),
                      );
                    }}
                  />
                </div>

                <div className="flex gap-1.5">
                  <Select
                    className={twMerge(
                      'text-xs text-[13px] h-[30px] shadow-none',
                      darkModeEnabled
                        ? 'border-gray-800 hover:border-gray-700 focus:border-gray-700'
                        : 'border-white hover:border-primary-100 focus:border-gray-200',
                    )}
                    itemClassName="text-[13px]"
                    options={scales}
                    defaultValue={scales[0].value}
                    value={`${scale}`}
                    variant={darkModeEnabled ? 'dark' : 'light'}
                    onValueChange={(val) => {
                      const value = Number(val);

                      setScale(value);
                    }}
                  />

                  <Tooltip
                    content="Toggle dark mode"
                    variant={darkModeEnabled ? 'dark' : 'light'}
                  >
                    <Button
                      onClick={() => {
                        setDarkModeEnabled(!darkModeEnabled);
                      }}
                      variant={darkModeEnabled ? 'dark' : 'white'}
                      iconOnly
                    >
                      {darkModeEnabled ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-1 overflow-hidden">
              <PreviewWrapper
                onSizeChange={setIframeSize}
                onResizeStart={() => {
                  setScreenSize(0);
                  updateDimensions(0);
                }}
              >
                {children}
              </PreviewWrapper>
            </div>
          </div>
        </main>

        <RightPanel />
      </div>
    </div>
  );
};
