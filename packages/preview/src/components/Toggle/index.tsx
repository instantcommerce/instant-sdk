import * as Switch from '@radix-ui/react-switch';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from '../Input/InputWrapper';

export const Toggle = ({
  className,
  wrapperClassName,
  ...props
}: InputWrapperProps & Switch.SwitchProps) => {
  return (
    <InputWrapper
      {...props}
      className={twMerge(
        'flex-row-reverse justify-start [&_label]:whitespace-nowrap w-fit',
        wrapperClassName,
        className,
      )}
    >
      <Switch.Root
        {...props}
        className={cx(
          'group',
          'radix-state-checked:bg-gray-600',
          'radix-state-unchecked:bg-gray-200 dark:radix-state-unchecked:bg-gray-800',
          'relative flex w-9 h-4 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700',
        )}
      >
        <Switch.Thumb
          className={cx(
            'group-radix-state-checked:translate-x-4',
            'group-radix-state-unchecked:translate-x-0',
            'pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white border border-gray-200 shadow transition duration-200 ease-in-out absolute top-1/2 -translate-y-1/2',
          )}
        />
      </Switch.Root>
    </InputWrapper>
  );
};
