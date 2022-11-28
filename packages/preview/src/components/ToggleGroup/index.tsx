import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { twJoin, twMerge } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from '../Input/InputWrapper';

interface ToggleGroupProps
  extends ToggleGroupPrimitive.ToggleGroupImplSingleProps {
  options: string[];
}

export const ToggleGroup = ({
  options,
  wrapperClassName,
  className,
  ...props
}: Omit<InputWrapperProps, 'value'> & ToggleGroupProps) => (
  <InputWrapper className={wrapperClassName} {...props}>
    <ToggleGroupPrimitive.Root type="single" className="flex w-full" {...props}>
      {options?.map((item, idx) => (
        <ToggleGroupPrimitive.Item
          key={`toggle-item-${item}-${idx}`}
          value={item}
          aria-label={item}
          className={twMerge(
            twJoin(
              'flex-1 h-8 bg-white border border-gray-300 border-r-[0.5px] border-l-[0.5px] text-xs text-gray-700 px-2',
              idx === 0 && 'rounded-l border-l-[1px]',
              idx === options?.length - 1 && 'rounded-r border-r-[1px]',
              'group radix-state-on:bg-gray-300 radix-state-off:text-gray-400',
            ),
            className,
          )}
        >
          {item}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  </InputWrapper>
);
