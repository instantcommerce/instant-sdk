import { Fragment, useId, useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDown, CaretUp } from 'phosphor-react';
import { twMerge } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from '../Input/InputWrapper';

type Option = {
  value: string;
  label?: string;
};

interface SelectProps extends SelectPrimitive.SelectProps {
  itemClassName?: string;
  options: (Option | string)[] | (Option | string)[][];
  placeholder?: string;
  variant?: 'dark' | 'light';
  onChange?(value: string): void;
}

export const Select = ({
  className,
  wrapperClassName,
  labelClassName,
  itemClassName,
  options,
  placeholder,
  variant = 'light',
  direction,
  label,
  onChange,
  id: idProp,
  ...props
}: SelectProps & InputWrapperProps) => {
  const [open, setOpen] = useState(!!props?.defaultOpen);
  const generatedId = useId();
  const id = idProp || generatedId;

  const triggerStylesByVariant = {
    light:
      'text-gray-600 hover:bg-primary-100 focus:bg-primary-100 bg-white border border-gray-200',
    dark: 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:bg-gray-700 border border-gray-800',
  };

  const contentStylesByVariant = {
    light: 'bg-white border-gray-100',
    dark: 'bg-gray-800 border-gray-800',
  };

  const textStylesByVariant = {
    light:
      'text-gray-600 hover:bg-primary-100 hover:text-primary-700 focus:text-primary-700',
    dark: 'text-gray-200 hover:bg-gray-700',
  };

  const scrollButtonClassName = `${
    variant === 'light' ? 'text-gray-600' : 'text-gray-200'
  } flex items-center justify-center`;

  // @HELP IDK WHAT I'M DOING WRONG HERE :sob
  // @ts-ignore
  const groups: (Option | string)[][] | [] = Array.isArray(options?.[0])
    ? options
    : !!options.length && Array.isArray(options)
    ? [options]
    : [];

  return (
    <InputWrapper
      className={wrapperClassName}
      label={label}
      labelClassName={labelClassName}
      direction={direction}
      id={id}
    >
      <SelectPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        onValueChange={onChange}
        disabled={!options?.length}
        {...props}
      >
        <SelectPrimitive.Trigger
          asChild
          aria-label={label || 'Select an option'}
          id={id}
        >
          <button
            className={twMerge(
              `text-xs font-medium flex items-center gap-2 p-2 border rounded w-full h-8 content-between [&_span]:text-ellipsis [&_span]:overflow-hidden [&_span]:whitespace-nowrap shadow-sm`,
              triggerStylesByVariant[variant],
              className,
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />

            <SelectPrimitive.Icon asChild>
              <div
                className={`${
                  open ? '-rotate-180' : 'rotate-0'
                } transition-transform duration-200 w-3 ml-auto`}
              >
                <CaretDown size={16} />
              </div>
            </SelectPrimitive.Icon>
          </button>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={twMerge(
              'py-2 border z-50',
              contentStylesByVariant[variant],
            )}
          >
            <SelectPrimitive.ScrollUpButton className={scrollButtonClassName}>
              <CaretUp size={16} />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport>
              {groups?.map((groupItems, idx) => (
                <Fragment key={`select-${id}-${idx}`}>
                  <SelectPrimitive.Group>
                    {groupItems?.map((item, i) => (
                      <SelectPrimitive.Item
                        key={`${
                          typeof item === 'string' ? item : item?.value
                        }-${i}`}
                        value={typeof item === 'string' ? item : item?.value}
                        className={twMerge(
                          'text-xs hover:outline-none focus:outline-none focus:font-medium px-2 py-1.5 cursor-pointer radix-disabled:opacity-50 select-none',
                          textStylesByVariant[variant],
                          itemClassName,
                        )}
                      >
                        <SelectPrimitive.ItemText>
                          {typeof item === 'string'
                            ? item
                            : item?.label || item?.value}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Group>

                  {idx < groups?.length - 1 && (
                    <SelectPrimitive.Separator
                      className={twMerge(
                        'w-full h-[1px] my-2',
                        variant === 'light' ? 'bg-gray-200' : 'bg-gray-600',
                      )}
                    />
                  )}
                </Fragment>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className={scrollButtonClassName}>
              <CaretDown size={16} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </InputWrapper>
  );
};
