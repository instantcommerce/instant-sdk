import { InputHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from './InputWrapper';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputWrapperProps;

export const inputBaseStyles =
  'rounded flex items-center transition-colors text-xs text-gray-800 h-8 px-3 border border-gray-300 w-full';

export const Input = ({ className, ...props }: InputProps) => {
  const generatedId = useId();
  const id = props?.id || generatedId;

  return (
    <InputWrapper id={id} {...props}>
      <input
        id={id}
        className={twMerge(inputBaseStyles, className)}
        {...props}
      />
    </InputWrapper>
  );
};
