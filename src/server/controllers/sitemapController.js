import express from 'express';
import multer from 'multer';
import { fetchSitemap } from '../services/sitemapFetcher.js';
import { parseSitemapFromFile } from '../services/sitemapParser.js';
import { saveToCache, clearCache, sitemapStore } from '../services/cacheManager.js';
import config from '../../config/config.js';

const router = express.Router();
const upload = multer({ dest: config.uploadDir });

router.post('/url', async (req, res) => {
  const { url } = req.body;
  console.log('Received URL:', url);
  if (!url || !url.match(/^https?:\/\//)) {
    console.log('Invalid URL:', url);
    return res.redirect('/?error=' + encodeURIComponent('Invalid URL: Must start with http:// or https://'));
  }
  try {
    const allUrls = await fetchSitemap(url);
    if (allUrls.size === 0) {
      console.log('No URLs found for:', url);
      return res.redirect('/?error=' + encodeURIComponent('No sitemaps or URLs found'));
    }
    const urls = Array.from(allUrls).map((u) => JSON.parse(u));
    console.log(`URLs to cache: ${urls.length}`);
    const id = await saveToCache(urls);
    console.log(`Processed ${urls.length} URLs for ${url}`);
    res.redirect(`/results?id=${id}`);
  } catch (err) {
    console.error('Route /sitemap/url error:', err.message);
    res.redirect('/?error=' + encodeURIComponent(err.message));
  }
});

router.post('/upload', upload.single('sitemapFile'), async (req, res) => {
  if (!req.file) {
    return res.redirect('/?error=' + encodeURIComponent('No file uploaded'));
  }
  try {
    const urls = await parseSitemapFromFile(req.file.path);
    const urlArray = Array.from(urls).map((u) => JSON.parse(u));
    const id = await saveToCache(urlArray);
    res.redirect(`/results?id=${id}`);
  } catch (err) {
    console.error('Route /sitemap/upload error:', err.message);
    res.redirect('/?error=' + encodeURIComponent(err.message));
  }
});

router.post('/clear-cache', async (req, res) => {
  try {
    await clearCache();
    console.log('Cache cleared');
    res.redirect('/?feedback=' + encodeURIComponent('Cache cleared successfully'));
  } catch (err) {
    console.error('Clear cache error:', err.message);
    res.redirect('/?error=' + encodeURIComponent('Failed to clear cache'));
  }
});

router.get('/results-data', (req, res) => {
  try {
    const id = req.query.id;
    console.log(`Fetching data for id: ${id}`);
    const urls = sitemapStore.get(id);
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