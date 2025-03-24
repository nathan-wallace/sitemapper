// src/server/services/sitemapFetcher.js
import axios from 'axios';
import config from '../../config/config.js';
import { parseSitemap } from './sitemapParser.js';

// Fetch and parse sitemap recursively, with status tracking
export async function fetchSitemap(url, allUrls = new Set(), depth = 0) {
  const status = { attempted: [], succeeded: [], failed: [], message: '' };
  status.attempted.push(url);

  if (depth > config.maxDepth) {
    console.warn(`Max recursion depth (${config.maxDepth}) reached for ${url}`);
    status.failed.push({ url, reason: `Max recursion depth (${config.maxDepth}) reached` });
    return { urls: allUrls, status };
  }

  try {
    const response = await tryFetchSitemap(url);
    await processSitemap(url, response, allUrls, depth, status);
    status.succeeded.push(url);
  } catch (err) {
    console.log(`${url} is not a sitemap: ${err.message}. Attempting discovery...`);
    status.failed.push({ url, reason: err.message });
    const sitemaps = await discoverSitemaps(url, status);
    if (sitemaps.length === 0) {
      console.log(`No sitemaps discovered for ${url}`);
      status.message = 'No valid sitemaps or URLs found after discovery';
      return { urls: allUrls, status };
    }
    for (const { url: sitemapUrl, xmlContent } of sitemaps) {
      await processSitemap(sitemapUrl, xmlContent, allUrls, depth, status);
      status.succeeded.push(sitemapUrl);
    }
  }
  if (allUrls.size > 0) {
    status.message = `Successfully fetched ${allUrls.size} URLs`;
  } else {
    status.message = 'No URLs extracted from sitemaps';
  }
  return { urls: allUrls, status };
}

async function tryFetchSitemap(url) {
  const response = await axios.get(url, {
    responseType: 'text',
    timeout: config.fetchTimeout,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
  });
  console.log(`Fetched ${url} - Status: ${response.status}`);
  return response.data;
}

async function discoverSitemaps(baseUrl, status) {
  const potentialPaths = [
    '/sitemap.xml',
    '/sitemap_index.xml',
    '/blog/sitemap.xml',
    '/news/sitemap.xml',
    '/sitemap',
  ];
  const base = new URL(baseUrl).origin;
  const discoveredSitemaps = [];

  for (const path of potentialPaths) {
    const url = `${base}${path}`;
    status.attempted.push(url);
    try {
      const xmlContent = await tryFetchSitemap(url);
      if (xmlContent && xmlContent.trim().startsWith('<?xml')) {
        console.log(`Discovered valid sitemap at ${url}`);
        discoveredSitemaps.push({ url, xmlContent });
      } else {
        console.log(`Fetched ${url} but it’s not XML`);
        status.failed.push({ url, reason: 'Not a valid XML sitemap' });
      }
    } catch (err) {
      console.log(`Discovery fetch failed for ${url}: ${err.message}`);
      status.failed.push({ url, reason: err.message });
    }
  }
  return discoveredSitemaps;
}

async function processSitemap(url, xmlContent, allUrls, depth, status) {
  const result = parseSitemap(xmlContent);
  const { sitemapIndex, urlSet } = result;

  if (sitemapIndex.length > 0) {
    const sitemaps = Array.from(sitemapIndex[0].getElementsByTagName('sitemap'))
      .map((sitemap) => sitemap.getElementsByTagName('loc')[0]?.textContent)
      .filter(Boolean);
    console.log(`Sitemap index at ${url} with ${sitemaps.length} children`);
    await Promise.all(
      sitemaps.map((loc) => {
        status.attempted.push(loc);
        return fetchSitemap(loc, allUrls, depth + 1).then((result) => {
          if (result.urls.size > allUrls.size) status.succeeded.push(loc);
          else status.failed.push({ url: loc, reason: 'No new URLs added' });
          result.urls.forEach((url) => allUrls.add(url));
        });
      })
    );
  } else if (urlSet.length > 0) {
    const urls = Array.from(urlSet[0].getElementsByTagName('url')).map((url) => ({
      loc: url.getElementsByTagName('loc')[0]?.textContent || '',
      lastmod: url.getElementsByTagName('lastmod')[0]?.textContent || 'N/A',
      changefreq: url.getElementsByTagName('changefreq')[0]?.textContent || 'N/A',
      priority: url.getElementsByTagName('priority')[0]?.textContent || 'N/A',
    }));
    urls.forEach((url) => allUrls.add(JSON.stringify(url)));
    console.log(`Added ${urls.length} URLs from ${url}`);
  } else {
    throw new Error('Invalid sitemap format');
  }
}