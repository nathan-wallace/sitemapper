import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config/config.js';

const sitemapStore = new Map();

export async function saveToCache(urls) {
  const id = uuidv4();
  sitemapStore.set(id, urls);
  const cacheFile = path.join(config.cacheDir, `${id}.json`);
  await fs.writeFile(cacheFile, JSON.stringify(urls, null, 2));
  setTimeout(() => {
    sitemapStore.delete(id);
    fs.unlink(cacheFile).catch(console.error);
  }, 3600 * 1000); // Clear after 1 hour
  return id;
}

export async function clearCache() {
  sitemapStore.clear();
  const files = await fs.readdir(config.cacheDir);
  await Promise.all(files.map((file) => fs.unlink(path.join(config.cacheDir, file))));
}

export { sitemapStore };