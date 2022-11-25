import { LabelProps } from '@radix-ui/react-label';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Label } from './Label';

export interface InputWrapperProps extends LabelProps {
  wrapperClassName?: string;
  labelClassName?: string;
  label?: string;
  direction?: 'col' | 'row';
  info?: string;
}

export const InputWrapper = ({
  wrapperClassName,
  className,
  labelClassName,
  label,
  direction = 'col',
  info,
  id,
  children,
}: InputWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={twMerge(
          cx(
            'flex gap-2',
            direction === 'col' && 'flex-col',
            direction === 'row' && 'items-center justify-between',
          ),
          wrapperClassName,
          className,
        )}
      >
        {!!label && (
          <Label className={twMerge('flex-1', labelClassName)} htmlFor={id}>
            {label}
          </Label>
        )}

        <div className={cx(direction === 'row' && 'max-w-1', 'flex-1')}>
          {children}
        </div>
      </div>

      {!!info && (
        <span className="text-xs text-gray-500 leading-4">{info}</span>
      )}
    </div>
  );
};
