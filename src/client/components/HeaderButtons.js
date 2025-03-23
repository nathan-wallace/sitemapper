import { route } from '../index.js';

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
      onBack: () => {
        console.debug('Back button clicked, navigating to /');
        window.history.pushState({}, '', '/');
        route('/'); // Trigger routing to input page
      },
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
      <button id="backBtn" class="${!isResultsPage ? 'hidden' : ''}" aria-label="Back to input page">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <button id="exportHtmlBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''} aria-label="Export as HTML">
        <i class="fas fa-file-code"></i> Export HTML
      </button>
      <button id="exportCsvBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''} aria-label="Export as CSV">
        <i class="fas fa-file-csv"></i> Export CSV
      </button>
      <button id="exportJsonBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''} aria-label="Export as JSON">
        <i class="fas fa-file-code"></i> Export JSON
      </button>
      <button id="themeToggleBtn" aria-label="Toggle dark mode">
        <i class="fas fa-moon"></i> Toggle Theme
      </button>
    `;
  }

  setupEventListeners() {
    this.cleanupListeners();

    const backBtn = this.container.querySelector('#backBtn');
    if (backBtn) {
      const backHandler = () => {
        console.log('Back button clicked, current path:', this.options.path);
        this.options.onBack();
        console.log('After onBack, new path:', window.location.pathname);
        // No need to update this.options.path or re-render here; route('/') handles it
      };
      backBtn.addEventListener('click', backHandler);
      this.listeners.set(backBtn, [['click', backHandler]]);
    } else {
      console.warn('Back button not found in DOM');
    }

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
          await handler();
          btn.disabled = !this.options.urls.length || this.options.path !== '/results';
          btn.innerHTML = btn.id === 'exportHtmlBtn' ? '<i class="fas fa-file-code"></i> Export HTML' :
                          btn.id === 'exportCsvBtn' ? '<i class="fas fa-file-csv"></i> Export CSV' :
                          '<i class="fas fa-file-code"></i> Export JSON';
        };
        btn.addEventListener('click', wrappedHandler);
        this.listeners.set(btn, [['click', wrappedHandler]]);
      }
    });

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
    const htmlContent = `
      <!DOCTYPE html>
      <html><body><h1>Sitemap URLs</h1><ul>
      ${this.options.urls.map(url => `<li><a href="${url.loc}">${url.loc}</a> (Last Modified: ${url.lastmod})</li>`).join('')}
      </ul></body></html>`;
    this.downloadFile(htmlContent, 'sitemap.html', 'text/html');
  }, 300);

  exportCSV = debounce(async () => {
    const csvContent = 'URL,Last Modified,Change Frequency,Priority\n' +
      this.options.urls.map(url => `"${url.loc}","${url.lastmod}","${url.changefreq}","${url.priority}"`).join('\n');
    this.downloadFile(csvContent, 'sitemap.csv', 'text/csv');
  }, 300);

  exportJSON = debounce(async () => {
    const jsonContent = JSON.stringify(this.options.urls, null, 2);
    this.downloadFile(jsonContent, 'sitemap.json', 'application/json');
  }, 300);

  downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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