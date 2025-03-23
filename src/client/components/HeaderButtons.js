// src/client/components/HeaderButtons.js
import { route } from '../index.js';

export class HeaderButtons {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onBack: () => {
        window.history.pushState({}, '', '/');
        route('/');
      },
      onToggleFilters: options.onToggleFilters || (() => {}),
      treeView: options.treeView || null,
      urls: options.urls || [],
      path: options.path || window.location.pathname,
      ...options,
    };
    this.render();
    this.setupEventListeners();
  }

  render() {
    const isResultsPage = this.options.path === '/results';
    this.container.innerHTML = `
      <button id="backBtn" ${!isResultsPage ? 'class="hidden"' : ''}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="collapseAllBtn" ${!isResultsPage ? 'class="hidden"' : ''}><i class="fas fa-compress-alt"></i> Collapse All</button>
      <button id="exportHtmlBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!isResultsPage || !this.options.urls.length ? 'disabled' : ''}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
      <button id="toggleFiltersBtn" ${!isResultsPage ? 'class="hidden"' : ''} aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
    `;
  }

  setupEventListeners() {
    this.container.querySelector('#backBtn')?.addEventListener('click', () => this.options.onBack());

    const collapseBtn = this.container.querySelector('#collapseAllBtn');
    if (collapseBtn && this.options.treeView) {
      collapseBtn.addEventListener('click', () => {
        this.options.treeView.toggleExpansion();
        collapseBtn.innerHTML = this.options.treeView.isExpanded
          ? '<i class="fas fa-compress-alt"></i> Collapse All'
          : '<i class="fas fa-expand-alt"></i> Expand All';
      });
    }

    const exportHtmlBtn = this.container.querySelector('#exportHtmlBtn');
    if (exportHtmlBtn) {
      exportHtmlBtn.addEventListener('click', () => {
        const htmlContent = `
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(url => `<li><a href="${url.loc}">${url.loc}</a> (Last Modified: ${url.lastmod})</li>`).join('')}
          </ul></body></html>`;
        this.downloadFile(htmlContent, 'sitemap.html', 'text/html');
      });
    }

    const exportCsvBtn = this.container.querySelector('#exportCsvBtn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        const csvContent = 'URL,Last Modified,Change Frequency,Priority\n' +
          this.options.urls.map(url => `"${url.loc}","${url.lastmod}","${url.changefreq}","${url.priority}"`).join('\n');
        this.downloadFile(csvContent, 'sitemap.csv', 'text/csv');
      });
    }

    const exportJsonBtn = this.container.querySelector('#exportJsonBtn');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => {
        const jsonContent = JSON.stringify(this.options.urls, null, 2);
        this.downloadFile(jsonContent, 'sitemap.json', 'application/json');
      });
    }

    this.container.querySelector('#themeToggleBtn')?.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    this.container.querySelector('#toggleFiltersBtn')?.addEventListener('click', () => {
      const toggleBtn = this.container.querySelector('#toggleFiltersBtn');
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      this.options.onToggleFilters(!isExpanded);
    });
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

  downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}