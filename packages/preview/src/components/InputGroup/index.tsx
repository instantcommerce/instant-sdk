import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputGroupProps {
  title: string;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const InputGroup = ({
  title,
  children,
  className,
  wrapperClassName,
}: InputGroupProps) => (
  <div className={wrapperClassName}>
    <div className="flex items-center bg-gray-100 px-3 h-7 text-sm leading-5 font-bold">
      {title}
    </div>

    <div className={twMerge('flex flex-col gap-3 p-3', className)}>
      {children}
    </div>
  </div>
);
