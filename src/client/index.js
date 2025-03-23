// src/client/index.js
import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';
import { Header } from './components/Header.js';

let mainEl = null;
let headerInstance = null;

function route(path) {
  if (!mainEl) {
    console.error('Main element not initialized yet');
    return;
  }
  console.log('Routing to:', path);
  mainEl.innerHTML = '';
  let headerOptions = {};

  switch (path) {
    case '/':
      headerOptions = setupInputPage(mainEl);
      break;
    case '/results':
      headerOptions = setupResultsPage(mainEl);
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
}

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  mainEl = document.getElementById('view');
  if (!mainEl || !appContainer) {
    console.error('Required elements (#app or #view) not found in index.html');
    return;
  }

  const headerContainer = document.createElement('header');
  appContainer.insertBefore(headerContainer, mainEl);
  headerInstance = new Header(headerContainer);

  route(window.location.pathname);
  window.addEventListener('popstate', () => route(window.location.pathname));
});

export { route, headerInstance };