import { ReactNode } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { Resizable, useConfig, SizeProp } from '../components';

export const PreviewWrapper = ({
  children,
  ...props
}: {
  children: ReactNode;
  onSizeChange?(values: SizeProp): void;
}) => {
  const { darkModeEnabled, scale, iframeWidth, iframeHeight } = useConfig();

  return (
    <div
      className={twJoin(
        scale ? 'scale-50' : '',
        'flex flex-col flex-1 min-w-0',
      )}
    >
      <div className="w-full mb-4 mr-4 max-w-[calc(100%-16px)]">
        <Resizable
          size={{
            width: iframeWidth || 300,
            height: iframeHeight || 200,
          }}
          darkMode={darkModeEnabled}
          {...props}
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
