// src/client/pages/InputPage.js
import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';
import { route } from '../index.js';

function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function setupInputPage(container) {
  container.innerHTML = `
    <h2>Load Sitemap</h2>
    <form id="sitemapUrlForm" method="POST" class="input-group">
      <label for="sitemapUrlInput">Enter Sitemap URL:</label>
      <input type="text" id="sitemapUrlInput" name="url" placeholder="https://example.com/sitemap.xml" />
      <button type="submit">Load Sitemap</button>
    </form>
    <form id="sitemapUploadForm" method="POST" enctype="multipart/form-data" class="input-group">
      <label for="sitemapFile">Upload Sitemap File:</label>
      <input type="file" id="sitemapFile" name="sitemapFile" accept=".xml" />
      <button type="submit">Upload</button>
    </form>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;

  const sitemapUrlForm = container.querySelector('#sitemapUrlForm');
  const sitemapUrlInput = container.querySelector('#sitemapUrlInput');
  const sitemapUploadForm = container.querySelector('#sitemapUploadForm');

  sitemapUrlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = sitemapUrlInput.value.trim();
    if (!url) {
      showError('Please enter a sitemap URL');
      return;
    }
    if (!validateUrl(url)) {
      showError('Invalid URL: Must start with http:// or https:// and be well-formed');
      return;
    }
    showLoading(10);
    try {
      const response = await fetch('/sitemap/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch sitemap');
      }
      const { id, message, status } = await response.json();
      showLoading(50);
      window.history.pushState({}, '', `/results?id=${id}`);
      route('/results');
      showFeedback(`${message} (${status.succeeded.length}/${status.attempted.length} sitemaps succeeded)`);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  });

  sitemapUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(sitemapUploadForm);
    showLoading(10);
    try {
      const response = await fetch('/sitemap/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload sitemap');
      }
      const { id, message } = await response.json();
      showLoading(50);
      window.history.pushState({}, '', `/results?id=${id}`);
      route('/results');
      showFeedback(message);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  });

  return {};
}