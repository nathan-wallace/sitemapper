const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { DOMParser } = require('xmldom');

const app = express();
const port = 3000;
const sitemapCachePath = path.join(__dirname, 'cache', 'sitemap.xml');
const uploadDir = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadDir });

app.use(express.json());
app.use(express.static(__dirname));
app.use('/cache', express.static(path.join(__dirname, 'cache')));

async function ensureDirectories(req, res, next) {
    try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.mkdir(path.dirname(sitemapCachePath), { recursive: true });
        next();
    } catch (err) {
        console.error('Failed to create directories:', err);
        res.status(500).json({ error: 'Server setup failed' });
    }
}

function parseXml(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');
    if (!doc || doc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('XML parsing failed');
    }
    return doc;
}

async function tryFetchSitemap(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'text',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });
        console.log(`Fetched ${url} - Status: ${response.status}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(`Failed to fetch ${url}: Status ${err.response.status} - ${err.response.statusText}`);
            console.log(`Response headers: ${JSON.stringify(err.response.headers, null, 2)}`);
            throw new Error(`HTTP ${err.response.status} ${err.response.statusText}`);
        } else {
            console.log(`Failed to fetch ${url}: ${err.message}`);
            throw err;
        }
    }
}

async function discoverSitemaps(baseUrl) {
    const potentialPaths = ['/sitemap.xml', '/sitemap_index.xml', '/blog/sitemap.xml', '/news/sitemap.xml'];
    const base = new URL(baseUrl).origin;
    const discoveredSitemaps = [];

    for (const path of potentialPaths) {
        const url = `${base}${path}`;
        try {
            const xmlContent = await tryFetchSitemap(url);
            if (xmlContent) {
                discoveredSitemaps.push({ url, xmlContent });
                console.log(`Discovered sitemap: ${url}`);
            }
        } catch (err) {
            console.log(`Discovery fetch failed for ${url}: ${err.message}`);
        }
    }
    return discoveredSitemaps;
}

async function fetchSitemap(url, allUrls = new Set(), visited = new Set(), depth = 0, maxDepth = 10) {
    if (depth > maxDepth) {
        console.warn(`Max depth (${maxDepth}) reached for ${url}`);
        return allUrls;
    }
    if (visited.has(url)) {
        console.log(`Skipping already visited URL: ${url}`);
        return allUrls;
    }
    visited.add(url);

    let xmlContent = await tryFetchSitemap(url);
    let sitemapsToProcess = [];

    if (!xmlContent || !xmlContent.includes('<?xml')) {
        console.log(`${url} is not a sitemap, attempting discovery...`);
        sitemapsToProcess = await discoverSitemaps(url);
        if (sitemapsToProcess.length === 0) {
            console.log(`No sitemaps found for ${url}`);
            return allUrls;
        }
    } else {
        sitemapsToProcess.push({ url, xmlContent });
    }

    for (const { url: sitemapUrl, xmlContent } of sitemapsToProcess) {
        try {
            const xmlDoc = parseXml(xmlContent);
            const sitemapIndex = xmlDoc.getElementsByTagName('sitemapindex');
            const urlSet = xmlDoc.getElementsByTagName('urlset');

            if (sitemapIndex.length > 0) {
                const sitemaps = Array.from(xmlDoc.getElementsByTagName('sitemap'))
                    .map((sitemap) => {
                        const loc = sitemap.getElementsByTagName('loc')[0]?.textContent;
                        const lastmod = sitemap.getElementsByTagName('lastmod')[0]?.textContent || 'N/A';
                        return loc ? { loc, lastmod } : null;
                    })
                    .filter(Boolean);
                console.log(`Sitemap index at ${sitemapUrl} with ${sitemaps.length} children`);
                await Promise.all(
                    sitemaps.map(({ loc }) => fetchSitemap(loc, allUrls, visited, depth + 1, maxDepth))
                );
            } else if (urlSet.length > 0) {
                const urls = Array.from(xmlDoc.getElementsByTagName('url')).map((url) => ({
                    loc: url.getElementsByTagName('loc')[0]?.textContent || '',
                    lastmod: url.getElementsByTagName('lastmod')[0]?.textContent || 'N/A',
                    changefreq: url.getElementsByTagName('changefreq')[0]?.textContent || 'N/A',
                    priority: url.getElementsByTagName('priority')[0]?.textContent || 'N/A'
                }));
                urls.forEach((url) => allUrls.add(JSON.stringify(url)));
                console.log(`Added ${urls.length} URLs from ${sitemapUrl}`);

                await Promise.all(
                    urls.map(async ({ loc }) => {
                        const nestedSitemapUrl = loc.endsWith('.xml') ? loc : `${loc}/sitemap.xml`;
                        try {
                            const nestedContent = await tryFetchSitemap(nestedSitemapUrl);
                            if (nestedContent && nestedContent.includes('<?xml')) {
                                console.log(`Found potential nested sitemap at ${nestedSitemapUrl}`);
                                await fetchSitemap(nestedSitemapUrl, allUrls, visited, depth + 1, maxDepth);
                            }
                        } catch (err) {
                            console.log(`Nested fetch failed for ${nestedSitemapUrl}: ${err.message}`);
                        }
                    })
                );
            } else {
                console.warn(`No valid sitemap or urlset at ${sitemapUrl}`);
            }
        } catch (err) {
            console.error(`Error processing ${sitemapUrl}: ${err.message}`);
            throw err; // Propagate the error up
        }
    }

    return allUrls;
}

function generateSitemapXml(urls) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const url of urls) {
        const { loc, lastmod, changefreq, priority } = JSON.parse(url);
        xml += '  <url>\n';
        xml += `    <loc>${loc}</loc>\n`;
        if (lastmod !== 'N/A') xml += `    <lastmod>${lastmod}</lastmod>\n`;
        if (changefreq !== 'N/A') xml += `    <changefreq>${changefreq}</changefreq>\n`;
        if (priority !== 'N/A') xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    }
    xml += '</urlset>';
    return xml;
}

app.use(ensureDirectories);

app.post('/sitemap-url', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.match(/^https?:\/\//)) {
      return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
      const allUrls = await fetchSitemap(url);
      if (allUrls.size === 0) {
          return res.status(404).json({ error: 'No sitemaps or URLs found' });
      }
      const urls = Array.from(allUrls).map((url) => JSON.parse(url));
      const xmlContent = generateSitemapXml(allUrls);
      await fs.writeFile(sitemapCachePath, xmlContent);
      console.log(`Processed ${urls.length} URLs for ${url}`);
      res.json({ message: 'Sitemap processed successfully', urls, urlCount: urls.length });
  } catch (err) {
      console.error('Route /sitemap-url error:', err);
      res.status(500).json({ error: err.message });
  }
});

app.post('/sitemap-upload', upload.single('sitemapFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const uploadedFilePath = req.file.path;
        const xmlContent = await fs.readFile(uploadedFilePath, 'utf-8');
        const xmlDoc = parseXml(xmlContent);
        const allUrls = new Set();
        const sitemapIndex = xmlDoc.getElementsByTagName('sitemapindex');
        const urlSet = xmlDoc.getElementsByTagName('urlset');

        if (sitemapIndex.length > 0) {
            const sitemaps = Array.from(xmlDoc.getElementsByTagName('sitemap'))
                .map((sitemap) => sitemap.getElementsByTagName('loc')[0]?.textContent)
                .filter(Boolean);
            await Promise.all(
                sitemaps.map((loc) => fetchSitemap(loc, allUrls, new Set(), 0, 10))
            );
        } else if (urlSet.length > 0) {
            const urls = Array.from(xmlDoc.getElementsByTagName('url')).map((url) => ({
                loc: url.getElementsByTagName('loc')[0]?.textContent || '',
                lastmod: url.getElementsByTagName('lastmod')[0]?.textContent || 'N/A',
                changefreq: url.getElementsByTagName('changefreq')[0]?.textContent || 'N/A',
                priority: url.getElementsByTagName('priority')[0]?.textContent || 'N/A'
            }));
            urls.forEach((u) => allUrls.add(JSON.stringify(u)));
        }

        const urls = Array.from(allUrls).map((u) => JSON.parse(u));
        await fs.writeFile(sitemapCachePath, generateSitemapXml(allUrls));
        await fs.unlink(uploadedFilePath);
        res.json({ message: 'Sitemap uploaded successfully', urls, urlCount: urls.length });
    } catch (err) {
        console.error('Route /sitemap-upload error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', uptime: process.uptime() });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

