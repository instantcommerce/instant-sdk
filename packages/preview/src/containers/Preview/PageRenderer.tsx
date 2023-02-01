import { useEffect, useRef, useState } from 'react';

import './style.css';

let pinger: NodeJS.Timeout | null = null;

const url = 'http://127.0.0.1:3000';

export const PageRenderer = ({
  blockUrl,
  customizerData,
  store,
}: {
  blockUrl: string;
  customizerData: any;
  store: any;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasPonged, setHasPonged] = useState(false);

  const handleMessage = (event: any) => {
    const urlIsTrusted =
      (event.origin.includes(import.meta.env.VITE_SF_PREVIEW_URL) ||
        event.origin.includes(import.meta.env.VITE_ADMIN_DOMAIN)) &&
      event.isTrusted;

    const isMessageAllowed = import.meta.env.DEV || urlIsTrusted;

    if (isMessageAllowed) {
      if (event.data?.type === 'pong') {
        if (pinger) {
          clearTimeout(pinger);
        }

        setHasPonged(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const tryPinging = () => {
    if (hasLoaded && !hasPonged) {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: 'ping',
        },
        url,
      );

      pinger = setTimeout(tryPinging, 1000);
    }
  };

  useEffect(() => {
    tryPinging();
  }, [hasLoaded]);

  useEffect(() => {
    if (hasPonged) {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: 'sdkBlock',
          blockUrl,
          customizerData,
        },
        url,
      );
    }
  }, [hasPonged, customizerData]);

  return (
    <iframe
      ref={iframeRef}
      onLoad={() => {
        setHasLoaded(true);
      }}
      title="Page preview"
      src="http://127.0.0.1:3000/products/training-long-sleeve-crop-top?variant=42907914404010"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
};
