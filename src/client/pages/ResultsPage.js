// src/client/pages/ResultsPage.js
export default function setupResultsPage() {
    const state = {
      originalUrls: [],
      currentHierarchy: null,
      currentSortBy: 'url',
      isTreeExpanded: true,
    };
  
    const elements = {
      backBtn: document.getElementById('backBtn'),
      exportHtmlBtn: document.getElementById('exportHtmlBtn'),
      exportCsvBtn: document.getElementById('exportCsvBtn'),
      exportJsonBtn: document.getElementById('exportJsonBtn'),
      collapseAllBtn: document.getElementById('collapseAllBtn'),
      feedback: document.getElementById('feedback'),
      loading: document.getElementById('loading'),
      loadProgress: document.getElementById('loadProgress'),
      error: document.getElementById('error'),
      tree: document.getElementById('tree'),
      totalUrls: document.getElementById('totalUrls'),
      uniqueDomains: document.getElementById('uniqueDomains'),
      priorityFilter: document.getElementById('priorityFilter'),
      lastmodFilter: document.getElementById('lastmodFilter'),
      sortBy: document.getElementById('sortBy'),
      applyFiltersBtn: document.getElementById('applyFiltersBtn'),
      resetFiltersBtn: document.getElementById('resetFiltersBtn'),
      urlSearch: document.getElementById('urlSearch'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      matchCount: document.getElementById('matchCount'),
      toggleFiltersBtn: document.getElementById('toggleFiltersBtn'),
      filters: document.getElementById('filters'),
    };
  
    function showLoading(progress = 0) {
      if (elements.loading) {
        elements.loading.classList.remove('hidden');
        elements.loadProgress.value = progress;
        elements.error.classList.add('hidden');
        elements.feedback.classList.add('hidden');
      }
    }
  
    function hideLoading() {
      if (elements.loading) elements.loading.classList.add('hidden');
    }
  
    function showFeedback(message) {
      hideLoading();
      if (elements.feedback) {
        elements.feedback.textContent = message;
        elements.feedback.classList.remove('hidden');
        elements.error.classList.add('hidden');
      }
    }
  
    function showError(message) {
      hideLoading();
      if (elements.error) {
        elements.error.textContent = message;
        elements.error.classList.remove('hidden');
        elements.feedback.classList.add('hidden');
      }
    }
  
    function enableExportButtons() {
      if (elements.exportHtmlBtn) elements.exportHtmlBtn.disabled = false;
      if (elements.exportCsvBtn) elements.exportCsvBtn.disabled = false;
      if (elements.exportJsonBtn) elements.exportJsonBtn.disabled = false;
    }
  
    async function loadSitemapData() {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (!id) {
        showError('No sitemap ID provided. Please load a sitemap first.');
        return;
      }
  
      showLoading(10);
      try {
        console.log(`Fetching data for ID: ${id}`);
        const response = await fetch(`/sitemap/results-data?id=${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to load sitemap data');
        }
        const data = await response.json();
        console.log('Received data:', data);
        state.originalUrls = data.urls;
        showLoading(50);
        buildTree(state.originalUrls, {}, 'url', true);
        showLoading(100);
        showFeedback(`Loaded ${data.urlCount} URLs`);
        enableExportButtons();
      } catch (error) {
        console.error('Load error:', error);
        showError(`Error: ${error.message}`);
      }
    }
  
    function buildTree(urls, filter = {}, sortBy = 'url', expandAll = false) {
      console.log('Building tree with URLs:', urls.length);
      if (!elements.tree) {
        console.error('Tree element not found');
        return;
      }
      elements.tree.innerHTML = '';
      if (!urls || urls.length === 0) {
        elements.tree.textContent = 'No URLs found in sitemap.';
        elements.matchCount.textContent = '';
        hideLoading();
        return;
      }
  
      const filteredUrls = urls.filter(({ priority, lastmod }) => {
        const minPriority = parseFloat(filter.priority || 0);
        const lastmodDate = filter.lastmod ? new Date(filter.lastmod) : null;
        return (
          (priority === 'N/A' || parseFloat(priority) >= minPriority) &&
          (!lastmodDate || (lastmod !== 'N/A' && new Date(lastmod) >= lastmodDate))
        );
      });
  
      if (elements.matchCount) {
        elements.matchCount.textContent = `(${filteredUrls.length} of ${urls.length} URLs)`;
      }
  
      if (filteredUrls.length === 0) {
        elements.tree.textContent = 'No URLs match the current filters.';
        hideLoading();
        return;
      }
  
      const hierarchy = {};
      filteredUrls.forEach(({ loc, lastmod, changefreq, priority }) => {
        const urlObj = new URL(loc);
        const rootUrl = `${urlObj.origin}/`;
        if (!hierarchy[rootUrl]) {
          hierarchy[rootUrl] = { children: {}, details: {} };
        }
        let current = hierarchy[rootUrl];
        const parts = loc.replace(rootUrl, '').split('/').filter(Boolean);
  
        if (parts.length === 0) {
          current.details = { lastmod, changefreq, priority };
        } else {
          parts.forEach((part, i) => {
            const fullPath = rootUrl + parts.slice(0, i + 1).join('/');
            if (!current.children[fullPath]) {
              current.children[fullPath] = { children: {}, details: {} };
            }
            if (i === parts.length - 1) {
              current.children[fullPath].details = { lastmod, changefreq, priority };
            }
            current = current.children[fullPath];
          });
        }
      });
  
      const ul = document.createElement('ul');
      const sortedRoots = Object.keys(hierarchy).sort((a, b) => {
        if (sortBy === 'lastmod') {
          const aLastmod = hierarchy[a].details.lastmod || 'N/A';
          const bLastmod = hierarchy[b].details.lastmod || 'N/A';
          return aLastmod === 'N/A' ? 1 : bLastmod === 'N/A' ? -1 : new Date(bLastmod) - new Date(aLastmod);
        } else if (sortBy === 'priority') {
          const aPriority = hierarchy[a].details.priority || 'N/A';
          const bPriority = hierarchy[b].details.priority || 'N/A';
          return aPriority === 'N/A' ? 1 : bPriority === 'N/A' ? -1 : parseFloat(bPriority) - parseFloat(aPriority);
        }
        return a.localeCompare(b); // Default 'url'
      });
      sortedRoots.forEach((rootUrl) => {
        ul.appendChild(createTreeNode(rootUrl, hierarchy[rootUrl], sortBy, new Set(), expandAll));
      });
      console.log('Appending tree to DOM');
      elements.tree.appendChild(ul);
      if (elements.totalUrls) elements.totalUrls.textContent = filteredUrls.length;
      if (elements.uniqueDomains) {
        const domains = new Set(filteredUrls.map(({ loc }) => new URL(loc).hostname));
        elements.uniqueDomains.textContent = domains.size;
      }
      state.isTreeExpanded = expandAll;
      updateCollapseExpandButton();
      hideLoading();
    }
  
    function createTreeNode(url, node, sortBy, expandedNodes, expandAll) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = url;
  
      const children = Object.keys(node.children);
      if (children.length > 0) {
        span.className = 'toggle';
        span.setAttribute('aria-expanded', expandAll ? 'true' : 'false');
        if (expandAll) span.classList.add('open');
        const ul = document.createElement('ul');
        const sortedChildren = children.sort((a, b) => {
          if (sortBy === 'lastmod') {
            const aLastmod = node.children[a].details.lastmod || 'N/A';
            const bLastmod = node.children[b].details.lastmod || 'N/A';
            return aLastmod === 'N/A' ? 1 : bLastmod === 'N/A' ? -1 : new Date(bLastmod) - new Date(aLastmod);
          } else if (sortBy === 'priority') {
            const aPriority = node.children[a].details.priority || 'N/A';
            const bPriority = node.children[b].details.priority || 'N/A';
            return aPriority === 'N/A' ? 1 : bPriority === 'N/A' ? -1 : parseFloat(bPriority) - parseFloat(aPriority);
          }
          return a.localeCompare(b); // Default 'url'
        });
        sortedChildren.forEach((childUrl) => {
          ul.appendChild(createTreeNode(childUrl, node.children[childUrl], sortBy, expandedNodes, expandAll));
        });
        li.appendChild(span);
        li.appendChild(ul);
      } else {
        li.appendChild(span);
      }
  
      if (node.details.lastmod && node.details.lastmod !== 'N/A') {
        const details = document.createElement('span');
        details.className = 'details';
        details.textContent = ` (Priority: ${node.details.priority}, Last Modified: ${node.details.lastmod}, ${node.details.changefreq})`;
        li.appendChild(details);
      }
  
      return li;
    }
  
    function updateCollapseExpandButton() {
      if (elements.collapseAllBtn) {
        if (state.isTreeExpanded) {
          elements.collapseAllBtn.innerHTML = '<i class="fas fa-compress-alt"></i> Collapse All';
        } else {
          elements.collapseAllBtn.innerHTML = '<i class="fas fa-expand-alt"></i> Expand All';
        }
      }
    }
  
    function toggleTreeExpansion() {
      const toggles = document.querySelectorAll('.tree .toggle');
      if (state.isTreeExpanded) {
        toggles.forEach((toggle) => {
          const ul = toggle.nextElementSibling;
          if (ul && ul.tagName === 'UL') {
            ul.classList.add('hidden');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
        state.isTreeExpanded = false;
      } else {
        toggles.forEach((toggle) => {
          const ul = toggle.nextElementSibling;
          if (ul && ul.tagName === 'UL') {
            ul.classList.remove('hidden');
            toggle.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
        state.isTreeExpanded = true;
      }
      updateCollapseExpandButton();
    }
  
    function exportHtmlReport() {
      const treeHtml = elements.tree.innerHTML;
      const dateGenerated = new Date().toLocaleString();
      const totalUrls = state.originalUrls.length;
      const uniqueDomains = new Set(state.originalUrls.map(({ loc }) => new URL(loc).hostname)).size;
  
      const minPriority = elements.priorityFilter?.value || '0';
      const lastmodAfter = elements.lastmodFilter?.value || '';
      const sortBy = elements.sortBy?.value || 'url';
      const isFiltered = minPriority !== '0' || lastmodAfter !== '' || sortBy !== 'url';
  
      let filterSummary = '';
      if (isFiltered) {
        filterSummary = `
          <p><strong>Filters Applied:</strong></p>
          <ul>
            ${minPriority !== '0' ? `<li>Minimum Priority: ${minPriority}</li>` : ''}
            ${lastmodAfter ? `<li>Last Modified After: ${lastmodAfter}</li>` : ''}
            ${sortBy !== 'url' ? `<li>Sort By: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</li>` : ''}
          </ul>
          <p><em>To view all URLs, clear filters in the app and re-export.</em></p>
        `;
      }
  
      const reportHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sitemap Report - ${dateGenerated}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; color: #333; line-height: 1.6; }
            .container { max-width: 1200px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #007bff; font-size: 2em; margin-bottom: 10px; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
            .metadata { margin-bottom: 20px; font-size: 0.95em; color: #555; }
            .metadata p { margin: 5px 0; }
            .metadata ul { padding-left: 20px; margin: 5px 0; }
            .metadata em { color: #777; font-style: italic; }
            .tree ul { list-style-type: none; padding-left: 20px; }
            .tree li { margin: 8px 0; }
            .toggle { cursor: pointer; user-select: none; display: inline-flex; align-items: center; padding: 6px 10px; background: #f1f1f1; border-radius: 4px; }
            .toggle:hover { background: #e0e0e0; }
            .toggle::before { content: '▶'; margin-right: 5px; color: #007bff; }
            .toggle.open::before { content: '▼'; }
            .details { font-size: 0.85em; color: #666; margin-left: 10px; }
            .hidden { display: none; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; color: #0056b3; }
            footer { margin-top: 20px; text-align: center; font-size: 0.9em; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Sitemap Report</h1>
            <div class="metadata">
              <p><strong>Date Generated:</strong> ${dateGenerated}</p>
              <p><strong>Total URLs:</strong> ${totalUrls}</p>
              <p><strong>Unique Domains:</strong> ${uniqueDomains}</p>
              ${filterSummary}
            </div>
            <div class="tree">${treeHtml}</div>
            <footer>Generated by Sitemap Explorer v1.0</footer>
          </div>
          <script>
            document.querySelectorAll('.toggle').forEach((toggle) => {
              const url = toggle.textContent.trim().split(' (')[0];
              const details = toggle.nextElementSibling?.classList.contains('details') 
                ? toggle.nextElementSibling.outerHTML 
                : '';
              toggle.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>' + details;
              toggle.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                  const ul = toggle.nextElementSibling?.classList.contains('details') 
                    ? toggle.nextElementSibling.nextElementSibling 
                    : toggle.nextElementSibling;
                  if (ul && ul.tagName === 'UL') {
                    ul.classList.toggle('hidden');
                    toggle.classList.toggle('open');
                  }
                }
              });
            });
            document.querySelectorAll('.toggle').forEach((toggle) => {
              const ul = toggle.nextElementSibling?.classList.contains('details') 
                ? toggle.nextElementSibling.nextElementSibling 
                : toggle.nextElementSibling;
              if (ul && ul.tagName === 'UL') {
                ul.classList.remove('hidden');
                toggle.classList.add('open');
              }
            });
          </script>
        </body>
        </html>
      `;
  
      const blob = new Blob([reportHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sitemap-report-${dateGenerated.replace(/[, :]/g, '-')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  
    function exportCsvReport() {
      const headers = 'URL,Last Modified,Change Frequency,Priority\n';
      const rows = state.originalUrls
        .map(({ loc, lastmod, changefreq, priority }) => `"${loc}","${lastmod}","${changefreq}","${priority}"`)
        .join('\n');
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  
    function exportJsonReport() {
      const jsonContent = JSON.stringify(state.originalUrls, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  
    if (elements.backBtn) {
      elements.backBtn.addEventListener('click', () => (window.location.href = '/'));
    }
    if (elements.exportHtmlBtn) {
      elements.exportHtmlBtn.addEventListener('click', exportHtmlReport);
    }
    if (elements.exportCsvBtn) {
      elements.exportCsvBtn.addEventListener('click', exportCsvReport);
    }
    if (elements.exportJsonBtn) {
      elements.exportJsonBtn.addEventListener('click', exportJsonReport);
    }
    if (elements.collapseAllBtn) {
      elements.collapseAllBtn.addEventListener('click', toggleTreeExpansion);
    }
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    }
    if (elements.toggleFiltersBtn) {
      elements.toggleFiltersBtn.addEventListener('click', () => {
        const isExpanded = elements.toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
        elements.toggleFiltersBtn.setAttribute('aria-expanded', !isExpanded);
        elements.filters?.classList.toggle('hidden');
      });
    }
    if (elements.applyFiltersBtn) {
      elements.applyFiltersBtn.addEventListener('click', () => {
        const filter = {
          priority: elements.priorityFilter?.value || '',
          lastmod: elements.lastmodFilter?.value || '',
        };
        const sortBy = elements.sortBy?.value || 'url';
        buildTree(state.originalUrls, filter, sortBy, state.isTreeExpanded);
      });
    }
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', () => {
        if (elements.priorityFilter) elements.priorityFilter.value = '0';
        if (elements.lastmodFilter) elements.lastmodFilter.value = '';
        if (elements.sortBy) elements.sortBy.value = 'url';
        if (elements.urlSearch) elements.urlSearch.value = '';
        buildTree(state.originalUrls, {}, 'url', state.isTreeExpanded);
        document.querySelectorAll('.tree span').forEach((span) => span.classList.remove('highlight'));
      });
    }
    if (elements.urlSearch) {
      elements.urlSearch.addEventListener('input', () => {
        const searchTerm = elements.urlSearch.value.toLowerCase();
        console.log('Search term:', searchTerm);
        document.querySelectorAll('.tree span').forEach((span) => {
          span.classList.remove('highlight');
          if (searchTerm && span.textContent.toLowerCase().includes(searchTerm)) {
            span.classList.add('highlight');
            let parentUl = span.closest('ul');
            while (parentUl) {
              parentUl.classList.remove('hidden');
              const parentToggle = parentUl.previousElementSibling;
              if (parentToggle && parentToggle.classList.contains('toggle')) {
                parentToggle.classList.add('open');
                parentToggle.setAttribute('aria-expanded', 'true');
              }
              parentUl = parentUl.parentElement.closest('ul');
            }
          }
        });
      });
    }
    if (elements.tree) {
      elements.tree.addEventListener('click', (e) => {
        const toggle = e.target.closest('.toggle');
        if (toggle) {
          const ul = toggle.nextElementSibling;
          if (ul && ul.tagName === 'UL') {
            ul.classList.toggle('hidden');
            const isOpen = !ul.classList.contains('hidden');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
          }
        }
      });
    }
  
    loadSitemapData();
  }