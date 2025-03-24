import * as d3 from 'd3';
import { showLoading, hideLoading } from '../../utils/dom.js';
import './styles.css';

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
    this.width = 0;
    this.height = 0;
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
    this.setupControlListeners();
  }

  setupControlListeners() {
    this.cleanupListeners('controls');
    const handlers = {
      '#zoomInBtn': () => this.zoom(1.2),
      '#zoomOutBtn': () => this.zoom(0.8),
      '#resetViewBtn': () => this.resetView(),
      '#fullscreenBtn': () => this.toggleFullscreen(),
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

    console.log('Tree Data:', this.treeData);
    if (!this.treeData.children || this.treeData.children.length === 0) {
      console.warn('No valid tree data to render.');
      this.container.innerHTML += '<p>No sitemap data available to visualize.</p>';
      hideLoading();
      return;
    }

    try {
      this.drawDiagram();
    } catch (e) {
      console.error('Failed to render diagram:', e);
      this.container.innerHTML += '<p>Error rendering sitemap visualization.</p>';
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
    const root = { name: 'Sitemap', children: [] };
    const pathMap = new Map();

    urls.forEach(url => {
      try {
        const urlObj = new URL(url.loc || '');
        const hostname = urlObj.hostname;
        const pathSegments = urlObj.pathname.split('/').filter(Boolean); // Remove empty segments

        let currentNode = root;
        let fullPath = hostname;

        // Ensure domain node exists
        if (!pathMap.has(hostname)) {
          const domainNode = { name: hostname, children: [], url: null };
          root.children.push(domainNode);
          pathMap.set(hostname, domainNode);
        }
        currentNode = pathMap.get(hostname);

        // Build deeper hierarchy based on path segments
        pathSegments.forEach((segment, index) => {
          fullPath += `/${segment}`;
          if (!pathMap.has(fullPath)) {
            const newNode = { 
              name: segment, 
              children: [], 
              url: index === pathSegments.length - 1 ? url : null 
            };
            currentNode.children.push(newNode);
            pathMap.set(fullPath, newNode);
          }
          currentNode = pathMap.get(fullPath);
        });
      } catch (e) {
        console.warn(`Skipping invalid URL: ${url.loc}`, e);
      }
    });

    return root;
  }

  drawDiagram() {
    const containerRect = this.container.getBoundingClientRect();
    this.width = containerRect.width || window.innerWidth;
    this.height = containerRect.height || Math.max(window.innerHeight - 200, 600);
    const margin = { top: 40, right: 60, bottom: 40, left: 60 };

    console.log('Container Dimensions:', { width: this.width, height: this.height });

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'tree')
      .style('background', '#fff')
      .on('dblclick', (event) => {
        if (event.target === this.svg.node()) this.resetView();
      });

    this.g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.zoomBehavior = d3.zoom()
      .scaleExtent([0.3, 5])
      .on('zoom', throttle((event) => this.zoomed(event), 50));

    this.svg.call(this.zoomBehavior)
      .on('wheel.zoom', (event) => {
        event.preventDefault();
        const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
        this.zoom(scaleFactor, event.clientX, event.clientY);
      });

    const hierarchy = d3.hierarchy(this.treeData);
    console.log('Hierarchy Depth:', hierarchy.height, 'Hierarchy:', hierarchy);
    const tree = d3.tree()
      .size([this.width - margin.left - margin.right, this.height - margin.top - margin.bottom])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5) / a.depth);

    const root = tree(hierarchy);
    root.x0 = this.width / 2;
    root.y0 = 0;

    this.g.datum(root);
    this.update(root);
    this.fitToView(root);
  }

  zoomed(event) {
    if (!this.g) return;
    this.g.attr('transform', event.transform);
    this.zoomLevel = event.transform.k;
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

  update(source) {
    const duration = 750;
    const tree = d3.tree()
      .size([this.width - 120, this.height - 80])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5) / a.depth);
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
      .attr('transform', d => `translate(${source.x0},${source.y0})`)
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        this.zoomToNode(d);
      })
      .on('click', (event, d) => {
        if (d.data.url) window.open(d.data.url.loc, '_blank');
      });

    nodeEnter.append('svg')
      .attr('width', 36)
      .attr('height', 36)
      .attr('x', -18)
      .attr('y', -18)
      .attr('class', 'folder-icon')
      .html(`
        <path d="M4 8v20h28V12H18l-4-4H4zm10 0l4 4h10v12H8V8h6z" fill="#5a9cff" stroke="#2b6cb0" stroke-width="1.5"/>
      `);

    nodeEnter.append('text')
      .attr('dy', '0.35em')
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('class', 'folder-label')
      .text(d => d.data.name.length > 12 ? `${d.data.name.slice(0, 9)}...` : d.data.name);

    nodeEnter.append('title')
      .text(d => this.formatTooltip(d.data));

    const nodeUpdate = node.merge(nodeEnter)
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.exit()
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${source.x},${source.y})`)
      .remove();

    root.each(d => { d.x0 = d.x; d.y0 = d.y; });
  }

  diagonal(s, d) {
    return `M ${s.x} ${s.y} 
            C ${(s.x + d.x) / 2} ${s.y}, 
              ${(s.x + d.x) / 2} ${d.y}, 
              ${d.x} ${d.y}`;
  }

  formatTooltip(data) {
    let output = `Name: ${data.name}`;
    if (data.url) {
      output += `\nURL: ${data.url.loc}`;
      if (data.url.lastmod) output += `\nLast Modified: ${data.url.lastmod}`;
      if (data.url.changefreq) output += `\nChange Frequency: ${data.url.changefreq}`;
      if (data.url.priority) output += `\nPriority: ${data.url.priority}`;
    }
    if (data.children && data.children.length > 0) {
      output += `\nChildren: ${data.children.length}`;
    }
    return output;
  }

  zoomToNode(node) {
    if (!this.svg || !this.zoomBehavior || !this.g) return;
    const currentTransform = d3.zoomTransform(this.svg.node());
    const scale = node.depth === 0 ? 1 : 1.5;
    const targetNode = node.depth === 0 ? node : node.parent ? node : node;
    const x = -targetNode.x * scale + this.width / 2;
    const y = -targetNode.y * scale + (node.depth === 0 ? 40 : this.height / 4);
    this.svg.transition().duration(750).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(x, y).scale(scale)
    );
    this.zoomLevel = scale;
  }

  fitToView(root) {
    if (!this.zoomBehavior || !this.g) return;
    const bounds = this.getTreeBounds(root);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const scaleX = (this.width - 120) / (width || 1);
    const scaleY = (this.height - 80) / (height || 1);
    const scale = Math.min(scaleX, scaleY, 1.5) * 0.85;
    const tx = this.width / 2 - (bounds.minX + width / 2) * scale;
    const ty = 40 - bounds.minY * scale;

    console.log('Fit to View - Bounds:', bounds, 'Scale:', scale);
    this.svg.transition().duration(750).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
    this.zoomLevel = scale;
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

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setTimeout(() => {
      this.updateDimensions();
      this.resetView();
    }, 100);
  }

  updateDimensions() {
    const containerRect = this.container.getBoundingClientRect();
    this.width = containerRect.width || window.innerWidth;
    this.height = containerRect.height || Math.max(window.innerHeight - 200, 600);
    this.svg.attr('width', this.width).attr('height', this.height);
    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);
  }

  destroy() {
    if (this.svg) {
      this.svg.on('.zoom', null);
      this.svg.on('wheel', null);
      this.svg.on('dblclick', null);
    }
    this.cleanupListeners();
    this.container.innerHTML = '';
    this.svg = null;
    this.g = null;
    this.zoomBehavior = null;
    this.treeData = null;
  }
}