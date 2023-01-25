import instantSdk from '@instantcommerce/vite-plugin-sdk';
import react from '@vitejs/plugin-react';
import externalGlobals from 'rollup-plugin-external-globals';
import { InlineConfig, mergeConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
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
          jsxRuntime: mode === 'development' ? 'classic' : 'automatic',
        }),
        ...(mode === 'development'
          ? [
              viteExternalsPlugin({
                react: 'React',
                'react-dom': 'ReactDOM',
              }),
            ]
          : [
              externalGlobals({
                react: 'React',
                'react-dom': 'ReactDOM',
              }),
            ]),
        instantSdk({
          blockIdsMap,
          entry,
        }) as any,
      ],
      build: {
        rollupOptions: {
          external: ['react', 'react-dom'],
        },
      },
    } as InlineConfig,
    overrides || {},
  );
};
