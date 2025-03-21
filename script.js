(() => {
    const state = {
        loading: false,
        error: null,
        currentHierarchy: null,
        currentSortBy: 'url'
    };

    const elements = {
        sitemapUrl: document.getElementById('sitemapUrl'),
        loadUrlBtn: document.getElementById('loadUrlBtn'),
        sitemapFile: document.getElementById('sitemapFile'),
        uploadFileBtn: document.getElementById('uploadFileBtn'),
        exportHtmlBtn: document.getElementById('exportHtmlBtn'),
        exportCsvBtn: document.getElementById('exportCsvBtn'),
        exportJsonBtn: document.getElementById('exportJsonBtn'),
        clearCacheBtn: document.getElementById('clearCacheBtn'),
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
        collapseAllBtn: document.getElementById('collapseAllBtn')
    };

    function showLoading(progress = 0) {
        state.loading = true;
        elements.loading.classList.remove('hidden');
        elements.loadProgress.value = progress;
        elements.error.classList.add('hidden');
        elements.feedback.classList.add('hidden');
        console.log('Loading shown, progress:', progress);
    }

    function hideLoading() {
        state.loading = false;
        elements.loading.classList.add('hidden');
        console.log('Loading hidden');
    }

    function showFeedback(message) {
        hideLoading(); // Ensure loading is hidden before feedback
        elements.feedback.textContent = message;
        elements.feedback.classList.remove('hidden');
        elements.error.classList.add('hidden');
        console.log('Feedback shown:', message);
    }

    function showError(message) {
        hideLoading(); // Ensure loading is hidden before error
        state.error = message;
        let displayMessage = message;
        if (message.includes('HTTP 403')) {
            displayMessage = 'Request blocked by server (403 Forbidden). Try a different URL.';
        } else if (message.includes('HTTP')) {
            displayMessage = `Request failed: ${message}. Check the URL and try again.`;
        } else if (message === 'Please enter a sitemap URL') {
            displayMessage = 'Please enter a valid sitemap URL (e.g., https://example.com/sitemap.xml).';
        }
        elements.error.textContent = displayMessage;
        elements.error.classList.remove('hidden');
        elements.feedback.classList.add('hidden');
        console.log('Error shown:', displayMessage);
    }

    function getCachedSitemap(url) {
        const cached = localStorage.getItem(`sitemap:${url}`);
        return cached ? JSON.parse(cached) : null;
    }

    function setCachedSitemap(url, urls) {
        try {
            localStorage.setItem(`sitemap:${url}`, JSON.stringify(urls));
            enableExportButtons();
        } catch (e) {
            console.error('Local Storage full or error:', e);
            showError('Failed to cache sitemap: storage limit reached. Clear cache to continue.');
        }
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

    async function submitSitemapUrl() {
        const url = elements.sitemapUrl.value.trim();
        if (!url) return showError('Please enter a sitemap URL');

        const cachedUrls = getCachedSitemap(url);
        if (cachedUrls) {
            console.log(`Using cached data for ${url}`);
            buildTree(cachedUrls);
            showFeedback(`Processed ${cachedUrls.length} URLs from cache for ${url}`);
            return;
        }

        showLoading(10);
        try {
            const response = await fetch('/sitemap-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch sitemap');
            }
            const data = await response.json();
            showLoading(50);
            setCachedSitemap(url, data.urls);
            buildTree(data.urls);
            showLoading(100);
            showFeedback(`Processed ${data.urlCount} URLs for ${url}`);
        } catch (error) {
            showError(`Error: ${error.message}`);
        }
    }

    async function uploadSitemapFile() {
        const file = elements.sitemapFile.files[0];
        if (!file) return showError('Please select a sitemap file');

        showLoading(10);
        const formData = new FormData();
        formData.append('sitemapFile', file);
        try {
            const response = await fetch('/sitemap-upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to upload sitemap');
            }
            const data = await response.json();
            showLoading(50);
            setCachedSitemap(file.name, data.urls);
            buildTree(data.urls);
            showLoading(100);
            showFeedback(`Processed ${data.urlCount} URLs from uploaded file ${file.name}`);
        } catch (error) {
            showError(`Error: ${error.message}`);
        }
    }

    function buildTree(urls, filter = {}, sortBy = 'url') {
        elements.tree.innerHTML = '';
        if (!urls || urls.length === 0) {
            elements.tree.textContent = 'No URLs found in sitemap.';
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
            ul.appendChild(createTreeNode(rootUrl, hierarchy[rootUrl], sortBy));
        });
        elements.tree.appendChild(ul);

        elements.totalUrls.textContent = filteredUrls.length;
        const domains = new Set(filteredUrls.map(({ loc }) => new URL(loc).hostname));
        elements.uniqueDomains.textContent = domains.size;

        state.currentHierarchy = hierarchy;
        state.currentSortBy = sortBy;
        enableExportButtons();
    }

    function createTreeNode(url, node, sortBy) {
        const li = document.createElement('li');
        li.setAttribute('role', 'treeitem');
        const span = document.createElement('span');
        span.textContent = url;

        const children = Object.keys(node.children);
        if (children.length > 0) {
            span.className = 'toggle';
            span.setAttribute('aria-expanded', 'false');
            const ul = document.createElement('ul');
            ul.classList.add('hidden');
            ul.setAttribute('role', 'group');
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
                ul.appendChild(createTreeNode(childUrl, node.children[childUrl], sortBy));
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

    function clearCache() {
        const url = elements.sitemapUrl.value.trim();
        if (url) {
            localStorage.removeItem(`sitemap:${url}`);
            alert(`Cache cleared for ${url}`);
        } else {
            localStorage.clear();
            alert('All sitemap caches cleared');
        }
        buildTree([]);
        disableExportButtons();
    }

    function resetFilters() {
        elements.priorityFilter.value = '0';
        elements.lastmodFilter.value = '';
        elements.sortBy.value = 'url';
        elements.urlSearch.value = '';
        const cachedUrls = getCachedSitemap(elements.sitemapUrl.value.trim()) || [];
        buildTree(cachedUrls, {}, 'url');
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

    document.getElementById('controls').addEventListener('click', (e) => {
        const target = e.target;
        if (target === elements.loadUrlBtn) submitSitemapUrl();
        else if (target === elements.uploadFileBtn) uploadSitemapFile();
        else if (target === elements.exportHtmlBtn) exportHtmlReport();
        else if (target === elements.exportCsvBtn) exportCsvReport();
        else if (target === elements.exportJsonBtn) exportJsonReport();
        else if (target === elements.clearCacheBtn) clearCache();
        else if (target === elements.collapseAllBtn) collapseAll();
    });

    elements.themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
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

    elements.toggleSidebarBtn.addEventListener('click', () => {
        elements.sidebar.classList.toggle('hidden-mobile');
    });

    elements.applyFiltersBtn.addEventListener('click', () => {
        const filter = {
            priority: elements.priorityFilter.value,
            lastmod: elements.lastmodFilter.value
        };
        const sortBy = elements.sortBy.value;
        const cachedUrls = getCachedSitemap(elements.sitemapUrl.value.trim()) || [];
        buildTree(cachedUrls, filter, sortBy);
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === elements.sitemapUrl) submitSitemapUrl();
        if (e.ctrlKey && e.key === 'e' && state.currentHierarchy) exportHtmlReport();
    });

    // Ensure loading is hidden on page load
    hideLoading();
})();