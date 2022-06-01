import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/users': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
      '/todos': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
      '/logout': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
