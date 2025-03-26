// src/client/index.js
import { Header } from './components/Header/Header.js';
import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';

export let headerInstance;
let mainEl;
let currentPageCleanup = null; // Track cleanup function for the current page

export function route(path) {
  if (!mainEl || !document.getElementById('view')) {
    console.error('Main element not available or invalid for routing:', {
      mainElExists: !!mainEl,
      viewInDOM: !!document.getElementById('view'),
    });
    mainEl = document.getElementById('view'); // Attempt to recover
    if (!mainEl) return;
  }
  console.debug('Routing to:', path);
  
  // Cleanup previous page if applicable
  if (currentPageCleanup) {
    console.debug('Cleaning up previous page before routing');
    currentPageCleanup();
    currentPageCleanup = null;
  }

  mainEl.innerHTML = '';
  console.debug('Cleared mainEl content');
  let headerOptions = {};

  try {
    switch (path) {
      case '/':
        console.debug('Setting up input page');
        headerOptions = setupInputPage(mainEl) || {};
        currentPageCleanup = null; // Input page doesn’t need cleanup
        break;
      case '/results':
        console.debug('Setting up results page');
        headerOptions = setupResultsPage(mainEl) || {};
        currentPageCleanup = headerOptions.cleanup || null; // Store cleanup if provided
        break;
      default:
        mainEl.innerHTML = '<h2>404 - Page not found</h2>';
        currentPageCleanup = null;
    }

    if (headerInstance) {
      console.debug('Updating header with path:', path);
      headerInstance.updateRoute(path);
      if (headerOptions.urls) headerInstance.updateUrls(headerOptions.urls);
      if (headerOptions.treeView || headerOptions.onToggleFilters) {
        headerInstance.updateOptions({
          treeView: headerOptions.treeView,
          onToggleFilters: headerOptions.onToggleFilters,
        });
      }
    } else {
      console.warn('Header instance not initialized during route update');
    }
    console.debug('Route completed, mainEl content:', mainEl.innerHTML.substring(0, 100));
  } catch (err) {
    console.error('Routing error:', err);
    mainEl.innerHTML = `<h2>Error: ${err.message}</h2>`;
    currentPageCleanup = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mainEl = document.getElementById('view');
  const headerEl = document.getElementById('header');
  
  if (!mainEl || !headerEl) {
    console.error('DOM initialization failed:', {
      mainFound: !!mainEl,
      headerFound: !!headerEl,
      documentBody: document.body.innerHTML.substring(0, 200),
    });
    document.body.innerHTML = '<h2>Error: Required DOM elements not found</h2>';
    return;
  }

  headerInstance = new Header(headerEl);
  route(window.location.pathname);

  window.addEventListener('popstate', (event) => {
    console.debug('Popstate event triggered, routing to:', window.location.pathname);
    route(window.location.pathname);
  });
});