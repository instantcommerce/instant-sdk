import { HTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import { LabelProps } from '@radix-ui/react-label';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Label } from './Label';

export type InputWrapperProps = {
  wrapperClassName?: string;
  labelClassName?: string;
  labelProps?: HTMLProps<HTMLLabelElement>;
  label?: string;
  direction?: 'col' | 'row';
  info?: string;
  children?: ReactNode;
} & Pick<LabelProps, 'htmlFor' | 'id' | 'className'>;

export const splitInputProps = (
  props: InputWrapperProps & InputHTMLAttributes<HTMLInputElement>,
) => {
  const {
    wrapperClassName,
    labelClassName,
    labelProps,
    label,
    direction,
    info,
    ...inputProps
  } = props;

  const wrapperProps = {
    wrapperClassName,
    labelClassName,
    labelProps,
    label,
    direction,
    info,
    id: props?.id,
  };
  return { inputProps, wrapperProps };
};

export const InputWrapper = ({
  wrapperClassName,
  className,
  labelClassName,
  labelProps,
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
          <Label
            className={twMerge('flex-1', labelClassName)}
            htmlFor={id}
            {...labelProps}
          >
            {label}
          </Label>
        )}

        <div
          className={direction === 'row' ? 'max-w-[60%] flex-[2]' : 'flex-1'}
        >
          {children}
        </div>
      </div>

      {!!info && (
        <span className="text-xs text-gray-500 leading-4">{info}</span>
      )}
    </div>
  );
};
