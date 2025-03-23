(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();function u(s=0){var o,l;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=s,(o=document.getElementById("error"))==null||o.classList.add("hidden"),(l=document.getElementById("feedback"))==null||l.classList.add("hidden"))}function p(){const s=document.getElementById("loading");s&&s.classList.add("hidden")}function v(s){var o;p();const e=document.getElementById("feedback");e&&(e.textContent=s,e.classList.remove("hidden"),(o=document.getElementById("error"))==null||o.classList.add("hidden"))}function f(s){var o;p();const e=document.getElementById("error");e&&(e.textContent=s,e.classList.remove("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}class b{constructor(e,o={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),y("/")},onToggleFilters:o.onToggleFilters||(()=>{}),treeView:o.treeView||null,urls:o.urls||[],...o},this.path=window.location.pathname,this.render(),this.setupEventListeners(),this.updateRoute(window.location.pathname),window.addEventListener("popstate",()=>this.updateRoute(window.location.pathname))}render(){const e=this.path==="/results";this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls">
        <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
        <button id="collapseAllBtn" ${e?"":'class="hidden"'}><i class="fas fa-compress-alt"></i> Collapse All</button>
        <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
        <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
        <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
        <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
        <button id="toggleFiltersBtn" ${e?"":'class="hidden"'} aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
      </div>
    `}setupEventListeners(){var r,d,a;(r=this.container.querySelector("#backBtn"))==null||r.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#collapseAllBtn");e&&this.options.treeView&&e.addEventListener("click",()=>{this.options.treeView.toggleExpansion(),e.innerHTML=this.options.treeView.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'});const o=this.container.querySelector("#exportHtmlBtn");o&&o.addEventListener("click",()=>{const t=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(n=>`<li><a href="${n.loc}">${n.loc}</a> (Last Modified: ${n.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(t,"sitemap.html","text/html")});const l=this.container.querySelector("#exportCsvBtn");l&&l.addEventListener("click",()=>{const t=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(n=>`"${n.loc}","${n.lastmod}","${n.changefreq}","${n.priority}"`).join(`
`);this.downloadFile(t,"sitemap.csv","text/csv")});const i=this.container.querySelector("#exportJsonBtn");i&&i.addEventListener("click",()=>{const t=JSON.stringify(this.options.urls,null,2);this.downloadFile(t,"sitemap.json","application/json")}),(d=this.container.querySelector("#themeToggleBtn"))==null||d.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),(a=this.container.querySelector("#toggleFiltersBtn"))==null||a.addEventListener("click",()=>{const t=this.container.querySelector("#toggleFiltersBtn"),n=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!n),this.options.onToggleFilters(!n)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}downloadFile(e,o,l){const i=new Blob([e],{type:l}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=o,document.body.appendChild(r),r.click(),document.body.removeChild(r)}}function w(s){const e=document.createElement("header");document.body.insertBefore(e,s),s.innerHTML=`
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
  `,new b(e);const o=s.querySelector("#sitemapUrlForm"),l=s.querySelector("#sitemapUrlInput"),i=s.querySelector("#sitemapUploadForm"),r=s.querySelector("#clearCacheBtn");o.addEventListener("submit",async d=>{d.preventDefault();const a=l.value.trim();if(a){u(10);try{const t=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!t.ok){const c=await t.json();throw new Error(c.error||"Failed to fetch sitemap")}const{id:n}=await t.json();u(50),window.history.pushState({},"",`/results?id=${n}`),renderLayout(),y("/results"),v("Sitemap loaded successfully")}catch(t){f(t.message)}finally{p()}}}),i.addEventListener("submit",async d=>{d.preventDefault();const a=new FormData(i);u(10);try{const t=await fetch("/sitemap/upload",{method:"POST",body:a});if(!t.ok){const c=await t.json();throw new Error(c.error||"Failed to upload sitemap")}const{id:n}=await t.json();u(50),window.history.pushState({},"",`/results?id=${n}`),renderLayout(),y("/results"),v("Sitemap uploaded successfully")}catch(t){f(t.message)}finally{p()}}),r.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");v("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(d){f(d.message)}finally{p()}})}class E{constructor(e){this.container=e,this.isExpanded=!0}render(e,o={},l="url"){if(u(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",p();return}const i=e.filter(({priority:a,lastmod:t})=>{const n=parseFloat(o.priority||0),c=o.lastmod?new Date(o.lastmod):null;return(a==="N/A"||parseFloat(a)>=n)&&(!c||t!=="N/A"&&new Date(t)>=c)}),r=S(i),d=document.createElement("ul");Object.keys(r).sort((a,t)=>a.localeCompare(t)).forEach(a=>{d.appendChild(L(a,r[a],l,this.isExpanded))}),this.container.appendChild(d),p()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(o=>{const l=o.nextElementSibling;l&&l.tagName==="UL"&&(l.classList.toggle("hidden",!this.isExpanded),o.classList.toggle("open",this.isExpanded),o.setAttribute("aria-expanded",this.isExpanded))})}}function S(s){const e={};return s.forEach(({loc:o,lastmod:l,changefreq:i,priority:r})=>{const a=`${new URL(o).origin}/`;e[a]||(e[a]={children:{},details:{}});let t=e[a];const n=o.replace(a,"").split("/").filter(Boolean);n.length===0?t.details={lastmod:l,changefreq:i,priority:r}:n.forEach((c,m)=>{const g=a+n.slice(0,m+1).join("/");t.children[g]||(t.children[g]={children:{},details:{}}),m===n.length-1&&(t.children[g].details={lastmod:l,changefreq:i,priority:r}),t=t.children[g]})}),e}function L(s,e,o,l){const i=document.createElement("li"),r=document.createElement("span");r.textContent=s;const d=Object.keys(e.children);if(d.length>0){r.className="toggle",r.setAttribute("aria-expanded",l?"true":"false"),l&&r.classList.add("open");const a=document.createElement("ul");d.sort((t,n)=>t.localeCompare(n)).forEach(t=>{a.appendChild(L(t,e.children[t],o,l))}),i.appendChild(r),i.appendChild(a)}else i.appendChild(r);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const a=document.createElement("span");a.className="details",a.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,i.appendChild(a)}return i}function x(s){const e=document.createElement("header");document.body.insertBefore(e,s),s.innerHTML=`
    <div id="filters" class="hidden">
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
  `;const o=s.querySelector("#tree"),l=new E(o);let i=[];const r=new b(e,{treeView:l,urls:i,onToggleFilters:a=>{s.querySelector("#filters").classList.toggle("hidden",!a)}}),d=async()=>{const t=new URLSearchParams(window.location.search).get("id");if(!t){f("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const n=await fetch(`/sitemap/results-data?id=${t}`);if(!n.ok){const m=await n.json();throw new Error(m.error||"Failed to load sitemap data")}const c=await n.json();i=c.urls,u(50),l.render(i),u(100),v(`Loaded ${c.urlCount} URLs`),s.querySelector("#totalUrls").textContent=c.urlCount,s.querySelector("#uniqueDomains").textContent=new Set(i.map(m=>new URL(m.loc).hostname)).size,r.updateUrls(i)}catch(n){f(n.message)}finally{p()}};s.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const a={priority:s.querySelector("#priorityFilter").value,lastmod:s.querySelector("#lastmodFilter").value},t=s.querySelector("#sortBy").value;l.render(i,a,t);const n=o.querySelectorAll("li").length;s.querySelector("#matchCount").textContent=`(${n} of ${i.length} URLs)`}),s.querySelector("#resetFiltersBtn").addEventListener("click",()=>{s.querySelector("#priorityFilter").value="0",s.querySelector("#lastmodFilter").value="",s.querySelector("#sortBy").value="url",s.querySelector("#urlSearch").value="",l.render(i),s.querySelector("#matchCount").textContent=""}),s.querySelector("#urlSearch").addEventListener("input",()=>{const a=s.querySelector("#urlSearch").value.toLowerCase();o.querySelectorAll("span").forEach(t=>{if(t.classList.remove("highlight"),a&&t.textContent.toLowerCase().includes(a)){t.classList.add("highlight");let n=t.closest("ul");for(;n;){n.classList.remove("hidden");const c=n.previousElementSibling;c&&c.classList.contains("toggle")&&(c.classList.add("open"),c.setAttribute("aria-expanded","true")),n=n.parentElement.closest("ul")}}})}),d()}let h=null;function y(s){if(!h){console.error("Main element not initialized yet");return}switch(console.log("Routing to:",s),h.innerHTML="",s){case"/":w(h);break;case"/results":x(h);break;default:h.innerHTML="<h2>404 - Page not found</h2>"}}document.addEventListener("DOMContentLoaded",()=>{if(h=document.getElementById("view"),!h){console.error('Main element #view not found. Ensure index.html has <main id="view">');return}y(window.location.pathname),window.addEventListener("popstate",()=>y(window.location.pathname))});
