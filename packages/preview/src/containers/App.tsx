import { Toaster } from 'react-hot-toast';
import {
  BlocksProvider,
  Layout,
  PreviewFrame,
  ConfigProvider,
  PreviewWrapper,
} from '../components';

export const App = () => {
  return (
    <BlocksProvider>
      <ConfigProvider>
        <Layout>
          <PreviewWrapper>
            <PreviewFrame />
          </PreviewWrapper>
        </Layout>
      </ConfigProvider>

      <Toaster />
    </BlocksProvider>
  );
};
