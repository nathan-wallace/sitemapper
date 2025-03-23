(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();function F(){const r=document.createElement("header"),i=window.location.pathname==="/results";return r.innerHTML=`
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
  `,r}function g(r=0){var i,s;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=r,(i=document.getElementById("error"))==null||i.classList.add("hidden"),(s=document.getElementById("feedback"))==null||s.classList.add("hidden"))}function m(){const r=document.getElementById("loading");r&&r.classList.add("hidden")}function h(r){var i;m();const e=document.getElementById("error");e&&(e.textContent=r,e.classList.remove("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}function k(r){const e=document.createElement("section");e.innerHTML=`
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
  `,r.appendChild(e);const i=e.querySelector("#sitemapUrlForm"),s=e.querySelector("#sitemapUrlInput"),n=e.querySelector("#sitemapUploadForm"),t=e.querySelector("#clearCacheBtn");i.addEventListener("submit",async d=>{d.preventDefault();const a=s.value.trim();if(a){g();try{const o=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!o.ok){const c=await o.json();throw new Error(c.error||"Failed to fetch sitemap")}const{id:l}=await o.json();window.history.pushState({},"",`/results?id=${l}`),renderLayout(),route("/results")}catch(o){h(o.message)}finally{m()}}}),n.addEventListener("submit",async d=>{d.preventDefault();const a=new FormData(n);g();try{const o=await fetch("/sitemap/upload",{method:"POST",body:a});if(!o.ok){const c=await o.json();throw new Error(c.error||"Failed to upload sitemap")}const{id:l}=await o.json();window.history.pushState({},"",`/results?id=${l}`),renderLayout(),route("/results")}catch(o){h(o.message)}finally{m()}}),t.addEventListener("click",()=>{fetch("/sitemap/clear-cache",{method:"POST"}).then(d=>d.text()).then(()=>{window.location.reload()}).catch(d=>console.error("Clear cache error:",d))})}function P({urls:r,treeContainer:e,filtersContainer:i,id:s}){const n=document.querySelector("header .export-buttons");if(!n)return;const t=n.querySelector("#backBtn"),d=n.querySelector("#exportHtmlBtn"),a=n.querySelector("#exportJsonBtn"),o=n.querySelector("#exportCsvBtn");!t||!d||!a||!o||(t.disabled=!1,d.disabled=!1,a.disabled=!1,o.disabled=!1,t.addEventListener("click",()=>{window.location.href="/"}),d.addEventListener("click",()=>{const l=e.innerHTML,c=new Blob([`<html><body>${l}</body></html>`],{type:"text/html"}),u=document.createElement("a");u.href=URL.createObjectURL(c),u.download="sitemap.html",u.click()}),a.addEventListener("click",()=>{const l=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),c=document.createElement("a");c.href=URL.createObjectURL(l),c.download="sitemap.json",c.click()}),o.addEventListener("click",()=>{const c=[["URL","Last Modified","Change Frequency","Priority"].join(",")];r.forEach(({loc:S,lastmod:B,changefreq:C,priority:U})=>{c.push(`"${S}","${B}","${C}","${U}"`)});const u=new Blob([c.join(`
`)],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(u),p.download="sitemap.csv",p.click()}))}class R{constructor(e){this.container=e,this.isExpanded=!0}render(e,i={},s="url"){if(showLoading(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const n=e.filter(({priority:a,lastmod:o})=>{const l=parseFloat(i.priority||0),c=i.lastmod?new Date(i.lastmod):null;return(a==="N/A"||parseFloat(a)>=l)&&(!c||o!=="N/A"&&new Date(o)>=c)}),t=T(n),d=document.createElement("ul");Object.keys(t).sort((a,o)=>a.localeCompare(o)).forEach(a=>{d.appendChild(E(a,t[a],s,this.isExpanded))}),this.container.appendChild(d),hideLoading()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(i=>{const s=i.nextElementSibling;s&&s.tagName==="UL"&&(s.classList.toggle("hidden",!this.isExpanded),i.classList.toggle("open",this.isExpanded),i.setAttribute("aria-expanded",this.isExpanded))})}}function T(r){const e={};return r.forEach(({loc:i,lastmod:s,changefreq:n,priority:t})=>{const a=`${new URL(i).origin}/`;e[a]||(e[a]={children:{},details:{}});let o=e[a];const l=i.replace(a,"").split("/").filter(Boolean);l.length===0?o.details={lastmod:s,changefreq:n,priority:t}:l.forEach((c,u)=>{const p=a+l.slice(0,u+1).join("/");o.children[p]||(o.children[p]={children:{},details:{}}),u===l.length-1&&(o.children[p].details={lastmod:s,changefreq:n,priority:t}),o=o.children[p]})}),e}function E(r,e,i,s){const n=document.createElement("li"),t=document.createElement("span");t.textContent=r;const d=Object.keys(e.children);if(d.length>0){t.className="toggle",t.setAttribute("aria-expanded",s?"true":"false"),s&&t.classList.add("open");const a=document.createElement("ul");d.sort((o,l)=>o.localeCompare(l)).forEach(o=>{a.appendChild(E(o,e.children[o],i,s))}),n.appendChild(t),n.appendChild(a)}else n.appendChild(t);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const a=document.createElement("span");a.className="details",a.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,n.appendChild(a)}return n}function x(){const r=document.createElement("filters"),i=window.location.pathname==="/results";return r.innerHTML=`
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
  `,i&&r.appendChild(x()),r}let L=null,f=[];function O(r){const e=document.createElement("section");e.innerHTML=`
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
  `,r.appendChild(e);const i=e.querySelector("#filters"),s=e.querySelector("#toggleFiltersBtn");s==null||s.addEventListener("click",()=>{const t=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",String(!t)),i==null||i.classList.toggle("hidden")});const n=new URLSearchParams(window.location.search).get("id");if(!n){h("Missing ID in URL");return}g(),fetch(`/results-data?id=${n}`).then(t=>{if(!t.ok)throw new Error("Failed to load results");return t.json()}).then(t=>{if(m(),console.log("Results data:",t),!Array.isArray(t.urls)||t.urls.length===0){h("No URLs found");return}f=t.urls,L=new R(treeContainer),L.render(f),P({urls:f,treeContainer,filtersContainer:i,id:n}),x(),e.querySelector("#stats").innerHTML=`<p>Total URLs: ${f.length}</p>`}).catch(t=>{m(),h(`Error loading data: ${t.message}`)})}document.getElementById("app");const w=document.querySelector("header"),b=document.getElementById("view");function y(){w.innerHTML="",w.appendChild(F())}function v(r){switch(b.innerHTML="",r){case"/":k(b);break;case"/results":O(b);break;default:b.innerHTML="<h2>404 - Page not found</h2>"}}function $(r){const e=r.target.closest("a");if(e&&e.href.startsWith(window.location.origin)){r.preventDefault();const i=new URL(e.href).pathname;window.history.pushState({},"",i),y(),v(i)}}function j(){y(),v(window.location.pathname),document.body.addEventListener("click",$),window.addEventListener("popstate",()=>{y(),v(window.location.pathname)})}j();
