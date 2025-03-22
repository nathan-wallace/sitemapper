// src/client/index.js
import './styles/styles.css';
import renderHeader from './components/Header.js';
import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';

const app = document.getElementById('app');
const headerEl = document.querySelector('header');
const mainEl = document.getElementById('view');

function renderLayout() {
  headerEl.innerHTML = '';
  headerEl.appendChild(renderHeader());
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

function handleNavigation(event) {
  const target = event.target.closest('a');
  if (target && target.href.startsWith(window.location.origin)) {
    event.preventDefault();
    const path = new URL(target.href).pathname;
    window.history.pushState({}, '', path);
    renderLayout();
    route(path);
  }
}

function initApp() {
  renderLayout();
  route(window.location.pathname);
  document.body.addEventListener('click', handleNavigation);
  window.addEventListener('popstate', () => {
    renderLayout();
    route(window.location.pathname);
  });
}

initApp();