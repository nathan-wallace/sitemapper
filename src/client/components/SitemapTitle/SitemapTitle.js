import './styles.css';

export class PageTitle {
  constructor(container) {
    this.container = container;
  }

  render(domain) {
    this.container.innerHTML = `
      <div class="title-container">
        <h2>Sitemap Results: ${domain || 'Loading...'}</h2>
        <div class="view-toggle">
          <button id="treeViewBtn" class="view-btn active">Tree View</button>
          <button id="diagramViewBtn" class="view-btn">Diagram View</button>
        </div>
      </div>
    `;
  }

  update(domain) {
    this.container.querySelector('h2').textContent = `Sitemap Results: ${domain}`; // Fixed typo from 'Scan' to 'Results'
  }
}