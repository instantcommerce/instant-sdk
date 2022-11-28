import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { twJoin, twMerge } from 'tailwind-merge';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'gray' | 'white' | 'dark' | 'primary' | 'secondary' | 'unstyled';
  iconOnly?: boolean;
  className?: string;
  to?: LinkProps['to'];
}

export const Button = forwardRef(
  (
    {
      className,
      variant = 'gray',
      iconOnly,
      children,
      ...props
    }: ComponentPropsWithoutRef<'a'> & ButtonProps,
    ref,
  ) => {
    const stylesByVariant = {
      gray: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:bg-gray-200',
      white: 'bg-white text-gray-900 hover:bg-primary-100 focus:bg-primary-100',
      dark: 'bg-gray-800 text-gray-200 hover:bg-gray-900 focus:bg-gray-900',
      primary:
        'bg-primary-600 border border-primary-500 text-white hover:bg-primary-700 focus:bg-primary-700',
      secondary:
        'bg-white border border-gray-300 text-gray700 hover:bg-primary-100 focus:bg-primary-100',
      unstyled: 'px-0',
    };

    const Component = props.href ? 'a' : props.to ? Link : 'button';

    return (
      // @ts-ignore
      <Component
        ref={ref as any}
        className={twMerge(
          twJoin(
            stylesByVariant[variant],
            iconOnly && 'w-[30px] justify-center',
            'h-[30px] px-1.5 rounded flex items-center gap-[2px] transition-colors text-xs',
          ),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
