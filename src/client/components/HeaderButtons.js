// src/client/components/HeaderButtons.js
import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export class HeaderButtons {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      urls: options.urls || [],
      path: options.path || window.location.pathname,
      ...options,
    };
    this.listeners = new Map();
    this.render();
    this.setupEventListeners();
  }

  render() {
    const isResultsPage = this.options.path === '/results';
    this.container.innerHTML = `
      <button id="exportHtmlBtn" ${!isResultsPage || !this.options.urls.length ? 'hidden' : ''} aria-label="Export as HTML">
        <i class="fas fa-file-code"></i> Export HTML
      </button>
      <button id="exportCsvBtn" ${!isResultsPage || !this.options.urls.length ? 'hidden' : ''} aria-label="Export as CSV">
        <i class="fas fa-file-csv"></i> Export CSV
      </button>
      <button id="exportJsonBtn" ${!isResultsPage || !this.options.urls.length ? 'hidden' : ''} aria-label="Export as JSON">
        <i class="fas fa-file-code"></i> Export JSON
      </button>
      <button id="clearCacheBtn" ${!isResultsPage || !this.options.urls.length ? '' : 'hidden'} aria-label="Clear cache">
        <i class="fas fa-trash"></i> Clear Cache
      </button>
     
      <button id="themeToggleBtn" aria-label="Toggle dark mode">
        <i class="fas fa-moon"></i>
      </button>
    `;
  }

  setupEventListeners() {
    this.cleanupListeners();

    const exportButtons = [
      ['#exportHtmlBtn', this.exportHTML.bind(this), 'Exporting HTML...'],
      ['#exportCsvBtn', this.exportCSV.bind(this), 'Exporting CSV...'],
      ['#exportJsonBtn', this.exportJSON.bind(this), 'Exporting JSON...'],
    ];

    exportButtons.forEach(([selector, handler, label]) => {
      const btn = this.container.querySelector(selector);
      if (btn) {
        const wrappedHandler = async () => {
          btn.disabled = true;
          btn.textContent = label;
          try {
            await handler();
          } catch (err) {
            console.error(`Export failed (${selector}):`, err);
            alert(`Failed to export: ${err.message}`);
          }
          btn.disabled = !this.options.urls.length || this.options.path !== '/results';
          btn.innerHTML = btn.id === 'exportHtmlBtn' ? '<i class="fas fa-file-code"></i> Export HTML' :
                          btn.id === 'exportCsvBtn' ? '<i class="fas fa-file-csv"></i> Export CSV' :
                          '<i class="fas fa-file-code"></i> Export JSON';
        };
        btn.addEventListener('click', wrappedHandler);
        this.listeners.set(btn, [['click', wrappedHandler]]);
      }
    });

    const clearCacheBtn = this.container.querySelector('#clearCacheBtn');
    if (clearCacheBtn) {
      const clearCacheHandler = async () => {
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
      };
      clearCacheBtn.addEventListener('click', clearCacheHandler);
      this.listeners.set(clearCacheBtn, [['click', clearCacheHandler]]);
    }

    const themeBtn = this.container.querySelector('#themeToggleBtn');
    if (themeBtn) {
      const themeHandler = () => document.body.classList.toggle('dark-mode');
      themeBtn.addEventListener('click', themeHandler);
      this.listeners.set(themeBtn, [['click', themeHandler]]);
    }
  }

  cleanupListeners() {
    this.listeners.forEach((events, element) => {
      events.forEach(([type, handler]) => element.removeEventListener(type, handler));
    });
    this.listeners.clear();
  }

  exportHTML = debounce(async () => {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html><body><h1>Sitemap URLs</h1><ul>
        ${this.options.urls.map(url => `<li><a href="${url.loc}">${url.loc}</a> (Last Modified: ${url.lastmod})</li>`).join('')}
        </ul></body></html>`;
      this.downloadFile(htmlContent, 'sitemap.html', 'text/html');
    } catch (err) {
      throw new Error('HTML export failed');
    }
  }, 300);

  exportCSV = debounce(async () => {
    try {
      const csvContent = 'URL,Last Modified,Change Frequency,Priority\n' +
        this.options.urls.map(url => `"${url.loc}","${url.lastmod}","${url.changefreq}","${url.priority}"`).join('\n');
      this.downloadFile(csvContent, 'sitemap.csv', 'text/csv');
    } catch (err) {
      throw new Error('CSV export failed');
    }
  }, 300);

  exportJSON = debounce(async () => {
    try {
      const jsonContent = JSON.stringify(this.options.urls, null, 2);
      this.downloadFile(jsonContent, 'sitemap.json', 'application/json');
    } catch (err) {
      throw new Error('JSON export failed');
    }
  }, 300);

  downloadFile(content, fileName, mimeType) {
    try {
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up
    } catch (err) {
      throw new Error(`Failed to download ${fileName}: ${err.message}`);
    }
  }

  updateRoute(newPath) {
    this.options.path = newPath;
    this.render();
    this.setupEventListeners();
  }

  updateUrls(newUrls) {
    this.options.urls = newUrls;
    this.render();
    this.setupEventListeners();
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.render();
    this.setupEventListeners();
  }

  destroy() {
    this.cleanupListeners();
    this.container.innerHTML = '';
  }
}