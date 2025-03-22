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
    // --- 🧪 DEVELOPMENT: use Vite as middleware ---
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
      root: path.resolve(__dirname, '../client'),
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = await vite.transformIndexHtml(url, 
          await vite.pluginContainer.load(url)
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (err) {
        vite.ssrFixStacktrace(err);
        next(err);
      }
    });
  } else {
    // --- 🏁 PRODUCTION: serve built static files ---
    const distPath = path.resolve(__dirname, '../../public');
    app.use(express.static(distPath));

    // Handle all non-API routes with the frontend
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
  }

  app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  });

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
}

startServer();
