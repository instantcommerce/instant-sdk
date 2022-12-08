import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';
import { useConfig } from '../ConfigProvider';

import { BlocksContext, SchemaTypes } from './context';

export * from './useBlocks';

if (import.meta.env.DEV) {
  window.__INSTANT_BLOCKS_MANIFEST__ = {
    'src/blocks/CustomBlock/index.tsx': {
      name: 'CustomBlock',
    },
    'src/blocks/TestBlock/index.tsx': {
      name: 'TestBlock',
    },
  };
}

export const BlocksProvider = ({ children }: { children: ReactNode }) => {
  const { params } = useConfig();
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  const [blocksManifest, setBlocksManifest] = useState(
    window.__INSTANT_BLOCKS_MANIFEST__,
  );
  const [selectedBlock, setSelectedBlock] = useState<string | null>(
    (blocksManifest
      ? Object.entries(blocksManifest)?.find(
          (entry) => entry[1].name === params.block,
        )?.[0] || Object.keys(blocksManifest)?.[0]
      : null) || null,
  );
  const [previewValues, setPreviewValues] = useState<
    Record<string, Record<SchemaTypes, Record<string, string>>>
  >({});
  const isPreviewValuesDirty = useRef(false);

  const sendPreviewValuesUpdate = useCallback(() => {
    if (previewRef.current?.contentWindow && selectedBlock) {
      previewRef.current.contentWindow.postMessage({
        type: 'updatePreviewValues',
        previewValues: previewValues[selectedBlock],
      });
    }
  }, [previewRef, selectedBlock, previewValues]);

  const onMessage = useCallback(
    (message: MessageEvent<any>) => {
      if (message.isTrusted) {
        if (message.data?.type === 'addSchemas') {
          if (message.data?.block in blocksManifest) {
            const contentSchema = {
              ...(message.data.contentSchema || {}),
              fields: Object.entries(
                message.data.contentSchema?.fields || {},
              ).map(([name, field]: any) => ({
                ...field,
                name,
              })),
            };
            const customizerSchema = {
              ...(message.data.customizerSchema || {}),
              fields: Object.entries(
                message.data.customizerSchema?.fields || {},
              ).map(([name, field]: any) => ({
                ...field,
                name,
              })),
            };

            const newBlocksManifest = {
              ...blocksManifest,
              [message.data.block]: {
                ...blocksManifest[message.data.block],
                contentSchema,
                customizerSchema,
              },
            };

            setBlocksManifest(newBlocksManifest);

            if (!isPreviewValuesDirty.current) {
              setPreviewValues({
                ...previewValues,
                [message.data.block]: {
                  content: contentSchema?.fields?.reduce(
                    (
                      all: any,
                      current: DefineContentSchema['fields'][0] & {
                        name: string;
                      },
                    ) => {
                      all[current.name] = current.preview;
                      return all;
                    },
                    {} as any,
                  ),
                  customizer: customizerSchema?.fields?.reduce(
                    (
                      all: any,
                      current: DefineCustomizerSchema['fields'][0] & {
                        name: string;
                      },
                    ) => {
                      all[current.name] = current.preview;
                      return all;
                    },
                    {} as any,
                  ),
                },
              });
            } else {
              sendPreviewValuesUpdate();
            }
          }
        }
      }
    },
    [previewValues, sendPreviewValuesUpdate],
  );

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [onMessage]);

  const reloadPreview = useCallback(() => {
    if (previewRef.current) {
      previewRef.current.src = `${previewRef.current.src}`;
    }
  }, [previewRef, previewValues, selectedBlock]);

  const onPreviewRef = useCallback((node: HTMLIFrameElement) => {
    previewRef.current = node;
  }, []) as unknown as typeof previewRef;

  const setPreviewValue = useCallback(
    (schema: SchemaTypes, name: string, value: string) => {
      if (selectedBlock) {
        if (!isPreviewValuesDirty.current) {
          isPreviewValuesDirty.current = true;
        }

        setPreviewValues((currentPreviewValues) => ({
          ...currentPreviewValues,
          [selectedBlock]: {
            ...(currentPreviewValues[selectedBlock] || {}),
            [schema]: {
              ...(currentPreviewValues[selectedBlock]?.[schema] || {}),
              [name]: value,
            },
          },
        }));
      }
    },
    [selectedBlock],
  );

  useEffect(() => {
    sendPreviewValuesUpdate();
  }, [previewValues]);

  const contextValue = useMemo(() => {
    return {
      blocksManifest,
      previewRef: onPreviewRef,
      reloadPreview,
      selectedBlock,
      setSelectedBlock,
      setPreviewValue,
    };
  }, [
    blocksManifest,
    onPreviewRef,
    reloadPreview,
    selectedBlock,
    setSelectedBlock,
    setPreviewValue,
  ]);

  return (
    <BlocksContext.Provider value={contextValue}>
      {children}
    </BlocksContext.Provider>
  );
};
