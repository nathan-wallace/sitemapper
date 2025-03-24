// src/client/components/TreeView.js
import { showLoading, hideLoading } from '../../utils/dom.js';
import './styles.css';

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export class TreeView {
  constructor(container) {
    this.container = container;
    this.isExpanded = true;
    this.expandedNodes = new Set();
    this.treeData = null;
    this.urls = [];
    this.listeners = new Map();
    this.renderControls();
  }

  renderControls() {
    const controls = document.createElement('div');
    controls.className = 'tree-controls';
    controls.innerHTML = `
      <button id="toggleExpansionBtn" aria-expanded="${this.isExpanded}" aria-label="${this.isExpanded ? 'Collapse all nodes' : 'Expand all nodes'}">
        <i class="fas fa-${this.isExpanded ? 'compress-alt' : 'expand-alt'}"></i> ${this.isExpanded ? 'Collapse All' : 'Expand All'}
      </button>
    `;
    this.container.appendChild(controls);
    this.setupControlListeners();
  }

  setupControlListeners() {
    this.cleanupListeners('controls');
    const toggleBtn = this.container.querySelector('#toggleExpansionBtn');
    if (toggleBtn) {
      const handler = () => this.toggleExpansion();
      toggleBtn.addEventListener('click', handler);
      this.listeners.set(toggleBtn, [['click', handler]]);
    }
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    const toggleBtn = this.container.querySelector('#toggleExpansionBtn');
    toggleBtn.innerHTML = `<i class="fas fa-${this.isExpanded ? 'compress-alt' : 'expand-alt'}"></i> ${this.isExpanded ? 'Collapse All' : 'Expand All'}`;
    toggleBtn.setAttribute('aria-expanded', this.isExpanded);
    toggleBtn.setAttribute('aria-label', this.isExpanded ? 'Collapse all nodes' : 'Expand all nodes');

    this.expandedNodes.clear();
    if (this.isExpanded) {
      this.buildExpandedNodes(this.treeData, '');
    }
    this.updateTreeVisibility();
  }

  buildExpandedNodes(node, parentPath) {
    Object.entries(node.children).forEach(([key, child]) => {
      const fullPath = parentPath ? `${parentPath}/${child.name}` : child.name;
      this.expandedNodes.add(fullPath);
      this.buildExpandedNodes(child, fullPath);
    });
  }

  updateTreeVisibility() {
    this.container.querySelectorAll('.toggle').forEach(toggle => {
      const path = toggle.dataset.path;
      const shouldBeOpen = this.isExpanded || this.expandedNodes.has(path);
      toggle.classList.toggle('open', shouldBeOpen);
      toggle.setAttribute('aria-expanded', shouldBeOpen);
      const ul = toggle.nextElementSibling;
      if (ul) {
        ul.classList.toggle('hidden', !shouldBeOpen);
        ul.style.display = shouldBeOpen ? 'block' : 'none'; // Explicitly set display for clarity
      } else {
        console.warn(`No child <ul> found for toggle at path: ${path}`);
      }
    });
  }

  render = debounce((urls, filter = {}, sortBy = 'url', searchTerm = '') => {
    showLoading(50);
    this.urls = urls;
    const filteredUrls = this.filterUrls(urls, filter, searchTerm);
    this.treeData = this.buildTree(filteredUrls, sortBy);

    if (!this.container.querySelector('.tree-list')) {
      this.container.innerHTML = '';
      this.renderControls();
    }

    const ul = this.container.querySelector('.tree-list') || document.createElement('ul');
    ul.className = 'tree-list';
    ul.innerHTML = '';
    this.renderTreeNode(this.treeData, ul, '', sortBy);

    if (!this.container.contains(ul)) this.container.appendChild(ul);
    this.setupNodeListeners();
    this.updateTreeVisibility();
    hideLoading();
  }, 200);

  setupNodeListeners() {
    this.cleanupListeners('nodes');
    this.container.querySelectorAll('.toggle').forEach(toggle => {
      const handler = () => this.toggleNode(toggle);
      toggle.addEventListener('click', handler);
      toggle.addEventListener('keydown', (e) => e.key === 'Enter' && this.toggleNode(toggle));
      this.listeners.set(toggle, [
        ['click', handler],
        ['keydown', (e) => e.key === 'Enter' && this.toggleNode(toggle)],
      ]);
    });
  }

  cleanupListeners(category = 'all') {
    this.listeners.forEach((events, element) => {
      if (category === 'all' || (category === 'controls' && element.id === 'toggleExpansionBtn') || (category === 'nodes' && element.classList.contains('toggle'))) {
        events.forEach(([type, handler]) => element.removeEventListener(type, handler));
        this.listeners.delete(element);
      }
    });
  }

  filterUrls(urls, filter, searchTerm) {
    return urls.filter(url => {
      const priority = parseFloat(url.priority) || 0;
      const lastmod = url.lastmod ? new Date(url.lastmod) : null;
      const minPriority = parseFloat(filter.priority) || 0;
      const minLastmod = filter.lastmod ? new Date(filter.lastmod) : null;
      const matchesSearch = !searchTerm || url.loc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch && priority >= minPriority && (!minLastmod || (lastmod && lastmod >= minLastmod));
    });
  }

  sortUrls(urls, sortBy) {
    return urls.sort((a, b) => {
      if (sortBy === 'lastmod') return (new Date(b.lastmod || 0) - new Date(a.lastmod || 0)) || a.loc.localeCompare(b.loc);
      if (sortBy === 'priority') return (parseFloat(b.priority || 0) - parseFloat(a.priority || 0)) || a.loc.localeCompare(b.loc);
      return a.loc.localeCompare(b.loc);
    });
  }

  buildTree(urls, sortBy) {
    const tree = { children: {}, urls: [] };
    urls.forEach(url => {
      try {
        const urlObj = new URL(url.loc || '');
        const pathSegments = urlObj.pathname === '/' ? [''] : urlObj.pathname.split('/').filter(segment => segment.length);
        let currentNode = tree;

        const hostname = urlObj.hostname;
        if (!currentNode.children[hostname]) {
          currentNode.children[hostname] = { name: hostname, children: {}, urls: [] };
        }
        currentNode = currentNode.children[hostname];

        pathSegments.forEach(segment => {
          const key = segment || '/';
          if (!currentNode.children[key]) {
            currentNode.children[key] = { name: key, children: {}, urls: [] };
          }
          currentNode = currentNode.children[key];
        });
        currentNode.urls.push(url);
      } catch (e) {
        console.warn(`Skipping invalid URL: ${url.loc}`, e);
      }
    });
    this.sortTree(tree, sortBy);
    return tree;
  }

  sortTree(node, sortBy) {
    if (node.urls.length) node.urls = this.sortUrls(node.urls, sortBy);
    Object.values(node.children).forEach(child => this.sortTree(child, sortBy));
  }

  renderTreeNode(node, parentUl, parentPath, sortBy) {
    const sortedChildren = Object.entries(node.children).sort(([aKey, a], [bKey, b]) =>
      sortBy === 'url' ? a.name.localeCompare(b.name) : 0
    );

    sortedChildren.forEach(([key, child]) => {
      const fullPath = parentPath ? `${parentPath}/${child.name}` : child.name;
      const li = document.createElement('li');
      const toggle = document.createElement('span');
      const isOpen = this.isExpanded || this.expandedNodes.has(fullPath);
      toggle.className = `toggle ${isOpen ? 'open' : ''}`;
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', `Toggle ${child.name} children`);
      toggle.setAttribute('role', 'button');
      toggle.dataset.path = fullPath;
      toggle.tabIndex = 0;
      toggle.textContent = child.name === '/' ? fullPath : child.name;
      li.appendChild(toggle);

      // Only create child <ul> if there are URLs or subchildren
      if (child.urls.length || Object.keys(child.children).length) {
        const childUl = document.createElement('ul');
        childUl.className = isOpen ? '' : 'hidden'; // Initial state
        childUl.style.display = isOpen ? 'block' : 'none'; // Explicit display for reliability

        child.urls.forEach(url => {
          const urlLi = document.createElement('li');
          urlLi.innerHTML = `<span class="url-leaf" tabindex="0" aria-label="URL: ${url.loc}">${this.formatUrl(url)}</span>`;
          childUl.appendChild(urlLi);
        });

        if (Object.keys(child.children).length) {
          this.renderTreeNode(child, childUl, fullPath, sortBy);
        }
        li.appendChild(childUl);
      }

      parentUl.appendChild(li);
    });
  }

  formatUrl(url) {
    let output = url.loc;
    if (url.lastmod) output += ` (Last Modified: ${url.lastmod})`;
    if (url.changefreq) output += `, ${url.changefreq}`;
    if (url.priority) output += `, Priority: ${url.priority}`;
    return output;
  }

  toggleNode(toggle) {
    const isOpen = toggle.classList.contains('open');
    const newState = !isOpen;
    toggle.classList.toggle('open', newState);
    toggle.setAttribute('aria-expanded', newState);
    const ul = toggle.nextElementSibling;
    const path = toggle.dataset.path;

    if (ul) {
      ul.classList.toggle('hidden', !newState);
      ul.style.display = newState ? 'block' : 'none'; // Ensure visibility change
      console.debug(`Toggled ${path}: ${newState ? 'shown' : 'hidden'}`);
    } else {
      console.warn(`No child <ul> found for toggle at path: ${path}`);
    }

    if (newState) {
      this.expandedNodes.add(path);
    } else {
      this.expandedNodes.delete(path);
    }

    if (this.isExpanded && !newState) {
      this.isExpanded = false;
      const toggleBtn = this.container.querySelector('#toggleExpansionBtn');
      toggleBtn.innerHTML = '<i class="fas fa-expand-alt"></i> Expand All';
      toggleBtn.setAttribute('aria-expanded', false);
      toggleBtn.setAttribute('aria-label', 'Expand all nodes');
    }
  }

  destroy() {
    this.cleanupListeners();
    this.container.innerHTML = '';
    this.treeData = null;
    this.urls = [];
    this.expandedNodes.clear();
  }
}