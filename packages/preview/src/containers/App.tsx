import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import {
  BlocksProvider,
  Layout,
  PreviewFrame,
  ConfigProvider,
} from '../components';
import { StoreProvider } from '../components/StoreProvider';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onReset={() => {
        location.reload();
      }}
    >
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider>
            <StoreProvider>
              <BlocksProvider>
                <Layout>
                  <PreviewFrame />
                </Layout>

                <Toaster />
              </BlocksProvider>
            </StoreProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
