import { showLoading, hideLoading } from '../utils/dom.js';

// TreeView component extracted from your results.js
export class TreeView {
  constructor(container) {
    this.container = container;
    this.isExpanded = true;
  }

  // Render tree from your buildTree function
  render(urls, filter = {}, sortBy = 'url') {
    showLoading(50);
    this.container.innerHTML = '';
    if (!urls || urls.length === 0) {
      this.container.textContent = 'No URLs found in sitemap.';
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

    const hierarchy = buildHierarchy(filteredUrls);
    const ul = document.createElement('ul');
    Object.keys(hierarchy)
      .sort((a, b) => a.localeCompare(b))
      .forEach((rootUrl) => {
        ul.appendChild(createTreeNode(rootUrl, hierarchy[rootUrl], sortBy, this.isExpanded));
      });
    this.container.appendChild(ul);
    hideLoading();
  }

  // Toggle expansion state from your toggleTreeExpansion
  toggleExpansion() {
    const toggles = this.container.querySelectorAll('.toggle');
    this.isExpanded = !this.isExpanded;
    toggles.forEach((toggle) => {
      const ul = toggle.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        ul.classList.toggle('hidden', !this.isExpanded);
        toggle.classList.toggle('open', this.isExpanded);
        toggle.setAttribute('aria-expanded', this.isExpanded);
      }
    });
  }
}

// Build hierarchy from your buildTree function
function buildHierarchy(urls) {
  const hierarchy = {};
  urls.forEach(({ loc, lastmod, changefreq, priority }) => {
    const urlObj = new URL(loc);
    const rootUrl = `${urlObj.origin}/`;
    if (!hierarchy[rootUrl]) hierarchy[rootUrl] = { children: {}, details: {} };
    let current = hierarchy[rootUrl];
    const parts = loc.replace(rootUrl, '').split('/').filter(Boolean);
    if (parts.length === 0) {
      current.details = { lastmod, changefreq, priority };
    } else {
      parts.forEach((part, i) => {
        const fullPath = rootUrl + parts.slice(0, i + 1).join('/');
        if (!current.children[fullPath]) current.children[fullPath] = { children: {}, details: {} };
        if (i === parts.length - 1) current.children[fullPath].details = { lastmod, changefreq, priority };
        current = current.children[fullPath];
      });
    }
  });
  return hierarchy;
}

// Create tree node from your createTreeNode function
function createTreeNode(url, node, sortBy, expandAll) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = url;

  const children = Object.keys(node.children);
  if (children.length > 0) {
    span.className = 'toggle';
    span.setAttribute('aria-expanded', expandAll ? 'true' : 'false');
    if (expandAll) span.classList.add('open');
    const ul = document.createElement('ul');
    children.sort((a, b) => a.localeCompare(b)).forEach((childUrl) => {
      ul.appendChild(createTreeNode(childUrl, node.children[childUrl], sortBy, expandAll));
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