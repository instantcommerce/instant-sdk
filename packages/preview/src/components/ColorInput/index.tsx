import { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useClickAway } from 'react-use';
import { twJoin, twMerge } from 'tailwind-merge';
import { inputBaseStyles } from '../Input';
import {
  InputWrapper,
  InputWrapperProps,
  splitInputProps,
} from '../Input/InputWrapper';

interface ColorInputProps {
  defaultValue?: string;
  onChange(value: string): void;
}

export const ColorInput = ({
  className,
  defaultValue = '#000000',
  labelClassName,
  onChange,
  ...props
}: InputWrapperProps & ColorInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [showPicker, setShowPicker] = useState(false);
  const { wrapperProps } = splitInputProps(props);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowPicker(false);
  });

  return (
    <div className="relative w-full z-50">
      {showPicker && (
        <div
          ref={ref}
          className={twJoin(
            'absolute w-[max-content]',
            props?.direction === 'row' ? 'top-10 right-0' : 'left-0 top-[70px]',
          )}
        >
          <SketchPicker
            onChange={(newColor: any) => {
              setValue(newColor.hex);
              onChange(newColor.hex as string);
            }}
            color={value}
          />
        </div>
      )}

      <InputWrapper
        {...wrapperProps}
        labelClassName={twMerge('text-left', labelClassName)}
      >
        <button
          onClick={() => {
            if (!showPicker) {
              setShowPicker(true);
            }
          }}
          onFocus={() => {
            if (!showPicker) {
              setShowPicker(true);
            }
          }}
          className={twMerge(
            twJoin(
              inputBaseStyles,
              'flex px-0 h-8 overflow-hidden z-50 w-full',
              showPicker &&
                'outline outline-1 outline-primary-700 border-primary-700',
            ),
            className,
          )}
          id={props.id}
        >
          <div
            className="w-8 h-full shrink-0"
            style={{ backgroundColor: value }}
          />

          <span className="flex items-center px-3 w-full h-full">
            {value?.toUpperCase()}
          </span>
        </button>
      </InputWrapper>
    </div>
  );
};
