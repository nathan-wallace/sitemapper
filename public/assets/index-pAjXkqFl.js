(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(l){if(l.ep)return;l.ep=!0;const s=o(l);fetch(l.href,s)}})();function c(i=0){var o,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=i,(o=document.getElementById("error"))==null||o.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function p(){const i=document.getElementById("loading");i&&i.classList.add("hidden")}function y(i){var o;p();const e=document.getElementById("feedback");e&&(e.textContent=i,e.classList.remove("hidden"),(o=document.getElementById("error"))==null||o.classList.add("hidden"))}function m(i){var o;p();const e=document.getElementById("error");e&&(e.textContent=i,e.classList.remove("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}function w(i){i.innerHTML=`
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
  `;const e=i.querySelector("#sitemapUrlForm"),o=i.querySelector("#sitemapUrlInput"),r=i.querySelector("#sitemapUploadForm"),l=i.querySelector("#clearCacheBtn");return e.addEventListener("submit",async s=>{s.preventDefault();const a=o.value.trim();if(a){c(10);try{const t=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),f("/results"),y("Sitemap loaded successfully")}catch(t){m(t.message)}finally{p()}}}),r.addEventListener("submit",async s=>{s.preventDefault();const a=new FormData(r);c(10);try{const t=await fetch("/sitemap/upload",{method:"POST",body:a});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),f("/results"),y("Sitemap uploaded successfully")}catch(t){m(t.message)}finally{p()}}),l.addEventListener("click",async()=>{c();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(s){m(s.message)}finally{p()}}),{}}class E{constructor(e){this.container=e,this.isExpanded=!0}render(e,o={},r="url"){if(c(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",p();return}const l=e.filter(({priority:t,lastmod:n})=>{const d=parseFloat(o.priority||0),v=o.lastmod?new Date(o.lastmod):null;return(t==="N/A"||parseFloat(t)>=d)&&(!v||n!=="N/A"&&new Date(n)>=v)}),s=S(l),a=document.createElement("ul");Object.keys(s).sort((t,n)=>t.localeCompare(n)).forEach(t=>{a.appendChild(L(t,s[t],r,this.isExpanded))}),this.container.appendChild(a),p()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(o=>{const r=o.nextElementSibling;r&&r.tagName==="UL"&&(r.classList.toggle("hidden",!this.isExpanded),o.classList.toggle("open",this.isExpanded),o.setAttribute("aria-expanded",this.isExpanded))})}}function S(i){const e={};return i.forEach(({loc:o,lastmod:r,changefreq:l,priority:s})=>{const t=`${new URL(o).origin}/`;e[t]||(e[t]={children:{},details:{}});let n=e[t];const d=o.replace(t,"").split("/").filter(Boolean);d.length===0?n.details={lastmod:r,changefreq:l,priority:s}:d.forEach((v,b)=>{const g=t+d.slice(0,b+1).join("/");n.children[g]||(n.children[g]={children:{},details:{}}),b===d.length-1&&(n.children[g].details={lastmod:r,changefreq:l,priority:s}),n=n.children[g]})}),e}function L(i,e,o,r){const l=document.createElement("li"),s=document.createElement("span");s.textContent=i;const a=Object.keys(e.children);if(a.length>0){s.className="toggle",s.setAttribute("aria-expanded",r?"true":"false"),r&&s.classList.add("open");const t=document.createElement("ul");a.sort((n,d)=>n.localeCompare(d)).forEach(n=>{t.appendChild(L(n,e.children[n],o,r))}),l.appendChild(s),l.appendChild(t)}else l.appendChild(s);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const t=document.createElement("span");t.className="details",t.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,l.appendChild(t)}return l}function x(i){i.innerHTML=`
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
  `;const e=i.querySelector("#tree"),o=new E(e);let r=[];const l=async()=>{const a=new URLSearchParams(window.location.search).get("id");if(!a){m("No sitemap ID provided. Please load a sitemap first.");return}c(10);try{const t=await fetch(`/sitemap/results-data?id=${a}`);if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to load sitemap data")}const n=await t.json();r=n.urls,c(50),o.render(r),c(100),y(`Loaded ${n.urlCount} URLs`),i.querySelector("#totalUrls").textContent=n.urlCount,i.querySelector("#uniqueDomains").textContent=new Set(r.map(d=>new URL(d.loc).hostname)).size,h.updateUrls(r)}catch(t){m(t.message)}finally{p()}};return i.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const s={priority:i.querySelector("#priorityFilter").value,lastmod:i.querySelector("#lastmodFilter").value},a=i.querySelector("#sortBy").value;o.render(r,s,a);const t=e.querySelectorAll("li").length;i.querySelector("#matchCount").textContent=`(${t} of ${r.length} URLs)`}),i.querySelector("#resetFiltersBtn").addEventListener("click",()=>{i.querySelector("#priorityFilter").value="0",i.querySelector("#lastmodFilter").value="",i.querySelector("#sortBy").value="url",i.querySelector("#urlSearch").value="",o.render(r),i.querySelector("#matchCount").textContent=""}),i.querySelector("#urlSearch").addEventListener("input",()=>{const s=i.querySelector("#urlSearch").value.toLowerCase();e.querySelectorAll("span").forEach(a=>{if(a.classList.remove("highlight"),s&&a.textContent.toLowerCase().includes(s)){a.classList.add("highlight");let t=a.closest("ul");for(;t;){t.classList.remove("hidden");const n=t.previousElementSibling;n&&n.classList.contains("toggle")&&(n.classList.add("open"),n.setAttribute("aria-expanded","true")),t=t.parentElement.closest("ul")}}})}),l(),{treeView:o,onToggleFilters:s=>{i.querySelector("#filters").classList.toggle("hidden",!s)},urls:r}}class C{constructor(e,o={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),f("/")},onToggleFilters:o.onToggleFilters||(()=>{}),treeView:o.treeView||null,urls:o.urls||[],...o},this.path=window.location.pathname,this.render(),this.setupEventListeners()}render(){const e=this.path==="/results";this.container.innerHTML=`
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
    `}setupEventListeners(){var s,a,t;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#collapseAllBtn");e&&this.options.treeView&&e.addEventListener("click",()=>{this.options.treeView.toggleExpansion(),e.innerHTML=this.options.treeView.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'});const o=this.container.querySelector("#exportHtmlBtn");o&&o.addEventListener("click",()=>{const n=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(d=>`<li><a href="${d.loc}">${d.loc}</a> (Last Modified: ${d.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(n,"sitemap.html","text/html")});const r=this.container.querySelector("#exportCsvBtn");r&&r.addEventListener("click",()=>{const n=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(d=>`"${d.loc}","${d.lastmod}","${d.changefreq}","${d.priority}"`).join(`
`);this.downloadFile(n,"sitemap.csv","text/csv")});const l=this.container.querySelector("#exportJsonBtn");l&&l.addEventListener("click",()=>{const n=JSON.stringify(this.options.urls,null,2);this.downloadFile(n,"sitemap.json","application/json")}),(a=this.container.querySelector("#themeToggleBtn"))==null||a.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),(t=this.container.querySelector("#toggleFiltersBtn"))==null||t.addEventListener("click",()=>{const n=this.container.querySelector("#toggleFiltersBtn"),d=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",!d),this.options.onToggleFilters(!d)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,o,r){const l=new Blob([e],{type:r}),s=document.createElement("a");s.href=URL.createObjectURL(l),s.download=o,document.body.appendChild(s),s.click(),document.body.removeChild(s)}}let u=null,h=null;function f(i){if(!u){console.error("Main element not initialized yet");return}console.log("Routing to:",i),u.innerHTML="";let e={};switch(i){case"/":e=w(u);break;case"/results":e=x(u);break;default:u.innerHTML="<h2>404 - Page not found</h2>"}h&&(h.updateRoute(i),e.urls&&h.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&h.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("app");if(u=document.getElementById("view"),!u||!i){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");i.insertBefore(e,u),h=new C(e),f(window.location.pathname),window.addEventListener("popstate",()=>f(window.location.pathname))});
