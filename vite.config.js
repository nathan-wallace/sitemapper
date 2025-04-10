import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/client',
  build: {
    outDir: '../../public',
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
  },
  server: {
    proxy: {
      '/sitemap': 'http://localhost:3000',
      '/health': 'http://localhost:3000'
    }
  }
});