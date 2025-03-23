(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function u(l=0){var n,a;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=l,(n=document.getElementById("error"))==null||n.classList.add("hidden"),(a=document.getElementById("feedback"))==null||a.classList.add("hidden"))}function p(){const l=document.getElementById("loading");l&&l.classList.add("hidden")}function y(l){var n;p();const e=document.getElementById("feedback");e&&(e.textContent=l,e.classList.remove("hidden"),(n=document.getElementById("error"))==null||n.classList.add("hidden"))}function h(l){var n;p();const e=document.getElementById("error");e&&(e.textContent=l,e.classList.remove("hidden"),(n=document.getElementById("feedback"))==null||n.classList.add("hidden"))}function E(l){const e=document.createElement("section");e.innerHTML=`
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
  `,l.appendChild(e);const n=e.querySelector("#sitemapUrlForm"),a=e.querySelector("#sitemapUrlInput"),t=e.querySelector("#sitemapUploadForm"),s=e.querySelector("#clearCacheBtn");n.addEventListener("submit",async r=>{r.preventDefault();const o=a.value.trim();if(o){u(10);try{const i=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:o})});if(!i.ok){const c=await i.json();throw new Error(c.error||"Failed to fetch sitemap")}const{id:d}=await i.json();u(50),window.history.pushState({},"",`/results?id=${d}`),renderLayout(),route("/results"),y("Sitemap loaded successfully")}catch(i){h(i.message)}finally{p()}}}),t.addEventListener("submit",async r=>{r.preventDefault();const o=new FormData(t);u(10);try{const i=await fetch("/sitemap/upload",{method:"POST",body:o});if(!i.ok){const c=await i.json();throw new Error(c.error||"Failed to upload sitemap")}const{id:d}=await i.json();u(50),window.history.pushState({},"",`/results?id=${d}`),renderLayout(),route("/results"),y("Sitemap uploaded successfully")}catch(i){h(i.message)}finally{p()}}),s.addEventListener("click",async()=>{u();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(r){h(r.message)}finally{p()}})}class S{constructor(e){this.container=e,this.isExpanded=!0}render(e,n={},a="url"){if(showLoading(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const t=e.filter(({priority:o,lastmod:i})=>{const d=parseFloat(n.priority||0),c=n.lastmod?new Date(n.lastmod):null;return(o==="N/A"||parseFloat(o)>=d)&&(!c||i!=="N/A"&&new Date(i)>=c)}),s=w(t),r=document.createElement("ul");Object.keys(s).sort((o,i)=>o.localeCompare(i)).forEach(o=>{r.appendChild(L(o,s[o],a,this.isExpanded))}),this.container.appendChild(r),hideLoading()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(n=>{const a=n.nextElementSibling;a&&a.tagName==="UL"&&(a.classList.toggle("hidden",!this.isExpanded),n.classList.toggle("open",this.isExpanded),n.setAttribute("aria-expanded",this.isExpanded))})}}function w(l){const e={};return l.forEach(({loc:n,lastmod:a,changefreq:t,priority:s})=>{const o=`${new URL(n).origin}/`;e[o]||(e[o]={children:{},details:{}});let i=e[o];const d=n.replace(o,"").split("/").filter(Boolean);d.length===0?i.details={lastmod:a,changefreq:t,priority:s}:d.forEach((c,b)=>{const f=o+d.slice(0,b+1).join("/");i.children[f]||(i.children[f]={children:{},details:{}}),b===d.length-1&&(i.children[f].details={lastmod:a,changefreq:t,priority:s}),i=i.children[f]})}),e}function L(l,e,n,a){const t=document.createElement("li"),s=document.createElement("span");s.textContent=l;const r=Object.keys(e.children);if(r.length>0){s.className="toggle",s.setAttribute("aria-expanded",a?"true":"false"),a&&s.classList.add("open");const o=document.createElement("ul");r.sort((i,d)=>i.localeCompare(d)).forEach(i=>{o.appendChild(L(i,e.children[i],n,a))}),t.appendChild(s),t.appendChild(o)}else t.appendChild(s);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const o=document.createElement("span");o.className="details",o.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,t.appendChild(o)}return t}function x(l){const e=document.createElement("section");e.innerHTML=`
    <div class="controls">
      <button id="backBtn"><i class="fas fa-arrow-left"></i> Back</button>
      <button id="collapseAllBtn"><i class="fas fa-compress-alt"></i> Collapse All</button>
      <button id="exportHtmlBtn" disabled><i class="fas fa-file-code"></i> Export HTML</button>
      <button id="exportCsvBtn" disabled><i class="fas fa-file-csv"></i> Export CSV</button>
      <button id="exportJsonBtn" disabled><i class="fas fa-file-code"></i> Export JSON</button>
      <button id="themeToggleBtn"><i class="fas fa-moon"></i> Toggle Theme</button>
      <button id="toggleFiltersBtn" aria-expanded="false"><i class="fas fa-filter"></i> Filters</button>
    </div>
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
  `,l.appendChild(e);const n=e.querySelector("#tree");let a=new S(n),t=[];const s=async()=>{const o=new URLSearchParams(window.location.search).get("id");if(!o){h("No sitemap ID provided. Please load a sitemap first.");return}u(10);try{const i=await fetch(`/sitemap/results-data?id=${o}`);if(!i.ok){const c=await i.json();throw new Error(c.error||"Failed to load sitemap data")}const d=await i.json();t=d.urls,u(50),a.render(t),u(100),y(`Loaded ${d.urlCount} URLs`),e.querySelector("#totalUrls").textContent=d.urlCount,e.querySelector("#uniqueDomains").textContent=new Set(t.map(c=>new URL(c.loc).hostname)).size,e.querySelectorAll("#exportHtmlBtn, #exportCsvBtn, #exportJsonBtn").forEach(c=>c.disabled=!1)}catch(i){h(i.message)}finally{p()}};e.querySelector("#backBtn").addEventListener("click",()=>{window.history.pushState({},"","/"),renderLayout(),route("/")}),e.querySelector("#collapseAllBtn").addEventListener("click",()=>{a.toggleExpansion(),e.querySelector("#collapseAllBtn").innerHTML=a.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'}),e.querySelector("#exportHtmlBtn").addEventListener("click",()=>{const r=`
      <!DOCTYPE html>
      <html><body><h1>Sitemap URLs</h1><ul>
      ${t.map(o=>`<li><a href="${o.loc}">${o.loc}</a> (Last Modified: ${o.lastmod})</li>`).join("")}
      </ul></body></html>`;g(r,"sitemap.html","text/html")}),e.querySelector("#exportCsvBtn").addEventListener("click",()=>{const r=`URL,Last Modified,Change Frequency,Priority
`+t.map(o=>`"${o.loc}","${o.lastmod}","${o.changefreq}","${o.priority}"`).join(`
`);g(r,"sitemap.csv","text/csv")}),e.querySelector("#exportJsonBtn").addEventListener("click",()=>{const r=JSON.stringify(t,null,2);g(r,"sitemap.json","application/json")}),e.querySelector("#themeToggleBtn").addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),e.querySelector("#toggleFiltersBtn").addEventListener("click",()=>{const r=e.querySelector("#toggleFiltersBtn").getAttribute("aria-expanded")==="true";e.querySelector("#toggleFiltersBtn").setAttribute("aria-expanded",!r),e.querySelector("#filters").classList.toggle("hidden")}),e.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const r={priority:e.querySelector("#priorityFilter").value,lastmod:e.querySelector("#lastmodFilter").value},o=e.querySelector("#sortBy").value;a.render(t,r,o);const i=n.querySelectorAll("li").length;e.querySelector("#matchCount").textContent=`(${i} of ${t.length} URLs)`}),e.querySelector("#resetFiltersBtn").addEventListener("click",()=>{e.querySelector("#priorityFilter").value="0",e.querySelector("#lastmodFilter").value="",e.querySelector("#sortBy").value="url",e.querySelector("#urlSearch").value="",a.render(t),e.querySelector("#matchCount").textContent=""}),e.querySelector("#urlSearch").addEventListener("input",()=>{const r=e.querySelector("#urlSearch").value.toLowerCase();n.querySelectorAll("span").forEach(o=>{if(o.classList.remove("highlight"),r&&o.textContent.toLowerCase().includes(r)){o.classList.add("highlight");let i=o.closest("ul");for(;i;){i.classList.remove("hidden");const d=i.previousElementSibling;d&&d.classList.contains("toggle")&&(d.classList.add("open"),d.setAttribute("aria-expanded","true")),i=i.parentElement.closest("ul")}}})}),s()}function g(l,e,n){const a=new Blob([l],{type:n}),t=document.createElement("a");t.href=URL.createObjectURL(a),t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t)}const m=document.getElementById("main");m||console.error("Main element not found");function C(){var e;(e=document.getElementById("header"))==null||e.remove();const l=document.createElement("header");l.innerHTML="<h1>Sitemap Explorer</h1>",document.body.prepend(l)}function v(l){switch(m.innerHTML="",l){case"/":E(m);break;case"/results":x(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}}window.addEventListener("popstate",()=>v(window.location.pathname));C();v(window.location.pathname);
