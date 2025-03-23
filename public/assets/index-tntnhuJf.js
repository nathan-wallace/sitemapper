(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();function F(){const o=document.createElement("header"),i=window.location.pathname==="/results";return o.innerHTML=`
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
  `,o}function U(o){const e=document.createElement("section");e.innerHTML=`
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
  `,o.appendChild(e);const i=e.querySelector("#sitemapUrlForm"),r=e.querySelector("#sitemapUrlInput"),t=e.querySelector("#sitemapUploadForm"),n=e.querySelector("#clearCacheBtn");i==null||i.addEventListener("submit",a=>{a.preventDefault(),(r==null?void 0:r.value.trim())&&(i.action="/sitemap/url",i.submit())}),t==null||t.addEventListener("submit",a=>{a.preventDefault(),t.action="/sitemap/upload",t.submit()}),n==null||n.addEventListener("click",()=>{fetch("/sitemap/clear-cache",{method:"POST"}).then(a=>a.text()).then(()=>{window.location.reload()}).catch(a=>console.error("Clear cache error:",a))}),t.addEventListener("submit",async a=>{a.preventDefault();const s=new FormData(t);showLoading();try{const d=await fetch("/sitemap/upload",{method:"POST",body:s});if(!d.ok)throw new Error("Failed to upload sitemap");const{id:l}=await d.json();window.history.pushState({},"",`/results?id=${l}`),renderLayout(),route("/results")}catch(d){showError(d.message)}finally{hideLoading()}})}function k({urls:o,treeContainer:e,filtersContainer:i,id:r}){const t=document.querySelector("header .export-buttons");if(!t)return;const n=t.querySelector("#backBtn"),a=t.querySelector("#exportHtmlBtn"),s=t.querySelector("#exportJsonBtn"),d=t.querySelector("#exportCsvBtn");!n||!a||!s||!d||(n.disabled=!1,a.disabled=!1,s.disabled=!1,d.disabled=!1,n.addEventListener("click",()=>{window.location.href="/"}),a.addEventListener("click",()=>{const l=e.innerHTML,c=new Blob([`<html><body>${l}</body></html>`],{type:"text/html"}),u=document.createElement("a");u.href=URL.createObjectURL(c),u.download="sitemap.html",u.click()}),s.addEventListener("click",()=>{const l=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),c=document.createElement("a");c.href=URL.createObjectURL(l),c.download="sitemap.json",c.click()}),d.addEventListener("click",()=>{const c=[["URL","Last Modified","Change Frequency","Priority"].join(",")];o.forEach(({loc:x,lastmod:S,changefreq:B,priority:C})=>{c.push(`"${x}","${S}","${B}","${C}"`)});const u=new Blob([c.join(`
`)],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(u),p.download="sitemap.csv",p.click()}))}class P{constructor(e){this.container=e,this.isExpanded=!0}render(e,i={},r="url"){if(showLoading(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const t=e.filter(({priority:s,lastmod:d})=>{const l=parseFloat(i.priority||0),c=i.lastmod?new Date(i.lastmod):null;return(s==="N/A"||parseFloat(s)>=l)&&(!c||d!=="N/A"&&new Date(d)>=c)}),n=R(t),a=document.createElement("ul");Object.keys(n).sort((s,d)=>s.localeCompare(d)).forEach(s=>{a.appendChild(E(s,n[s],r,this.isExpanded))}),this.container.appendChild(a),hideLoading()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(i=>{const r=i.nextElementSibling;r&&r.tagName==="UL"&&(r.classList.toggle("hidden",!this.isExpanded),i.classList.toggle("open",this.isExpanded),i.setAttribute("aria-expanded",this.isExpanded))})}}function R(o){const e={};return o.forEach(({loc:i,lastmod:r,changefreq:t,priority:n})=>{const s=`${new URL(i).origin}/`;e[s]||(e[s]={children:{},details:{}});let d=e[s];const l=i.replace(s,"").split("/").filter(Boolean);l.length===0?d.details={lastmod:r,changefreq:t,priority:n}:l.forEach((c,u)=>{const p=s+l.slice(0,u+1).join("/");d.children[p]||(d.children[p]={children:{},details:{}}),u===l.length-1&&(d.children[p].details={lastmod:r,changefreq:t,priority:n}),d=d.children[p]})}),e}function E(o,e,i,r){const t=document.createElement("li"),n=document.createElement("span");n.textContent=o;const a=Object.keys(e.children);if(a.length>0){n.className="toggle",n.setAttribute("aria-expanded",r?"true":"false"),r&&n.classList.add("open");const s=document.createElement("ul");a.sort((d,l)=>d.localeCompare(l)).forEach(d=>{s.appendChild(E(d,e.children[d],i,r))}),t.appendChild(n),t.appendChild(s)}else t.appendChild(n);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const s=document.createElement("span");s.className="details",s.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,t.appendChild(s)}return t}function w(){const o=document.createElement("filters"),i=window.location.pathname==="/results";return o.innerHTML=`
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
  `,i&&o.appendChild(w()),o}function T(o=0){var i,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=o,(i=document.getElementById("error"))==null||i.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function b(){const o=document.getElementById("loading");o&&o.classList.add("hidden")}function f(o){var i;b();const e=document.getElementById("error");e&&(e.textContent=o,e.classList.remove("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}let v=null,h=[];function O(o){const e=document.createElement("section");e.innerHTML=`
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
  `,o.appendChild(e);const i=e.querySelector("#filters"),r=e.querySelector("#toggleFiltersBtn");r==null||r.addEventListener("click",()=>{const n=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",String(!n)),i==null||i.classList.toggle("hidden")});const t=new URLSearchParams(window.location.search).get("id");if(!t){f("Missing ID in URL");return}T(),fetch(`/results-data?id=${t}`).then(n=>{if(!n.ok)throw new Error("Failed to load results data.");return n.json()}).then(n=>{if(b(),!Array.isArray(n.urls)||n.urls.length===0){f("No results found.");return}h=n.urls;const a=e.querySelector("#treeView");v=new P(a),v.render(h),k({urls:h,treeContainer:a,filtersContainer:i,id:t}),w(),e.querySelector("#stats").innerHTML=`<p>Total URLs: ${h.length}</p>`}).catch(n=>{b(),f(`Error loading data: ${n.message}`)})}document.getElementById("app");const L=document.querySelector("header"),m=document.getElementById("view");function g(){L.innerHTML="",L.appendChild(F())}function y(o){switch(m.innerHTML="",o){case"/":U(m);break;case"/results":O(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}}function $(o){const e=o.target.closest("a");if(e&&e.href.startsWith(window.location.origin)){o.preventDefault();const i=new URL(e.href).pathname;window.history.pushState({},"",i),g(),y(i)}}function M(){g(),y(window.location.pathname),document.body.addEventListener("click",$),window.addEventListener("popstate",()=>{g(),y(window.location.pathname)})}M();
