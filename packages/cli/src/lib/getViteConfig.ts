import instantSdk from '@instantcommerce/vite-plugin-sdk';
import react from '@vitejs/plugin-react';
import { InlineConfig, mergeConfig } from 'vite';
import { dirname } from '~/config';

export const getViteConfig = async (
  mode = 'development',
  overrides?: Partial<InlineConfig>,
  blockIdsMap?: Record<string, Record<'id', string>>,
  entry?: string,
) => {
  return mergeConfig(
    {
      configFile: `${dirname}/vite.config.ts`,
      root: dirname,
      plugins: [
        react({
          fastRefresh: false,
          /** @todo investigate */
          jsxRuntime: mode === 'development' ? 'automatic' : 'classic',
        }),
        instantSdk({
          blockIdsMap,
          entry,
        }) as any,
      ],
    } as InlineConfig,
    overrides || {},
  );
};
