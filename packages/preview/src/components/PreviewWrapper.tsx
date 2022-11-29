import { ReactNode, useMemo } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { Resizable, useConfig, screenSizes } from '../components';

export const PreviewWrapper = ({ children }: { children: ReactNode }) => {
  const { screenSize, darkModeEnabled, scale } = useConfig();

  const iframeDimensions = useMemo(
    () => screenSizes?.find((item) => item.value === screenSize),
    [screenSize],
  );

  return (
    <div
      className={twJoin(
        scale ? 'scale-50' : '',
        'flex flex-col flex-1 min-w-0',
      )}
    >
      <div className="w-full mb-4 mr-4 max-w-[calc(100%-16px)]">
        <Resizable
          size={
            iframeDimensions?.value === 'responsive'
              ? undefined
              : {
                  width: iframeDimensions?.w,
                  height: 200,
                }
          }
          enabled={iframeDimensions?.value === 'responsive'}
          darkMode={darkModeEnabled}
        >
          <div
            className={twMerge(
              'h-full overflow-auto border bg-white',
              darkModeEnabled ? 'border-gray-700' : 'border-gray-100',
            )}
          >
            {children}
          </div>
        </Resizable>
      </div>
    </div>
  );
};
