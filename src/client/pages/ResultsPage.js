import { showLoading, hideLoading, showError, showFeedback } from '../utils/dom.js';
import { TreeView } from '../components/TreeView/TreeView.js';
import { DiagramView } from '../components/DiagramView/DiagramView.js';
import { Filters } from '../components/Filters/Filters.js';
import { PageTitle } from '../components/SitemapTitle/SitemapTitle.js'; // Assuming this is the correct path
import { Stats } from '../components/Stats/Stats.js';
import { headerInstance } from '../index.js';

export default function setupResultsPage(container) {
  container.innerHTML = `
    <div id="title-container"></div>
    <div id="stats-container"></div>
    <div id="filters-container">
      <div id="filters"></div>
    </div>
    <div id="tree" class="tree"></div>
    <div id="diagram" class="diagram hidden"></div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;

  const titleContainer = container.querySelector('#title-container');
  const statsContainer = container.querySelector('#stats-container');
  const filtersContainer = container.querySelector('#filters-container');
  const filtersElement = filtersContainer.querySelector('#filters');
  const treeContainer = container.querySelector('#tree');
  const diagramContainer = container.querySelector('#diagram');
  const pageTitle = new PageTitle(titleContainer);
  const stats = new Stats(statsContainer);
  const treeView = new TreeView(treeContainer);
  const diagramView = new DiagramView(diagramContainer);
  let originalUrls = [];
  let currentFilter = {};
  let currentSortBy = 'url';
  let currentSearchTerm = '';
  let currentView = 'tree';

  pageTitle.render('');
  stats.render();

  const filters = new Filters(filtersElement, {
    onApply: (filter, sortBy) => {
      currentFilter = filter;
      currentSortBy = sortBy;
      renderCurrentView();
      updateMatchCount();
    },
    onReset: () => {
      currentFilter = {};
      currentSortBy = 'url';
      currentSearchTerm = '';
      renderCurrentView();
      updateMatchCount();
    },
    onSearch: (searchTerm) => {
      currentSearchTerm = searchTerm;
      renderCurrentView();
      updateMatchCount();
    },
  });

  function renderCurrentView() {
    if (currentView === 'tree') {
      treeView.render(originalUrls, currentFilter, currentSortBy, currentSearchTerm);
      treeContainer.classList.remove('hidden');
      diagramContainer.classList.add('hidden');
    } else {
      console.log('Rendering DiagramView with URLs:', originalUrls.length);
      diagramView.render(originalUrls, currentFilter, currentSortBy, currentSearchTerm);
      diagramContainer.classList.remove('hidden');
      treeContainer.classList.add('hidden');
    }
  }

  function updateMatchCount() {
    const activeContainer = currentView === 'tree' ? treeContainer : diagramContainer;
    const filteredCount = activeContainer.querySelectorAll(
      currentView === 'tree' ? '.url-leaf' : '.node text.url-label'
    ).length;
    stats.update({ matchCount: `(${filteredCount} of ${originalUrls.length} URLs)` });
  }

  function setupViewToggle() {
    const treeViewBtn = titleContainer.querySelector('#treeViewBtn');
    const diagramViewBtn = titleContainer.querySelector('#diagramViewBtn');

    treeViewBtn.addEventListener('click', () => {
      if (currentView !== 'tree') {
        currentView = 'tree';
        treeViewBtn.classList.add('active');
        diagramViewBtn.classList.remove('active');
        renderCurrentView();
        updateMatchCount();
      }
    });

    diagramViewBtn.addEventListener('click', () => {
      if (currentView !== 'diagram') {
        currentView = 'diagram';
        diagramViewBtn.classList.add('active');
        treeViewBtn.classList.remove('active');
        renderCurrentView();
        updateMatchCount();
      }
    });
  }

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
      console.log('Loaded URLs:', originalUrls);
      showLoading(50);

      const topLevelDomain = originalUrls.length > 0 ? new URL(originalUrls[0].loc).hostname : 'Unknown';
      pageTitle.update(topLevelDomain);

      renderCurrentView();
      showLoading(100);
      showFeedback(`Loaded ${data.urlCount} URLs`);
      stats.update({
        totalUrls: data.urlCount,
        uniqueDomains: new Set(originalUrls.map(u => new URL(u.loc).hostname)).size,
      });
      headerInstance.updateUrls(originalUrls);
      updateMatchCount();
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  };

  loadSitemapData().then(setupViewToggle);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (currentView === 'diagram') {
        diagramView.destroy();
        diagramView.render(originalUrls, currentFilter, currentSortBy, currentSearchTerm);
      }
    }, 200);
  });

  return {
    treeView,
    onToggleFilters: (isExpanded) => {
      filters.toggleVisibility(isExpanded);
    },
    urls: originalUrls,
  };
}