// src/server/services/cacheManager.js
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config/config.js';

const sitemapStore = new Map();

export async function saveToCache(urls) {
  const id = uuidv4();
  const cacheFile = path.join(config.cacheDir, `${id}.json`);
  try {
    await fs.writeFile(cacheFile, JSON.stringify(urls, null, 2));
    sitemapStore.set(id, urls); // Keep in memory for quick access
    // No automatic deletion; rely on clearCache or manual cleanup
    console.log(`Cached ${urls.length} URLs to ${cacheFile}`);
    return id;
  } catch (err) {
    console.error(`Failed to cache URLs to ${cacheFile}:`, err);
    throw err;
  }
}

export async function clearCache() {
  try {
    sitemapStore.clear();
    const files = await fs.readdir(config.cacheDir);
    await Promise.all(files.map((file) => fs.unlink(path.join(config.cacheDir, file))));
    console.log('Cache cleared successfully');
  } catch (err) {
    console.error('Failed to clear cache:', err);
    throw err;
  }
}

export async function loadFromCache(id) {
  if (sitemapStore.has(id)) {
    return sitemapStore.get(id);
  }
  const cacheFile = path.join(config.cacheDir, `${id}.json`);
  try {
    const data = await fs.readFile(cacheFile, 'utf8');
    const urls = JSON.parse(data);
    sitemapStore.set(id, urls); // Cache in memory for future quick access
    return urls;
  } catch (err) {
    console.error(`Failed to load cache from ${cacheFile}:`, err);
    return null;
  }
}

export { sitemapStore };