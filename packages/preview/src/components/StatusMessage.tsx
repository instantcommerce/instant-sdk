import { createElement } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from './Button';

interface StatusMessageProps {
  icon?: Parameters<typeof createElement>[0];
  title: string;
  description?: string;
  button?: { text: string } & Omit<ButtonProps, 'children'>;
  /** @default info */
  type?: 'info' | 'warning' | 'error';
}

const iconClassNames = {
  info: 'bg-primary-100 text-primary-600',
  warning: 'bg-warning-50 text-warning-500',
  error: 'bg-error-50 text-error-600',
};

export const StatusMessage = ({
  icon,
  title,
  description,
  button,
  type = 'info',
}: StatusMessageProps) => {
  const { text: buttonText, ...buttonProps } = button || ({} as any);

  return (
    <div className="flex flex-col items-center">
      {!!icon && (
        <div
          className={twMerge(
            'h-14 w-14 flex items-center justify-center rounded-full mb-5',
            iconClassNames[type],
          )}
        >
          {createElement<any>(icon, { size: 32 })}
        </div>
      )}

      <div className="flex flex-col items-center gap-3 max-w-[200px] text-center">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>

        {!!description && (
          <p className="text-xs text-gray-700">{description}</p>
        )}
      </div>

      {!!button && (
        <Button
          {...buttonProps}
          className={twJoin(
            buttonProps.className,
            'mt-6 text-sm h-auto text-primary-700',
          )}
          variant="unstyled"
        >
          {button.text}
        </Button>
      )}
    </div>
  );
};
