import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { toast as toastLib, ToasterProps, ToastOptions } from 'react-hot-toast';

const classNames = (...args: (string | false)[]) =>
  args.filter((a) => !!a).join(' ');

export type toastProps = {
  message: string;
  duration?: number;
  type?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  variant?: 'default' | 'grey';
  shadow?: boolean;
  border?: boolean;
} & ToasterProps;

export const toast = ({
  message,
  type = 'info',
  size = 'md',
  variant = 'default',
  shadow = false,
  border = false,
  ...options
}: toastProps) =>
  toastLib.custom(
    (t) => {
      return (
        <ToastComponent
          message={message}
          type={type}
          size={size}
          variant={variant}
          shadow={shadow}
          border={border}
          persistent={false}
          visible={t.visible}
          onClose={() => {
            toastLib.dismiss(t.id);
          }}
        />
      );
    },
    {
      duration: 6000,
      position: 'bottom-right',
      ...options,
    },
  );

type ToastProps = {
  persistent?: boolean;
  visible?: boolean;
  onClose?(): void;
} & ToasterProps &
  toastProps;

const ToastComponent = ({
  message,
  type = 'info',
  size = 'md',
  variant = 'default',
  shadow = false,
  border = true,
  visible = true,
  persistent = true,
  onClose,
}: ToastProps) => {
  let theme: Record<string, any>;

  switch (type) {
    case 'error':
      theme = {
        color: 'error600',
        bg: 'error50',
        icon: XCircleIcon,
        borderColor: 'error100',
      };
      break;
    case 'info':
      theme = {
        color: 'primary600',
        bg: 'primary50',
        icon: ExclamationCircleIcon,
        borderColor: 'primary100',
      };
      break;
    case 'warning':
      theme = {
        color: 'warning600',
        bg: 'warning50',
        icon: XCircleIcon,
        borderColor: 'warning100',
      };
      break;
    default:
      theme = {
        color: 'success600',
        bg: 'success50',
        icon: CheckCircleIcon,
        borderColor: 'success100',
      };
  }

  return (
    <div
      className={classNames(
        `toast toast--${persistent ? 'persistent' : 'popup'}`,
        'flex gap-3 content-center justify-center rounded min-w-full sm:min-w-[320px]',
        size === 'md' ? 'p-5' : 'p-3',
        shadow && 'shadow-md',
        border && 'border',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        backgroundColor: variant === 'default' ? theme.bg : 'grey50',
        borderColor: border ? theme.borderColor : undefined,
      }}
    >
      <span className="icon text-2xl" style={{ color: theme.color }}>
        <theme.icon
          className="icon__svg toast__icon"
          focusable="false"
          aria-hidden="true"
          width="1em"
          height="1em"
        />
      </span>

      <p className="toast__message flex-1 text-sm">{message}</p>

      {!persistent && (
        <button onClick={onClose} className="toast__dismiss-button">
          <span className="icon text-2xl" style={{ color: 'grey900' }}>
            <XIcon
              className="icon__svg toast__dismiss-button-icon"
              focusable="false"
              aria-hidden="true"
              width="1em"
              height="1em"
            />
          </span>
        </button>
      )}
    </div>
  );
};

export const Toast = {
  create: ({
    message,
    type,
    position,
    duration,
    className,
    id,
    style,
  }: Pick<toastProps, 'message' | 'type' | 'position'> &
    Pick<
      ToastOptions,
      'className' | 'duration' | 'id' | 'style' | 'position'
    >) => {
    const toastId = toast({
      message,
      type,
      position,
      duration,
      toastOptions: {
        className,
        id,
        style,
      },
    });

    return {
      id: toastId,
      dismiss: () => {
        toastLib.dismiss(toastId);
      },
      remove: () => {
        toastLib.remove(toastId);
      },
    };
  },

  dismissAll: () => {
    toastLib.dismiss();
  },

  removeAll: () => {
    toastLib.remove();
  },
};
