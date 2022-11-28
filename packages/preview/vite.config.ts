import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        preview: resolve(__dirname, 'preview.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, '../ui/src')}/`,
    },
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true,
  },
  optimizeDeps: {
    include: [
      '@remote-ui/core',
      '@remote-ui/react',
      '@shopify/web-worker/worker',
    ],
  },
});
