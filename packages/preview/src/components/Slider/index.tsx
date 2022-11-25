import { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from '../Input/InputWrapper';
import { Label } from '../Input/Label';

interface SliderProps extends SliderPrimitive.SliderProps {
  info?: string;
}

export const Slider = ({
  className,
  label,
  ...props
}: SliderProps & InputWrapperProps) => {
  const [value, setValue] = useState(props.defaultValue || 50);

  return (
    <InputWrapper {...props}>
      <div className="flex justify-between items-center mb-2">
        {!!label && <Label>{label}</Label>}

        <div className="bg-gray-200 rounded text-xs px-3 h-8 flex items-center justify-center text-gray-900">
          {value}%
        </div>
      </div>

      <SliderPrimitive.Root
        defaultValue={[50]}
        max={100}
        step={1}
        aria-label="value"
        className={twMerge(
          'relative flex h-5 w-full touch-none items-center',
          className,
        )}
        onValueChange={setValue as any}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-[2px] w-full grow rounded-full bg-gray-200 h-">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-secondary-600" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb
          className={cx(
            'block h-5 w-5 rounded-full bg-white border border-gray-200 shadow cursor-pointer',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-700',
          )}
        />
      </SliderPrimitive.Root>
    </InputWrapper>
  );
};
