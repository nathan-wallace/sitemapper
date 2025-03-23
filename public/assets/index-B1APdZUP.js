(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();function u(r=0){var t,i;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=r,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}function m(){const r=document.getElementById("loading");r&&r.classList.add("hidden")}function v(r){var t;m();const e=document.getElementById("feedback");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function y(r){var t;m();const e=document.getElementById("error");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function E(r){r.innerHTML=`
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
  `;const e=r.querySelector("#sitemapUrlForm"),t=r.querySelector("#sitemapUrlInput"),i=r.querySelector("#sitemapUploadForm"),n=r.querySelector("#clearCacheBtn");return e.addEventListener("submit",async s=>{s.preventDefault();const a=t.value.trim();if(a){u(10);try{const o=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!o.ok){const l=await o.json();throw new Error(l.error||"Failed to fetch sitemap")}const{id:d}=await o.json();u(50),window.history.pushState({},"",`/results?id=${d}`),g("/results"),v("Sitemap loaded successfully")}catch(o){y(o.message)}finally{m()}}}),i.addEventListener("submit",async s=>{s.preventDefault();const a=new FormData(i);u(10);try{const o=await fetch("/sitemap/upload",{method:"POST",body:a});if(!o.ok){const l=await o.json();throw new Error(l.error||"Failed to upload sitemap")}const{id:d}=await o.json();u(50),window.history.pushState({},"",`/results?id=${d}`),g("/results"),v("Sitemap uploaded successfully")}catch(o){y(o.message)}finally{m()}}),n.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");v("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(s){y(s.message)}finally{m()}}),{}}class b{constructor(e){this.container=e,this.isExpanded=!0,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.appendChild(e),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const i=t.nextElementSibling;i&&i.classList.toggle("hidden",!this.isExpanded)})}render(e,t={},i="url"){u(50),this.container.innerHTML="",this.renderControls();const n=this.filterUrls(e,t),s=this.sortUrls(n,i),a=this.buildTree(s),o=document.createElement("ul");o.className="tree-list",this.renderTreeNode(a,o,""),this.container.appendChild(o),m()}filterUrls(e,t){return e.filter(i=>{const n=parseFloat(i.priority)||0,s=i.lastmod?new Date(i.lastmod):null,a=parseFloat(t.priority)||0,o=t.lastmod?new Date(t.lastmod):null;return n>=a&&(!o||s&&s>=o)})}sortUrls(e,t){return e.sort((i,n)=>t==="lastmod"?new Date(n.lastmod||0)-new Date(i.lastmod||0)||i.loc.localeCompare(n.loc):t==="priority"&&parseFloat(n.priority||0)-parseFloat(i.priority||0)||i.loc.localeCompare(n.loc))}buildTree(e){const t={children:{},urls:[]};return e.forEach(i=>{try{const n=new URL(i.loc),s=n.pathname==="/"?[""]:n.pathname.split("/").filter(d=>d.length>0);let a=t;const o=n.hostname;a.children[o]||(a.children[o]={name:o,children:{},urls:[]}),a=a.children[o],s.forEach(d=>{const l=d||"/";a.children[l]||(a.children[l]={name:l,children:{},urls:[]}),a=a.children[l]}),a.urls.push(i)}catch(n){console.error(`Failed to parse URL: ${i.loc}`,n)}}),t}renderTreeNode(e,t,i){Object.entries(e.children).forEach(([n,s])=>{const a=i?`${i}/${s.name}`:s.name,o=document.createElement("li"),d=document.createElement("span");if(d.className="toggle open",d.setAttribute("aria-expanded","true"),d.textContent=s.name==="/"?a:s.name,d.addEventListener("click",()=>this.toggleNode(d)),o.appendChild(d),s.urls.length>0){const l=document.createElement("ul");s.urls.forEach(c=>{const p=document.createElement("li");p.innerHTML=`<span class="url-leaf">${this.formatUrl(c)}</span>`,l.appendChild(p)}),o.appendChild(l)}if(Object.keys(s.children).length>0){const l=document.createElement("ul");this.renderTreeNode(s,l,a),o.appendChild(l)}t.appendChild(o)})}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const i=e.nextElementSibling;i&&i.classList.toggle("hidden",t)}}class w{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.isExpanded=!1,this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
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
    `}setupEventListeners(){var e,t;this.container.querySelector("#urlSearch").addEventListener("input",()=>{const i=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(i)}),this.container.querySelector("#toggleFiltersLink").addEventListener("click",()=>{this.isExpanded=!this.isExpanded,this.render(),this.setupEventListeners()}),(e=this.container.querySelector("#applyFiltersBtn"))==null||e.addEventListener("click",()=>{const i={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},n=this.container.querySelector("#sortBy").value;this.options.onApply(i,n)}),(t=this.container.querySelector("#resetFiltersBtn"))==null||t.addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()})}toggleVisibility(e){this.isExpanded=e,this.render(),this.setupEventListeners()}}function S(r){r.innerHTML=`
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
  `;const t=r.querySelector("#filters-container").querySelector("#filters"),i=r.querySelector("#tree"),n=new b(i);let s=[];const a=new w(t,{onApply:(d,l)=>{n.render(s,d,l);const c=i.querySelectorAll("li").length;r.querySelector("#matchCount").textContent=`(${c} of ${s.length} URLs)`},onReset:()=>{n.render(s),r.querySelector("#matchCount").textContent=""},onSearch:d=>{i.querySelectorAll(".url-leaf").forEach(l=>{if(l.classList.remove("highlight"),d&&l.textContent.toLowerCase().includes(d)){l.classList.add("highlight");let c=l.closest("ul");for(;c;){c.classList.remove("hidden");const p=c.previousElementSibling;p&&p.classList.contains("toggle")&&(p.classList.add("open"),p.setAttribute("aria-expanded","true")),c=c.parentElement.closest("ul")}}})}});return(async()=>{const l=new URLSearchParams(window.location.search).get("id");if(!l){y("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const c=await fetch(`/sitemap/results-data?id=${l}`);if(!c.ok){const L=await c.json();throw new Error(L.error||"Failed to load sitemap data")}const p=await c.json();s=p.urls,u(50),n.render(s),u(100),v(`Loaded ${p.urlCount} URLs`),r.querySelector("#totalUrls").textContent=p.urlCount,r.querySelector("#uniqueDomains").textContent=new Set(s.map(L=>new URL(L.loc).hostname)).size,f.updateUrls(s)}catch(c){y(c.message)}finally{m()}})(),{treeView:n,onToggleFilters:d=>{a.toggleVisibility(d)},urls:s}}class x{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),g("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var n,s;(n=this.container.querySelector("#backBtn"))==null||n.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const a=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(o=>`<li><a href="${o.loc}">${o.loc}</a> (Last Modified: ${o.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(a,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const a=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(o=>`"${o.loc}","${o.lastmod}","${o.changefreq}","${o.priority}"`).join(`
`);this.downloadFile(a,"sitemap.csv","text/csv")});const i=this.container.querySelector("#exportJsonBtn");i&&i.addEventListener("click",()=>{const a=JSON.stringify(this.options.urls,null,2);this.downloadFile(a,"sitemap.json","application/json")}),(s=this.container.querySelector("#themeToggleBtn"))==null||s.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,i){const n=new Blob([e],{type:i}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s)}}class C{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new x(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.render()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render()}}let h=null,f=null;function g(r){if(!h){console.error("Main element not initialized yet");return}console.log("Routing to:",r),h.innerHTML="";let e={};switch(r){case"/":e=E(h);break;case"/results":e=S(h);break;default:h.innerHTML="<h2>404 - Page not found</h2>"}f&&(f.updateRoute(r),e.urls&&f.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&f.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");if(h=document.getElementById("view"),!h||!r){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");r.insertBefore(e,h),f=new C(e),g(window.location.pathname),window.addEventListener("popstate",()=>g(window.location.pathname))});
