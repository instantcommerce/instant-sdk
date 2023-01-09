import { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { twMerge } from 'tailwind-merge';

interface Props extends TooltipPrimitive.TooltipProps {
  content: ReactNode;
  variant?: 'dark' | 'light';
}

export const Tooltip = ({
  children,
  content,
  variant = 'light',
  ...props
}: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Content
          side="bottom"
          sideOffset={8}
          align="center"
          className={twMerge(
            'flex items-center justify-center rounded shadow-md backdrop-blur-[1px] px-2 h-8 border-[0.5px] radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade',
            variant === 'light'
              ? 'bg-white/[.8] border-gray-200'
              : 'bg-gray-900/[.8] border-gray-800',
          )}
        >
          <span
            className={twMerge(
              'block text-xs leading-none',
              variant === 'light' ? 'text-black' : 'text-gray-200',
            )}
          >
            {content}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
