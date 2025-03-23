(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();function c(o=0){var t,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=o,(t=document.getElementById("error"))==null||t.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function p(){const o=document.getElementById("loading");o&&o.classList.add("hidden")}function y(o){var t;p();const e=document.getElementById("feedback");e&&(e.textContent=o,e.classList.remove("hidden"),(t=document.getElementById("error"))==null||t.classList.add("hidden"))}function f(o){var t;p();const e=document.getElementById("error");e&&(e.textContent=o,e.classList.remove("hidden"),(t=document.getElementById("feedback"))==null||t.classList.add("hidden"))}function w(o){o.innerHTML=`
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
  `;const e=o.querySelector("#sitemapUrlForm"),t=o.querySelector("#sitemapUrlInput"),r=o.querySelector("#sitemapUploadForm"),a=o.querySelector("#clearCacheBtn");return e.addEventListener("submit",async i=>{i.preventDefault();const l=t.value.trim();if(l){c(10);try{const s=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:l})});if(!s.ok){const d=await s.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:n}=await s.json();c(50),window.history.pushState({},"",`/results?id=${n}`),h("/results"),y("Sitemap loaded successfully")}catch(s){f(s.message)}finally{p()}}}),r.addEventListener("submit",async i=>{i.preventDefault();const l=new FormData(r);c(10);try{const s=await fetch("/sitemap/upload",{method:"POST",body:l});if(!s.ok){const d=await s.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:n}=await s.json();c(50),window.history.pushState({},"",`/results?id=${n}`),h("/results"),y("Sitemap uploaded successfully")}catch(s){f(s.message)}finally{p()}}),a.addEventListener("click",async()=>{c();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(i){f(i.message)}finally{p()}}),{}}class E{constructor(e){this.container=e,this.isExpanded=!0}render(e,t={},r="url"){if(c(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",p();return}const a=e.filter(({priority:s,lastmod:n})=>{const d=parseFloat(t.priority||0),v=t.lastmod?new Date(t.lastmod):null;return(s==="N/A"||parseFloat(s)>=d)&&(!v||n!=="N/A"&&new Date(n)>=v)}),i=S(a),l=document.createElement("ul");Object.keys(i).sort((s,n)=>s.localeCompare(n)).forEach(s=>{l.appendChild(L(s,i[s],r,this.isExpanded))}),this.container.appendChild(l),p()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(t=>{const r=t.nextElementSibling;r&&r.tagName==="UL"&&(r.classList.toggle("hidden",!this.isExpanded),t.classList.toggle("open",this.isExpanded),t.setAttribute("aria-expanded",this.isExpanded))})}}function S(o){const e={};return o.forEach(({loc:t,lastmod:r,changefreq:a,priority:i})=>{const s=`${new URL(t).origin}/`;e[s]||(e[s]={children:{},details:{}});let n=e[s];const d=t.replace(s,"").split("/").filter(Boolean);d.length===0?n.details={lastmod:r,changefreq:a,priority:i}:d.forEach((v,b)=>{const g=s+d.slice(0,b+1).join("/");n.children[g]||(n.children[g]={children:{},details:{}}),b===d.length-1&&(n.children[g].details={lastmod:r,changefreq:a,priority:i}),n=n.children[g]})}),e}function L(o,e,t,r){const a=document.createElement("li"),i=document.createElement("span");i.textContent=o;const l=Object.keys(e.children);if(l.length>0){i.className="toggle",i.setAttribute("aria-expanded",r?"true":"false"),r&&i.classList.add("open");const s=document.createElement("ul");l.sort((n,d)=>n.localeCompare(d)).forEach(n=>{s.appendChild(L(n,e.children[n],t,r))}),a.appendChild(i),a.appendChild(s)}else a.appendChild(i);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const s=document.createElement("span");s.className="details",s.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,a.appendChild(s)}return a}function x(o){o.innerHTML=`
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
  `;const e=o.querySelector("#tree"),t=new E(e);let r=[];const a=async()=>{const l=new URLSearchParams(window.location.search).get("id");if(!l){f("No sitemap ID provided. Please load a sitemap first.");return}c(10);try{const s=await fetch(`/sitemap/results-data?id=${l}`);if(!s.ok){const d=await s.json();throw new Error(d.error||"Failed to load sitemap data")}const n=await s.json();r=n.urls,c(50),t.render(r),c(100),y(`Loaded ${n.urlCount} URLs`),o.querySelector("#totalUrls").textContent=n.urlCount,o.querySelector("#uniqueDomains").textContent=new Set(r.map(d=>new URL(d.loc).hostname)).size,h("/results",{urls:r})}catch(s){f(s.message)}finally{p()}};return o.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const i={priority:o.querySelector("#priorityFilter").value,lastmod:o.querySelector("#lastmodFilter").value},l=o.querySelector("#sortBy").value;t.render(r,i,l);const s=e.querySelectorAll("li").length;o.querySelector("#matchCount").textContent=`(${s} of ${r.length} URLs)`}),o.querySelector("#resetFiltersBtn").addEventListener("click",()=>{o.querySelector("#priorityFilter").value="0",o.querySelector("#lastmodFilter").value="",o.querySelector("#sortBy").value="url",o.querySelector("#urlSearch").value="",t.render(r),o.querySelector("#matchCount").textContent=""}),o.querySelector("#urlSearch").addEventListener("input",()=>{const i=o.querySelector("#urlSearch").value.toLowerCase();e.querySelectorAll("span").forEach(l=>{if(l.classList.remove("highlight"),i&&l.textContent.toLowerCase().includes(i)){l.classList.add("highlight");let s=l.closest("ul");for(;s;){s.classList.remove("hidden");const n=s.previousElementSibling;n&&n.classList.contains("toggle")&&(n.classList.add("open"),n.setAttribute("aria-expanded","true")),s=s.parentElement.closest("ul")}}})}),a(),{treeView:t,onToggleFilters:i=>{o.querySelector("#filters").classList.toggle("hidden",!i)},urls:r}}class C{constructor(e,t={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),h("/")},onToggleFilters:t.onToggleFilters||(()=>{}),treeView:t.treeView||null,urls:t.urls||[],...t},this.path=window.location.pathname,this.render(),this.setupEventListeners()}render(){const e=this.path==="/results";this.container.innerHTML=`
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
    `}setupEventListeners(){var i,l,s;(i=this.container.querySelector("#backBtn"))==null||i.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#collapseAllBtn");e&&this.options.treeView&&e.addEventListener("click",()=>{this.options.treeView.toggleExpansion(),e.innerHTML=this.options.treeView.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'});const t=this.container.querySelector("#exportHtmlBtn");t&&t.addEventListener("click",()=>{const n=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(d=>`<li><a href="${d.loc}">${d.loc}</a> (Last Modified: ${d.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(n,"sitemap.html","text/html")});const r=this.container.querySelector("#exportCsvBtn");r&&r.addEventListener("click",()=>{const n=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(d=>`"${d.loc}","${d.lastmod}","${d.changefreq}","${d.priority}"`).join(`
`);this.downloadFile(n,"sitemap.csv","text/csv")});const a=this.container.querySelector("#exportJsonBtn");a&&a.addEventListener("click",()=>{const n=JSON.stringify(this.options.urls,null,2);this.downloadFile(n,"sitemap.json","application/json")}),(l=this.container.querySelector("#themeToggleBtn"))==null||l.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),(s=this.container.querySelector("#toggleFiltersBtn"))==null||s.addEventListener("click",()=>{const n=this.container.querySelector("#toggleFiltersBtn"),d=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",!d),this.options.onToggleFilters(!d)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,t,r){const a=new Blob([e],{type:r}),i=document.createElement("a");i.href=URL.createObjectURL(a),i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}let u=null,m=null;function h(o,e={}){if(!u){console.error("Main element not initialized yet");return}console.log("Routing to:",o),u.innerHTML="";let t={};switch(o){case"/":t=w(u);break;case"/results":t=x(u);break;default:u.innerHTML="<h2>404 - Page not found</h2>"}m&&(m.updateRoute(o),t.urls&&m.updateUrls(t.urls),(t.treeView||t.onToggleFilters)&&m.updateOptions({treeView:t.treeView,onToggleFilters:t.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("app");if(u=document.getElementById("view"),!u||!o){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");o.insertBefore(e,u),m=new C(e),h(window.location.pathname),window.addEventListener("popstate",()=>h(window.location.pathname))});
