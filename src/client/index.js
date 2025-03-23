// src/client/index.js
import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';
import './styles/styles.css';

const mainEl = document.getElementById('main');
if (!mainEl) {
  console.error('Main element not found');
}

function renderLayout() {
  document.getElementById('header')?.remove();
  const header = document.createElement('header');
  header.innerHTML = '<h1>Sitemap Explorer</h1>';
  document.body.prepend(header);
}

function route(path) {
  mainEl.innerHTML = '';
  switch (path) {
    case '/':
      setupInputPage(mainEl);
      break;
    case '/results':
      setupResultsPage(mainEl);
      break;
    default:
      mainEl.innerHTML = '<h2>404 - Page not found</h2>';
  }
}

window.addEventListener('popstate', () => route(window.location.pathname));
renderLayout();
route(window.location.pathname);