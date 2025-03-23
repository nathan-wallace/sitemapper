import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';
import { TreeView } from '../components/TreeView.js';

export default function setupResultsPage(container) {
  const section = document.createElement('section');
  section.innerHTML = `
    <div class="controls">
      <button id="backBtn"><i class="fas fa-arrow-left"></i> Back</button>
      <button id="collapseAllBtn"><i class="fas fa-compress-alt"></i> Collapse All</button>
      <button id="exportHtmlBtn" disabled><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" disabled><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" disabled><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
      <button id="toggleFiltersBtn" aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
    </div>
    <div id="filters" class="hidden">
      <label for="priorityFilter">Min Priority:</label>
      <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="0" />
      <label for="lastmodFilter">Last Modified After:</label>
      <input type="date" id="lastmodFilter" />
      <label for="sortBy">Sort By:</label>
      <select id="sortBy">
        <option value="url">URL</option>
        <option value="lastmod">Last Modified</option>
        <option value="priority">Priority</option>
      </select>
      <input type="text" id="urlSearch" placeholder="Search URLs..." />
      <button id="applyFiltersBtn">Apply Filters</button>
      <button id="resetFiltersBtn">Reset Filters</button>
    </div>
    <div id="stats">
      <p>Total URLs: <span id="totalUrls">0</span></p>
      <p>Unique Domains: <span id="uniqueDomains">0</span></p>
      <p>Matches: <span id="matchCount"></span></p>
    </div>
    <div id="tree" class="tree"></div>
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

  const treeContainer = section.querySelector('#tree');
  let treeView = new TreeView(treeContainer);
  let originalUrls = [];

  const loadSitemapData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
      showError('No sitemap ID provided. Please load a sitemap first.');
      return;
    }

    showLoading(10);
    try {
      const response = await fetch(`/sitemap/results-data?id=${id}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load sitemap data');
      }
      const data = await response.json();
      originalUrls = data.urls;
      showLoading(50);
      treeView.render(originalUrls);
      showLoading(100);
      showFeedback(`Loaded ${data.urlCount} URLs`);
      section.querySelector('#totalUrls').textContent = data.urlCount;
      section.querySelector('#uniqueDomains').textContent = new Set(originalUrls.map(u => new URL(u.loc).hostname)).size;
      section.querySelectorAll('#exportHtmlBtn, #exportCsvBtn, #exportJsonBtn').forEach(btn => btn.disabled = false);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  };

  section.querySelector('#backBtn').addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    renderLayout();
    route('/');
  });

  section.querySelector('#collapseAllBtn').addEventListener('click', () => {
    treeView.toggleExpansion();
    section.querySelector('#collapseAllBtn').innerHTML = treeView.isExpanded 
      ? '<i class="fas fa-compress-alt"></i> Collapse All' 
      : '<i class="fas fa-expand-alt"></i> Expand All';
  });

  section.querySelector('#exportHtmlBtn').addEventListener('click', () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html><body><h1>Sitemap URLs</h1><ul>
      ${originalUrls.map(url => `<li><a href="${url.loc}">${url.loc}</a> (Last Modified: ${url.lastmod})</li>`).join('')}
      </ul></body></html>`;
    downloadFile(htmlContent, 'sitemap.html', 'text/html');
  });

  section.querySelector('#exportCsvBtn').addEventListener('click', () => {
    const csvContent = 'URL,Last Modified,Change Frequency,Priority\n' +
      originalUrls.map(url => `"${url.loc}","${url.lastmod}","${url.changefreq}","${url.priority}"`).join('\n');
    downloadFile(csvContent, 'sitemap.csv', 'text/csv');
  });

  section.querySelector('#exportJsonBtn').addEventListener('click', () => {
    const jsonContent = JSON.stringify(originalUrls, null, 2);
    downloadFile(jsonContent, 'sitemap.json', 'application/json');
  });

  section.querySelector('#themeToggleBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  section.querySelector('#toggleFiltersBtn').addEventListener('click', () => {
    const isExpanded = section.querySelector('#toggleFiltersBtn').getAttribute('aria-expanded') === 'true';
    section.querySelector('#toggleFiltersBtn').setAttribute('aria-expanded', !isExpanded);
    section.querySelector('#filters').classList.toggle('hidden');
  });

  section.querySelector('#applyFiltersBtn').addEventListener('click', () => {
    const filter = {
      priority: section.querySelector('#priorityFilter').value,
      lastmod: section.querySelector('#lastmodFilter').value,
    };
    const sortBy = section.querySelector('#sortBy').value;
    treeView.render(originalUrls, filter, sortBy);
    const filteredCount = treeContainer.querySelectorAll('li').length;
    section.querySelector('#matchCount').textContent = `(${filteredCount} of ${originalUrls.length} URLs)`;
  });

  section.querySelector('#resetFiltersBtn').addEventListener('click', () => {
    section.querySelector('#priorityFilter').value = '0';
    section.querySelector('#lastmodFilter').value = '';
    section.querySelector('#sortBy').value = 'url';
    section.querySelector('#urlSearch').value = '';
    treeView.render(originalUrls);
    section.querySelector('#matchCount').textContent = '';
  });

  section.querySelector('#urlSearch').addEventListener('input', () => {
    const searchTerm = section.querySelector('#urlSearch').value.toLowerCase();
    treeContainer.querySelectorAll('span').forEach(span => {
      span.classList.remove('highlight');
      if (searchTerm && span.textContent.toLowerCase().includes(searchTerm)) {
        span.classList.add('highlight');
        let parentUl = span.closest('ul');
        while (parentUl) {
          parentUl.classList.remove('hidden');
          const toggle = parentUl.previousElementSibling;
          if (toggle && toggle.classList.contains('toggle')) {
            toggle.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
          parentUl = parentUl.parentElement.closest('ul');
        }
      }
    });
  });

  loadSitemapData();
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}