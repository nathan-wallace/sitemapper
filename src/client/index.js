import setupInputPage from './pages/InputPage.js';
import setupResultsPage from './pages/ResultsPage.js';

if (window.location.pathname === '/') {
  setupInputPage();
} else if (window.location.pathname === '/results') {
  setupResultsPage();
}