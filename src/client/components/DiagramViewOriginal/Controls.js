export class Controls {
  constructor(container) {
    this.container = container;
    this.listeners = new Map();
  }

  render() {
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';
    controls.innerHTML = `
      <div class="control-group">
        <button id="zoomInBtn" title="Zoom In" aria-label="Zoom in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
        <button id="zoomOutBtn" title="Zoom Out" aria-label="Zoom out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"/>
          </svg>
        </button>
        <button id="resetViewBtn" title="Reset View" aria-label="Reset view">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4c5-5 14-5 19 0M4 20c5 5 14 5 19 0"/>
          </svg>
        </button>
        <button id="fullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle fullscreen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5v3m3 13v3h-3m13-3h3v-3m-3-13v3h3"/>
          </svg>
        </button>
      </div>
    `;
    this.container.appendChild(controls);
    this.setupListeners();
  }

  setupListeners() {
    this.cleanupListeners();
    const handlers = {
      '#zoomInBtn': () => this.onZoomIn?.(),
      '#zoomOutBtn': () => this.onZoomOut?.(),
      '#resetViewBtn': () => this.onResetView?.(),
      '#fullscreenBtn': () => this.onToggleFullscreen?.(),
    };
    Object.entries(handlers).forEach(([selector, handler]) => {
      const btn = this.container.querySelector(selector);
      if (btn) {
        const wrappedHandler = () => handler();
        btn.addEventListener('click', wrappedHandler);
        this.listeners.set(btn, [['click', wrappedHandler]]);
      }
    });
  }

  cleanupListeners() {
    this.listeners.forEach((events, element) => {
      events.forEach(([type, handler]) => element.removeEventListener(type, handler));
      this.listeners.delete(element);
    });
  }

  setCallbacks({ onZoomIn, onZoomOut, onResetView, onToggleFullscreen }) {
    this.onZoomIn = onZoomIn;
    this.onZoomOut = onZoomOut;
    this.onResetView = onResetView;
    this.onToggleFullscreen = onToggleFullscreen;
    this.setupListeners(); // Re-attach with new callbacks
  }

  destroy() {
    this.cleanupListeners();
  }
}