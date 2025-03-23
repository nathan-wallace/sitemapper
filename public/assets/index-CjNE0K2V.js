(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function l(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=l(o);fetch(o.href,s)}})();function c(e=0){var l,a;const i=document.getElementById("loading");i&&(i.classList.remove("hidden"),document.getElementById("loadProgress").value=e,(l=document.getElementById("error"))==null||l.classList.add("hidden"),(a=document.getElementById("feedback"))==null||a.classList.add("hidden"))}function u(){const e=document.getElementById("loading");e&&e.classList.add("hidden")}function y(e){var l;u();const i=document.getElementById("feedback");i&&(i.textContent=e,i.classList.remove("hidden"),(l=document.getElementById("error"))==null||l.classList.add("hidden"))}function m(e){var l;u();const i=document.getElementById("error");i&&(i.textContent=e,i.classList.remove("hidden"),(l=document.getElementById("feedback"))==null||l.classList.add("hidden"))}function E(e){e.innerHTML=`
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
  `;const i=e.querySelector("#sitemapUrlForm"),l=e.querySelector("#sitemapUrlInput"),a=e.querySelector("#sitemapUploadForm"),o=e.querySelector("#clearCacheBtn");i.addEventListener("submit",async s=>{s.preventDefault();const r=l.value.trim();if(r){c(10);try{const t=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r})});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),g(),h("/results"),y("Sitemap loaded successfully")}catch(t){m(t.message)}finally{u()}}}),a.addEventListener("submit",async s=>{s.preventDefault();const r=new FormData(a);c(10);try{const t=await fetch("/sitemap/upload",{method:"POST",body:r});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),g(),h("/results"),y("Sitemap uploaded successfully")}catch(t){m(t.message)}finally{u()}}),o.addEventListener("click",async()=>{c();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(s){m(s.message)}finally{u()}})}class w{constructor(i){this.container=i,this.isExpanded=!0}render(i,l={},a="url"){if(showLoading(50),this.container.innerHTML="",!i||i.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const o=i.filter(({priority:t,lastmod:n})=>{const d=parseFloat(l.priority||0),b=l.lastmod?new Date(l.lastmod):null;return(t==="N/A"||parseFloat(t)>=d)&&(!b||n!=="N/A"&&new Date(n)>=b)}),s=x(o),r=document.createElement("ul");Object.keys(s).sort((t,n)=>t.localeCompare(n)).forEach(t=>{r.appendChild(S(t,s[t],a,this.isExpanded))}),this.container.appendChild(r),hideLoading()}toggleExpansion(){const i=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,i.forEach(l=>{const a=l.nextElementSibling;a&&a.tagName==="UL"&&(a.classList.toggle("hidden",!this.isExpanded),l.classList.toggle("open",this.isExpanded),l.setAttribute("aria-expanded",this.isExpanded))})}}function x(e){const i={};return e.forEach(({loc:l,lastmod:a,changefreq:o,priority:s})=>{const t=`${new URL(l).origin}/`;i[t]||(i[t]={children:{},details:{}});let n=i[t];const d=l.replace(t,"").split("/").filter(Boolean);d.length===0?n.details={lastmod:a,changefreq:o,priority:s}:d.forEach((b,v)=>{const f=t+d.slice(0,v+1).join("/");n.children[f]||(n.children[f]={children:{},details:{}}),v===d.length-1&&(n.children[f].details={lastmod:a,changefreq:o,priority:s}),n=n.children[f]})}),i}function S(e,i,l,a){const o=document.createElement("li"),s=document.createElement("span");s.textContent=e;const r=Object.keys(i.children);if(r.length>0){s.className="toggle",s.setAttribute("aria-expanded",a?"true":"false"),a&&s.classList.add("open");const t=document.createElement("ul");r.sort((n,d)=>n.localeCompare(d)).forEach(n=>{t.appendChild(S(n,i.children[n],l,a))}),o.appendChild(s),o.appendChild(t)}else o.appendChild(s);if(i.details.lastmod&&i.details.lastmod!=="N/A"){const t=document.createElement("span");t.className="details",t.textContent=` (Priority: ${i.details.priority}, Last Modified: ${i.details.lastmod}, ${i.details.changefreq})`,o.appendChild(t)}return o}function C(e){e.innerHTML=`
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
  `;const i=e.querySelector("#tree");let l=new w(i),a=[];const o=async()=>{const r=new URLSearchParams(window.location.search).get("id");if(!r){m("No sitemap ID provided. Please load a sitemap first.");return}c(10);try{const t=await fetch(`/sitemap/results-data?id=${r}`);if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to load sitemap data")}const n=await t.json();a=n.urls,c(50),l.render(a),c(100),y(`Loaded ${n.urlCount} URLs`),e.querySelector("#totalUrls").textContent=n.urlCount,e.querySelector("#uniqueDomains").textContent=new Set(a.map(d=>new URL(d.loc).hostname)).size,e.querySelectorAll("#exportHtmlBtn, #exportCsvBtn, #exportJsonBtn").forEach(d=>d.disabled=!1)}catch(t){m(t.message)}finally{u()}};e.querySelector("#backBtn").addEventListener("click",()=>{window.history.pushState({},"","/"),g(),h("/")}),e.querySelector("#collapseAllBtn").addEventListener("click",()=>{l.toggleExpansion(),e.querySelector("#collapseAllBtn").innerHTML=l.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'}),e.querySelector("#exportHtmlBtn").addEventListener("click",()=>{const s=`
      <!DOCTYPE html>
      <html><body><h1>Sitemap URLs</h1><ul>
      ${a.map(r=>`<li><a href="${r.loc}">${r.loc}</a> (Last Modified: ${r.lastmod})</li>`).join("")}
      </ul></body></html>`;L(s,"sitemap.html","text/html")}),e.querySelector("#exportCsvBtn").addEventListener("click",()=>{const s=`URL,Last Modified,Change Frequency,Priority
`+a.map(r=>`"${r.loc}","${r.lastmod}","${r.changefreq}","${r.priority}"`).join(`
`);L(s,"sitemap.csv","text/csv")}),e.querySelector("#exportJsonBtn").addEventListener("click",()=>{const s=JSON.stringify(a,null,2);L(s,"sitemap.json","application/json")}),e.querySelector("#themeToggleBtn").addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),e.querySelector("#toggleFiltersBtn").addEventListener("click",()=>{const s=e.querySelector("#toggleFiltersBtn").getAttribute("aria-expanded")==="true";e.querySelector("#toggleFiltersBtn").setAttribute("aria-expanded",!s),e.querySelector("#filters").classList.toggle("hidden")}),e.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const s={priority:e.querySelector("#priorityFilter").value,lastmod:e.querySelector("#lastmodFilter").value},r=e.querySelector("#sortBy").value;l.render(a,s,r);const t=i.querySelectorAll("li").length;e.querySelector("#matchCount").textContent=`(${t} of ${a.length} URLs)`}),e.querySelector("#resetFiltersBtn").addEventListener("click",()=>{e.querySelector("#priorityFilter").value="0",e.querySelector("#lastmodFilter").value="",e.querySelector("#sortBy").value="url",e.querySelector("#urlSearch").value="",l.render(a),e.querySelector("#matchCount").textContent=""}),e.querySelector("#urlSearch").addEventListener("input",()=>{const s=e.querySelector("#urlSearch").value.toLowerCase();i.querySelectorAll("span").forEach(r=>{if(r.classList.remove("highlight"),s&&r.textContent.toLowerCase().includes(s)){r.classList.add("highlight");let t=r.closest("ul");for(;t;){t.classList.remove("hidden");const n=t.previousElementSibling;n&&n.classList.contains("toggle")&&(n.classList.add("open"),n.setAttribute("aria-expanded","true")),t=t.parentElement.closest("ul")}}})}),o()}function L(e,i,l){const a=new Blob([e],{type:l}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=i,document.body.appendChild(o),o.click(),document.body.removeChild(o)}const p=document.getElementById("view");p||console.error("Main element #view not found");function g(){const e=document.querySelector("header");e&&(e.innerHTML="<h1>Sitemap Explorer</h1>")}function h(e){switch(console.log("Routing to:",e),p.innerHTML="",e){case"/":E(p);break;case"/results":C(p);break;default:p.innerHTML="<h2>404 - Page not found</h2>"}g()}h(window.location.pathname);window.addEventListener("popstate",()=>h(window.location.pathname));
