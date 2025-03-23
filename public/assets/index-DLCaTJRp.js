(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function u(r=0){var t,n;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=r,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(n=document.getElementById("feedback"))==null||n.classList.add("hidden"))}function h(){const r=document.getElementById("loading");r&&r.classList.add("hidden")}function L(r){var t;h();const e=document.getElementById("feedback");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function g(r){var t;h();const e=document.getElementById("error");e&&(e.textContent=r,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function v(r){r.innerHTML=`
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
  `;const e=r.querySelector("#sitemapUrlForm"),t=r.querySelector("#sitemapUrlInput"),n=r.querySelector("#sitemapUploadForm"),s=r.querySelector("#clearCacheBtn");return e.addEventListener("submit",async i=>{i.preventDefault();const a=t.value.trim();if(a){u(10);try{const o=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!o.ok){const l=await o.json();throw new Error(l.error||"Failed to fetch sitemap")}const{id:d}=await o.json();u(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),L("Sitemap loaded successfully")}catch(o){g(o.message)}finally{h()}}}),n.addEventListener("submit",async i=>{i.preventDefault();const a=new FormData(n);u(10);try{const o=await fetch("/sitemap/upload",{method:"POST",body:a});if(!o.ok){const l=await o.json();throw new Error(l.error||"Failed to upload sitemap")}const{id:d}=await o.json();u(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),L("Sitemap uploaded successfully")}catch(o){g(o.message)}finally{h()}}),s.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");L("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(i){g(i.message)}finally{h()}}),{}}class b{constructor(e){this.container=e,this.isExpanded=!0,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="true"><i class="fas fa-compress-alt"></i> Collapse All</button>
    `,this.container.appendChild(e),e.querySelector("#toggleExpansionBtn").addEventListener("click",()=>{this.toggleExpansion()})}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=this.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All',e.setAttribute("aria-expanded",this.isExpanded),this.container.querySelectorAll(".toggle").forEach(t=>{t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded);const n=t.nextElementSibling;n&&n.classList.toggle("hidden",!this.isExpanded)})}render(e,t={},n="url"){u(50),this.container.innerHTML="",this.renderControls();const s=this.filterUrls(e,t),i=this.sortUrls(s,n),a=this.buildTree(i),o=document.createElement("ul");o.className="tree-list",this.renderTreeNode(a,o,""),this.container.appendChild(o),h()}filterUrls(e,t){return e.filter(n=>{const s=parseFloat(n.priority)||0,i=n.lastmod?new Date(n.lastmod):null,a=parseFloat(t.priority)||0,o=t.lastmod?new Date(t.lastmod):null;return s>=a&&(!o||i&&i>=o)})}sortUrls(e,t){return e.sort((n,s)=>t==="lastmod"?new Date(s.lastmod||0)-new Date(n.lastmod||0)||n.loc.localeCompare(s.loc):t==="priority"&&parseFloat(s.priority||0)-parseFloat(n.priority||0)||n.loc.localeCompare(s.loc))}buildTree(e){const t={children:{},urls:[]};return e.forEach(n=>{try{const s=new URL(n.loc),i=s.pathname==="/"?[""]:s.pathname.split("/").filter(d=>d.length>0);let a=t;const o=s.hostname;a.children[o]||(a.children[o]={name:o,children:{},urls:[]}),a=a.children[o],i.forEach(d=>{const l=d||"/";a.children[l]||(a.children[l]={name:l,children:{},urls:[]}),a=a.children[l]}),a.urls.push(n)}catch(s){console.error(`Failed to parse URL: ${n.loc}`,s)}}),t}renderTreeNode(e,t,n){Object.entries(e.children).forEach(([s,i])=>{const a=n?`${n}/${i.name}`:i.name,o=document.createElement("li"),d=document.createElement("span");if(d.className="toggle open",d.setAttribute("aria-expanded","true"),d.textContent=i.name==="/"?a:i.name,d.addEventListener("click",()=>this.toggleNode(d)),o.appendChild(d),i.urls.length>0){const l=document.createElement("ul");i.urls.forEach(c=>{const m=document.createElement("li");m.innerHTML=`<span class="url-leaf">${this.formatUrl(c)}</span>`,l.appendChild(m)}),o.appendChild(l)}if(Object.keys(i.children).length>0){const l=document.createElement("ul");this.renderTreeNode(i,l,a),o.appendChild(l)}t.appendChild(o)})}formatUrl(e){let t=e.loc;return e.lastmod&&(t+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(t+=`, ${e.changefreq}`),e.priority&&(t+=`, Priority: ${e.priority}`),t}toggleNode(e){const t=e.classList.contains("open");e.classList.toggle("open",!t),e.setAttribute("aria-expanded",!t);const n=e.nextElementSibling;n&&n.classList.toggle("hidden",t)}}class E{constructor(e,t={}){this.container=e,this.options={onApply:t.onApply||(()=>{}),onReset:t.onReset||(()=>{}),onSearch:t.onSearch||(()=>{}),...t},this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
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
    `}setupEventListeners(){this.container.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const e={priority:this.container.querySelector("#priorityFilter").value,lastmod:this.container.querySelector("#lastmodFilter").value},t=this.container.querySelector("#sortBy").value;this.options.onApply(e,t)}),this.container.querySelector("#resetFiltersBtn").addEventListener("click",()=>{this.container.querySelector("#priorityFilter").value="0",this.container.querySelector("#lastmodFilter").value="",this.container.querySelector("#sortBy").value="url",this.container.querySelector("#urlSearch").value="",this.options.onReset()}),this.container.querySelector("#urlSearch").addEventListener("input",()=>{const e=this.container.querySelector("#urlSearch").value.toLowerCase();this.options.onSearch(e)})}toggleVisibility(e){this.container.classList.toggle("hidden",!e)}}function w(r){r.innerHTML=`
    <button id="toggleFiltersBtn" ${isResultsPage?"":'class="hidden"'} aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>

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
  `;const e=r.querySelector("#filters"),t=r.querySelector("#tree"),n=new b(t);let s=[];const i=new E(e,{onApply:(o,d)=>{n.render(s,o,d);const l=t.querySelectorAll("li").length;r.querySelector("#matchCount").textContent=`(${l} of ${s.length} URLs)`},onReset:()=>{n.render(s),r.querySelector("#matchCount").textContent=""},onSearch:o=>{t.querySelectorAll("span").forEach(d=>{if(d.classList.remove("highlight"),o&&d.textContent.toLowerCase().includes(o)){d.classList.add("highlight");let l=d.closest("ul");for(;l;){l.classList.remove("hidden");const c=l.previousElementSibling;c&&c.classList.contains("toggle")&&(c.classList.add("open"),c.setAttribute("aria-expanded","true")),l=l.parentElement.closest("ul")}}})}});return(async()=>{const d=new URLSearchParams(window.location.search).get("id");if(!d){g("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const l=await fetch(`/sitemap/results-data?id=${d}`);if(!l.ok){const m=await l.json();throw new Error(m.error||"Failed to load sitemap data")}const c=await l.json();s=c.urls,u(50),n.render(s),u(100),L(`Loaded ${c.urlCount} URLs`),r.querySelector("#totalUrls").textContent=c.urlCount,r.querySelector("#uniqueDomains").textContent=new Set(s.map(m=>new URL(m.loc).hostname)).size,f.updateUrls(s)}catch(l){g(l.message)}finally{h()}})(),{treeView:n,onToggleFilters:o=>{i.toggleVisibility(o)},urls:s}}class S{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),y("/")},urls:t.urls||[],path:t.path||window.location.pathname,...t},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
    `}setupEventListeners(){var s,i;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#exportHtmlBtn");e&&e.addEventListener("click",()=>{const a=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(o=>`<li><a href="${o.loc}">${o.loc}</a> (Last Modified: ${o.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(a,"sitemap.html","text/html")});const t=this.container.querySelector("#exportCsvBtn");t&&t.addEventListener("click",()=>{const a=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(o=>`"${o.loc}","${o.lastmod}","${o.changefreq}","${o.priority}"`).join(`
`);this.downloadFile(a,"sitemap.csv","text/csv")});const n=this.container.querySelector("#exportJsonBtn");n&&n.addEventListener("click",()=>{const a=JSON.stringify(this.options.urls,null,2);this.downloadFile(a,"sitemap.json","application/json")}),(i=this.container.querySelector("#themeToggleBtn"))==null||i.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,n){const s=new Blob([e],{type:n}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}class x{constructor(e,t={}){this.container=e,this.options={onBack:t.onBack||(()=>{}),onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render(),this.setupEventListeners()}render(){this.path,this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new S(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}setupEventListeners(){var e;(e=this.container.querySelector("#toggleFiltersBtn"))==null||e.addEventListener("click",()=>{const t=this.container.querySelector("#toggleFiltersBtn"),n=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!n),this.options.onToggleFilters(!n)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render(),this.setupEventListeners()}}let p=null,f=null;function y(r){if(!p){console.error("Main element not initialized yet");return}console.log("Routing to:",r),p.innerHTML="";let e={};switch(r){case"/":e=v(p);break;case"/results":e=w(p);break;default:p.innerHTML="<h2>404 - Page not found</h2>"}f&&(f.updateRoute(r),e.urls&&f.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&f.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");if(p=document.getElementById("view"),!p||!r){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");r.insertBefore(e,p),f=new x(e),y(window.location.pathname),window.addEventListener("popstate",()=>y(window.location.pathname))});
