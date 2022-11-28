import { InputHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  InputWrapper,
  InputWrapperProps,
  splitInputProps,
} from './InputWrapper';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputWrapperProps;

export const inputBaseStyles =
  'rounded flex items-center transition-colors text-xs text-gray-800 h-8 px-3 border border-gray-200 w-full';

export const Input = ({ className, ...props }: InputProps) => {
  const generatedId = useId();
  const id = props?.id || generatedId;
  const { wrapperProps, inputProps } = splitInputProps({ ...props, id });

  return (
    <InputWrapper {...wrapperProps}>
      <input className={twMerge(inputBaseStyles, className)} {...inputProps} />
    </InputWrapper>
  );
};
