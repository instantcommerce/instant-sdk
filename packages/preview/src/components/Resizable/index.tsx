import { ReactNode, useEffect, useState } from 'react';
import { Resizable as ResizableComponent, ResizableProps } from 're-resizable';
import { Handle } from './Handle';

export const Resizable = ({
  children,
  darkMode,
  enabled = true,
  defaultSize = { width: 300, height: 200 },
  size: sizeProp,
  ...props
}: {
  children: ReactNode;
  darkMode?: boolean;
  enabled?: boolean;
} & ResizableProps) => {
  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    if (sizeProp) {
      setSize(sizeProp);
    }
  }, [sizeProp]);

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
      className="mx-auto"
      maxWidth="100%"
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
                const height =
                  (document
                    .querySelector('#preview-wrapper')
                    ?.getBoundingClientRect?.()?.height || 0) -
                  (document
                    .querySelector('#preview-top-bar')
                    ?.getBoundingClientRect?.()?.height || 0) -
                  16;

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
                const width =
                  (document
                    .querySelector('#preview-wrapper')
                    ?.getBoundingClientRect?.()?.width || 0) - 16;

                if (width) {
                  setSize({ height: size.height, width });
                }
              }
            }}
            position="right"
          />
        ),
      }}
      enable={
        enabled
          ? {
              top: false,
              right: true,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: true,
              bottomLeft: false,
              topLeft: false,
            }
          : {
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }
      }
      resizeRatio={{ x: 2 }}
      {...props}
    >
      {children}
    </ResizableComponent>
  );
};