import { HeaderButtons } from '../HeaderButtons/HeaderButtons.js';
import './styles.css';

export class Header {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onBack: options.onBack || (() => {}),
      onToggleFilters: options.onToggleFilters || (() => {}),
      treeView: options.treeView || null,
      urls: options.urls || [],
      destroy: options.destroy || (() => {}), // Cleanup function from pages
      ...options,
    };
    this.path = window.location.pathname;
    this.buttons = null;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;
    const controlsContainer = this.container.querySelector('.controls');
    this.buttons = new HeaderButtons(controlsContainer, {
      onBack: this.options.onBack,
      urls: this.options.urls,
      path: this.path,
    });
  }

  updateRoute(newPath) {
    this.path = newPath;
    this.buttons.updateRoute(newPath);
  }

  updateUrls(newUrls) {
    this.options.urls = newUrls;
    this.buttons.updateUrls(newUrls);
  }

  updateOptions(newOptions) {
    if (this.options.destroy) {
      this.options.destroy(); // Clean up previous page
    }
    this.options = { ...this.options, ...newOptions };
    this.buttons.updateOptions({
      onBack: this.options.onBack,
      urls: this.options.urls,
    });
    this.render();
  }

  destroy() {
    if (this.buttons) {
      this.buttons.destroy();
    }
    if (this.options.destroy) {
      this.options.destroy();
    }
    this.container.innerHTML = '';
  }
}