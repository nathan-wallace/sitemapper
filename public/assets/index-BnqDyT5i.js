(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();function u(n=0){var t,i;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=n,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}function m(){const n=document.getElementById("loading");n&&n.classList.add("hidden")}function L(n){var t;m();const e=document.getElementById("feedback");e&&(e.textContent=n,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function g(n){var t;m();const e=document.getElementById("error");e&&(e.textContent=n,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function w(n){n.innerHTML=`
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
  `;const e=n.querySelector("#sitemapUrlForm"),t=n.querySelector("#sitemapUrlInput"),i=n.querySelector("#sitemapUploadForm"),s=n.querySelector("#clearCacheBtn");return e.addEventListener("submit",async o=>{o.preventDefault();const a=t.value.trim();if(a){u(10);try{const r=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!r.ok){const l=await r.json();throw new Error(l.error||"Failed to fetch sitemap")}const{id:d}=await r.json();u(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),L("Sitemap loaded successfully")}catch(r){g(r.message)}finally{m()}}}),i.addEventListener("submit",async o=>{o.preventDefault();const a=new FormData(i);u(10);try{const r=await fetch("/sitemap/upload",{method:"POST",body:a});if(!r.ok){const l=await r.json();throw new Error(l.error||"Failed to upload sitemap")}const{id:d}=await r.json();u(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),L("Sitemap uploaded successfully")}catch(r){g(r.message)}finally{m()}}),s.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");L("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(o){g(o.message)}finally{m()}}),{}}class S{constructor(e){this.container=e,this.isExpanded=!0,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.insertBefore(e,this.container.firstChild),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const i=t.nextElementSibling;i&&i.classList.toggle("hidden",!this.isExpanded)})}render(e,t={},i="url"){u(50),this.container.innerHTML="",this.renderControls();const s=document.createElement("ul");s.className="tree-list";const o=this.filterUrls(e,t),a=this.sortUrls(o,i),r=this.groupByDomain(a);Object.entries(r).forEach(([d,l])=>{const c=document.createElement("li"),p=document.createElement("span");p.className="toggle open",p.setAttribute("aria-expanded","true"),p.textContent=d,p.addEventListener("click",()=>this.toggleNode(p)),c.appendChild(p);const v=document.createElement("ul");l.forEach(E=>{const b=document.createElement("li");b.innerHTML=`<span>${this.formatUrl(E)}</span>`,v.appendChild(b)}),c.appendChild(v),s.appendChild(c)}),this.container.appendChild(s),m()}filterUrls(e,t){return e.filter(i=>{const s=parseFloat(i.priority)||0,o=i.lastmod?new Date(i.lastmod):null,a=parseFloat(t.priority)||0,r=t.lastmod?new Date(t.lastmod):null;return s>=a&&(!r||o&&o>=r)})}sortUrls(e,t){return e.sort((i,s)=>t==="lastmod"?new Date(s.lastmod||0)-new Date(i.lastmod||0)||i.loc.localeCompare(s.loc):t==="priority"&&parseFloat(s.priority||0)-parseFloat(i.priority||0)||i.loc.localeCompare(s.loc))}groupByDomain(e){const t={};return e.forEach(i=>{const s=new URL(i.loc).hostname;t[s]=t[s]||[],t[s].push(i)}),t}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const i=e.nextElementSibling;i&&i.classList.toggle("hidden",t)}}class B{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
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
      <input type="text" id="urlSearch" placeholder="Search URLs..." />
      <button id="applyFiltersBtn">Apply Filters</button>
      <button id="resetFiltersBtn">Reset Filters</button>
    `}setupEventListeners(){this.container.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const e={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},t=this.container.querySelector("#sortBy").value;this.options.onApply(e,t)}),this.container.querySelector("#resetFiltersBtn").addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()}),this.container.querySelector("#urlSearch").addEventListener("input",()=>{const e=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(e)})}toggleVisibility(e){this.container.classList.toggle("hidden",!e)}}function x(n){n.innerHTML=`
    <div id="filters" class="hidden"></div>
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
  `;const e=n.querySelector("#filters"),t=n.querySelector("#tree"),i=new S(t);let s=[];const o=new B(e,{onApply:(r,d)=>{i.render(s,r,d);const l=t.querySelectorAll("li").length;n.querySelector("#matchCount").textContent=`(${l} of ${s.length} URLs)`},onReset:()=>{i.render(s),n.querySelector("#matchCount").textContent=""},onSearch:r=>{t.querySelectorAll("span").forEach(d=>{if(d.classList.remove("highlight"),r&&d.textContent.toLowerCase().includes(r)){d.classList.add("highlight");let l=d.closest("ul");for(;l;){l.classList.remove("hidden");const c=l.previousElementSibling;c&&c.classList.contains("toggle")&&(c.classList.add("open"),c.setAttribute("aria-expanded","true")),l=l.parentElement.closest("ul")}}})}});return(async()=>{const d=new URLSearchParams(window.location.search).get("id");if(!d){g("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const l=await fetch(`/sitemap/results-data?id=${d}`);if(!l.ok){const p=await l.json();throw new Error(p.error||"Failed to load sitemap data")}const c=await l.json();s=c.urls,u(50),i.render(s),u(100),L(`Loaded ${c.urlCount} URLs`),n.querySelector("#totalUrls").textContent=c.urlCount,n.querySelector("#uniqueDomains").textContent=new Set(s.map(p=>new URL(p.loc).hostname)).size,f.updateUrls(s)}catch(l){g(l.message)}finally{m()}})(),{treeView:i,onToggleFilters:r=>{o.toggleVisibility(r)},urls:s}}class C{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),y("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var s,o;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const a=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(r=>`<li><a href="${r.loc}">${r.loc}</a> (Last Modified: ${r.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(a,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const a=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(r=>`"${r.loc}","${r.lastmod}","${r.changefreq}","${r.priority}"`).join(`
`);this.downloadFile(a,"sitemap.csv","text/csv")});const i=this.container.querySelector("#exportJsonBtn");i&&i.addEventListener("click",()=>{const a=JSON.stringify(this.options.urls,null,2);this.downloadFile(a,"sitemap.json","application/json")}),(o=this.container.querySelector("#themeToggleBtn"))==null||o.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,i){const s=new Blob([e],{type:i}),o=document.createElement("a");o.href=URL.createObjectURL(s),o.download=t,document.body.appendChild(o),o.click(),document.body.removeChild(o)}}class F{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render(),this.setupEventListeners()}render(){const e=this.path==="/results";this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
      <button id="toggleFiltersBtn" ${e?"":'class="hidden"'} aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
    `;const t=this.container.querySelector(".controls");this.buttons=new C(t,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}setupEventListeners(){var e;(e=this.container.querySelector("#toggleFiltersBtn"))==null||e.addEventListener("click",()=>{const t=this.container.querySelector("#toggleFiltersBtn"),i=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!i),this.options.onToggleFilters(!i)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render(),this.setupEventListeners()}}let h=null,f=null;function y(n){if(!h){console.error("Main element not initialized yet");return}console.log("Routing to:",n),h.innerHTML="";let e={};switch(n){case"/":e=w(h);break;case"/results":e=x(h);break;default:h.innerHTML="<h2>404 - Page not found</h2>"}f&&(f.updateRoute(n),e.urls&&f.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&f.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("app");if(h=document.getElementById("view"),!h||!n){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");n.insertBefore(e,h),f=new F(e),y(window.location.pathname),window.addEventListener("popstate",()=>y(window.location.pathname))});
