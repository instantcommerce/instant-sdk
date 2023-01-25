import { useCallback, useRef } from 'react';
import { createEndpoint, Endpoint, fromIframe } from '@remote-ui/rpc';
import toast from 'react-hot-toast';
import { useBlocks } from './BlocksProvider';
import { useConfig } from './ConfigProvider';

export const PreviewFrame = () => {
  const endpoint = useRef<Endpoint<any>>();
  const { blocksManifest, selectedBlock, previewRef } = useBlocks();
  const { selectedStore } = useConfig();

  const isLegacy =
    selectedBlock && blocksManifest?.[selectedBlock]?.version === 1;

  const registerCall = (...args: any[]) => {
    console.log('Function called:', ...args);

    toast(`Function called: ${args[0]}`, {
      position: 'bottom-center',
    });
  };

  const onPreviewRef = useCallback((node: HTMLIFrameElement) => {
    (previewRef as any)(node);

    endpoint.current = createEndpoint(fromIframe(node));

    endpoint.current.expose({
      cartAddLine: registerCall.bind(this, 'cart.addLine'),
      cartUpdateLines: registerCall.bind(this, 'cart.updateLines'),
      toastCreate: registerCall.bind(this, 'Toast.create'),
      toastDismissAll: registerCall.bind(this, 'Toast.dismissAll'),
      toastRemoveAll: registerCall.bind(this, 'Toast.removeAll'),
    });
  }, []) as unknown as typeof previewRef;

  if (!selectedBlock) {
    return <div className="leading-5">No block selected.</div>;
  }

  return (
    <iframe
      className="h-full w-full"
      src={`/preview.html?${new URLSearchParams({
        block: selectedBlock,
        store: selectedStore?.hostname || '',
        ...(isLegacy ? { version: 1 } : ({} as any)),
      }).toString()}`}
      title="Preview"
      ref={onPreviewRef}
      sandbox="allow-same-origin allow-scripts"
    />
  );
};
