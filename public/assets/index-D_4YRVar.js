(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();function u(a=0){var t,i;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=a,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}function m(){const a=document.getElementById("loading");a&&a.classList.add("hidden")}function E(a){var t;m();const e=document.getElementById("feedback");e&&(e.textContent=a,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function g(a){var t;m();const e=document.getElementById("error");e&&(e.textContent=a,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function x(a){a.innerHTML=`
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
  `;const e=a.querySelector("#sitemapUrlForm"),t=a.querySelector("#sitemapUrlInput"),i=a.querySelector("#sitemapUploadForm"),s=a.querySelector("#clearCacheBtn");return e.addEventListener("submit",async n=>{n.preventDefault();const o=t.value.trim();if(o){u(10);try{const r=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:o})});if(!r.ok){const d=await r.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:l}=await r.json();u(50),window.history.pushState({},"",`/results?id=${l}`),v("/results"),E("Sitemap loaded successfully")}catch(r){g(r.message)}finally{m()}}}),i.addEventListener("submit",async n=>{n.preventDefault();const o=new FormData(i);u(10);try{const r=await fetch("/sitemap/upload",{method:"POST",body:o});if(!r.ok){const d=await r.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:l}=await r.json();u(50),window.history.pushState({},"",`/results?id=${l}`),v("/results"),E("Sitemap uploaded successfully")}catch(r){g(r.message)}finally{m()}}),s.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");E("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(n){g(n.message)}finally{m()}}),{}}class C{constructor(e){this.container=e,this.isExpanded=!0,this.expandedNodes=new Set,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.appendChild(e),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const i=t.nextElementSibling;i&&i.classList.toggle("hidden",!this.isExpanded);const s=t.dataset.path;this.isExpanded?this.expandedNodes.add(s):this.expandedNodes.delete(s)})}render(e,t={},i="url",s=""){u(50),this.container.innerHTML="",this.renderControls();const n=this.filterUrls(e,t,s),o=this.sortUrls(n,i),r=this.buildTree(o),l=document.createElement("ul");l.className="tree-list",this.renderTreeNode(r,l,""),this.container.appendChild(l),m()}filterUrls(e,t,i){return e.filter(s=>{const n=parseFloat(s.priority)||0,o=s.lastmod?new Date(s.lastmod):null,r=parseFloat(t.priority)||0,l=t.lastmod?new Date(t.lastmod):null;return(!i||s.loc.toLowerCase().includes(i.toLowerCase()))&&n>=r&&(!l||o&&o>=l)})}sortUrls(e,t){return e.sort((i,s)=>t==="lastmod"?new Date(s.lastmod||0)-new Date(i.lastmod||0)||i.loc.localeCompare(s.loc):t==="priority"&&parseFloat(s.priority||0)-parseFloat(i.priority||0)||i.loc.localeCompare(s.loc))}buildTree(e){const t={children:{},urls:[]};return e.forEach(i=>{try{const s=new URL(i.loc),n=s.pathname==="/"?[""]:s.pathname.split("/").filter(l=>l.length>0);let o=t;const r=s.hostname;o.children[r]||(o.children[r]={name:r,children:{},urls:[]}),o=o.children[r],n.forEach(l=>{const d=l||"/";o.children[d]||(o.children[d]={name:d,children:{},urls:[]}),o=o.children[d]}),o.urls.push(i)}catch(s){console.error(`Failed to parse URL: ${i.loc}`,s)}}),t}renderTreeNode(e,t,i){Object.entries(e.children).forEach(([s,n])=>{const o=i?`${i}/${n.name}`:n.name,r=document.createElement("li"),l=document.createElement("span"),d=this.expandedNodes.has(o)||this.isExpanded;if(l.className=`toggle ${d?"open":""}`,l.setAttribute("aria-expanded",d),l.dataset.path=o,l.textContent=n.name==="/"?o:n.name,l.addEventListener("click",()=>this.toggleNode(l)),r.appendChild(l),n.urls.length>0){const c=document.createElement("ul");c.className=d?"":"hidden",n.urls.forEach(S=>{const p=document.createElement("li");p.innerHTML=`<span class="url-leaf">${this.formatUrl(S)}</span>`,c.appendChild(p)}),r.appendChild(c)}if(Object.keys(n.children).length>0){const c=document.createElement("ul");c.className=d?"":"hidden",this.renderTreeNode(n,c,o),r.appendChild(c)}t.appendChild(r)})}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const i=e.nextElementSibling;i&&i.classList.toggle("hidden",t);const s=e.dataset.path;t?this.expandedNodes.delete(s):this.expandedNodes.add(s)}}class B{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.isExpanded=!1,this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
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
    `}setupEventListeners(){var e,t;this.container.querySelector("#urlSearch").addEventListener("input",()=>{const i=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(i)}),this.container.querySelector("#toggleFiltersLink").addEventListener("click",()=>{this.isExpanded=!this.isExpanded,this.render(),this.setupEventListeners()}),(e=this.container.querySelector("#applyFiltersBtn"))==null||e.addEventListener("click",()=>{const i={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},s=this.container.querySelector("#sortBy").value;this.options.onApply(i,s)}),(t=this.container.querySelector("#resetFiltersBtn"))==null||t.addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()})}toggleVisibility(e){this.isExpanded=e,this.render(),this.setupEventListeners()}}function F(a){a.innerHTML=`
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
  `;const t=a.querySelector("#filters-container").querySelector("#filters"),i=a.querySelector("#tree"),s=new C(i);let n=[],o={},r="url",l="";const d=new B(t,{onApply:(p,L)=>{o=p,r=L,s.render(n,o,r,l),c()},onReset:()=>{o={},r="url",l="",s.render(n,o,r,l),c()},onSearch:p=>{l=p,s.render(n,o,r,l),c()}});function c(){const p=i.querySelectorAll(".url-leaf").length;a.querySelector("#matchCount").textContent=`(${p} of ${n.length} URLs)`}return(async()=>{const L=new URLSearchParams(window.location.search).get("id");if(!L){g("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const y=await fetch(`/sitemap/results-data?id=${L}`);if(!y.ok){const w=await y.json();throw new Error(w.error||"Failed to load sitemap data")}const b=await y.json();n=b.urls,u(50),s.render(n,o,r,l),u(100),E(`Loaded ${b.urlCount} URLs`),a.querySelector("#totalUrls").textContent=b.urlCount,a.querySelector("#uniqueDomains").textContent=new Set(n.map(w=>new URL(w.loc).hostname)).size,f.updateUrls(n),c()}catch(y){g(y.message)}finally{m()}})(),{treeView:s,onToggleFilters:p=>{d.toggleVisibility(p)},urls:n}}class U{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),v("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var s,n;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const o=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(r=>`<li><a href="${r.loc}">${r.loc}</a> (Last Modified: ${r.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(o,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const o=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(r=>`"${r.loc}","${r.lastmod}","${r.changefreq}","${r.priority}"`).join(`
`);this.downloadFile(o,"sitemap.csv","text/csv")});const i=this.container.querySelector("#exportJsonBtn");i&&i.addEventListener("click",()=>{const o=JSON.stringify(this.options.urls,null,2);this.downloadFile(o,"sitemap.json","application/json")}),(n=this.container.querySelector("#themeToggleBtn"))==null||n.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,i){const s=new Blob([e],{type:i}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n)}}class q{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new U(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.render()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render()}}let h=null,f=null;function v(a){if(!h){console.error("Main element not initialized yet");return}console.log("Routing to:",a),h.innerHTML="";let e={};switch(a){case"/":e=x(h);break;case"/results":e=F(h);break;default:h.innerHTML="<h2>404 - Page not found</h2>"}f&&(f.updateRoute(a),e.urls&&f.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&f.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("app");if(h=document.getElementById("view"),!h||!a){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");a.insertBefore(e,h),f=new q(e),v(window.location.pathname),window.addEventListener("popstate",()=>v(window.location.pathname))});
