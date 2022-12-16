import { ChangeEvent, InputHTMLAttributes, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  InputWrapper,
  InputWrapperProps,
  splitInputProps,
} from './InputWrapper';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputWrapperProps & { decimals?: number };

export const inputBaseStyles =
  'rounded flex items-center transition-colors text-xs text-gray-800 h-8 px-3 border border-gray-200 w-full';

export const Input = ({ className, decimals, ...props }: InputProps) => {
  const generatedId = useId();
  const id = props?.id || generatedId;
  const { wrapperProps, inputProps } = splitInputProps({ ...props, id });

  const [value, setValue] = useState(inputProps.defaultValue || '');

  const extraProps =
    props.type === 'number'
      ? {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            let newValue = e.target.valueAsNumber;

            if (inputProps.min) {
              newValue = Math.max(Number(inputProps.min), newValue);
            }
            if (inputProps.max) {
              newValue = Math.min(Number(inputProps.max), newValue);
            }

            const valueAsString = newValue.toFixed(decimals || 0);

            setValue(valueAsString);
          },
          step: decimals ? 0.1 ** decimals : 1,
          value,
        }
      : {};

  return (
    <InputWrapper {...wrapperProps}>
      <input
        className={twMerge(inputBaseStyles, className)}
        {...inputProps}
        {...extraProps}
      />
    </InputWrapper>
  );
};
