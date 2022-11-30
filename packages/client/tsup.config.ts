import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  env: {
    NODE_ENV: 'production',
  },
});
