import { Suspense, useCallback, useMemo, useState } from 'react';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';
import { SchemaTypes } from '../../components/BlocksProvider/context';
import { previewSchema } from './previewSchema';

const BLOCK_SERVER = import.meta.env.DEV
  ? 'http://127.0.0.1:5173'
  : window.__INSTANT_BLOCK_SERVER__;

const getWorkerScript = (url: string) =>
  new URL(url, import.meta.url).toString();

const sheetsMap = new Map<string, HTMLStyleElement | undefined>();

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

const getBlock = () =>
  wrapPromise(
    new Promise(async (resolve, reject) => {
      try {
        const blockPath = new URLSearchParams(window.location.search).get(
          'block',
        );
        const blockUrl = getWorkerScript(`${BLOCK_SERVER}/${blockPath}`);
        const block = await import(blockUrl);

        resolve(block.default);
      } catch (err) {
        reject(err);
      }
    }),
  );

const blockLoader = getBlock();

const useLoadBlock = () => {
  const [block] = useState(blockLoader.read());
  return block;
};

const BlockRenderer = ({ store }: { store: any }) => {
  const block = useLoadBlock();
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

  const onRef = useCallback(
    (wrapperRef: any) => {
      block.render(
        {
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
        },
        wrapperRef,
      );
    },
    [block],
  );

  return <div ref={onRef} />;
};

export const PortalRenderer = ({ store }: { store: any }) => {
  return (
    <Suspense>
      <BlockRenderer store={store} />
    </Suspense>
  );
};
