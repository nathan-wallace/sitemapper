function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export class Filters {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onApply: options.onApply || (() => {}),
      onReset: options.onReset || (() => {}),
      onSearch: options.onSearch || (() => {}),
      ...options,
    };
    this.isExpanded = false;
    this.state = { search: '', priority: '0', lastmod: '', sortBy: 'url' };
    this.listeners = new Map();
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="search-container">
        <input type="text" id="urlSearch" placeholder="Search URLs..." value="${this.state.search}" aria-label="Search URLs">
        <span id="toggleFiltersLink" class="filter-toggle" aria-expanded="${this.isExpanded}" role="button" tabindex="0">
          ${this.isExpanded ? 'Hide filters' : 'Show filters'}
        </span>
      </div>
      <div id="additional-filters" class="${this.isExpanded ? '' : 'hidden'}">
        <div class="filter-group">
          <label for="priorityFilter">Min Priority:</label>
          <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="${this.state.priority}" aria-label="Minimum priority filter">
        </div>
        <div class="filter-group">
          <label for="lastmodFilter">Last Modified After:</label>
          <input type="date" id="lastmodFilter" value="${this.state.lastmod}" aria-label="Last modified after date filter">
        </div>
        <div class="filter-group">
          <label for="sortBy">Sort By:</label>
          <select id="sortBy" aria-label="Sort by">
            <option value="url" ${this.state.sortBy === 'url' ? 'selected' : ''}>URL</option>
            <option value="lastmod" ${this.state.sortBy === 'lastmod' ? 'selected' : ''}>Last Modified</option>
            <option value="priority" ${this.state.sortBy === 'priority' ? 'selected' : ''}>Priority</option>
          </select>
        </div>
        <div class="filter-actions">
          <button id="applyFiltersBtn" aria-label="Apply filters">Apply</button>
          <button id="resetFiltersBtn" aria-label="Reset filters">Reset</button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    this.cleanupListeners();

    const urlSearch = this.container.querySelector('#urlSearch');
    if (urlSearch) {
      const searchHandler = debounce(() => {
        this.state.search = urlSearch.value.toLowerCase();
        this.options.onSearch(this.state.search);
      }, 300);
      urlSearch.addEventListener('input', searchHandler);
      this.listeners.set(urlSearch, [['input', searchHandler]]);
    }

    const toggleLink = this.container.querySelector('#toggleFiltersLink');
    if (toggleLink) {
      const toggleHandler = () => {
        this.isExpanded = !this.isExpanded;
        this.render();
        this.setupEventListeners();
        toggleLink.focus();
      };
      toggleLink.addEventListener('click', toggleHandler);
      toggleLink.addEventListener('keydown', (e) => e.key === 'Enter' && toggleHandler());
      this.listeners.set(toggleLink, [['click', toggleHandler], ['keydown', (e) => e.key === 'Enter' && toggleHandler()]]);
    }

    const applyBtn = this.container.querySelector('#applyFiltersBtn');
    if (applyBtn) {
      const applyHandler = () => {
        const newPriority = Math.min(1, Math.max(0, parseFloat(this.container.querySelector('#priorityFilter').value) || 0)).toString();
        const newLastmod = this.container.querySelector('#lastmodFilter').value;
        const newSortBy = this.container.querySelector('#sortBy').value;
        if (newPriority !== this.state.priority || newLastmod !== this.state.lastmod || newSortBy !== this.state.sortBy) {
          this.state.priority = newPriority;
          this.state.lastmod = newLastmod;
          this.state.sortBy = newSortBy;
          this.options.onApply(
            { priority: this.state.priority, lastmod: this.state.lastmod },
            this.state.sortBy
          );
        }
      };
      applyBtn.addEventListener('click', applyHandler);
      this.listeners.set(applyBtn, [['click', applyHandler]]);
    }

    const resetBtn = this.container.querySelector('#resetFiltersBtn');
    if (resetBtn) {
      const resetHandler = () => {
        this.state = { search: '', priority: '0', lastmod: '', sortBy: 'url' };
        this.render();
        this.setupEventListeners();
        this.options.onReset();
      };
      resetBtn.addEventListener('click', resetHandler);
      this.listeners.set(resetBtn, [['click', resetHandler]]);
    }
  }

  cleanupListeners() {
    this.listeners.forEach((events, element) => {
      events.forEach(([type, handler]) => element.removeEventListener(type, handler));
    });
    this.listeners.clear();
  }

  toggleVisibility(isVisible) {
    this.isExpanded = isVisible;
    this.render();
    this.setupEventListeners();
  }

  destroy() {
    this.cleanupListeners();
    this.container.innerHTML = '';
  }
}