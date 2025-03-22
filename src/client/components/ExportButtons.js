export default function renderExportButtons({ urls, treeContainer, filtersContainer, id }) {
  const controlsContainer = document.querySelector('header .export-buttons'); // Target header specifically
  if (!controlsContainer) return;

  const backButton = controlsContainer.querySelector('#backBtn');
  const exportHtmlBtn = controlsContainer.querySelector('#exportHtmlBtn');
  const exportJsonBtn = controlsContainer.querySelector('#exportJsonBtn');
  const exportCsvBtn = controlsContainer.querySelector('#exportCsvBtn');

  if (!backButton || !exportHtmlBtn || !exportJsonBtn || !exportCsvBtn) return;

  backButton.disabled = false;
  exportHtmlBtn.disabled = false;
  exportJsonBtn.disabled = false;
  exportCsvBtn.disabled = false;

  backButton.addEventListener('click', () => {
    window.location.href = '/';
  });

  exportHtmlBtn.addEventListener('click', () => {
    const html = treeContainer.innerHTML;
    const blob = new Blob([`<html><body>${html}</body></html>`], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.html';
    link.click();
  });

  exportJsonBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(urls, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.json';
    link.click();
  });

  exportCsvBtn.addEventListener('click', () => {
    const header = ['URL', 'Last Modified', 'Change Frequency', 'Priority'];
    const csvRows = [header.join(',')];
    urls.forEach(({ loc, lastmod, changefreq, priority }) => {
      csvRows.push(`"${loc}","${lastmod}","${changefreq}","${priority}"`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.csv';
    link.click();
  });
}