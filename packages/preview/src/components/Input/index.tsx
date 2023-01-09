import { ChangeEvent, InputHTMLAttributes, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  InputWrapper,
  InputWrapperProps,
  splitInputProps,
} from './InputWrapper';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputWrapperProps & { fractionDigits?: number };

export const inputBaseStyles =
  'rounded flex items-center text-xs text-gray-800 h-8 px-3 border border-gray-200 w-full focus:outline focus:outline-1 focus:outline-primary-700 focus:border-primary-700';

export const Input = ({ className, fractionDigits, ...props }: InputProps) => {
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

            const valueAsString = newValue.toFixed(fractionDigits || 0);

            setValue(valueAsString);
          },
          step: fractionDigits ? 0.1 ** fractionDigits : 1,
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
