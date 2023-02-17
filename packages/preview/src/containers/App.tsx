import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import {
  BlocksProvider,
  Layout,
  PreviewFrame,
  ConfigProvider,
  StoreProvider,
} from '../components';

const queryClient = new QueryClient();

export const App = () => {
  return (
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
  );
};
