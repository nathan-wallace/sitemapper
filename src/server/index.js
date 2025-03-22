import express from 'express';
import { router as sitemapRouter } from './controllers/sitemapController.js';
import { router as healthRouter } from './controllers/healthController.js';
import { ensureDirectories } from './middleware/ensureDirectories.js';
import config from '../config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/cache', express.static(config.cacheDir));

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/results.html'));
});

app.use(ensureDirectories);
app.use('/sitemap', sitemapRouter);
app.use('/health', healthRouter);

app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});