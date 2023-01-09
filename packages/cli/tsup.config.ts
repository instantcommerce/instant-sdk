import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  splitting: false,
  clean: true,
  dts: false,
  format: ['esm'],
  env: {
    NODE_ENV: 'production',
  },
  noExternal: ['types'],
});
