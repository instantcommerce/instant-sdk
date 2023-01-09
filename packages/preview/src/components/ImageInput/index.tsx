import { twMerge } from 'tailwind-merge';
import { inputBaseStyles, InputProps } from '../Input';
import { InputWrapper } from '../Input/InputWrapper';

export const ImageInput = ({
  className,
  labelClassName,
  onChange,
  defaultValue,
  value,
  id,
  name,
  ...props
}: InputProps) => {
  return (
    <InputWrapper
      {...props}
      labelClassName={twMerge('text-left', labelClassName)}
      id={id}
    >
      <div
        className={twMerge(
          inputBaseStyles,
          'overflow-hidden px-0 focus-within:outline focus-within:outline-2 focus-within:outline-primary-700 focus-within:border-transparent',
        )}
      >
        <span
          className="flex items-center justify-center px-3 h-full bg-gray-50 text-gray-500 select-none"
          id={`${id}-prefix`}
        >
          URL
        </span>

        <input
          id={id}
          name={name}
          type="url"
          className="w-full h-full appearance-none px-2 focus:outline-none"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          aria-describedby={`${id}-prefix`}
        />
      </div>
    </InputWrapper>
  );
};
