(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=o(l);fetch(l.href,i)}})();function c(s=0){var o,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=s,(o=document.getElementById("error"))==null||o.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function p(){const s=document.getElementById("loading");s&&s.classList.add("hidden")}function y(s){var o;p();const e=document.getElementById("feedback");e&&(e.textContent=s,e.classList.remove("hidden"),(o=document.getElementById("error"))==null||o.classList.add("hidden"))}function m(s){var o;p();const e=document.getElementById("error");e&&(e.textContent=s,e.classList.remove("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}function w(s){s.innerHTML=`
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
  `;const e=s.querySelector("#sitemapUrlForm"),o=s.querySelector("#sitemapUrlInput"),r=s.querySelector("#sitemapUploadForm"),l=s.querySelector("#clearCacheBtn");return e.addEventListener("submit",async i=>{i.preventDefault();const a=o.value.trim();if(a){c(10);try{const t=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),f("/results"),y("Sitemap loaded successfully")}catch(t){m(t.message)}finally{p()}}}),r.addEventListener("submit",async i=>{i.preventDefault();const a=new FormData(r);c(10);try{const t=await fetch("/sitemap/upload",{method:"POST",body:a});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),f("/results"),y("Sitemap uploaded successfully")}catch(t){m(t.message)}finally{p()}}),l.addEventListener("click",async()=>{c();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(i){m(i.message)}finally{p()}}),{}}class E{constructor(e){this.container=e,this.isExpanded=!0}render(e,o={},r="url"){if(c(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",p();return}const l=e.filter(({priority:t,lastmod:n})=>{const d=parseFloat(o.priority||0),b=o.lastmod?new Date(o.lastmod):null;return(t==="N/A"||parseFloat(t)>=d)&&(!b||n!=="N/A"&&new Date(n)>=b)}),i=S(l),a=document.createElement("ul");Object.keys(i).sort((t,n)=>t.localeCompare(n)).forEach(t=>{a.appendChild(L(t,i[t],r,this.isExpanded))}),this.container.appendChild(a),p()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(o=>{const r=o.nextElementSibling;r&&r.tagName==="UL"&&(r.classList.toggle("hidden",!this.isExpanded),o.classList.toggle("open",this.isExpanded),o.setAttribute("aria-expanded",this.isExpanded))})}}function S(s){const e={};return s.forEach(({loc:o,lastmod:r,changefreq:l,priority:i})=>{const t=`${new URL(o).origin}/`;e[t]||(e[t]={children:{},details:{}});let n=e[t];const d=o.replace(t,"").split("/").filter(Boolean);d.length===0?n.details={lastmod:r,changefreq:l,priority:i}:d.forEach((b,v)=>{const g=t+d.slice(0,v+1).join("/");n.children[g]||(n.children[g]={children:{},details:{}}),v===d.length-1&&(n.children[g].details={lastmod:r,changefreq:l,priority:i}),n=n.children[g]})}),e}function L(s,e,o,r){const l=document.createElement("li"),i=document.createElement("span");i.textContent=s;const a=Object.keys(e.children);if(a.length>0){i.className="toggle",i.setAttribute("aria-expanded",r?"true":"false"),r&&i.classList.add("open");const t=document.createElement("ul");a.sort((n,d)=>n.localeCompare(d)).forEach(n=>{t.appendChild(L(n,e.children[n],o,r))}),l.appendChild(i),l.appendChild(t)}else l.appendChild(i);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const t=document.createElement("span");t.className="details",t.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,l.appendChild(t)}return l}function B(s){s.innerHTML=`
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
  `;const e=s.querySelector("#tree"),o=new E(e);let r=[];const l=async()=>{const a=new URLSearchParams(window.location.search).get("id");if(!a){m("No sitemap ID provided. Please load a sitemap first.");return}c(10);try{const t=await fetch(`/sitemap/results-data?id=${a}`);if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to load sitemap data")}const n=await t.json();r=n.urls,c(50),o.render(r),c(100),y(`Loaded ${n.urlCount} URLs`),s.querySelector("#totalUrls").textContent=n.urlCount,s.querySelector("#uniqueDomains").textContent=new Set(r.map(d=>new URL(d.loc).hostname)).size,h.updateUrls(r)}catch(t){m(t.message)}finally{p()}};return s.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const i={priority:s.querySelector("#priorityFilter").value,lastmod:s.querySelector("#lastmodFilter").value},a=s.querySelector("#sortBy").value;o.render(r,i,a);const t=e.querySelectorAll("li").length;s.querySelector("#matchCount").textContent=`(${t} of ${r.length} URLs)`}),s.querySelector("#resetFiltersBtn").addEventListener("click",()=>{s.querySelector("#priorityFilter").value="0",s.querySelector("#lastmodFilter").value="",s.querySelector("#sortBy").value="url",s.querySelector("#urlSearch").value="",o.render(r),s.querySelector("#matchCount").textContent=""}),s.querySelector("#urlSearch").addEventListener("input",()=>{const i=s.querySelector("#urlSearch").value.toLowerCase();e.querySelectorAll("span").forEach(a=>{if(a.classList.remove("highlight"),i&&a.textContent.toLowerCase().includes(i)){a.classList.add("highlight");let t=a.closest("ul");for(;t;){t.classList.remove("hidden");const n=t.previousElementSibling;n&&n.classList.contains("toggle")&&(n.classList.add("open"),n.setAttribute("aria-expanded","true")),t=t.parentElement.closest("ul")}}})}),l(),{treeView:o,onToggleFilters:i=>{s.querySelector("#filters").classList.toggle("hidden",!i)},urls:r}}class F{constructor(e,o={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),f("/")},onToggleFilters:o.onToggleFilters||(()=>{}),treeView:o.treeView||null,urls:o.urls||[],path:o.path||window.location.pathname,...o},this.render(),this.setupEventListeners()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="backBtn" ${e?"":'class="hidden"'}><i class="fas fa-arrow-left"></i> Back</button>
      <button id="collapseAllBtn" ${e?"":'class="hidden"'}><i class="fas fa-compress-alt"></i> Collapse All</button>
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""}><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
      <button id="toggleFiltersBtn" ${e?"":'class="hidden"'} aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
    `}setupEventListeners(){var i,a,t;(i=this.container.querySelector("#backBtn"))==null||i.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#collapseAllBtn");e&&this.options.treeView&&e.addEventListener("click",()=>{this.options.treeView.toggleExpansion(),e.innerHTML=this.options.treeView.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'});const o=this.container.querySelector("#exportHtmlBtn");o&&o.addEventListener("click",()=>{const n=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(d=>`<li><a href="${d.loc}">${d.loc}</a> (Last Modified: ${d.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(n,"sitemap.html","text/html")});const r=this.container.querySelector("#exportCsvBtn");r&&r.addEventListener("click",()=>{const n=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(d=>`"${d.loc}","${d.lastmod}","${d.changefreq}","${d.priority}"`).join(`
`);this.downloadFile(n,"sitemap.csv","text/csv")});const l=this.container.querySelector("#exportJsonBtn");l&&l.addEventListener("click",()=>{const n=JSON.stringify(this.options.urls,null,2);this.downloadFile(n,"sitemap.json","application/json")}),(a=this.container.querySelector("#themeToggleBtn"))==null||a.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),(t=this.container.querySelector("#toggleFiltersBtn"))==null||t.addEventListener("click",()=>{const n=this.container.querySelector("#toggleFiltersBtn"),d=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",!d),this.options.onToggleFilters(!d)})}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}downloadFile(e,o,r){const l=new Blob([e],{type:r}),i=document.createElement("a");i.href=URL.createObjectURL(l),i.download=o,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}class C{constructor(e,o={}){this.container=e,this.options={onBack:o.onBack||(()=>{}),onToggleFilters:o.onToggleFilters||(()=>{}),treeView:o.treeView||null,urls:o.urls||[],...o},this.path=window.location.pathname,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new F(e,{onBack:this.options.onBack,onToggleFilters:this.options.onToggleFilters,treeView:this.options.treeView,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.buttons.updateRoute(e)}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,onToggleFilters:this.options.onToggleFilters,treeView:this.options.treeView,urls:this.options.urls})}}let u=null,h=null;function f(s){if(!u){console.error("Main element not initialized yet");return}console.log("Routing to:",s),u.innerHTML="";let e={};switch(s){case"/":e=w(u);break;case"/results":e=B(u);break;default:u.innerHTML="<h2>404 - Page not found</h2>"}h&&(h.updateRoute(s),e.urls&&h.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&h.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters}))}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("app");if(u=document.getElementById("view"),!u||!s){console.error("Required elements (#app or #view) not found in index.html");return}const e=document.createElement("header");s.insertBefore(e,u),h=new C(e),f(window.location.pathname),window.addEventListener("popstate",()=>f(window.location.pathname))});
