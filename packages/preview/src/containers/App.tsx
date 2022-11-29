import { Toaster } from 'react-hot-toast';
import {
  BlocksProvider,
  Layout,
  PreviewFrame,
  ConfigProvider,
} from '../components';

export const App = () => {
  return (
    <ConfigProvider>
      <BlocksProvider>
        <Layout>
          <PreviewFrame />
        </Layout>

        <Toaster />
      </BlocksProvider>
    </ConfigProvider>
  );
};
