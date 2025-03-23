(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function l(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=l(o);fetch(o.href,i)}})();function c(e=0){var l,a;const s=document.getElementById("loading");s&&(s.classList.remove("hidden"),document.getElementById("loadProgress").value=e,(l=document.getElementById("error"))==null||l.classList.add("hidden"),(a=document.getElementById("feedback"))==null||a.classList.add("hidden"))}function p(){const e=document.getElementById("loading");e&&e.classList.add("hidden")}function y(e){var l;p();const s=document.getElementById("feedback");s&&(s.textContent=e,s.classList.remove("hidden"),(l=document.getElementById("error"))==null||l.classList.add("hidden"))}function m(e){var l;p();const s=document.getElementById("error");s&&(s.textContent=e,s.classList.remove("hidden"),(l=document.getElementById("feedback"))==null||l.classList.add("hidden"))}function E(e){e.innerHTML=`
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
  `;const s=e.querySelector("#sitemapUrlForm"),l=e.querySelector("#sitemapUrlInput"),a=e.querySelector("#sitemapUploadForm"),o=e.querySelector("#clearCacheBtn");s.addEventListener("submit",async i=>{i.preventDefault();const r=l.value.trim();if(r){c(10);try{const t=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r})});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to fetch sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),g(),h("/results"),y("Sitemap loaded successfully")}catch(t){m(t.message)}finally{p()}}}),a.addEventListener("submit",async i=>{i.preventDefault();const r=new FormData(a);c(10);try{const t=await fetch("/sitemap/upload",{method:"POST",body:r});if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to upload sitemap")}const{id:n}=await t.json();c(50),window.history.pushState({},"",`/results?id=${n}`),g(),h("/results"),y("Sitemap uploaded successfully")}catch(t){m(t.message)}finally{p()}}),o.addEventListener("click",async()=>{c();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");y("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(i){m(i.message)}finally{p()}})}class w{constructor(s){this.container=s,this.isExpanded=!0}render(s,l={},a="url"){if(showLoading(50),this.container.innerHTML="",!s||s.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const o=s.filter(({priority:t,lastmod:n})=>{const d=parseFloat(l.priority||0),b=l.lastmod?new Date(l.lastmod):null;return(t==="N/A"||parseFloat(t)>=d)&&(!b||n!=="N/A"&&new Date(n)>=b)}),i=x(o),r=document.createElement("ul");Object.keys(i).sort((t,n)=>t.localeCompare(n)).forEach(t=>{r.appendChild(S(t,i[t],a,this.isExpanded))}),this.container.appendChild(r),hideLoading()}toggleExpansion(){const s=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,s.forEach(l=>{const a=l.nextElementSibling;a&&a.tagName==="UL"&&(a.classList.toggle("hidden",!this.isExpanded),l.classList.toggle("open",this.isExpanded),l.setAttribute("aria-expanded",this.isExpanded))})}}function x(e){const s={};return e.forEach(({loc:l,lastmod:a,changefreq:o,priority:i})=>{const t=`${new URL(l).origin}/`;s[t]||(s[t]={children:{},details:{}});let n=s[t];const d=l.replace(t,"").split("/").filter(Boolean);d.length===0?n.details={lastmod:a,changefreq:o,priority:i}:d.forEach((b,v)=>{const f=t+d.slice(0,v+1).join("/");n.children[f]||(n.children[f]={children:{},details:{}}),v===d.length-1&&(n.children[f].details={lastmod:a,changefreq:o,priority:i}),n=n.children[f]})}),s}function S(e,s,l,a){const o=document.createElement("li"),i=document.createElement("span");i.textContent=e;const r=Object.keys(s.children);if(r.length>0){i.className="toggle",i.setAttribute("aria-expanded",a?"true":"false"),a&&i.classList.add("open");const t=document.createElement("ul");r.sort((n,d)=>n.localeCompare(d)).forEach(n=>{t.appendChild(S(n,s.children[n],l,a))}),o.appendChild(i),o.appendChild(t)}else o.appendChild(i);if(s.details.lastmod&&s.details.lastmod!=="N/A"){const t=document.createElement("span");t.className="details",t.textContent=` (Priority: ${s.details.priority}, Last Modified: ${s.details.lastmod}, ${s.details.changefreq})`,o.appendChild(t)}return o}function C(e){e.innerHTML=`
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
  `;const s=e.querySelector("#tree");let l=new w(s),a=[];const o=async()=>{const r=new URLSearchParams(window.location.search).get("id");if(!r){m("No sitemap ID provided. Please load a sitemap first.");return}c(10);try{const t=await fetch(`/sitemap/results-data?id=${r}`);if(!t.ok){const d=await t.json();throw new Error(d.error||"Failed to load sitemap data")}const n=await t.json();a=n.urls,c(50),l.render(a),c(100),y(`Loaded ${n.urlCount} URLs`),e.querySelector("#totalUrls").textContent=n.urlCount,e.querySelector("#uniqueDomains").textContent=new Set(a.map(d=>new URL(d.loc).hostname)).size,e.querySelectorAll("#exportHtmlBtn, #exportCsvBtn, #exportJsonBtn").forEach(d=>d.disabled=!1)}catch(t){m(t.message)}finally{p()}};e.querySelector("#backBtn").addEventListener("click",()=>{window.history.pushState({},"","/"),g(),h("/")}),e.querySelector("#collapseAllBtn").addEventListener("click",()=>{l.toggleExpansion(),e.querySelector("#collapseAllBtn").innerHTML=l.isExpanded?'<i class="fas fa-compress-alt"></i> Collapse All':'<i class="fas fa-expand-alt"></i> Expand All'}),e.querySelector("#exportHtmlBtn").addEventListener("click",()=>{const i=`
      <!DOCTYPE html>
      <html><body><h1>Sitemap URLs</h1><ul>
      ${a.map(r=>`<li><a href="${r.loc}">${r.loc}</a> (Last Modified: ${r.lastmod})</li>`).join("")}
      </ul></body></html>`;L(i,"sitemap.html","text/html")}),e.querySelector("#exportCsvBtn").addEventListener("click",()=>{const i=`URL,Last Modified,Change Frequency,Priority
`+a.map(r=>`"${r.loc}","${r.lastmod}","${r.changefreq}","${r.priority}"`).join(`
`);L(i,"sitemap.csv","text/csv")}),e.querySelector("#exportJsonBtn").addEventListener("click",()=>{const i=JSON.stringify(a,null,2);L(i,"sitemap.json","application/json")}),e.querySelector("#themeToggleBtn").addEventListener("click",()=>{document.body.classList.toggle("dark-mode")}),e.querySelector("#toggleFiltersBtn").addEventListener("click",()=>{const i=e.querySelector("#toggleFiltersBtn").getAttribute("aria-expanded")==="true";e.querySelector("#toggleFiltersBtn").setAttribute("aria-expanded",!i),e.querySelector("#filters").classList.toggle("hidden")}),e.querySelector("#applyFiltersBtn").addEventListener("click",()=>{const i={priority:e.querySelector("#priorityFilter").value,lastmod:e.querySelector("#lastmodFilter").value},r=e.querySelector("#sortBy").value;l.render(a,i,r);const t=s.querySelectorAll("li").length;e.querySelector("#matchCount").textContent=`(${t} of ${a.length} URLs)`}),e.querySelector("#resetFiltersBtn").addEventListener("click",()=>{e.querySelector("#priorityFilter").value="0",e.querySelector("#lastmodFilter").value="",e.querySelector("#sortBy").value="url",e.querySelector("#urlSearch").value="",l.render(a),e.querySelector("#matchCount").textContent=""}),e.querySelector("#urlSearch").addEventListener("input",()=>{const i=e.querySelector("#urlSearch").value.toLowerCase();s.querySelectorAll("span").forEach(r=>{if(r.classList.remove("highlight"),i&&r.textContent.toLowerCase().includes(i)){r.classList.add("highlight");let t=r.closest("ul");for(;t;){t.classList.remove("hidden");const n=t.previousElementSibling;n&&n.classList.contains("toggle")&&(n.classList.add("open"),n.setAttribute("aria-expanded","true")),t=t.parentElement.closest("ul")}}})}),o()}function L(e,s,l){const a=new Blob([e],{type:l}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=s,document.body.appendChild(o),o.click(),document.body.removeChild(o)}let u=null;function g(){if(!u)return;const e=document.querySelector("header");e&&(e.innerHTML="<h1>Sitemap Explorer</h1>")}function h(e){if(!u){console.error("Main element not initialized yet");return}switch(console.log("Routing to:",e),u.innerHTML="",e){case"/":E(u);break;case"/results":C(u);break;default:u.innerHTML="<h2>404 - Page not found</h2>"}g()}document.addEventListener("DOMContentLoaded",()=>{if(u=document.getElementById("view"),!u){console.error('Main element #view not found. Ensure index.html has <main id="view">');return}h(window.location.pathname),window.addEventListener("popstate",()=>h(window.location.pathname))});
