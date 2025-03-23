(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function u(r=0){var t,o;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=r,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}function f(){const r=document.getElementById("loading");r&&r.classList.add("hidden")}function b(r){var t;f();const e=document.getElementById("feedback");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function E(r){var t;f();const e=document.getElementById("error");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function x(r){r.innerHTML=`
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
  `;const e=r.querySelector("#sitemapUrlForm"),t=r.querySelector("#sitemapUrlInput"),o=r.querySelector("#sitemapUploadForm"),s=r.querySelector("#clearCacheBtn");return e.addEventListener("submit",async i=>{i.preventDefault();const a=t.value.trim();if(a){u(10);try{const n=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!n.ok){const p=await n.json();throw new Error(p.error||"Failed to fetch sitemap")}const{id:l}=await n.json();u(50),window.history.pushState({},"",`/results?id=${l}`),L("/results"),b("Sitemap loaded successfully")}catch(n){E(n.message)}finally{f()}}}),o.addEventListener("submit",async i=>{i.preventDefault();const a=new FormData(o);u(10);try{const n=await fetch("/sitemap/upload",{method:"POST",body:a});if(!n.ok){const p=await n.json();throw new Error(p.error||"Failed to upload sitemap")}const{id:l}=await n.json();u(50),window.history.pushState({},"",`/results?id=${l}`),L("/results"),b("Sitemap uploaded successfully")}catch(n){E(n.message)}finally{f()}}),s.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");b("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(i){E(i.message)}finally{f()}}),{}}class C{constructor(e){this.container=e,this.isExpanded=!0,this.expandedNodes=new Set,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.appendChild(e),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const o=t.nextElementSibling;o&&o.classList.toggle("hidden",!this.isExpanded);const s=t.dataset.path;this.isExpanded?this.expandedNodes.add(s):this.expandedNodes.delete(s)})}render(e,t={},o="url",s=""){u(50),this.container.innerHTML="",this.renderControls();const i=this.filterUrls(e,t,s),a=this.buildTree(i,o),n=document.createElement("ul");n.className="tree-list",this.renderTreeNode(a,n,"",o),this.container.appendChild(n),f()}filterUrls(e,t,o){return e.filter(s=>{const i=parseFloat(s.priority)||0,a=s.lastmod?new Date(s.lastmod):null,n=parseFloat(t.priority)||0,l=t.lastmod?new Date(t.lastmod):null;return(!o||s.loc.toLowerCase().includes(o.toLowerCase()))&&i>=n&&(!l||a&&a>=l)})}sortUrls(e,t){return e.sort((o,s)=>t==="lastmod"?new Date(s.lastmod||0)-new Date(o.lastmod||0)||o.loc.localeCompare(s.loc):t==="priority"&&parseFloat(s.priority||0)-parseFloat(o.priority||0)||o.loc.localeCompare(s.loc))}buildTree(e,t){const o={children:{},urls:[]};return e.forEach(s=>{try{const i=new URL(s.loc),a=i.pathname==="/"?[""]:i.pathname.split("/").filter(p=>p.length>0);let n=o;const l=i.hostname;n.children[l]||(n.children[l]={name:l,children:{},urls:[]}),n=n.children[l],a.forEach(p=>{const d=p||"/";n.children[d]||(n.children[d]={name:d,children:{},urls:[]}),n=n.children[d]}),n.urls.push(s)}catch(i){console.error(`Failed to parse URL: ${s.loc}`,i)}}),this.sortTree(o,t),o}sortTree(e,t){e.urls.length>0&&(e.urls=this.sortUrls(e.urls,t)),Object.values(e.children).forEach(o=>this.sortTree(o,t))}renderTreeNode(e,t,o,s){Object.entries(e.children).sort((a,n)=>s==="url"?a[1].name.localeCompare(n[1].name):0).forEach(([a,n])=>{const l=o?`${o}/${n.name}`:n.name,p=document.createElement("li"),d=document.createElement("span"),v=this.expandedNodes.has(l)||this.isExpanded;if(d.className=`toggle ${v?"open":""}`,d.setAttribute("aria-expanded",v),d.dataset.path=l,d.textContent=n.name==="/"?l:n.name,d.addEventListener("click",()=>this.toggleNode(d)),p.appendChild(d),n.urls.length>0){const c=document.createElement("ul");c.className=v?"":"hidden",n.urls.forEach(y=>{const h=document.createElement("li");h.innerHTML=`<span class="url-leaf">${this.formatUrl(y)}</span>`,c.appendChild(h)}),p.appendChild(c)}if(Object.keys(n.children).length>0){const c=document.createElement("ul");c.className=v?"":"hidden",this.renderTreeNode(n,c,l,s),p.appendChild(c)}t.appendChild(p)})}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const o=e.nextElementSibling;o&&o.classList.toggle("hidden",t);const s=e.dataset.path;t?this.expandedNodes.delete(s):this.expandedNodes.add(s)}}class B{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.isExpanded=!1,this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
      <div class="search-container">
        <input type="text" id="urlSearch" placeholder="Search URLs..." />
        <span id="toggleFiltersLink" class="filter-toggle" aria-expanded="${this.isExpanded}">
          ${this.isExpanded?"Hide filters":"Show filters"}
        </span>
      </div>
      <div id="additional-filters" class="${this.isExpanded?"":"hidden"}">
        <div class="filter-group">
          <label for="priorityFilter">Min Priority:</label>
          <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="0" />
        </div>
        <div class="filter-group">
          <label for="lastmodFilter">Last Modified After:</label>
          <input type="date" id="lastmodFilter" />
        </div>
        <div class="filter-group">
          <label for="sortBy">Sort By:</label>
          <select id="sortBy">
            <option value="url">URL</option>
            <option value="lastmod">Last Modified</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div class="filter-actions">
          <button id="applyFiltersBtn">Apply</button>
          <button id="resetFiltersBtn">Reset</button>
        </div>
      </div>
    `}setupEventListeners(){var e,t;this.container.querySelector("#urlSearch").addEventListener("input",()=>{const o=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(o)}),this.container.querySelector("#toggleFiltersLink").addEventListener("click",()=>{this.isExpanded=!this.isExpanded,this.render(),this.setupEventListeners()}),(e=this.container.querySelector("#applyFiltersBtn"))==null||e.addEventListener("click",()=>{const o={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},s=this.container.querySelector("#sortBy").value;this.options.onApply(o,s)}),(t=this.container.querySelector("#resetFiltersBtn"))==null||t.addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()})}toggleVisibility(e){this.isExpanded=e,this.render(),this.setupEventListeners()}}function F(r){r.innerHTML=`
    <div id="filters-container">
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
  `;const t=r.querySelector("#filters-container").querySelector("#filters"),o=r.querySelector("#tree"),s=new C(o);let i=[],a={},n="url",l="";const p=new B(t,{onApply:(c,y)=>{a=c,n=y,s.render(i,a,n,l),d()},onReset:()=>{a={},n="url",l="",s.render(i,a,n,l),d()},onSearch:c=>{l=c,s.render(i,a,n,l),d()}});function d(){const c=o.querySelectorAll(".url-leaf").length;r.querySelector("#matchCount").textContent=`(${c} of ${i.length} URLs)`}return(async()=>{const y=new URLSearchParams(window.location.search).get("id");if(!y){E("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const h=await fetch(`/sitemap/results-data?id=${y}`);if(!h.ok){const S=await h.json();throw new Error(S.error||"Failed to load sitemap data")}const w=await h.json();i=w.urls,u(50),s.render(i,a,n,l),u(100),b(`Loaded ${w.urlCount} URLs`),r.querySelector("#totalUrls").textContent=w.urlCount,r.querySelector("#uniqueDomains").textContent=new Set(i.map(S=>new URL(S.loc).hostname)).size,g.updateUrls(i),d()}catch(h){E(h.message)}finally{f()}})(),{treeView:s,onToggleFilters:c=>{p.toggleVisibility(c)},urls:i}}class U{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),L("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var s,i;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const a=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(n=>`<li><a href="${n.loc}">${n.loc}</a> (Last Modified: ${n.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(a,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const a=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(n=>`"${n.loc}","${n.lastmod}","${n.changefreq}","${n.priority}"`).join(`
`);this.downloadFile(a,"sitemap.csv","text/csv")});const o=this.container.querySelector("#exportJsonBtn");o&&o.addEventListener("click",()=>{const a=JSON.stringify(this.options.urls,null,2);this.downloadFile(a,"sitemap.json","application/json")}),(i=this.container.querySelector("#themeToggleBtn"))==null||i.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,o){const s=new Blob([e],{type:o}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}class q{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new U(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.render()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render()}}let m=null,g=null;function L(r){if(!m){console.error("Main element not initialized yet");return}console.log("Routing to:",r),m.innerHTML="";let e={};switch(r){case"/":e=x(m);break;case"/results":e=F(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}g&&(g.updateRoute(r),e.urls&&g.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&g.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");if(m=document.getElementById("view"),!m||!r){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");r.insertBefore(e,m),g=new q(e),L(window.location.pathname),window.addEventListener("popstate",()=>L(window.location.pathname))});
