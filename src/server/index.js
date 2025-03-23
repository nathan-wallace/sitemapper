import express from 'express';
import { router as sitemapRouter } from './controllers/sitemapController.js';
import { router as healthRouter } from './controllers/healthController.js';
import { ensureDirectories } from './middleware/ensureDirectories.js';
import config from '../config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// Common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cache', express.static(config.cacheDir));
app.use('/sitemap', sitemapRouter);
app.use('/health', healthRouter);
app.use(ensureDirectories);

async function startServer() {
  if (!isProd) {
    // Development: Use Vite as middleware
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
      root: path.resolve(__dirname, '../client'),
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = await vite.transformIndexHtml(
          url,
          '<!DOCTYPE html><html><head><title>Sitemap Explorer</title></head><body><div id="app"></div><script type="module" src="/src/client/index.js"></script></body></html>' // Fallback template
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (err) {
        vite.ssrFixStacktrace(err);
        next(err);
      }
    });
  } else {
    // Production: Serve built static files
    const distPath = path.resolve(__dirname, '../../public');
    app.use(express.static(distPath, { index: false })); // Prevent default index serving

    // Serve index.html for all non-API routes
    app.get('*', (req, res, next) => {
      const apiRoutes = ['/sitemap', '/health', '/cache'];
      if (apiRoutes.some(route => req.path.startsWith(route))) {
        return next(); // Skip to next middleware for API routes
      }
      console.debug('Serving index.html for path:', req.path);
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
          console.error('Error serving index.html:', err);
          res.status(500).send('Server error');
        }
      });
    });
  }

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  });

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer();