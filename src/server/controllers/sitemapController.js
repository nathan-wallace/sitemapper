// src/server/controllers/sitemapController.js
import express from 'express';
import multer from 'multer';
import { fetchSitemap } from '../services/sitemapFetcher.js';
import { parseSitemapFromFile } from '../services/sitemapParser.js';
import { saveToCache, clearCache, loadFromCache, sitemapStore } from '../services/cacheManager.js';
import config from '../../config/config.js';

const router = express.Router();
const upload = multer({ dest: config.uploadDir });

router.post('/url', async (req, res) => {
  const { url } = req.body;
  console.log('Received URL:', url);
  if (!url || !url.match(/^https?:\/\//)) {
    console.log('Invalid URL:', url);
    return res.status(400).json({ error: 'Invalid URL: Must start with http:// or https://' });
  }
  try {
    const { urls, status } = await fetchSitemap(url);
    if (urls.size === 0) {
      console.log('No URLs found for:', url);
      return res.status(404).json({ error: status.message, status });
    }
    const urlArray = Array.from(urls).map((u) => JSON.parse(u));
    console.log(`URLs to cache: ${urlArray.length}`);
    const id = await saveToCache(urlArray);
    console.log(`Processed ${urlArray.length} URLs for ${url}`);
    res.json({ id, message: status.message, status });
  } catch (err) {
    console.error('Route /sitemap/url error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload', upload.single('sitemapFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const urls = await parseSitemapFromFile(req.file.path);
    const urlArray = Array.from(urls).map((u) => JSON.parse(u));
    const id = await saveToCache(urlArray);
    res.json({ id, message: `Uploaded sitemap with ${urlArray.length} URLs` });
  } catch (err) {
    console.error('Route /sitemap/upload error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/clear-cache', async (req, res) => {
  try {
    await clearCache();
    console.log('Cache cleared');
    res.json({ message: 'Cache cleared successfully' });
  } catch (err) {
    console.error('Clear cache error:', err.message);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

router.get('/results-data', async (req, res) => {
  try {
    const id = req.query.id;
    console.log(`Fetching data for id: ${id}`);
    const urls = await loadFromCache(id);
    if (!urls) {
      return res.status(404).json({ error: 'Sitemap data not found or expired' });
    }
    console.log(`Found ${urls.length} URLs for id: ${id}`);
    res.json({ urls, urlCount: urls.length });
  } catch (err) {
    console.error('Route /sitemap/results-data error:', err.stack);
    res.status(500).json({ error: 'Failed to fetch sitemap data', details: err.message });
  }
});

export { router };