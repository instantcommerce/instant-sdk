import { useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { BlockRenderer } from './BlockRenderer';
import { getStore } from './getStore';
import { Head } from './Head';

window.React = React;

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

ReactDOM.createRoot(document.getElementById('root')!).render(<Preview />);
