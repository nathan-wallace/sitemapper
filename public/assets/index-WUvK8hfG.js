(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();function p(a=0){var t,s;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=a,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(s=document.getElementById("feedback"))==null||s.classList.add("hidden"))}function f(){const a=document.getElementById("loading");a&&a.classList.add("hidden")}function L(a){var t;f();const e=document.getElementById("feedback");e&&(e.textContent=a,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function g(a){var t;f();const e=document.getElementById("error");e&&(e.textContent=a,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function E(a){a.innerHTML=`
    <h2>Load Sitemap</h2>
    <form id="sitemapUrlForm" method="POST" class="input-group">
      <label for="sitemapUrlInput">Enter Sitemap URL:</label>
      <input type="text" id="sitemapUrlInput" name="url" placeholder="https://example.com/sitemap.xml" />
      <button type="submit">Load Sitemap</button>
    </form>
    <form id="sitemapUploadForm" method="POST" enctype="multipart/form-data" class="input-group">
      <label for="sitemapFile">Upload Sitemap File:</label>
      <input type="file" id="sitemapFile" name="sitemapFile" />
      <button type="submit">Upload</button>
    </form>
    <div class="button-group">
      <button id="clearCacheBtn" type="button">Clear Cache</button>
    </div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;const e=a.querySelector("#sitemapUrlForm"),t=a.querySelector("#sitemapUrlInput"),s=a.querySelector("#sitemapUploadForm"),i=a.querySelector("#clearCacheBtn");return e.addEventListener("submit",async n=>{n.preventDefault();const o=t.value.trim();if(o){p(10);try{const r=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:o})});if(!r.ok){const l=await r.json();throw new Error(l.error||"Failed to fetch sitemap")}const{id:c}=await r.json();p(50),window.history.pushState({},"",`/results?id=${c}`),v("/results"),L("Sitemap loaded successfully")}catch(r){g(r.message)}finally{f()}}}),s.addEventListener("submit",async n=>{n.preventDefault();const o=new FormData(s);p(10);try{const r=await fetch("/sitemap/upload",{method:"POST",body:o});if(!r.ok){const l=await r.json();throw new Error(l.error||"Failed to upload sitemap")}const{id:c}=await r.json();p(50),window.history.pushState({},"",`/results?id=${c}`),v("/results"),L("Sitemap uploaded successfully")}catch(r){g(r.message)}finally{f()}}),i.addEventListener("click",async()=>{p();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");L("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(n){g(n.message)}finally{f()}}),{}}class w{constructor(e){this.container=e,this.isExpanded=!0,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.appendChild(e),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const s=t.nextElementSibling;s&&s.classList.toggle("hidden",!this.isExpanded)})}render(e,t={},s="url"){p(50),this.container.innerHTML="",this.renderControls();const i=this.filterUrls(e,t),n=this.sortUrls(i,s),o=this.buildTree(n),r=document.createElement("ul");r.className="tree-list",this.renderTreeNode(o,r,""),this.container.appendChild(r),f()}filterUrls(e,t){return e.filter(s=>{const i=parseFloat(s.priority)||0,n=s.lastmod?new Date(s.lastmod):null,o=parseFloat(t.priority)||0,r=t.lastmod?new Date(t.lastmod):null;return i>=o&&(!r||n&&n>=r)})}sortUrls(e,t){return e.sort((s,i)=>t==="lastmod"?new Date(i.lastmod||0)-new Date(s.lastmod||0)||s.loc.localeCompare(i.loc):t==="priority"&&parseFloat(i.priority||0)-parseFloat(s.priority||0)||s.loc.localeCompare(i.loc))}buildTree(e){const t={children:{},urls:[]};return e.forEach(s=>{try{const i=new URL(s.loc),n=i.pathname==="/"?[""]:i.pathname.split("/").filter(c=>c.length>0);let o=t;const r=i.hostname;o.children[r]||(o.children[r]={name:r,children:{},urls:[]}),o=o.children[r],n.forEach(c=>{const l=c||"/";o.children[l]||(o.children[l]={name:l,children:{},urls:[]}),o=o.children[l]}),o.urls.push(s)}catch(i){console.error(`Failed to parse URL: ${s.loc}`,i)}}),t}renderTreeNode(e,t,s){Object.entries(e.children).forEach(([i,n])=>{const o=s?`${s}/${n.name}`:n.name,r=document.createElement("li"),c=document.createElement("span");if(c.className="toggle open",c.setAttribute("aria-expanded","true"),c.textContent=n.name==="/"?o:n.name,c.addEventListener("click",()=>this.toggleNode(c)),r.appendChild(c),n.urls.length>0){const l=document.createElement("ul");n.urls.forEach(u=>{const d=document.createElement("li");d.innerHTML=`<span class="url-leaf">${this.formatUrl(u)}</span>`,l.appendChild(d)}),r.appendChild(l)}if(Object.keys(n.children).length>0){const l=document.createElement("ul");this.renderTreeNode(n,l,o),r.appendChild(l)}t.appendChild(r)})}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const s=e.nextElementSibling;s&&s.classList.toggle("hidden",t)}}class S{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
      <div class="search-container">
        <input type="text" id="urlSearch" placeholder="Search URLs..." />
      </div>
      <div id="additional-filters" class="hidden">
        <label for="priorityFilter">Min Priority:</label>
        <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="0" />
        <label for="lastmodFilter">Last Modified After:</label>
        <input type="date" id="lastmodFilter" />
        <label for="sortBy">Sort By:</label>
        <select id="sortBy">
          <option value="url">URL</option>
          <option value="lastmod">Last Modified</option>
          <option value="priority">Priority</option>
        </select>
        <button id="applyFiltersBtn">Apply Filters</button>
        <button id="resetFiltersBtn">Reset Filters</button>
      </div>
    `}setupEventListeners(){this.container.querySelector("#urlSearch").addEventListener("input",()=>{const e=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(e)}),this.container.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const e={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},t=this.container.querySelector("#sortBy").value;this.options.onApply(e,t)}),this.container.querySelector("#resetFiltersBtn").addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()})}toggleVisibility(e){this.container.querySelector("#additional-filters").classList.toggle("hidden",!e)}}function x(a){a.innerHTML=`
    <div id="filters-container">
      <button id="toggleFiltersBtn" aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
      <div id="filters"></div>
    </div>
    <div id="stats">
      <p>Total URLs: <span id="totalUrls">0</span></p>
      <p>Unique Domains: <span id="uniqueDomains">0</span></p>
      <p>Matches: <span id="matchCount"></span></p>
    </div>
    <div id="tree" class="tree"></div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;const e=a.querySelector("#filters-container"),t=e.querySelector("#toggleFiltersBtn"),s=e.querySelector("#filters"),i=a.querySelector("#tree"),n=new w(i);let o=[];const r=new S(s,{onApply:(l,u)=>{n.render(o,l,u);const d=i.querySelectorAll("li").length;a.querySelector("#matchCount").textContent=`(${d} of ${o.length} URLs)`},onReset:()=>{n.render(o),a.querySelector("#matchCount").textContent=""},onSearch:l=>{i.querySelectorAll(".url-leaf").forEach(u=>{if(u.classList.remove("highlight"),l&&u.textContent.toLowerCase().includes(l)){u.classList.add("highlight");let d=u.closest("ul");for(;d;){d.classList.remove("hidden");const h=d.previousElementSibling;h&&h.classList.contains("toggle")&&(h.classList.add("open"),h.setAttribute("aria-expanded","true")),d=d.parentElement.closest("ul")}}})}});return t.addEventListener("click",()=>{const l=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!l),r.toggleVisibility(!l)}),(async()=>{const u=new URLSearchParams(window.location.search).get("id");if(!u){g("No sitemap ID provided. Please load a sitemap first.");return}p(10);try{const d=await fetch(`/sitemap/results-data?id=${u}`);if(!d.ok){const b=await d.json();throw new Error(b.error||"Failed to load sitemap data")}const h=await d.json();o=h.urls,p(50),n.render(o),p(100),L(`Loaded ${h.urlCount} URLs`),a.querySelector("#totalUrls").textContent=h.urlCount,a.querySelector("#uniqueDomains").textContent=new Set(o.map(b=>new URL(b.loc).hostname)).size,y.updateUrls(o)}catch(d){g(d.message)}finally{f()}})(),{treeView:n,onToggleFilters:l=>{t.setAttribute("aria-expanded",l),r.toggleVisibility(l)},urls:o}}class B{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),v("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var i,n;(i=this.container.querySelector("#backBtn"))==null||i.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const o=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(r=>`<li><a href="${r.loc}">${r.loc}</a> (Last Modified: ${r.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(o,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const o=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(r=>`"${r.loc}","${r.lastmod}","${r.changefreq}","${r.priority}"`).join(`
`);this.downloadFile(o,"sitemap.csv","text/csv")});const s=this.container.querySelector("#exportJsonBtn");s&&s.addEventListener("click",()=>{const o=JSON.stringify(this.options.urls,null,2);this.downloadFile(o,"sitemap.json","application/json")}),(n=this.container.querySelector("#themeToggleBtn"))==null||n.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,s){const i=new Blob([e],{type:s}),n=document.createElement("a");n.href=URL.createObjectURL(i),n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n)}}class C{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new B(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.render()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render()}}let m=null,y=null;function v(a){if(!m){console.error("Main element not initialized yet");return}console.log("Routing to:",a),m.innerHTML="";let e={};switch(a){case"/":e=E(m);break;case"/results":e=x(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}y&&(y.updateRoute(a),e.urls&&y.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&y.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("app");if(m=document.getElementById("view"),!m||!a){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");a.insertBefore(e,m),y=new C(e),v(window.location.pathname),window.addEventListener("popstate",()=>v(window.location.pathname))});
