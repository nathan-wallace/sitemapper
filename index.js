const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { DOMParser } = require('xmldom');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;
const sitemapCachePath = path.join(__dirname, 'cache', 'sitemap.xml');
const uploadDir = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadDir });

const sitemapStore = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
            throw err;
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

app.get('/results-data', (req, res) => {
    const id = req.query.id;
    const urls = sitemapStore.get(id);
    if (!urls) {
        return res.status(404).json({ error: 'Sitemap data not found or expired' });
    }
    res.json({ urls, urlCount: urls.length });
});

app.post('/sitemap-url', ensureDirectories, async (req, res) => {
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
        const xmlContent = generateSitemapXml(allUrls);
        await fs.writeFile(sitemapCachePath, xmlContent);
        const id = uuidv4();
        sitemapStore.set(id, urls);
        setTimeout(() => sitemapStore.delete(id), 30 * 60 * 1000);
        console.log(`Processed ${urls.length} URLs for ${url}`);
        console.log(`Redirecting to /results?id=${id}`);
        res.redirect(`/results?id=${id}`);
        console.log('Redirect sent');
    } catch (err) {
        console.error('Route /sitemap-url error:', err.message);
        res.redirect('/?error=' + encodeURIComponent(err.message));
    }
});

app.post('/sitemap-upload', upload.single('sitemapFile'), ensureDirectories, async (req, res) => {
    if (!req.file) {
        return res.redirect('/?error=' + encodeURIComponent('No file uploaded'));
    }

    try {
        const fileContent = await fs.readFile(req.file.path, 'utf8');
        const xmlDoc = parseXml(fileContent);
        const allUrls = new Set();
        const urlSet = xmlDoc.getElementsByTagName('urlset');

        if (urlSet.length > 0) {
            const urls = Array.from(xmlDoc.getElementsByTagName('url')).map((url) => ({
                loc: url.getElementsByTagName('loc')[0]?.textContent || '',
                lastmod: url.getElementsByTagName('lastmod')[0]?.textContent || 'N/A',
                changefreq: url.getElementsByTagName('changefreq')[0]?.textContent || 'N/A',
                priority: url.getElementsByTagName('priority')[0]?.textContent || 'N/A'
            }));
            urls.forEach((url) => allUrls.add(JSON.stringify(url)));
            console.log(`Added ${urls.length} URLs from uploaded file`);
        } else {
            console.warn('No valid urlset in uploaded file');
            return res.redirect('/?error=' + encodeURIComponent('No URLs found in uploaded sitemap'));
        }

        await fs.unlink(req.file.path); // Clean up uploaded file
        if (allUrls.size === 0) {
            return res.redirect('/?error=' + encodeURIComponent('No URLs found in uploaded sitemap'));
        }
        const urls = Array.from(allUrls).map((u) => JSON.parse(u));
        const xmlContent = generateSitemapXml(allUrls);
        await fs.writeFile(sitemapCachePath, xmlContent);
        const id = uuidv4();
        sitemapStore.set(id, urls);
        setTimeout(() => sitemapStore.delete(id), 30 * 60 * 1000);
        res.redirect(`/results?id=${id}`);
    } catch (err) {
        console.error('Route /sitemap-upload error:', err.message);
        res.redirect('/?error=' + encodeURIComponent(err.message));
    }
});

app.post('/clear-cache', ensureDirectories, async (req, res) => {
    try {
        await fs.writeFile(sitemapCachePath, '');
        sitemapStore.clear();
        console.log('Cache cleared');
        res.redirect('/?feedback=' + encodeURIComponent('Cache cleared successfully'));
    } catch (err) {
        console.error('Clear cache error:', err.message);
        res.redirect('/?error=' + encodeURIComponent('Failed to clear cache'));
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