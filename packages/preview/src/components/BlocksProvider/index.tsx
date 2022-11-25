import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  const [blocksManifest, setBlocksManifest] = useState(
    window.__INSTANT_BLOCKS_MANIFEST__,
  );
  const [selectedBlock, setSelectedBlock] = useState<string | null>(
    (blocksManifest ? Object.keys(blocksManifest)?.[0] : null) || null,
  );
  const [previewValues, setPreviewValues] = useState<
    Record<string, Record<SchemaTypes, Record<string, string>>>
  >({});

  const onMessage = useCallback((message: MessageEvent<any>) => {
    if (message.isTrusted) {
      if (message.data?.type === 'addSchemas') {
        if (message.data?.block in blocksManifest) {
          setBlocksManifest({
            ...blocksManifest,
            [message.data.block]: {
              ...blocksManifest[message.data.block],
              contentSchema: message.data.contentSchema,
              customizerSchema: message.data.customizerSchema,
            },
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const reloadPreview = useCallback(() => {
    if (previewRef.current) {
      previewRef.current.src = `${previewRef.current.src}`;
    }
  }, [previewRef, previewValues, selectedBlock]);

  const sendPreviewValuesUpdate = useCallback(() => {
    if (previewRef.current?.contentWindow && selectedBlock) {
      previewRef.current.contentWindow.postMessage({
        type: 'updatePreviewValues',
        previewValues: previewValues[selectedBlock],
      });
    }
  }, [previewRef, previewValues, selectedBlock]);

  const onPreviewRef = useCallback((node: HTMLIFrameElement) => {
    previewRef.current = node;

    sendPreviewValuesUpdate();
  }, []) as unknown as typeof previewRef;

  const setPreviewValue = useCallback(
    (schema: SchemaTypes, name: string, value: string) => {
      if (selectedBlock) {
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
