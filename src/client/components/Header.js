// src/client/components/Header.js
import { HeaderButtons } from './HeaderButtons.js';

export class Header {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onBack: options.onBack || (() => {}),
      onToggleFilters: options.onToggleFilters || (() => {}),
      treeView: options.treeView || null,
      urls: options.urls || [],
      ...options,
    };
    this.path = window.location.pathname;
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
      onToggleFilters: this.options.onToggleFilters,
      treeView: this.options.treeView,
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
    this.options = { ...this.options, ...newOptions };
    this.buttons.updateOptions({
      onBack: this.options.onBack,
      onToggleFilters: this.options.onToggleFilters,
      treeView: this.options.treeView,
      urls: this.options.urls,
    });
  }
}