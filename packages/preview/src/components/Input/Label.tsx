import * as LabelPrimitive from '@radix-ui/react-label';
import { twMerge } from 'tailwind-merge';

export const Label = ({
  className,
  children,
  ...props
}: LabelPrimitive.LabelProps) => (
  <LabelPrimitive.Root
    className={twMerge('text-xs text-gray-500 font-medium', className)}
    {...props}
  >
    {children}
  </LabelPrimitive.Root>
);
