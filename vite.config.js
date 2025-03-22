import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/client',
  build: {
    outDir: '../../public',
    emptyOutDir: false,
  },
  server: {
    proxy: {
      '/sitemap': 'http://localhost:4000',
      '/health': 'http://localhost:4000'
    }
  }
});