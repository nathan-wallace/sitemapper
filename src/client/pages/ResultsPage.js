// src/client/pages/ResultsPage.js
import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';
import { TreeView } from '../components/TreeView.js';
import { route, headerInstance } from '../index.js';

export default function setupResultsPage(container) {
  container.innerHTML = `
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

  const treeContainer = container.querySelector('#tree');
  const treeView = new TreeView(treeContainer);
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
      container.querySelector('#totalUrls').textContent = data.urlCount;
      container.querySelector('#uniqueDomains').textContent = new Set(originalUrls.map(u => new URL(u.loc).hostname)).size;
      headerInstance.updateUrls(originalUrls); // Update header directly
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  };

  container.querySelector('#applyFiltersBtn').addEventListener('click', () => {
    const filter = {
      priority: container.querySelector('#priorityFilter').value,
      lastmod: container.querySelector('#lastmodFilter').value,
    };
    const sortBy = container.querySelector('#sortBy').value;
    treeView.render(originalUrls, filter, sortBy);
    const filteredCount = treeContainer.querySelectorAll('li').length;
    container.querySelector('#matchCount').textContent = `(${filteredCount} of ${originalUrls.length} URLs)`;
  });

  container.querySelector('#resetFiltersBtn').addEventListener('click', () => {
    container.querySelector('#priorityFilter').value = '0';
    container.querySelector('#lastmodFilter').value = '';
    container.querySelector('#sortBy').value = 'url';
    container.querySelector('#urlSearch').value = '';
    treeView.render(originalUrls);
    container.querySelector('#matchCount').textContent = '';
  });

  container.querySelector('#urlSearch').addEventListener('input', () => {
    const searchTerm = container.querySelector('#urlSearch').value.toLowerCase();
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

  return {
    treeView,
    onToggleFilters: (isExpanded) => {
      container.querySelector('#filters').classList.toggle('hidden', !isExpanded);
    },
    urls: originalUrls,
  };
}