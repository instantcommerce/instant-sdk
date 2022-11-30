import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { Resizable as ResizableComponent, ResizableProps } from 're-resizable';
import { Handle } from './Handle';

export type SizeProp = {
  width: number | string;
  height: number | string;
};

export const IFRAME_DEFAULT_SIZE: SizeProp = { width: 300, height: 200 };

export const Resizable = ({
  children,
  darkMode,
  defaultSize = IFRAME_DEFAULT_SIZE,
  size: sizeProp,
  onSizeChange,
  ...props
}: {
  children: ReactNode;
  darkMode?: boolean;
  onSizeChange?(values: SizeProp): void;
} & ResizableProps) => {
  const [size, setSize] = useState(defaultSize);

  const getMaxWidth = () =>
    (document.querySelector('#preview-wrapper')?.getBoundingClientRect?.()
      ?.width || 0) - 16;

  const getMaxHeight = () =>
    (document.querySelector('#preview-wrapper')?.getBoundingClientRect?.()
      ?.height || 0) -
    (document.querySelector('#preview-top-bar')?.getBoundingClientRect?.()
      ?.height || 0) -
    16;

  useLayoutEffect(() => {
    if (!sizeProp) {
      const width = getMaxWidth();
      const height = getMaxHeight();

      if (width && height) {
        setSize({ width, height });
      }
    }
  }, []);

  useEffect(() => {
    if (sizeProp) {
      setSize(sizeProp);
    }
  }, [sizeProp?.width, sizeProp?.height]);

  const handleClassName = darkMode
    ? 'bg-gray-700 hover:bg-gray-600'
    : undefined;

  return (
    <ResizableComponent
      size={size}
      onResizeStop={(_1, _2, _3, d) => {
        setSize({
          width: +size.width + d.width,
          height: +size.height + d.height,
        });
      }}
      onResize={(_1, _2, _3, d) => {
        if (!!onSizeChange) {
          onSizeChange({
            width: +size.width + d.width,
            height: +size.height + d.height,
          });
        }
      }}
      className="mx-auto"
      handleClasses={{
        left: 'flex items-center justify-center',
        right: 'flex items-center justify-center',
        bottom: 'flex items-center justify-center',
      }}
      handleStyles={{
        right: {
          right: '-16px',
          width: '16px',
          padding: 0,
        },
        left: {
          left: '-16px',
          width: '16px',
          padding: '6px',
        },
        bottom: {
          bottom: '-16px',
          height: '16px',
          padding: 0,
        },
      }}
      handleComponent={{
        bottom: (
          <Handle
            className={handleClassName}
            onMouseDown={(e) => {
              /** Fill height on double-click */
              if (e.detail === 2) {
                const height = getMaxHeight();

                if (height) {
                  setSize({ height, width: size.width });
                }
              }
            }}
            position="bottom"
          />
        ),
        right: (
          <Handle
            className={handleClassName}
            onMouseDown={(e) => {
              /** Fill width on double-click */
              if (e.detail === 2) {
                const width = getMaxWidth();

                if (width) {
                  setSize({ height: size.height, width });
                }
              }
            }}
            position="right"
          />
        ),
      }}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      resizeRatio={2}
      {...props}
    >
      {children}
    </ResizableComponent>
  );
};
