import cx from 'classnames';
import { twMerge } from 'tailwind-merge';
import { inputBaseStyles, InputProps } from '../Input';
import { InputWrapper } from '../Input/InputWrapper';

interface ColorInputProps {
  color: string;
}

export const ColorInput = ({
  className,
  color,
  ...props
}: InputProps & ColorInputProps) => (
  <InputWrapper {...props}>
    <div
      className={twMerge(
        cx(
          inputBaseStyles,
          'relative before:w-8 before:h-full before:bg-gray-300 before:left-0 before:top-0 px-0',
        ),
        className,
      )}
    >
      <span
        {...props}
        className="flex items-center px-3 w-full h-full outline-none"
      >
        {color}
      </span>
    </div>
  </InputWrapper>
);
