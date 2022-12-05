import { ReactNode } from 'react';
import { ResizableProps } from 're-resizable';
import { twMerge } from 'tailwind-merge';
import { scales, Resizable, useConfig, SizeProp } from '.';

export const PreviewWrapper = ({
  children,
  ...props
}: {
  children: ReactNode;
  onSizeChange?(values: SizeProp): void;
} & ResizableProps) => {
  const { darkModeEnabled, scale, iframeWidth, iframeHeight } = useConfig();

  return (
    <div className={twMerge('flex flex-col flex-1 min-w-0')}>
      <div className="w-full h-full mx-0 my-4 max-w-full overflow-auto px-2">
        <Resizable
          size={
            iframeWidth && iframeHeight
              ? {
                  width: iframeWidth,
                  height: iframeHeight,
                }
              : undefined
          }
          darkMode={darkModeEnabled}
          {...props}
        >
          <div
            className={twMerge(
              'h-full overflow-auto border bg-white',
              darkModeEnabled ? 'border-gray-700' : 'border-gray-100',
              scales.find((s) => s.value === `${scale}`)?.className,
            )}
          >
            {children}
          </div>
        </Resizable>
      </div>
    </div>
  );
};
