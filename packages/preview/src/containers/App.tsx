import { Toaster } from 'react-hot-toast';
import {
  BlocksProvider,
  Layout,
  PreviewFrame,
  ConfigProvider,
} from '../components';

export const App = () => {
  return (
    <BlocksProvider>
      <ConfigProvider>
        <Layout>
          <PreviewFrame />
        </Layout>
      </ConfigProvider>

      <Toaster />
    </BlocksProvider>
  );
};
