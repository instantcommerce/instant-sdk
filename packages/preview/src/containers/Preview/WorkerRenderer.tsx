import {
  useMemo,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  startTransition,
  useCallback,
} from 'react';
import type { RemoteChannel } from '@remote-ui/core';
import {
  createRemoteReceiver,
  RemoteRenderer,
  createController,
} from '@remote-ui/react/host';
import { createEndpoint, fromInsideIframe } from '@remote-ui/rpc';
import { createWorkerFactory, expose, terminate } from '@shopify/web-worker';
import { BlockContextValue } from 'instant-client/src/BlockProvider/context';
import { SchemaTypes } from '../../components/BlocksProvider/context';

import { previewSchema } from './previewSchema';
import sandbox from './sandbox?worker&url';

const BLOCK_SERVER = import.meta.env.DEV
  ? 'http://127.0.0.1:5173'
  : window.__INSTANT_BLOCK_SERVER__;

const COMPONENTS = {};
const CONTROLLER = createController(COMPONENTS, { strictComponents: false });

/**
 * We resolve the proper sandbox worker inside createMessenger so it also works
 * in build version
 */
const createWorker = createWorkerFactory<{
  render: (channel: RemoteChannel, blockProps: BlockContextValue) => void;
  run: (script: string, channel: RemoteChannel) => void;
}>('');

const getWorkerScript = (url: string) =>
  new URL(url, import.meta.url).toString();

const useWorker = (create: typeof createWorker) => {
  const [value] = useState(() => {
    return create({
      createMessenger() {
        const worker = new Worker(sandbox, {
          type: 'module',
        });

        return worker;
      },
    });
  });
  const workerRef = useRef<typeof value | undefined>();
  const { current: worker } = workerRef;

  useLayoutEffect(() => {
    workerRef.current = value;

    return () => {
      workerRef.current = undefined;
      terminate(worker);
    };
  }, [worker]);

  return value;
};

const sheetsMap = new Map<string, HTMLStyleElement | undefined>();

const previewEndpoint = createEndpoint<{
  cartAddLine: any;
  cartUpdateLines: any;
  toastCreate: any;
  toastDismissAll: any;
  toastRemoveAll: any;
}>(fromInsideIframe());

/** Don't crash if not in iframe (preview by itself) */
const call =
  window.parent !== window
    ? previewEndpoint.call
    : (new Proxy({}, { get: () => () => {} }) as typeof previewEndpoint.call);

/** Mock Instant window object */
(window as any).Instant = {
  cart: {
    addLine: call.cartAddLine,
    lines: [],
    updateLines: call.cartUpdateLines,
  },
  customer: null,
  request: {
    country: 'NL',
    locale: 'nl',
  },
  Toast: {
    create: call.toastCreate,
    dismissAll: call.toastDismissAll,
    removeAll: call.toastRemoveAll,
  },
};

interface WorkerRendererProps {
  store?: any;
}

export function WorkerRenderer({ store }: WorkerRendererProps) {
  const [isRegistered, setRegistered] = useState(false);
  const [contentSchema, setContentSchema] = useState<any>();
  const [customizerSchema, setCustomizerSchema] = useState<any>();
  const [previewValues, setPreviewValues] =
    useState<Record<SchemaTypes, Record<string, string>>>();

  const receiver = useMemo(() => createRemoteReceiver(), []);
  const worker = useWorker(createWorker);

  const blockPath = new URLSearchParams(window.location.search).get('block');

  useEffect(() => {
    setRegistered(false);

    startTransition(() => {
      if (worker) {
        expose(worker, {
          addSchemas: (contentSchema: any, customizerSchema: any) => {
            if (window.parent) {
              window.parent.postMessage({
                type: 'addSchemas',
                block: blockPath,
                contentSchema,
                customizerSchema,
              });
            }

            setContentSchema(contentSchema);
            setCustomizerSchema(customizerSchema);

            setRegistered(true);
          },
          updateStyle: (id: string, content: string) => {
            let style = sheetsMap.get(id);

            if (!style) {
              style = document.createElement('style');
              style.setAttribute('type', 'text/css');
              style.setAttribute('data-vite-dev-id', id);
              style.innerHTML = content;
              document.head.appendChild(style);
            } else {
              style.innerHTML = content;
            }
            sheetsMap.set(id, style);
          },
          removeStyle: (id: string) => {
            const style = sheetsMap.get(id);
            if (style) {
              document.head.removeChild(style);
              sheetsMap.delete(id);
            }
          },
          reload: () => {
            window.location.reload();
          },
        });

        try {
          worker.run(
            getWorkerScript(`${BLOCK_SERVER}/${blockPath}`),
            receiver.receive,
          );
        } catch (e) {
          if (import.meta.env.DEV) {
            console.log(e);
          }
        }
      }
    });
  }, [worker, receiver]);

  const contentData = useMemo(
    () =>
      contentSchema
        ? previewSchema('content', contentSchema, previewValues)
        : {},
    [contentSchema, previewValues],
  );

  const customizerData = useMemo(
    () =>
      customizerSchema
        ? previewSchema('customizer', customizerSchema, previewValues)
        : {},
    [customizerSchema, previewValues],
  );

  useEffect(() => {
    if (isRegistered) {
      try {
        worker.render(receiver.receive, {
          content: contentData,
          customizations: customizerData,
          instantObject: (window as any).Instant,
          store: store || {
            storefront: {
              config: {
                theme: {
                  colors: {
                    primary: {
                      s50: '#F5FAFF',
                      s100: '#EFF8FF',
                      s200: '#D1E9FF',
                      s300: '#84CAFF',
                      s400: '#53B1FD',
                      s500: '#2E90FA',
                      s600: '#1570EF',
                      s700: '#175CD3',
                      s800: '#1849A9',
                      s900: '#0F2C60',
                    },
                    grayscale: {
                      s50: '#FAFAFA',
                      s100: '#F4F4F5',
                      s200: '#E4E4E7',
                      s300: '#D4D4D8',
                      s400: '#A1A1AA',
                      s500: '#71717A',
                      s600: '#52525B',
                      s700: '#3F3F46',
                      s800: '#27272A',
                      s900: '#18181B',
                    },
                    text: 'LIGHT',
                  },
                },
              },
            },
          },
        });
      } catch (e) {
        if (import.meta.env.DEV) {
          console.log(e);
        }
      }
    }
  }, [isRegistered, contentData, customizerData, receiver, worker]);

  const onMessage = useCallback((message: MessageEvent<any>) => {
    if (message.isTrusted) {
      if (message.data?.type === 'updatePreviewValues') {
        console.log(message.data.previewValues);
        setPreviewValues(message.data.previewValues);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  });

  return <RemoteRenderer receiver={receiver} controller={CONTROLLER} />;
}
