// src/client/pages/InputPage.js
export default function setupInputPage() {
  const sitemapUrlForm = document.getElementById('sitemapUrlForm');
  const sitemapUrlInput = document.getElementById('sitemapUrlInput');
  const sitemapUploadForm = document.getElementById('sitemapUploadForm');
  const clearCacheBtn = document.getElementById('clearCacheBtn');

  if (sitemapUrlForm) {
    sitemapUrlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = sitemapUrlInput?.value.trim();
      if (url) {
        sitemapUrlForm.action = '/sitemap/url';
        sitemapUrlForm.submit();
      }
    });
  } else {
    console.error('Sitemap URL form not found');
  }

  if (sitemapUploadForm) {
    sitemapUploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sitemapUploadForm.action = '/sitemap/upload';
      sitemapUploadForm.submit();
    });
  }

  if (clearCacheBtn) {
    clearCacheBtn.addEventListener('click', () => {
      fetch('/sitemap/clear-cache', { method: 'POST' })
        .then((response) => response.text())
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.error('Clear cache error:', err));
    });
  }
}