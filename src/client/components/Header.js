// src/client/components/Header.js
export default function renderHeader() {
  const header = document.createElement('header');

  const pathname = window.location.pathname;
  const isResultsPage = pathname === '/results';
  header.innerHTML = `
    <h1>Sitemap Explorer</h1>
    <div class="header-controls">
    <div class="export-buttons">
      ${isResultsPage ? `
        <button id="backBtn"><i class="fas fa-arrow-left"></i> Back</button>
        <button id="exportHtmlBtn" disabled><i class="fas fa-file-code"></i> Export HTML</button>
        <button id="exportCsvBtn" disabled><i class="fas fa-file-csv"></i> Export CSV</button>
        <button id="exportJsonBtn" disabled><i class="fas fa-file-export"></i> Export JSON</button>` : ''}
    </div>
      <button id="themeToggleBtn" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
       <span class="version">v1.0</span>
    </div>
  `;

  return header;
}