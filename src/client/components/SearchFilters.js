// src/client/components/filters.js
import renderSearchFilters from './SearchFilters.js';

export default function SearchFilters() {
  const filters = document.createElement('filters');

  const pathname = window.location.pathname;
  const isResultsPage = pathname === '/results';

  filters.innerHTML = `
    <label for="urlSearch">Search URLs:</label>
    <input type="text" id="urlSearch" placeholder="Search URLs...">
    <button id="toggleFiltersBtn" aria-expanded="false">Filter and Sort</button>
    <div id="filters" class="hidden">
        <label for="priorityFilter">Min Priority:</label>
        <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="0">
        <label for="lastmodFilter">Last Modified After:</label>
        <input type="date" id="lastmodFilter">
        <label for="sortBy">Sort By:</label>
        <select id="sortBy">
            <option value="url">URL</option>
            <option value="lastmod">Last Modified</option>
            <option value="priority">Priority</option>
        </select>
        <button id="applyFiltersBtn">Apply Filters</button>
        <button id="resetFiltersBtn">Reset Filters</button>
    </div>
  `;

  if (isResultsPage) {
    filters.appendChild(renderSearchFilters());
  }

  return filters;
}
