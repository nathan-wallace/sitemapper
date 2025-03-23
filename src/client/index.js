// src/client/index.js
import { Header } from './components/Header.js';
import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';

export let headerInstance;
let mainEl;

export function route(path) {
  if (!mainEl) {
    console.error('Main element not available for routing');
    return;
  }
  console.debug('Routing to:', path);
  mainEl.innerHTML = '';
  let headerOptions = {};

  try {
    switch (path) {
      case '/':
        headerOptions = setupInputPage(mainEl) || {};
        break;
      case '/results':
        headerOptions = setupResultsPage(mainEl) || {};
        break;
      default:
        mainEl.innerHTML = '<h2>404 - Page not found</h2>';
    }

    if (headerInstance) {
      headerInstance.updateRoute(path);
      if (headerOptions.urls) headerInstance.updateUrls(headerOptions.urls);
      if (headerOptions.treeView || headerOptions.onToggleFilters) {
        headerInstance.updateOptions({
          treeView: headerOptions.treeView,
          onToggleFilters: headerOptions.onToggleFilters,
        });
      }
    }
  } catch (err) {
    console.error('Routing error:', err);
    mainEl.innerHTML = `<h2>Error: ${err.message}</h2>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mainEl = document.getElementById('view'); // Change 'main' to 'view'
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