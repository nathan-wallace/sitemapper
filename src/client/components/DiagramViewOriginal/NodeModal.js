export class NodeModal {
  constructor() {
    this.modal = null;
  }

  show(data) {
    if (this.modal) this.modal.remove();

    this.modal = document.createElement('div');
    this.modal.className = 'node-modal';
    this.modal.innerHTML = `
      <div class="node-modal-content">
        <span class="node-modal-close">×</span>
        <h3>Node Details</h3>
        <p><strong>Path:</strong> ${data.fullPath || data.name}</p>
        ${data.url ? `
          <p><strong>Full URL:</strong> <a href="${data.url.loc}" target="_blank">${data.url.loc}</a></p>
          ${data.url.lastmod ? `<p><strong>Last Modified:</strong> ${data.url.lastmod}</p>` : ''}
          ${data.url.changefreq ? `<p><strong>Change Frequency:</strong> ${data.url.changefreq}</p>` : ''}
          ${data.url.priority ? `<p><strong>Priority:</strong> ${data.url.priority}</p>` : ''}
        ` : ''}
        ${data.children && data.children.length > 0 ? `<p><strong>Child Nodes:</strong> ${data.children.length}</p>` : ''}
        <p><strong>Depth:</strong> ${data.fullPath ? data.fullPath.split('/').filter(Boolean).length : 0}</p>
      </div>
    `;

    document.body.appendChild(this.modal);

    const closeBtn = this.modal.querySelector('.node-modal-close');
    closeBtn.addEventListener('click', () => this.modal.remove());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.modal.remove();
    });
  }

  destroy() {
    if (this.modal) this.modal.remove();
    this.modal = null;
  }
}