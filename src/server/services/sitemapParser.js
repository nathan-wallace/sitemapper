import fs from 'fs/promises';
import { parseXml } from '../utils/xml.js';

// Parse sitemap content
export function parseSitemap(xmlString) {
  const xmlDoc = parseXml(xmlString); // This should throw if XML is invalid
  return {
    sitemapIndex: xmlDoc.getElementsByTagName('sitemapindex'),
    urlSet: xmlDoc.getElementsByTagName('urlset'),
  };
}

export async function parseSitemapFromFile(filePath) {
  const xmlContent = await fs.readFile(filePath, 'utf8');
  const xmlDoc = parseXml(xmlContent);
  const urlSet = xmlDoc.getElementsByTagName('urlset');

  if (urlSet.length === 0) {
    throw new Error('No valid URLs found in uploaded sitemap');
  }

  const urls = Array.from(urlSet[0].getElementsByTagName('url')).map((url) => ({
    loc: url.getElementsByTagName('loc')[0]?.textContent || '',
    lastmod: url.getElementsByTagName('lastmod')[0]?.textContent || 'N/A',
    changefreq: url.getElementsByTagName('changefreq')[0]?.textContent || 'N/A',
    priority: url.getElementsByTagName('priority')[0]?.textContent || 'N/A',
  }));

  await fs.unlink(filePath);
  return new Set(urls.map((url) => JSON.stringify(url)));
}