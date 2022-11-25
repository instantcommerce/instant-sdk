import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface HandleProps extends HTMLProps<HTMLDivElement> {
  position: 'top' | 'right' | 'bottom' | 'left';
}

export const Handle = ({ position, className, ...props }: HandleProps) => (
  <div
    className="group w-full h-full flex justify-center items-center"
    {...props}
  >
    <div
      className={twMerge(
        'bg-gray-400 rounded-full group-hover:bg-gray-600 group-active:bg-gray-600 transition-colors',
        className,
      )}
      style={{
        ...(position === 'left' || position === 'right'
          ? {
              width: '4px',
              height: '88px',
              maxHeight: '80%',
            }
          : {
              height: '4px',
              width: '88px',
              maxWidth: '80%',
            }),
      }}
    />
  </div>
);
