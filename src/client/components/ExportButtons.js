// src/client/components/ExportButtons.js
export default function setupExportButtons(urls) {
  const exportHtmlBtn = document.getElementById('exportHtmlBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');

  // Enable buttons if URLs are provided
  if (urls && urls.length > 0) {
    exportHtmlBtn.disabled = false;
    exportCsvBtn.disabled = false;
    exportJsonBtn.disabled = false;
  }

  // Export to HTML
  exportHtmlBtn.addEventListener('click', () => {
    const htmlContent = generateHtmlExport(urls);
    downloadFile(htmlContent, 'sitemap.html', 'text/html');
  });

  // Export to CSV
  exportCsvBtn.addEventListener('click', () => {
    const csvContent = generateCsvExport(urls);
    downloadFile(csvContent, 'sitemap.csv', 'text/csv');
  });

  // Export to JSON
  exportJsonBtn.addEventListener('click', () => {
    const jsonContent = JSON.stringify(urls, null, 2);
    downloadFile(jsonContent, 'sitemap.json', 'application/json');
  });
}

// Generate HTML export
function generateHtmlExport(urls) {
  let html = '<!DOCTYPE html><html><body><h1>Sitemap URLs</h1><ul>';
  urls.forEach((url) => {
    html += `<li><a href="${url.loc}">${url.loc}</a> (Last Modified: ${url.lastmod})</li>`;
  });
  html += '</ul></body></html>';
  return html;
}

// Generate CSV export
function generateCsvExport(urls) {
  let csv = 'URL,Last Modified,Change Frequency,Priority\n';
  urls.forEach((url) => {
    csv += `"${url.loc}","${url.lastmod}","${url.changefreq}","${url.priority}"\n`;
  });
  return csv;
}

// Download file utility
function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}