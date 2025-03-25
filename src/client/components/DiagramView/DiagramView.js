import * as d3 from 'd3';
import { showLoading, hideLoading } from '../../utils/dom.js';
import './styles.css';

function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
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
    const root = { name: 'Sitemap', fullPath: '', children: [], shownCount: 9, expanded: false };
    const pathMap = new Map();

    urls.forEach(url => {
      try {
        const urlObj = new URL(url.loc || '');
        const hostname = urlObj.hostname;
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);

        let currentNode = root;
        let fullPath = hostname;

        if (!pathMap.has(hostname)) {
          const domainNode = { name: hostname, fullPath: hostname, children: [], url: null, shownCount: 9, expanded: false };
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
              shownCount: 9,
              expanded: false 
            };
            if (currentNode.children.length < currentNode.shownCount || currentNode.expanded) {
              currentNode.children.push(newNode);
            } else if (!currentNode.moreNode) {
              currentNode.moreNode = { 
                name: 'More...', 
                fullPath: `${currentNode.fullPath}/more`, 
                children: [], 
                isMore: true, 
                hiddenChildren: [],
                shownCount: 0,
                expanded: false 
              };
              currentNode.children.push(currentNode.moreNode);
            }
            if (currentNode.moreNode && !currentNode.expanded) {
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

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'tree')
      .on('dblclick', (event) => {
        if (event.target === this.svg.node()) this.resetView();
      });

    this.g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.zoomBehavior = d3.zoom()
      .scaleExtent([0.3, 5])
      .on('zoom', debounce((event) => this.zoomed(event), 50));

    this.svg.call(this.zoomBehavior)
      .on('wheel.zoom', (event) => {
        event.preventDefault();
        const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
        this.zoom(scaleFactor, event.clientX, event.clientY);
      });

    const hierarchy = d3.hierarchy(this.treeData);
    const tree = d3.tree()
      .size([this.width - 360, this.height * 2])
      .separation((a, b) => (a.parent === b.parent ? 3 : 4) / a.depth * 1.5);

    const root = tree(hierarchy);
    root.x0 = this.width / 2;
    root.y0 = 0;

    this.g.datum(root);
    this.adjustNodePositions(root);
    this.update(root, true);
    this.centerRoot(root);
  }

  adjustNodePositions(root) {
    const nodes = root.descendants();
    const baseSize = 120;
    const nodeSize = baseSize / this.zoomLevel;
    const minHorizontalDistance = nodeSize * 1.2; // 20% horizontal padding
    const minVerticalDistance = nodeSize * 1.5; // 50% vertical padding

    // Group nodes by depth
    const nodesByDepth = {};
    nodes.forEach(node => {
      const depth = node.depth;
      if (!nodesByDepth[depth]) nodesByDepth[depth] = [];
      nodesByDepth[depth].push(node);
    });

    // Adjust horizontal positions within each level
    Object.keys(nodesByDepth).forEach(depth => {
      const levelNodes = nodesByDepth[depth].sort((a, b) => a.x - b.x);
      for (let i = 1; i < levelNodes.length; i++) {
        const prevNode = levelNodes[i - 1];
        const currNode = levelNodes[i];
        const distance = currNode.x - prevNode.x;
        if (distance < minHorizontalDistance) {
          const adjustment = minHorizontalDistance - distance;
          currNode.x += adjustment;
          if (currNode.children) {
            currNode.descendants().forEach(descendant => {
              if (descendant !== currNode) descendant.x += adjustment;
            });
          }
        }
      }
    });

    // Adjust vertical positions for row spacing
    const depths = Object.keys(nodesByDepth).sort((a, b) => a - b);
    for (let i = 1; i < depths.length; i++) {
      const prevDepth = depths[i - 1];
      const currDepth = depths[i];
      const prevNodes = nodesByDepth[prevDepth];
      const currNodes = nodesByDepth[currDepth];
      const prevMaxY = Math.max(...prevNodes.map(n => n.y));
      const currMinY = Math.min(...currNodes.map(n => n.y));
      const verticalGap = currMinY - prevMaxY;
      if (verticalGap < minVerticalDistance) {
        const adjustment = minVerticalDistance - verticalGap;
        currNodes.forEach(node => {
          node.y += adjustment;
          if (node.children) {
            node.descendants().forEach(descendant => {
              if (descendant !== node) descendant.y += adjustment;
            });
          }
        });
      }
    }
  }

  zoomed(event) {
    if (!this.g) return;
    this.g.attr('transform', event.transform);
    this.zoomLevel = event.transform.k;
    const root = this.g.datum();
    this.adjustNodePositions(root);
    this.update(root);
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

  update(source, initial = false) {
    const duration = initial ? 0 : 750;
    const tree = d3.tree()
      .size([this.width - 360, this.height * 2])
      .separation((a, b) => (a.parent === b.parent ? 3 : 4) / a.depth * 1.5);
    
    const root = initial ? tree(source) : source;

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

    const baseSize = 120;
    const nodeSize = baseSize / this.zoomLevel;
    const fontSize = Math.max(12, nodeSize / 6);
    const strokeWidth = Math.max(1.5, nodeSize / 40);

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
          this.toggleMoreNode(d);
        } else {
          this.showNodeModal(d.data);
        }
      });

    nodeEnter.append('svg')
      .attr('width', nodeSize)
      .attr('height', nodeSize)
      .attr('x', -nodeSize / 2)
      .attr('y', -nodeSize / 2)
      .attr('viewBox', '0 32 576 448')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'folder-icon')
      .html(d => {
        let iconPath, fillColor, strokeColor;
        if (d.data.isMore) {
          iconPath = 'M282.4 142.8c11.8 11.8 27.8 18.5 44.5 18.5H504c9.9 0 18 8.1 18 18v36H54v-108c0-9.9 8.1-18 18-18h150.2c4.7 0 9.3 1.9 12.7 5.3l38.1-38.1-38.1 38.1 48.2 48zM54 270h468v198c0 9.9-8.1 18-18 18H72c-9.9 0-18-8.1-18-18V270zM320.8 105.2L272.6 57c-13.5-13.5-31.8-21-50.9-21H72C32.3 36 0 68.3 0 108v360c0 39.7 32.3 72 72 72h432c39.7 0 72-32.3 72-72V216c0-39.7-32.3-72-72-72H329.9c-2.4 0-4.7-.9-6.4-2.6z';
          fillColor = '#ff9f43';
          strokeColor = '#e67e22';
        } else if (!d.data.children || d.data.children.length === 0) {
          iconPath = 'M96 432c-13.2 0-24-10.8-24-24L72 96c0-13.2 10.8-24 24-24h240v120c0 26.6 21.5 48 48 48h120v288c0 13.2-10.8 24-24 24H96zM96 0C43 0 0 43 0 96v352c0 53 43 96 96 96h384c53 0 96-43 96-96V154.5c0-25.5-10-49.9-28.1-67.9L389.6 28.1C371.6 10.1 347.2 0 343.2 0H96zm145.5 433.5c14.1-14.1 14.1-36.9 0-50.9s-36.9-14.1-50.9 0L118.5 454.5c-14.1 14.1-14.1 36.9 0 50.9l72 72c14.1 14.1 36.9 14.1 50.9 0s14.1-36.9 0-50.9l-46.5-46.5 46.5-46.5zM385.5 382.5c-14.1-14.1-36.9-14.1-50.9 0s-14.1 36.9 0 50.9l46.5 46.5-46.5 46.5c-14.1 14.1-14.1 36.9 0 50.9s36.9 14.1 50.9 0l72-72c14.1-14.1 14.1-36.9 0-50.9l-72-72z';
          fillColor = '#5a9cff';
          strokeColor = '#2b6cb0';
        } else {
          iconPath = 'M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z';
          fillColor = '#5a9cff';
          strokeColor = '#2b6cb0';
        }
        return `<path d="${iconPath}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
      });

    nodeEnter.append('text')
      .attr('dy', '0.35em')
      .attr('y', nodeSize / 2 + fontSize)
      .attr('text-anchor', 'middle')
      .attr('class', 'folder-label')
      .style('font-size', `${fontSize}px`)
      .text(d => {
        const path = d.data.fullPath || d.data.name;
        const segments = path.split('/').filter(Boolean);
        const label = segments[segments.length - 1];
        return label.length > 36 ? `${label.slice(0, 33)}...` : label;
      });

    nodeEnter.append('title')
      .text(d => this.formatTooltip(d.data));

    const nodeUpdate = node.merge(nodeEnter)
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .each(function(d) {
        d3.select(this).select('.folder-icon')
          .attr('width', nodeSize)
          .attr('height', nodeSize)
          .attr('x', -nodeSize / 2)
          .attr('y', -nodeSize / 2)
          .select('path')
          .attr('stroke-width', strokeWidth);
        d3.select(this).select('.folder-label')
          .style('font-size', `${fontSize}px`)
          .attr('y', nodeSize / 2 + fontSize);
      });

    node.exit()
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${source.x},${source.y})`)
      .remove();

    root.each(d => { 
      d.x0 = d.x; 
      d.y0 = d.y; 
    });

    return root;
  }

  toggleMoreNode = debounce((d) => {
    const parentData = d.parent.data;
    const moreNodeIndex = parentData.children.findIndex(child => child.isMore);
    if (moreNodeIndex === -1) return;

    const moreNode = parentData.moreNode;
    const isExpanding = !moreNode.expanded;

    let nodesToAdd = [];
    if (isExpanding) {
      const currentShown = parentData.children.length - 1;
      const nodesToAddCount = Math.min(moreNode.shownCount, moreNode.hiddenChildren.length);
      nodesToAdd = moreNode.hiddenChildren.splice(0, nodesToAddCount);
      
      parentData.children.splice(moreNodeIndex, 1, ...nodesToAdd);
      if (moreNode.hiddenChildren.length > 0) {
        moreNode.shownCount = currentShown + nodesToAddCount;
        parentData.children.push(moreNode);
      } else {
        delete parentData.moreNode;
      }
      moreNode.expanded = true;
    } else {
      const collapseTo = parentData.shownCount;
      const currentChildren = parentData.children.filter(child => !child.isMore);
      const nodesToHide = currentChildren.slice(collapseTo);
      const nodesToKeep = currentChildren.slice(0, collapseTo);

      parentData.children = nodesToKeep;
      if (nodesToHide.length > 0) {
        moreNode.hiddenChildren = nodesToHide.concat(moreNode.hiddenChildren);
        moreNode.shownCount = collapseTo;
        moreNode.expanded = false;
        parentData.children.push(moreNode);
        parentData.moreNode = moreNode;
      } else {
        delete parentData.moreNode;
      }
      moreNode.expanded = false;
    }

    const root = d3.hierarchy(this.treeData);
    const tree = d3.tree()
      .size([this.width - 360, this.height * 2])
      .separation((a, b) => (a.parent === b.parent ? 3 : 4) / a.depth * 1.5);
    const updatedRoot = tree(root);

    updatedRoot.each(node => {
      if (isExpanding && nodesToAdd.map(n => n.fullPath).includes(node.data.fullPath)) {
        node.x0 = d.x0;
        node.y0 = d.y0;
      }
    });

    this.g.datum(updatedRoot);
    this.adjustNodePositions(updatedRoot);
    this.update(updatedRoot);

    if (isExpanding && nodesToAdd.length > 0) {
      const newNodes = updatedRoot.descendants().filter(node => 
        nodesToAdd.map(n => n.fullPath).includes(node.data.fullPath)
      );
      this.zoomToNodes(newNodes);
    }
  }, 200);

  showNodeModal(data) {
    const existingModal = document.querySelector('.node-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'node-modal';
    modal.innerHTML = `
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

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.node-modal-close');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  diagonal(s, d) {
    const baseSize = 120;
    const nodeSize = baseSize / this.zoomLevel;
    const offsetY = -nodeSize / 2;
    return `M ${s.x} ${s.y + offsetY} 
            C ${(s.x + d.x) / 2} ${s.y + offsetY}, 
              ${(s.x + d.x) / 2} ${d.y + offsetY}, 
              ${d.x} ${d.y + offsetY}`;
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

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
    });

    const width = maxX - minX + 120;
    const height = maxY - minY + 80;
    const scaleX = this.width / width;
    const scaleY = this.height / height;
    const scale = Math.min(scaleX, scaleY, 1.5) * 0.9;
    const tx = this.width / 2 - (minX + width / 2) * scale;
    const ty = this.height / 2 - (minY + height / 2) * scale;

    this.svg.transition().duration(750).call(
      this.zoomBehavior.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
    this.zoomLevel = scale;
  }

  centerRoot(root) {
    if (!this.zoomBehavior || !this.g) return;
    const scale = 1;
    const tx = this.width / 2 - root.x * scale;
    const ty = 40 - root.y * scale;

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
    const root = this.g.datum();
    this.centerRoot(root);
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
    document.querySelector('.node-modal')?.remove();
    this.svg = null;
    this.g = null;
    this.zoomBehavior = null;
    this.treeData = null;
  }
}