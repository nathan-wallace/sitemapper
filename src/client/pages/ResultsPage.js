import renderExportButtons from '../components/ExportButtons.js';
import { TreeView } from '../components/TreeView.js';
import renderSearchFilters from '../components/SearchFilters.js';
import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';

let currentTree = null;
let originalUrls = [];

export default function setupResultsPage(container) {
  const section = document.createElement('section');
  section.innerHTML = `
    <div id="search-and-filters">
      <div id="search"></div>
      <button id="toggleFiltersBtn" aria-expanded="false" aria-controls="filters">
        <span class="fa fa-caret-down"></span> Toggle Filters
      </button>
      <div id="filters" class="hidden"></div>
    </div>
    <div id="stats"></div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
    <div class="container">
      <main>
        <div id="treeView"></div>
      </main>
    </div>
  `;
  container.appendChild(section);

  const filtersContainer = section.querySelector('#filters');
  const toggleFiltersBtn = section.querySelector('#toggleFiltersBtn');

  toggleFiltersBtn?.addEventListener('click', () => {
    const expanded = toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
    toggleFiltersBtn.setAttribute('aria-expanded', String(!expanded));
    filtersContainer?.classList.toggle('hidden');
  });

  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    showError('Missing ID in URL');
    return;
  }

  showLoading();

  fetch(`/results-data?id=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to load results data.');
      }
      return res.json();
    })
    .then((data) => {
      hideLoading();
      if (!Array.isArray(data.urls) || data.urls.length === 0) {
        showError('No results found.');
        return;
      }

      originalUrls = data.urls;
      const treeContainer = section.querySelector('#treeView');

      currentTree = new TreeView(treeContainer);
      currentTree.render(originalUrls);

      // Attach export button listeners after data is loaded
      renderExportButtons({
        urls: originalUrls,
        treeContainer,
        filtersContainer,
        id
      });

      renderSearchFilters(originalUrls, filtersContainer);
      section.querySelector('#stats').innerHTML = `<p>Total URLs: ${originalUrls.length}</p>`;
    })
    .catch((err) => {
      hideLoading();
      showError(`Error loading data: ${err.message}`);
    });
}