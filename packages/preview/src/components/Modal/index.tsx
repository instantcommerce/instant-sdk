import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';

interface ModalProps extends Dialog.DialogProps {
  trigger?: ReactNode;
  title?: string;
  className?: string;
}

export const Modal = ({
  trigger,
  title,
  className,
  children,
  ...props
}: ModalProps) => (
  <Dialog.Root {...props}>
    {!!trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

    <Dialog.Portal>
      <Dialog.Overlay className="bg-black fixed inset-0 z-50 opacity-40 animate-overlayShow" />

      <Dialog.Content className="bg-white rounded-lg fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-96 z-50 animate-contentShow">
        {!!title && (
          <Dialog.Title className="text-sm text-gray-700 font-semibold p-4">
            {title}
          </Dialog.Title>
        )}

        <div
          className={twMerge(
            'border-t border-gray-200 p-4 flex flex-col gap-2',
            className,
          )}
        >
          {children}
        </div>

        <Dialog.Close asChild>
          <Button
            iconOnly
            variant="unstyled"
            aria-label="Close"
            className="absolute right-3 top-3"
          >
            <X size={16} weight="bold" />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
