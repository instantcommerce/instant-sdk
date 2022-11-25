import { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props extends TooltipPrimitive.TooltipProps {
  content: ReactNode;
}

export const Tooltip = ({ children, content, ...props }: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Content
          side="bottom"
          sideOffset={8}
          align="center"
          className="flex items-center justify-center bg-white rounded shadow-md px-2 h-8 border-gray-200 border-[0.5px] radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade"
        >
          <span className="block text-xs leading-none text-gray-700 dark:text-gray-100">
            {content}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
