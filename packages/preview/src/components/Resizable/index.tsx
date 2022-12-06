import { ReactNode, useEffect, useRef, useState } from 'react';
import { Resizable as ResizableComponent, ResizableProps } from 're-resizable';
import { useConfig } from '../ConfigProvider';
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
  const isInitialSizing = useRef(true);
  const [size, setSize] = useState(defaultSize);
  const { setWidth, setHeight } = useConfig();

  const getMaxWidth = () =>
    Math.floor(
      (document.querySelector('#preview-wrapper')?.getBoundingClientRect?.()
        ?.width || 0) - 24,
    );

  const getMaxHeight = () =>
    Math.floor(
      (document.querySelector('#preview-wrapper')?.getBoundingClientRect?.()
        ?.height || 0) -
        (document.querySelector('#preview-top-bar')?.getBoundingClientRect?.()
          ?.height || 0) -
        16,
    );

  useEffect(() => {
    if (sizeProp) {
      if (
        isInitialSizing.current &&
        size.height === IFRAME_DEFAULT_SIZE.height &&
        size.width === IFRAME_DEFAULT_SIZE.width
      ) {
        isInitialSizing.current = false;

        const width = getMaxWidth();
        const height = getMaxHeight();

        if (width && height) {
          setSize({ width, height });
          setWidth(`${width}`);
          setHeight(`${height}`);
        }
      } else {
        setSize(sizeProp);
      }
    }
  }, [sizeProp?.width, sizeProp?.height]);

  const handleClassName = darkMode
    ? 'bg-white opacity-30 transition-opacity group-hover:opacity-60 group-active:opacity-60'
    : 'bg-gray-400 transition-colors group-hover:bg-gray-600 group-active:bg-gray-600';

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
      resizeRatio={{ x: 2 }}
      {...props}
    >
      {children}
    </ResizableComponent>
  );
};
