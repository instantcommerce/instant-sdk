import { ReactNode } from 'react';
import { ResizableProps } from 're-resizable';
import { twJoin, twMerge } from 'tailwind-merge';
import { Resizable, useConfig, SizeProp } from '../components';

export const PreviewWrapper = ({
  children,
  ...props
}: {
  children: ReactNode;
  onSizeChange?(values: SizeProp): void;
} & ResizableProps) => {
  const { darkModeEnabled, scale, iframeWidth, iframeHeight } = useConfig();

  return (
    <div
      className={twJoin(
        scale ? 'scale-50' : '',
        'flex flex-col flex-1 min-w-0',
      )}
    >
      <div className="w-full h-full mx-0 my-4 max-w-full overflow-auto px-2">
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
