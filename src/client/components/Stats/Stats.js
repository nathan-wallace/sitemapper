export class Stats {
  constructor(container) {
    this.container = container;
    this.totalUrls = 0;
    this.uniqueDomains = 0;
    this.matchCount = '';
  }

  render() {
    this.container.innerHTML = `
      <div class="stats-container">
        <p>Total URLs: <span id="totalUrls">${this.totalUrls}</span></p>
        <p>Unique Domains: <span id="uniqueDomains">${this.uniqueDomains}</span></p>
        <p>Matches: <span id="matchCount">${this.matchCount}</span></p>
      </div>
    `;
  }

  update({ totalUrls, uniqueDomains, matchCount }) {
    this.totalUrls = totalUrls || this.totalUrls;
    this.uniqueDomains = uniqueDomains || this.uniqueDomains;
    this.matchCount = matchCount !== undefined ? matchCount : this.matchCount;
    this.container.querySelector('#totalUrls').textContent = this.totalUrls;
    this.container.querySelector('#uniqueDomains').textContent = this.uniqueDomains;
    this.container.querySelector('#matchCount').textContent = this.matchCount;
  }
}