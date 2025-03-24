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
          <i class="fa-solid fa-plus"></i>
        </button>
        <button id="zoomOutBtn" title="Zoom Out" aria-label="Zoom out">
          <i class="fa-solid fa-minus"></i>
        </button>
        <button id="resetViewBtn" title="Reset View" aria-label="Reset view">
          <i class="fa-solid fa-expand"></i>
        </button>
        <button id="fullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle fullscreen">
          <i class="fa-solid fa-maximize"></i>
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
    const root = { name: 'Sitemap', fullPath: '', children: [], shownCount: 9 };
    const pathMap = new Map();

    urls.forEach(url => {
      try {
        const urlObj = new URL(url.loc || '');
        const hostname = urlObj.hostname;
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);

        let currentNode = root;
        let fullPath = hostname;

        if (!pathMap.has(hostname)) {
          const domainNode = { name: hostname, fullPath: hostname, children: [], url: null, shownCount: 9 };
          root.children.push(domainNode);
          pathMap.set(hostname, domainNode);
        }
        currentNode = pathMap.get(hostname);

        pathSegments.forEach((segment, index) => {
          fullPath += `/${segment}`;
          if (!pathMap.has(fullPath)) {
            const newNode = { 
              name: segment, 
              fullPath, 
              children: [], 
              url: index === pathSegments.length - 1 ? url : null,
              shownCount: 9 
            };
            if (currentNode.children.length < currentNode.shownCount) {
              currentNode.children.push(newNode);
            } else if (!currentNode.moreNode) {
              currentNode.moreNode = { 
                name: 'More...', 
                fullPath: `${currentNode.fullPath}/more`, 
                children: [], 
                isMore: true, 
                hiddenChildren: [],
                shownCount: 0 
              };
              currentNode.children.push(currentNode.moreNode);
            }
            if (currentNode.moreNode) {
              currentNode.moreNode.hiddenChildren.push(newNode);
            }
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
        if (d.data.isMore) {
          this.expandMoreNode(d);
        } else if (d.data.url) {
          window.open(d.data.url.loc, '_blank');
        }
      });

    nodeEnter.append('svg')
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', -30)
      .attr('y', -30)
      .attr('class', 'folder-icon')
      .html(d => `
        <path d="M4 8v20h28V12H18l-4-4H4zm10 0l4 4h10v12H8V8h6z" 
              fill="${d.data.isMore ? '#ff9f43' : '#5a9cff'}" 
              stroke="${d.data.isMore ? '#e67e22' : '#2b6cb0'}" 
              stroke-width="1.5"/>
      `);

    nodeEnter.append('text')
      .attr('dy', '0.35em')
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('class', 'folder-label')
      .text(d => {
        const path = d.data.fullPath || d.data.name;
        const segments = path.split('/').filter(Boolean);
        const label = segments[segments.length - 1];
        return label.length > 12 ? `${label.slice(0, 9)}...` : label;
      });

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
    return root; // Return root for use in expandMoreNode
  }

  expandMoreNode(d) {
    const parentData = d.parent.data;
    const moreNodeIndex = parentData.children.findIndex(child => child.isMore);
    if (moreNodeIndex === -1) return;

    const moreNode = parentData.moreNode;
    const currentShown = parentData.children.length - 1; // Subtract "More..." node
    const nextShown = Math.min(currentShown * 2, currentShown + moreNode.hiddenChildren.length);
    const nodesToAdd = moreNode.hiddenChildren.splice(0, nextShown - currentShown);

    // Replace "More..." with new nodes
    parentData.children.splice(moreNodeIndex, 1, ...nodesToAdd);
    if (moreNode.hiddenChildren.length > 0) {
      moreNode.shownCount = nextShown;
      parentData.children.push(moreNode); // Re-add "More..." if items remain
    } else {
      delete parentData.moreNode;
    }

    const root = d3.hierarchy(this.treeData);
    this.g.datum(root);
    const updatedRoot = this.update(root);

    // Find the newly added nodes in the updated hierarchy
    const newNodeIds = nodesToAdd.map(node => node.fullPath);
    const newNodes = updatedRoot.descendants().filter(node => 
      newNodeIds.includes(node.data.fullPath)
    );

    // Zoom to frame the new nodes
    if (newNodes.length > 0) {
      this.zoomToNodes(newNodes);
    } else {
      this.fitToView(updatedRoot);
    }
  }

  diagonal(s, d) {
    return `M ${s.x} ${s.y} 
            C ${(s.x + d.x) / 2} ${s.y}, 
              ${(s.x + d.x) / 2} ${d.y}, 
              ${d.x} ${d.y}`;
  }

  formatTooltip(data) {
    let output = `Path: ${data.fullPath || data.name}`;
    if (data.url) {
      output += `\nFull URL: ${data.url.loc}`;
      if (data.url.lastmod) output += `\nLast Modified: ${data.url.lastmod}`;
      if (data.url.changefreq) output += `\nChange Frequency: ${data.url.changefreq}`;
      if (data.url.priority) output += `\nPriority: ${data.url.priority}`;
    }
    if (data.children && data.children.length > 0) {
      output += `\nChild Nodes: ${data.children.length}`;
    }
    if (data.isMore && data.hiddenChildren) {
      output += `\nRemaining Hidden Items: ${data.hiddenChildren.length}`;
      output += `\nCurrently Shown: ${data.shownCount}`;
    }
    output += `\nDepth: ${data.fullPath ? data.fullPath.split('/').filter(Boolean).length : 0}`;
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

  zoomToNodes(nodes) {
    if (!this.svg || !this.zoomBehavior || !this.g || nodes.length === 0) return;

    // Calculate bounds of the new nodes
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const scaleX = (this.width - 120) / (width || 1);
    const scaleY = (this.height - 80) / (height || 1);
    const scale = Math.min(scaleX, scaleY, 1.5) * 0.9; // Slightly tighter fit
    const tx = this.width / 2 - (minX + width / 2) * scale;
    const ty = this.height / 2 - (minY + height / 2) * scale;

    console.log('Zooming to new nodes - Bounds:', { minX, maxX, minY, maxY }, 'Scale:', scale);

    this.svg.transition().duration(750).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
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