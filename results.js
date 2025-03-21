(() => {
    const state = {
        originalUrls: [],
        currentHierarchy: null,
        currentSortBy: 'url'
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
        toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
        totalUrls: document.getElementById('totalUrls'),
        uniqueDomains: document.getElementById('uniqueDomains'),
        priorityFilter: document.getElementById('priorityFilter'),
        lastmodFilter: document.getElementById('lastmodFilter'),
        sortBy: document.getElementById('sortBy'),
        applyFiltersBtn: document.getElementById('applyFiltersBtn'),
        resetFiltersBtn: document.getElementById('resetFiltersBtn'),
        urlSearch: document.getElementById('urlSearch'),
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        matchCount: document.getElementById('matchCount')
    };

    function showLoading(progress = 0) {
        elements.loading.classList.remove('hidden');
        elements.loadProgress.value = progress;
        elements.error.classList.add('hidden');
        elements.feedback.classList.add('hidden');
    }

    function hideLoading() {
        elements.loading.classList.add('hidden');
    }

    function showFeedback(message) {
        hideLoading();
        elements.feedback.textContent = message;
        elements.feedback.classList.remove('hidden');
        elements.error.classList.add('hidden');
    }

    function showError(message) {
        hideLoading();
        elements.error.textContent = message;
        elements.error.classList.remove('hidden');
        elements.feedback.classList.add('hidden');
    }

    function enableExportButtons() {
        elements.exportHtmlBtn.disabled = false;
        elements.exportCsvBtn.disabled = false;
        elements.exportJsonBtn.disabled = false;
    }

    function disableExportButtons() {
        elements.exportHtmlBtn.disabled = true;
        elements.exportCsvBtn.disabled = true;
        elements.exportJsonBtn.disabled = true;
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
            const response = await fetch(`/results-data?id=${id}`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to load sitemap data');
            }
            const data = await response.json();
            state.originalUrls = data.urls;
            showLoading(50);
            buildTree(state.originalUrls);
            showLoading(100);
            showFeedback(`Loaded ${data.urlCount} URLs`);
        } catch (error) {
            showError(`Error: ${error.message}`);
        }
    }

    function buildTree(urls, filter = {}, sortBy = 'url', expandAll = false) {
        // Store the current expanded state before rebuilding
        const expandedNodes = new Set();
        if (!expandAll) {
            document.querySelectorAll('.tree .toggle.open').forEach(toggle => {
                expandedNodes.add(toggle.textContent);
            });
        }

        elements.tree.innerHTML = '';
        if (!urls || urls.length === 0) {
            elements.tree.textContent = 'No URLs found in sitemap.';
            elements.matchCount.textContent = '';
            disableExportButtons();
            hideLoading();
            return;
        }

        const filteredUrls = urls.filter(({ priority, lastmod }) => {
            const minPriority = parseFloat(filter.priority || 0);
            const lastmodDate = filter.lastmod ? new Date(filter.lastmod) : null;
            return (priority === 'N/A' || parseFloat(priority) >= minPriority) &&
                   (!lastmodDate || (lastmod !== 'N/A' && new Date(lastmod) >= lastmodDate));
        });

        elements.matchCount.textContent = `(${filteredUrls.length} of ${urls.length} URLs)`;

        if (filteredUrls.length === 0) {
            elements.tree.textContent = 'No URLs match the current filters.';
            disableExportButtons();
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
            if (sortBy === 'priority') {
                const pa = hierarchy[a].details.priority !== 'N/A' ? parseFloat(hierarchy[a].details.priority) : 0;
                const pb = hierarchy[b].details.priority !== 'N/A' ? parseFloat(hierarchy[b].details.priority) : 0;
                return pb - pa;
            } else if (sortBy === 'lastmod') {
                const da = hierarchy[a].details.lastmod !== 'N/A' ? new Date(hierarchy[a].details.lastmod) : 0;
                const db = hierarchy[b].details.lastmod !== 'N/A' ? new Date(hierarchy[b].details.lastmod) : 0;
                return db - da;
            }
            return a.localeCompare(b);
        });

        sortedRoots.forEach((rootUrl) => {
            ul.appendChild(createTreeNode(rootUrl, hierarchy[rootUrl], sortBy, expandedNodes, expandAll));
        });
        elements.tree.appendChild(ul);

        elements.totalUrls.textContent = filteredUrls.length;
        const domains = new Set(filteredUrls.map(({ loc }) => new URL(loc).hostname));
        elements.uniqueDomains.textContent = domains.size;

        state.currentHierarchy = hierarchy;
        state.currentSortBy = sortBy;
        enableExportButtons();
        hideLoading();
    }

    function createTreeNode(url, node, sortBy, expandedNodes, expandAll) {
        const li = document.createElement('li');
        li.setAttribute('role', 'treeitem');
        const span = document.createElement('span');
        span.textContent = url;

        const children = Object.keys(node.children);
        if (children.length > 0) {
            span.className = 'toggle';
            const shouldExpand = expandAll || expandedNodes.has(url);
            span.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
            if (shouldExpand) span.classList.add('open');
            const ul = document.createElement('ul');
            ul.setAttribute('role', 'group');
            if (!shouldExpand) ul.classList.add('hidden');
            const sortedChildren = children.sort((a, b) => {
                if (sortBy === 'priority') {
                    const pa = node.children[a].details.priority !== 'N/A' ? parseFloat(node.children[a].details.priority) : 0;
                    const pb = node.children[b].details.priority !== 'N/A' ? parseFloat(node.children[b].details.priority) : 0;
                    return pb - pa;
                } else if (sortBy === 'lastmod') {
                    const da = node.children[a].details.lastmod !== 'N/A' ? new Date(node.children[a].details.lastmod) : 0;
                    const db = node.children[b].details.lastmod !== 'N/A' ? new Date(node.children[b].details.lastmod) : 0;
                    return db - da;
                }
                return a.localeCompare(b);
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

    function exportHtmlReport() {
        const treeHtml = elements.tree.innerHTML;
        const dateGenerated = new Date().toLocaleString();

        const reportHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Sitemap HTML Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { font-size: 1.5em; }
                    .tree ul { list-style-type: none; padding-left: 20px; }
                    .tree li { margin: 8px 0; }
                    .toggle { cursor: pointer; user-select: none; display: flex; align-items: center; }
                    .toggle::before { content: '▶'; margin-right: 5px; color: #333; }
                    .toggle.open::before { content: '▼'; }
                    .details { font-size: 0.85em; color: #666; margin-left: 10px; }
                    .hidden { display: none; }
                    a { text-decoration: none; color: #007bff; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>Sitemap HTML Report</h1>
                <p><strong>Date Generated:</strong> ${dateGenerated}</p>
                <div class="tree">${treeHtml}</div>
                <script>
                    document.querySelectorAll('.toggle').forEach((toggle) => {
                        toggle.addEventListener('click', () => {
                            const ul = toggle.nextElementSibling;
                            if (ul && ul.tagName === 'UL') {
                                ul.classList.toggle('hidden');
                                toggle.classList.toggle('open');
                            }
                        });
                    });
                    document.querySelectorAll('.tree ul ul').forEach((ul) => ul.classList.add('hidden'));
                    document.querySelectorAll('.toggle').forEach((el) => {
                        const url = el.textContent.trim();
                        el.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
                    });
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([reportHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap-report.html';
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportCsvReport() {
        if (!state.currentHierarchy) {
            showError('No sitemap loaded to export.');
            return;
        }

        const csvRows = ['Level,URL,Priority,Last Modified,Change Frequency'];
        const flattenHierarchy = (hierarchy, sortBy, level = 0) => {
            const rows = [];
            const sortedKeys = Object.keys(hierarchy).sort((a, b) => {
                if (sortBy === 'priority') {
                    const pa = hierarchy[a].details.priority !== 'N/A' ? parseFloat(hierarchy[a].details.priority) : 0;
                    const pb = hierarchy[b].details.priority !== 'N/A' ? parseFloat(hierarchy[b].details.priority) : 0;
                    return pb - pa;
                } else if (sortBy === 'lastmod') {
                    const da = hierarchy[a].details.lastmod !== 'N/A' ? new Date(hierarchy[a].details.lastmod) : 0;
                    const db = hierarchy[b].details.lastmod !== 'N/A' ? new Date(hierarchy[b].details.lastmod) : 0;
                    return db - da;
                }
                return a.localeCompare(b);
            });

            sortedKeys.forEach(url => {
                const node = hierarchy[url];
                rows.push(`"${level}","${url}",${node.details.priority || 'N/A'},${node.details.lastmod || 'N/A'},${node.details.changefreq || 'N/A'}`);
                if (Object.keys(node.children).length > 0) {
                    rows.push(...flattenHierarchy(node.children, sortBy, level + 1));
                }
            });

            return rows;
        };

        csvRows.push(...flattenHierarchy(state.currentHierarchy, state.currentSortBy));
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap-report.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportJsonReport() {
        if (!state.currentHierarchy) {
            showError('No sitemap loaded to export.');
            return;
        }

        const hierarchyToJson = (hierarchy, sortBy) => {
            const result = [];
            const sortedKeys = Object.keys(hierarchy).sort((a, b) => {
                if (sortBy === 'priority') {
                    const pa = hierarchy[a].details.priority !== 'N/A' ? parseFloat(hierarchy[a].details.priority) : 0;
                    const pb = hierarchy[b].details.priority !== 'N/A' ? parseFloat(hierarchy[b].details.priority) : 0;
                    return pb - pa;
                } else if (sortBy === 'lastmod') {
                    const da = hierarchy[a].details.lastmod !== 'N/A' ? new Date(hierarchy[a].details.lastmod) : 0;
                    const db = hierarchy[b].details.lastmod !== 'N/A' ? new Date(hierarchy[b].details.lastmod) : 0;
                    return db - da;
                }
                return a.localeCompare(b);
            });

            sortedKeys.forEach(url => {
                const node = hierarchy[url];
                const jsonNode = {
                    url,
                    priority: node.details.priority,
                    lastmod: node.details.lastmod,
                    changefreq: node.details.changefreq,
                    children: hierarchyToJson(node.children, sortBy)
                };
                result.push(jsonNode);
            });

            return result;
        };

        const jsonData = {
            generated: new Date().toISOString(),
            sitemap: hierarchyToJson(state.currentHierarchy, state.currentSortBy)
        };
        const jsonContent = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap-report.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function resetFilters() {
        elements.priorityFilter.value = '0';
        elements.lastmodFilter.value = '';
        elements.sortBy.value = 'url';
        elements.urlSearch.value = '';
        buildTree(state.originalUrls);
        document.querySelectorAll('.tree span').forEach(span => span.classList.remove('highlight'));
    }

    function collapseAll() {
        document.querySelectorAll('.tree .toggle').forEach(toggle => {
            const ul = toggle.nextElementSibling;
            if (ul && ul.tagName === 'UL') {
                ul.classList.add('hidden');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function expandAll() {
        document.querySelectorAll('.tree .toggle').forEach(toggle => {
            const ul = toggle.nextElementSibling;
            if (ul && ul.tagName === 'UL') {
                ul.classList.remove('hidden');
                toggle.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    elements.backBtn.addEventListener('click', () => window.location.href = '/');
    elements.exportHtmlBtn.addEventListener('click', exportHtmlReport);
    elements.exportCsvBtn.addEventListener('click', exportCsvReport);
    elements.exportJsonBtn.addEventListener('click', exportJsonReport);
    elements.collapseAllBtn.addEventListener('click', collapseAll);
    elements.themeToggleBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    elements.toggleSidebarBtn.addEventListener('click', () => elements.sidebar.classList.toggle('hidden-mobile'));
    elements.applyFiltersBtn.addEventListener('click', () => {
        const filter = {
            priority: elements.priorityFilter.value,
            lastmod: elements.lastmodFilter.value
        };
        const sortBy = elements.sortBy.value;
        buildTree(state.originalUrls, filter, sortBy, true); // Expand all when applying filters
        expandAll(); // Ensure all nodes are expanded after build
    });
    elements.resetFiltersBtn.addEventListener('click', resetFilters);
    elements.urlSearch.addEventListener('input', () => {
        const searchTerm = elements.urlSearch.value.toLowerCase();
        document.querySelectorAll('.tree span').forEach(span => {
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

    loadSitemapData();
    hideLoading();
})();