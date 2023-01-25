import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { createEndpoint, fromInsideIframe } from '@remote-ui/rpc';
import { ErrorBoundary } from 'react-error-boundary';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';
import { SchemaTypes } from '../../components/BlocksProvider/context';
import { createRemoteReactComponent } from './components';
import { previewSchema } from './previewSchema';

const BLOCK_SERVER = import.meta.env.DEV
  ? 'http://127.0.0.1:5173'
  : window.__INSTANT_BLOCK_SERVER__;

const getBlockScript = (url: string) =>
  new URL(url, import.meta.url).toString();

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

(window as any).__internal_create_remote_component = createRemoteReactComponent;

(window as any).updateStyle = (id: string, content: string) => {
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
};

(window as any).removeStyle = (id: string) => {
  const style = sheetsMap.get(id);
  if (style) {
    document.head.removeChild(style);
    sheetsMap.delete(id);
  }
};

(window as any).reload = () => {
  window.location.reload();
};

/** Wrap Promise for React Suspense */
const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending';
  let result: any;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

const getBlock = (blockPath: string) =>
  wrapPromise(
    new Promise(async (resolve, reject) => {
      try {
        const blockUrl = getBlockScript(`${BLOCK_SERVER}/${blockPath}`);
        const block = await import(blockUrl);

        resolve(block.default);
      } catch (err) {
        reject(err);
      }
    }),
  );

const BLOCK_CACHE = new Map<string, ReturnType<typeof getBlock>>();

const useLoadBlock = (blockPath?: string | null) => {
  const loader = blockPath
    ? BLOCK_CACHE.get(blockPath) ||
      BLOCK_CACHE.set(blockPath, getBlock(blockPath)).get(blockPath)
    : null;
  const block = loader?.read() || null;

  if (!blockPath) {
    return null;
  }

  return block;
};

const Renderer = ({ store }: { store: any }) => {
  const blockPath = new URLSearchParams(window.location.search).get('block');

  const block = useLoadBlock(blockPath);
  const [contentSchema, setContentSchema] = useState<DefineContentSchema>();
  const [customizerSchema, setCustomizerSchema] =
    useState<DefineCustomizerSchema>();
  const [previewValues, setPreviewValues] =
    useState<Record<SchemaTypes, Record<string, string>>>();

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
    if (block) {
      if (window.parent) {
        window.parent.postMessage({
          type: 'addSchemas',
          block: blockPath,
          contentSchema: block.contentSchema,
          customizerSchema: block.customizerSchema,
        });
      }

      setContentSchema(block.contentSchema);
      setCustomizerSchema(block.customizerSchema);
    }
  }, [block]);

  const onMessage = useCallback(
    (message: MessageEvent<any>) => {
      if (message.isTrusted) {
        if (message.data?.type === 'updatePreviewValues') {
          setPreviewValues(message.data.previewValues);
        }
      }
    },
    [setPreviewValues],
  );

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [onMessage]);

  if (!block) {
    return null;
  }

  return block.render({
    content: contentData,
    customizer: customizerData,
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
};

export const BlockRenderer = ({ store }: { store: any }) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <div>
          <b>Error running block:</b>
          <div style={{ marginTop: '16px', marginBottom: '32px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'black',
                color: '#EEE',
              }}
            >
              <code>{error.message}</code>
            </div>
          </div>
          Check the console for errors.
          <div style={{ marginTop: '8px' }}>
            <a
              href="#"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </a>
          </div>
        </div>
      )}
    >
      <Suspense>
        <Renderer store={store} />
      </Suspense>
    </ErrorBoundary>
  );
};
