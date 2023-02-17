import { useState } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { twJoin, twMerge } from 'tailwind-merge';

interface Tab {
  title: string;
  value: string;
}

interface TabsProps extends TabsPrimitive.TabsProps {
  tabs: Tab[];
  content: any;
}

export const Tabs = ({ tabs, content, className, ...props }: TabsProps) => {
  const [value, setValue] = useState(tabs?.[0]?.value);

  return (
    <TabsPrimitive.Root
      value={
        tabs?.find((tab) => tab?.value === value) ? value : tabs?.[0]?.value
      }
      onValueChange={(v) => {
        setValue(v);
      }}
      {...props}
    >
      <TabsPrimitive.List
        className={twMerge('relative flex w-full gap-6 px-3', className)}
      >
        {tabs.map(({ title, value }) => (
          <TabsPrimitive.Trigger
            key={`tab-trigger-${value}`}
            value={value}
            className={twJoin(
              'group',
              'border-b border-b-transparent',
              'text-sm text-gray-600 font-medium',
              'radix-state-active:text-primary-600',
              'h-12 z-10 px-1 relative',
              'radix-state-active:after:absolute radix-state-active:after:bottom-[-1px] radix-state-active:after:left-1 radix-state-inactive:after:bg-gray-100 radix-state-active:after:bg-primary-600 radix-state-active:after:h-[1px] radix-state-active:after:w-[calc(100%-8px)]',
              'transition-colors radix-state-active:after:transition-colors',
              'focus-visible:radix-state-active:after:bg-primary-700',
            )}
          >
            {title}
          </TabsPrimitive.Trigger>
        ))}
        <hr className="h-[1px] w-full absolute bg-gray-100 bottom-0 left-0 z-0" />
      </TabsPrimitive.List>

      {tabs.map(({ value }) => (
        <TabsPrimitive.Content key={`tab-content-${value}`} value={value}>
          {content?.[value]}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};
