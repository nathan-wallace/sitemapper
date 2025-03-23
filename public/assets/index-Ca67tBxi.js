(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();function p(t=0){var o,l;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=t,(o=document.getElementById("error"))==null||o.classList.add("hidden"),(l=document.getElementById("feedback"))==null||l.classList.add("hidden"))}function m(){const t=document.getElementById("loading");t&&t.classList.add("hidden")}function v(t){var o;m();const e=document.getElementById("feedback");e&&(e.textContent=t,e.classList.remove("hidden"),(o=document.getElementById("error"))==null||o.classList.add("hidden"))}function g(t){var o;m();const e=document.getElementById("error");e&&(e.textContent=t,e.classList.remove("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}class b{constructor(e,o={}){this.container=e,this.options={onBack:()=>{window.history.pushState({},"","/"),y("/")},onToggleFilters:o.onToggleFilters||(()=>{}),treeView:o.treeView||null,urls:o.urls||[],...o},this.path=window.location.pathname,this.render(),this.setupEventListeners(),this.updateRoute(window.location.pathname),window.addEventListener("popstate",()=>this.updateRoute(window.location.pathname))}render(){const e=this.path==="/results";this.container.innerHTML=`
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
    `}setupEventListeners(){var s,c,a;(s=this.container.querySelector("#backBtn"))==null||s.addEventListener("click",()=>this.options.onBack());const e=this.container.querySelector("#collapseAllBtn");e&&this.options.treeView&&e.addEventListener("click",()=>{this.options.treeView.toggleExpansion(),e.innerHTML=this.options.treeView.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'});const o=this.container.querySelector("#exportHtmlBtn");o&&o.addEventListener("click",()=>{const r=`
          <!DOCTYPE html>
          <html><body><h1>Sitemap URLs</h1><ul>
          ${this.options.urls.map(i=>`<li><a href="${i.loc}">${i.loc}</a> (Last Modified: ${i.lastmod})</li>`).join("")}
          </ul></body></html>`;this.downloadFile(r,"sitemap.html","text/html")});const l=this.container.querySelector("#exportCsvBtn");l&&l.addEventListener("click",()=>{const r=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(i=>`"${i.loc}","${i.lastmod}","${i.changefreq}","${i.priority}"`).join(`
`);this.downloadFile(r,"sitemap.csv","text/csv")});const n=this.container.querySelector("#exportJsonBtn");n&&n.addEventListener("click",()=>{const r=JSON.stringify(this.options.urls,null,2);this.downloadFile(r,"sitemap.json","application/json")}),(c=this.container.querySelector("#themeToggleBtn"))==null||c.addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),(a=this.container.querySelector("#toggleFiltersBtn"))==null||a.addEventListener("click",()=>{const r=this.container.querySelector("#toggleFiltersBtn"),i=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",!i),this.options.onToggleFilters(!i)})}updateRoute(e){this.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}downloadFile(e,o,l){const n=new Blob([e],{type:l}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=o,document.body.appendChild(s),s.click(),document.body.removeChild(s)}}function w(t){const e=document.getElementById("app"),o=document.createElement("header");e.insertBefore(o,t),t.innerHTML=`
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
  `,new b(o);const l=t.querySelector("#sitemapUrlForm"),n=t.querySelector("#sitemapUrlInput"),s=t.querySelector("#sitemapUploadForm"),c=t.querySelector("#clearCacheBtn");l.addEventListener("submit",async a=>{a.preventDefault();const r=n.value.trim();if(r){p(10);try{const i=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r})});if(!i.ok){const u=await i.json();throw new Error(u.error||"Failed to fetch sitemap")}const{id:d}=await i.json();p(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),v("Sitemap loaded successfully")}catch(i){g(i.message)}finally{m()}}}),s.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(s);p(10);try{const i=await fetch("/sitemap/upload",{method:"POST",body:r});if(!i.ok){const u=await i.json();throw new Error(u.error||"Failed to upload sitemap")}const{id:d}=await i.json();p(50),window.history.pushState({},"",`/results?id=${d}`),y("/results"),v("Sitemap uploaded successfully")}catch(i){g(i.message)}finally{m()}}),c.addEventListener("click",async()=>{p();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");v("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(a){g(a.message)}finally{m()}})}class E{constructor(e){this.container=e,this.isExpanded=!0}render(e,o={},l="url"){if(p(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",m();return}const n=e.filter(({priority:a,lastmod:r})=>{const i=parseFloat(o.priority||0),d=o.lastmod?new Date(o.lastmod):null;return(a==="N/A"||parseFloat(a)>=i)&&(!d||r!=="N/A"&&new Date(r)>=d)}),s=S(n),c=document.createElement("ul");Object.keys(s).sort((a,r)=>a.localeCompare(r)).forEach(a=>{c.appendChild(L(a,s[a],l,this.isExpanded))}),this.container.appendChild(c),m()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(o=>{const l=o.nextElementSibling;l&&l.tagName==="UL"&&(l.classList.toggle("hidden",!this.isExpanded),o.classList.toggle("open",this.isExpanded),o.setAttribute("aria-expanded",this.isExpanded))})}}function S(t){const e={};return t.forEach(({loc:o,lastmod:l,changefreq:n,priority:s})=>{const a=`${new URL(o).origin}/`;e[a]||(e[a]={children:{},details:{}});let r=e[a];const i=o.replace(a,"").split("/").filter(Boolean);i.length===0?r.details={lastmod:l,changefreq:n,priority:s}:i.forEach((d,u)=>{const h=a+i.slice(0,u+1).join("/");r.children[h]||(r.children[h]={children:{},details:{}}),u===i.length-1&&(r.children[h].details={lastmod:l,changefreq:n,priority:s}),r=r.children[h]})}),e}function L(t,e,o,l){const n=document.createElement("li"),s=document.createElement("span");s.textContent=t;const c=Object.keys(e.children);if(c.length>0){s.className="toggle",s.setAttribute("aria-expanded",l?"true":"false"),l&&s.classList.add("open");const a=document.createElement("ul");c.sort((r,i)=>r.localeCompare(i)).forEach(r=>{a.appendChild(L(r,e.children[r],o,l))}),n.appendChild(s),n.appendChild(a)}else n.appendChild(s);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const a=document.createElement("span");a.className="details",a.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,n.appendChild(a)}return n}function B(t){const e=document.getElementById("app"),o=document.createElement("header");e.insertBefore(o,t),t.innerHTML=`
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
  `;const l=t.querySelector("#tree"),n=new E(l);let s=[];const c=new b(o,{treeView:n,urls:s,onBack:()=>{window.history.pushState({},"","/"),y("/")},onToggleFilters:r=>{t.querySelector("#filters").classList.toggle("hidden",!r)}}),a=async()=>{const i=new URLSearchParams(window.location.search).get("id");if(!i){g("No sitemap ID provided. Please load a sitemap first.");return}p(10);try{const d=await fetch(`/sitemap/results-data?id=${i}`);if(!d.ok){const h=await d.json();throw new Error(h.error||"Failed to load sitemap data")}const u=await d.json();s=u.urls,p(50),n.render(s),p(100),v(`Loaded ${u.urlCount} URLs`),t.querySelector("#totalUrls").textContent=u.urlCount,t.querySelector("#uniqueDomains").textContent=new Set(s.map(h=>new URL(h.loc).hostname)).size,c.updateUrls(s)}catch(d){g(d.message)}finally{m()}};t.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const r={priority:t.querySelector("#priorityFilter").value,lastmod:t.querySelector("#lastmodFilter").value},i=t.querySelector("#sortBy").value;n.render(s,r,i);const d=l.querySelectorAll("li").length;t.querySelector("#matchCount").textContent=`(${d} of ${s.length} URLs)`}),t.querySelector("#resetFiltersBtn").addEventListener("click",()=>{t.querySelector("#priorityFilter").value="0",t.querySelector("#lastmodFilter").value="",t.querySelector("#sortBy").value="url",t.querySelector("#urlSearch").value="",n.render(s),t.querySelector("#matchCount").textContent=""}),t.querySelector("#urlSearch").addEventListener("input",()=>{const r=t.querySelector("#urlSearch").value.toLowerCase();l.querySelectorAll("span").forEach(i=>{if(i.classList.remove("highlight"),r&&i.textContent.toLowerCase().includes(r)){i.classList.add("highlight");let d=i.closest("ul");for(;d;){d.classList.remove("hidden");const u=d.previousElementSibling;u&&u.classList.contains("toggle")&&(u.classList.add("open"),u.setAttribute("aria-expanded","true")),d=d.parentElement.closest("ul")}}})}),a()}let f=null;function y(t){if(!f){console.error("Main element not initialized yet");return}switch(console.log("Routing to:",t),f.innerHTML="",t){case"/":w(f);break;case"/results":B(f);break;default:f.innerHTML="<h2>404 - Page not found</h2>"}}document.addEventListener("DOMContentLoaded",()=>{if(f=document.getElementById("view"),!f){console.error('Main element #view not found. Ensure index.html has <main id="view">');return}y(window.location.pathname),window.addEventListener("popstate",()=>y(window.location.pathname))});
