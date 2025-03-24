// src/client/components/DiagramView.js
import * as d3 from 'd3';
import { showLoading, hideLoading } from '../utils/dom.js';

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export class DiagramView {
  constructor(container) {
    this.container = container;
    this.svg = null;
    this.g = null;
    this.width = container.clientWidth || 1000;
    this.height = Math.max(window.innerHeight - 200, 600);
    this.expandedNodes = new Set();
    this.zoomLevel = 1;
    this.nodeId = 0;
    this.zoomBehavior = null;
    this.treeData = null;
    this.listeners = new Map();
    this.renderControls();
  }

  renderControls() {
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
        <span id="zoomLevel" class="zoom-level" aria-live="polite">100%</span>
      </div>
      <div class="control-group">
        <button id="expandAllBtn" title="Expand All" aria-label="Expand all nodes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16v16H4zM8 12h8M12 8v8"/>
          </svg>
        </button>
        <button id="collapseAllBtn" title="Collapse All" aria-label="Collapse all nodes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16v16H4zM8 12h8"/>
          </svg>
        </button>
      </div>
      <div class="control-group">
        <button id="resetViewBtn" title="Reset View" aria-label="Reset view">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4c5-5 14-5 19 0M4 20c5 5 14 5 19 0"/>
          </svg>
        </button>
      </div>
    `;
    this.container.appendChild(controls);
    this.setupControlListeners();
  }

  setupControlListeners() {
    this.cleanupListeners('controls');
    const handlers = {
      '#zoomInBtn': () => this.zoom(1.2),
      '#zoomOutBtn': () => this.zoom(0.8),
      '#expandAllBtn': () => this.expandAll(),
      '#collapseAllBtn': () => this.collapseAll(),
      '#resetViewBtn': () => this.resetView(),
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

  cleanupListeners(category = 'all') {
    this.listeners.forEach((events, element) => {
      if (category === 'all' || (category === 'controls' && element.tagName === 'BUTTON')) {
        events.forEach(([type, handler]) => element.removeEventListener(type, handler));
        this.listeners.delete(element);
      }
    });
  }

  render(urls, filter = {}, sortBy = 'url', searchTerm = '') {
    showLoading(50);
    this.container.innerHTML = '';
    this.svg = null;
    this.g = null;
    this.treeData = null;
    this.renderControls();

    const filteredUrls = this.filterUrls(urls, filter, searchTerm);
    const sortedUrls = this.sortUrls(filteredUrls, sortBy);
    this.treeData = this.buildTree(sortedUrls);

    try {
      this.drawDiagram();
    } catch (e) {
      console.error('Failed to render diagram:', e);
    }
    hideLoading();
  }

  filterUrls(urls, filter, searchTerm) {
    return urls.filter(url => {
      const priority = parseFloat(url.priority) || 0;
      const lastmod = url.lastmod ? new Date(url.lastmod) : null;
      const minPriority = parseFloat(filter.priority) || 0;
      const minLastmod = filter.lastmod ? new Date(filter.lastmod) : null;
      const matchesSearch = !searchTerm || url.loc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch && priority >= minPriority && (!minLastmod || (lastmod && lastmod >= minLastmod));
    });
  }

  sortUrls(urls, sortBy) {
    return urls.sort((a, b) => {
      if (sortBy === 'lastmod') return (new Date(b.lastmod || 0) - new Date(a.lastmod || 0)) || a.loc.localeCompare(b.loc);
      if (sortBy === 'priority') return (parseFloat(b.priority || 0) - parseFloat(a.priority || 0)) || a.loc.localeCompare(b.loc);
      return a.loc.localeCompare(b.loc);
    });
  }

  buildTree(urls) {
    const root = { name: 'Sitemap', children: [], isLazy: true };
    const domainMap = new Map();

    urls.forEach(url => {
      try {
        const urlObj = new URL(url.loc || '');
        const hostname = urlObj.hostname;
        let domainNode = domainMap.get(hostname);
        if (!domainNode) {
          domainNode = { name: hostname, children: [], isLazy: true };
          domainMap.set(hostname, domainNode);
          root.children.push(domainNode);
        }
        // Initially collapse URLs under domain, mark as lazy
        if (!domainNode.children.length) {
          domainNode.children.push({ name: 'URLs', urlCount: 0, children: [], isLazy: true });
        }
        domainNode.children[0].urlCount = (domainNode.children[0].urlCount || 0) + 1;
        domainNode.children[0].urls = domainNode.children[0].urls || [];
        domainNode.children[0].urls.push(url);
      } catch (e) {
        console.warn(`Skipping invalid URL: ${url.loc}`, e);
      }
    });
    return root;
  }

  async loadLazyChildren(node) {
    if (node.data.isLazy && node.data.urls && !node.children) {
      node.children = node.data.urls.map(url => ({
        name: url.loc.split('/').pop(),
        url,
        children: []
      }));
      node.data.isLazy = false; // Mark as loaded
    }
  }

  drawDiagram() {
    const margin = { top: 60, right: 120, bottom: 60, left: 120 };
    this.width = this.container.clientWidth - margin.left - margin.right;
    this.height = this.container.clientHeight - margin.top - margin.bottom;

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .attr('role', 'tree')
      .style('background', '#fafafa');

    this.g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.zoomBehavior = d3.zoom()
      .scaleExtent([0.3, 5])
      .on('zoom', throttle((event) => this.zoomed(event), 50));

    this.svg.call(this.zoomBehavior)
      .on('dblclick.zoom', null)
      .on('wheel.zoom', null);

    this.svg.on('wheel', (event) => {
      event.preventDefault();
      const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
      this.zoom(scaleFactor, event.clientX, event.clientY);
    });

    const hierarchy = d3.hierarchy(this.treeData);
    const tree = d3.tree().nodeSize([60, 250]);
    const root = tree(hierarchy);
    root.x0 = this.width / 2;
    root.y0 = 0;

    root.children.forEach(d => this.collapse(d, true));
    this.g.datum(root);
    this.update(root);
    this.fitToView(root);
  }

  zoomed(event) {
    if (!this.g) return;
    this.g.attr('transform', event.transform);
    this.zoomLevel = event.transform.k;
    this.updateZoomLevelDisplay();
  }

  zoom(factor, clientX = null, clientY = null) {
    if (!this.svg || !this.zoomBehavior) return;
    const currentTransform = d3.zoomTransform(this.svg.node());
    let newScale = currentTransform.k * factor;

    if (clientX && clientY) {
      const svgRect = this.svg.node().getBoundingClientRect();
      const mouseX = clientX - svgRect.left;
      const mouseY = clientY - svgRect.top;
      const newX = mouseX - (mouseX - currentTransform.x) * factor / currentTransform.k;
      const newY = mouseY - (mouseY - currentTransform.y) * factor / currentTransform.k;
      this.svg.transition().duration(300).call(
        this.zoomBehavior.transform,
        d3.zoomIdentity.translate(newX, newY).scale(newScale)
      );
    } else {
      this.svg.transition().duration(300).call(this.zoomBehavior.scaleBy, factor);
    }
  }

  updateZoomLevelDisplay() {
    const zoomPercentage = Math.round(this.zoomLevel * 100);
    const zoomLevelEl = this.container.querySelector('#zoomLevel');
    if (zoomLevelEl) zoomLevelEl.textContent = `${zoomPercentage}%`;
  }

  update(source) {
    const duration = 650;
    const tree = d3.tree().nodeSize([60, 250]);
    const root = tree(source);

    const link = this.g.selectAll('.link')
      .data(root.links(), d => d.target.id);

    const linkEnter = link.enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => this.diagonal({ x: source.x0, y: source.y0 }, { x: source.x0, y: source.y0 }));

    link.merge(linkEnter)
      .transition()
      .duration(duration)
      .attr('d', d => this.diagonal(d.source, d.target));

    link.exit()
      .transition()
      .duration(duration)
      .attr('d', d => this.diagonal({ x: source.x, y: source.y }, { x: source.x, y: source.y }))
      .remove();

    const node = this.g.selectAll('.node')
      .data(root.descendants(), d => d.id || (d.id = ++this.nodeId));

    const nodeEnter = node.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .on('click', async (event, d) => {
        if (d.data.isLazy && !d.children && !d._children) {
          showLoading(50);
          await this.loadLazyChildren(d);
          hideLoading();
          if (d.children) this.update(d);
        } else if (d.children) {
          d._children = d.children;
          d.children = null;
          this.expandedNodes.delete(d.data.name);
        } else if (d._children) {
          d.children = d._children;
          d._children = null;
          this.expandedNodes.add(d.data.name);
        }
        this.update(d);
        this.centerNode(d);
      });

    nodeEnter.filter(d => d.children || d._children || d.data.isLazy)
      .append('rect')
      .attr('class', 'folder-bg')
      .attr('width', 160)
      .attr('height', 40)
      .attr('x', -80)
      .attr('y', -20)
      .attr('rx', 8);

    nodeEnter.filter(d => d.children || d._children || d.data.isLazy)
      .append('path')
      .attr('class', 'folder-icon')
      .attr('d', 'M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8L10 4z')
      .attr('transform', 'translate(-65, -18) scale(1.2)');

    nodeEnter.append('text')
      .attr('dy', '0.35em')
      .attr('x', d => d.children || d._children || d.data.isLazy ? -30 : 10)
      .attr('text-anchor', d => d.children || d._children || d.data.isLazy ? 'end' : 'start')
      .attr('class', d => d.children || d._children || d.data.isLazy ? 'folder-label' : 'url-label')
      .text(d => d.data.urlCount ? `${d.data.name} (${d.data.urlCount})` : (d.data.name.length > 25 ? `${d.data.name.slice(0, 22)}...` : d.data.name))
      .on('click', (event, d) => {
        event.stopPropagation();
        if (d.data.url) window.open(d.data.url.loc, '_blank');
      });

    nodeEnter.append('title')
      .text(d => d.data.url ? this.formatUrl(d.data.url) : d.data.name);

    const nodeUpdate = node.merge(nodeEnter)
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('.folder-bg').attr('x', -80).attr('y', -20);
    nodeUpdate.select('.folder-icon').attr('transform', 'translate(-65, -18) scale(1.2)');
    nodeUpdate.select('text')
      .attr('x', d => d.children || d._children || d.data.isLazy ? -30 : 10)
      .attr('text-anchor', d => d.children || d._children || d.data.isLazy ? 'end' : 'start');

    node.exit()
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${source.y},${source.x})`)
      .remove();

    root.each(d => { d.x0 = d.x; d.y0 = d.y; });
  }

  diagonal(s, d) {
    return `M ${s.y} ${s.x} C ${s.y} ${(s.x + d.x) / 2}, ${d.y} ${(s.x + d.x) / 2}, ${d.y} ${d.x}`;
  }

  formatUrl(url) {
    let output = url.loc;
    if (url.lastmod) output += `\nLast Modified: ${url.lastmod}`;
    if (url.changefreq) output += `\nChange Frequency: ${url.changefreq}`;
    if (url.priority) output += `\nPriority: ${url.priority}`;
    return output;
  }

  centerNode(node) {
    if (!this.svg || !this.zoomBehavior || !this.g) return;
    const currentTransform = d3.zoomTransform(this.svg.node());
    const scale = currentTransform.k;
    const x = -node.y * scale + this.width / 2;
    const y = -node.x * scale + this.height / 2;
    this.svg.transition().duration(650).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(x, y).scale(scale)
    );
  }

  expandAll() {
    if (!this.g) return;
    const root = d3.hierarchy(this.g.datum());
    root.descendants().forEach(async d => {
      if (d.data.isLazy) {
        await this.loadLazyChildren(d);
      }
      if (d._children) {
        d.children = d._children;
        d._children = null;
        this.expandedNodes.add(d.data.name);
      }
    });
    this.update(root);
    this.fitToView(root);
  }

  collapseAll() {
    if (!this.g) return;
    const root = d3.hierarchy(this.g.datum());
    root.descendants().forEach(d => this.collapse(d));
    this.update(root);
    this.fitToView(root);
  }

  collapse(d, initial = false) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(child => this.collapse(child));
      d.children = null;
      if (!initial) this.expandedNodes.delete(d.data.name);
    }
  }

  fitToView(root) {
    if (!this.zoomBehavior || !this.g) return;
    const bounds = this.getTreeBounds(root);
    const width = bounds.maxY - bounds.minY;
    const height = bounds.maxX - bounds.minX;
    const scaleX = this.width / (width || 1);
    const scaleY = this.height / (height || 1);
    const scale = Math.min(scaleX, scaleY, 2) * 0.9;
    const tx = this.width / 2 - (bounds.minY + width / 2) * scale;
    const ty = this.height / 2 - (bounds.minX + height / 2) * scale;

    this.svg.transition().duration(650).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
    this.zoomLevel = scale;
    this.updateZoomLevelDisplay();
  }

  getTreeBounds(root) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    root.each(d => {
      minX = Math.min(minX, d.x);
      maxX = Math.max(maxX, d.x);
      minY = Math.min(minY, d.y);
      maxY = Math.max(maxY, d.y);
    });
    return { minX, maxX, minY, maxY };
  }

  resetView() {
    if (!this.g) return;
    const root = d3.hierarchy(this.g.datum());
    this.fitToView(root);
  }

  destroy() {
    if (this.svg) {
      this.svg.on('.zoom', null);
      this.svg.on('wheel', null);
    }
    this.cleanupListeners();
    this.container.innerHTML = '';
    this.svg = null;
    this.g = null;
    this.zoomBehavior = null;
    this.treeData = null;
    this.expandedNodes.clear();
  }
}