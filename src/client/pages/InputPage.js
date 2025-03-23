// src/client/pages/InputPage.js
import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';

export default function setupInputPage(container) {
  const section = document.createElement('section');
  section.innerHTML = `
    <h2>Load Sitemap</h2>
    <form id="sitemapUrlForm" method="POST" class="input-group">
      <label for="sitemapUrlInput">Enter Sitemap URL:</label>
      <input type="text" id="sitemapUrlInput" name="url" placeholder="https://example.com/sitemap.xml" />
      <button type="submit">Load Sitemap</button>
    </form>
    <form id="sitemapUploadForm" method="POST" enctype="multipart/form-data" class="input-group">
      <label for="sitemapFile">Upload Sitemap File:</label>
      <input type="file" id="sitemapFile" name="sitemapFile" />
      <button type="submit">Upload</button>
    </form>
    <div class="button-group">
      <button id="clearCacheBtn" type="button">Clear Cache</button>
    </div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;
  container.appendChild(section);

  const sitemapUrlForm = section.querySelector('#sitemapUrlForm');
  const sitemapUrlInput = section.querySelector('#sitemapUrlInput');
  const sitemapUploadForm = section.querySelector('#sitemapUploadForm');
  const clearCacheBtn = section.querySelector('#clearCacheBtn');

  sitemapUrlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = sitemapUrlInput.value.trim();
    if (url) {
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
        const { id } = await response.json();
        showLoading(50);
        window.history.pushState({}, '', `/results?id=${id}`);
        renderLayout();
        route('/results');
        showFeedback('Sitemap loaded successfully');
      } catch (err) {
        showError(err.message);
      } finally {
        hideLoading();
      }
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
      const { id } = await response.json();
      showLoading(50);
      window.history.pushState({}, '', `/results?id=${id}`);
      renderLayout();
      route('/results');
      showFeedback('Sitemap uploaded successfully');
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  });

  clearCacheBtn.addEventListener('click', async () => {
    showLoading();
    try {
      const response = await fetch('/sitemap/clear-cache', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to clear cache');
      showFeedback('Cache cleared successfully');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  });
}