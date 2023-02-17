import { useEffect, useRef, useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

import './style.css';

const TRUSTED_ORIGIN = 'instantcommerce.app';

let pinger: NodeJS.Timeout | null = null;
let loadingTimeout: NodeJS.Timeout | null = null;

export const PageRenderer = ({
  blockClassName,
  blockUrl,
  customizerData,
  store,
}: {
  blockClassName: string;
  blockUrl: string;
  customizerData: any;
  store: any;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadingTimedout, setLoadingTimedout] = useState(false);
  const [hasPonged, setHasPonged] = useState(false);

  const productHandle = new URLSearchParams(window.location.search).get(
    'product',
  );

  if (!productHandle) {
    throw new Error('Select a product to preview this block');
  }

  const url = import.meta.env.DEV
    ? 'http://127.0.0.1:3000'
    : `https://preview-${store?.slug}.${TRUSTED_ORIGIN}`;

  const handleMessage = (event: any) => {
    const urlIsTrusted =
      event.origin.includes(TRUSTED_ORIGIN) && event.isTrusted;

    const isMessageAllowed = import.meta.env.DEV || urlIsTrusted;

    if (isMessageAllowed) {
      if (event.data?.type === 'pong') {
        if (pinger) {
          clearTimeout(pinger);
          pinger = null;
        }
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          loadingTimeout = null;
        }

        setHasPonged(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    loadingTimeout = setTimeout(
      () => {
        if (!hasLoaded || !hasPonged) {
          if (pinger) {
            clearTimeout(pinger);
            pinger = null;
          }

          setLoadingTimedout(true);
        }
      },
      import.meta.env.DEV ? 120000 : 15000,
    );

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      if (pinger) {
        clearTimeout(pinger);
        pinger = null;
      }

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
          blockClassName,
          blockUrl,
          customizerData,
        },
        url,
      );
    }
  }, [hasPonged, customizerData]);

  return (
    <>
      {hasLoadingTimedout ? (
        <ErrorMessage error="Failed to load page preview" />
      ) : (
        <>
          {!hasPonged && <div role="status" className="loader" />}

          <iframe
            ref={iframeRef}
            onLoad={() => {
              setHasLoaded(true);
            }}
            onError={() => {
              setLoadingTimedout(true);
            }}
            title="Page preview"
            src={`${url}/products/${productHandle}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              opacity: !hasPonged ? '0' : '1',
            }}
          />
        </>
      )}
    </>
  );
};
