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

  sitemapUrlForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = sitemapUrlInput?.value.trim();
    if (url) {
      sitemapUrlForm.action = '/sitemap/url';
      sitemapUrlForm.submit();
    }
  });

  sitemapUploadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    sitemapUploadForm.action = '/sitemap/upload';
    sitemapUploadForm.submit();
  });

  clearCacheBtn?.addEventListener('click', () => {
    fetch('/sitemap/clear-cache', { method: 'POST' })
      .then((response) => response.text())
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.error('Clear cache error:', err));
  });
}
