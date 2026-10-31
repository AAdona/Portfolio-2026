import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  build: {
    // PREVIEW=1 inlines fonts and images so the site can be bundled into one file.
    assetsInlineLimit: process.env.PREVIEW ? 100_000_000 : 4096,
  },
});
