import { useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { getStore } from '../../lib/getStore';
import { BlockRenderer } from './BlockRenderer';
import { Head } from './Head';

window.React = React;
window.ReactDOM = {
  ...ReactDOM,
  ...ReactDOMClient,
};

const Preview = () => {
  const [error, setError] = useState('');
  const [store, setStore] = useState<any>();

  const { selectedStore } = useMemo(() => {
    const search = new URLSearchParams(window.location.search);

    return {
      selectedStore: search.get('store'),
    };
  }, [window.location.search]);

  const loadStore = async () => {
    setError('');

    if (selectedStore) {
      try {
        const store = await getStore(new URL(`https://${selectedStore}`));
        setStore(store);
      } catch (err) {
        setError(
          err?.toString?.() || 'An error occurred loading the selected store',
        );
      }
    } else {
      setStore(null);
    }
  };

  useEffect(() => {
    loadStore();
  }, [selectedStore]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (typeof store === 'undefined') {
    return null;
  }

  return (
    <HelmetProvider>
      <Head store={store} />

      <BlockRenderer store={store} />
    </HelmetProvider>
  );
};

ReactDOMClient.createRoot(document.getElementById('root')!).render(<Preview />);
