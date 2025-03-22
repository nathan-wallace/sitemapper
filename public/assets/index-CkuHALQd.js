(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();function U(){const o=document.createElement("header"),i=window.location.pathname==="/results";return o.innerHTML=`
    <h1>Sitemap Explorer</h1>
    <div class="header-controls">
    <div class="export-buttons">
      ${i?`
        <button id="backBtn"><i class="fas fa-arrow-left"></i> Back</button>
        <button id="exportHtmlBtn" disabled><i class="fas fa-file-code"></i> Export HTML</button>
        <button id="exportCsvBtn" disabled><i class="fas fa-file-csv"></i> Export CSV</button>
        <button id="exportJsonBtn" disabled><i class="fas fa-file-export"></i> Export JSON</button>`:""}
    </div>
      <button id="themeToggleBtn" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
       <span class="version">v1.0</span>
    </div>
  `,o}function F(o){const e=document.createElement("section");e.innerHTML=`
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
  `,o.appendChild(e);const i=e.querySelector("#sitemapUrlForm"),r=e.querySelector("#sitemapUrlInput"),n=e.querySelector("#sitemapUploadForm"),t=e.querySelector("#clearCacheBtn");i==null||i.addEventListener("submit",a=>{a.preventDefault(),(r==null?void 0:r.value.trim())&&(i.action="/sitemap/url",i.submit())}),n==null||n.addEventListener("submit",a=>{a.preventDefault(),n.action="/sitemap/upload",n.submit()}),t==null||t.addEventListener("click",()=>{fetch("/sitemap/clear-cache",{method:"POST"}).then(a=>a.text()).then(()=>{window.location.reload()}).catch(a=>console.error("Clear cache error:",a))})}function k({urls:o,treeContainer:e,filtersContainer:i,id:r}){const n=document.querySelector("header .export-buttons");if(!n)return;const t=n.querySelector("#backBtn"),a=n.querySelector("#exportHtmlBtn"),s=n.querySelector("#exportJsonBtn"),d=n.querySelector("#exportCsvBtn");!t||!a||!s||!d||(t.disabled=!1,a.disabled=!1,s.disabled=!1,d.disabled=!1,t.addEventListener("click",()=>{window.location.href="/"}),a.addEventListener("click",()=>{const l=e.innerHTML,c=new Blob([`<html><body>${l}</body></html>`],{type:"text/html"}),u=document.createElement("a");u.href=URL.createObjectURL(c),u.download="sitemap.html",u.click()}),s.addEventListener("click",()=>{const l=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),c=document.createElement("a");c.href=URL.createObjectURL(l),c.download="sitemap.json",c.click()}),d.addEventListener("click",()=>{const c=[["URL","Last Modified","Change Frequency","Priority"].join(",")];o.forEach(({loc:x,lastmod:S,changefreq:B,priority:C})=>{c.push(`"${x}","${S}","${B}","${C}"`)});const u=new Blob([c.join(`
`)],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(u),p.download="sitemap.csv",p.click()}))}class P{constructor(e){this.container=e,this.isExpanded=!0}render(e,i={},r="url"){if(showLoading(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const n=e.filter(({priority:s,lastmod:d})=>{const l=parseFloat(i.priority||0),c=i.lastmod?new Date(i.lastmod):null;return(s==="N/A"||parseFloat(s)>=l)&&(!c||d!=="N/A"&&new Date(d)>=c)}),t=R(n),a=document.createElement("ul");Object.keys(t).sort((s,d)=>s.localeCompare(d)).forEach(s=>{a.appendChild(E(s,t[s],r,this.isExpanded))}),this.container.appendChild(a),hideLoading()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(i=>{const r=i.nextElementSibling;r&&r.tagName==="UL"&&(r.classList.toggle("hidden",!this.isExpanded),i.classList.toggle("open",this.isExpanded),i.setAttribute("aria-expanded",this.isExpanded))})}}function R(o){const e={};return o.forEach(({loc:i,lastmod:r,changefreq:n,priority:t})=>{const s=`${new URL(i).origin}/`;e[s]||(e[s]={children:{},details:{}});let d=e[s];const l=i.replace(s,"").split("/").filter(Boolean);l.length===0?d.details={lastmod:r,changefreq:n,priority:t}:l.forEach((c,u)=>{const p=s+l.slice(0,u+1).join("/");d.children[p]||(d.children[p]={children:{},details:{}}),u===l.length-1&&(d.children[p].details={lastmod:r,changefreq:n,priority:t}),d=d.children[p]})}),e}function E(o,e,i,r){const n=document.createElement("li"),t=document.createElement("span");t.textContent=o;const a=Object.keys(e.children);if(a.length>0){t.className="toggle",t.setAttribute("aria-expanded",r?"true":"false"),r&&t.classList.add("open");const s=document.createElement("ul");a.sort((d,l)=>d.localeCompare(l)).forEach(d=>{s.appendChild(E(d,e.children[d],i,r))}),n.appendChild(t),n.appendChild(s)}else n.appendChild(t);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const s=document.createElement("span");s.className="details",s.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,n.appendChild(s)}return n}function w(){const o=document.createElement("filters"),i=window.location.pathname==="/results";return o.innerHTML=`
    <label for="urlSearch">Search URLs:</label>
    <input type="text" id="urlSearch" placeholder="Search URLs...">
    <button id="toggleFiltersBtn" aria-expanded="false">Filter and Sort</button>
    <div id="filters" class="hidden">
        <label for="priorityFilter">Min Priority:</label>
        <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="0">
        <label for="lastmodFilter">Last Modified After:</label>
        <input type="date" id="lastmodFilter">
        <label for="sortBy">Sort By:</label>
        <select id="sortBy">
            <option value="url">URL</option>
            <option value="lastmod">Last Modified</option>
            <option value="priority">Priority</option>
        </select>
        <button id="applyFiltersBtn">Apply Filters</button>
        <button id="resetFiltersBtn">Reset Filters</button>
    </div>
  `,i&&o.appendChild(w()),o}function T(o=0){var i,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=o,(i=document.getElementById("error"))==null||i.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function b(){const o=document.getElementById("loading");o&&o.classList.add("hidden")}function f(o){var i;b();const e=document.getElementById("error");e&&(e.textContent=o,e.classList.remove("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}let v=null,h=[];function M(o){const e=document.createElement("section");e.innerHTML=`
    <div id="search-and-filters">
      <div id="search"></div>
      <button id="toggleFiltersBtn" aria-expanded="false" aria-controls="filters">
        <span class="fa fa-caret-down"></span> Toggle Filters
      </button>
      <div id="filters" class="hidden"></div>
    </div>
    <div id="stats"></div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
    <div class="container">
      <main>
        <div id="treeView"></div>
      </main>
    </div>
  `,o.appendChild(e);const i=e.querySelector("#filters"),r=e.querySelector("#toggleFiltersBtn");r==null||r.addEventListener("click",()=>{const t=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",String(!t)),i==null||i.classList.toggle("hidden")});const n=new URLSearchParams(window.location.search).get("id");if(!n){f("Missing ID in URL");return}T(),fetch(`/results-data?id=${n}`).then(t=>{if(!t.ok)throw new Error("Failed to load results data.");return t.json()}).then(t=>{if(b(),!Array.isArray(t.urls)||t.urls.length===0){f("No results found.");return}h=t.urls;const a=e.querySelector("#treeView");v=new P(a),v.render(h),k({urls:h,treeContainer:a,filtersContainer:i,id:n}),w(),e.querySelector("#stats").innerHTML=`<p>Total URLs: ${h.length}</p>`}).catch(t=>{b(),f(`Error loading data: ${t.message}`)})}document.getElementById("app");const L=document.querySelector("header"),m=document.getElementById("view");function g(){L.innerHTML="",L.appendChild(U())}function y(o){switch(m.innerHTML="",o){case"/":F(m);break;case"/results":M(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}}function O(o){const e=o.target.closest("a");if(e&&e.href.startsWith(window.location.origin)){o.preventDefault();const i=new URL(e.href).pathname;window.history.pushState({},"",i),g(),y(i)}}function q(){g(),y(window.location.pathname),document.body.addEventListener("click",O),window.addEventListener("popstate",()=>{g(),y(window.location.pathname)})}q();
