(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();function U(){const r=document.createElement("header"),i=window.location.pathname==="/results";return r.innerHTML=`
    <h1>Sitemap Explorer</h1>
    <div class="header-controls">
      <button id="themeToggleBtn" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
       <span class="version">v1.0</span>
    </div>
  `,i&&renderExportButtons({urls:[],treeContainer:null,filtersContainer:null,id:null}),r}function F(r){const e=document.createElement("section");e.innerHTML=`
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
  `,r.appendChild(e);const i=e.querySelector("#sitemapUrlForm"),o=e.querySelector("#sitemapUrlInput"),n=e.querySelector("#sitemapUploadForm"),t=e.querySelector("#clearCacheBtn");i==null||i.addEventListener("submit",a=>{a.preventDefault(),(o==null?void 0:o.value.trim())&&(i.action="/sitemap/url",i.submit())}),n==null||n.addEventListener("submit",a=>{a.preventDefault(),n.action="/sitemap/upload",n.submit()}),t==null||t.addEventListener("click",()=>{fetch("/sitemap/clear-cache",{method:"POST"}).then(a=>a.text()).then(()=>{window.location.reload()}).catch(a=>console.error("Clear cache error:",a))})}function P({urls:r,treeContainer:e,filtersContainer:i,id:o}){const n=document.querySelector(".export-buttons");if(!n)return;const t=n.querySelector("#backBtn"),a=n.querySelector("#exportHtmlBtn"),s=n.querySelector("#exportJsonBtn"),l=n.querySelector("#exportCsvBtn");!t||!a||!s||!l||(t.disabled=!1,a.disabled=!1,s.disabled=!1,l.disabled=!1,t.addEventListener("click",()=>{window.location.href="/"}),a.addEventListener("click",()=>{const d=e.innerHTML,c=new Blob([`<html><body>${d}</body></html>`],{type:"text/html"}),u=document.createElement("a");u.href=URL.createObjectURL(c),u.download="sitemap.html",u.click()}),s.addEventListener("click",()=>{const d=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),c=document.createElement("a");c.href=URL.createObjectURL(d),c.download="sitemap.json",c.click()}),l.addEventListener("click",()=>{const c=[["URL","Last Modified","Change Frequency","Priority"].join(",")];r.forEach(({loc:x,lastmod:S,changefreq:B,priority:C})=>{c.push(`"${x}","${S}","${B}","${C}"`)});const u=new Blob([c.join(`
`)],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(u),p.download="sitemap.csv",p.click()}))}class R{constructor(e){this.container=e,this.isExpanded=!0}render(e,i={},o="url"){if(showLoading(50),this.container.innerHTML="",!e||e.length===0){this.container.textContent="No URLs found in sitemap.",hideLoading();return}const n=e.filter(({priority:s,lastmod:l})=>{const d=parseFloat(i.priority||0),c=i.lastmod?new Date(i.lastmod):null;return(s==="N/A"||parseFloat(s)>=d)&&(!c||l!=="N/A"&&new Date(l)>=c)}),t=k(n),a=document.createElement("ul");Object.keys(t).sort((s,l)=>s.localeCompare(l)).forEach(s=>{a.appendChild(E(s,t[s],o,this.isExpanded))}),this.container.appendChild(a),hideLoading()}toggleExpansion(){const e=this.container.querySelectorAll(".toggle");this.isExpanded=!this.isExpanded,e.forEach(i=>{const o=i.nextElementSibling;o&&o.tagName==="UL"&&(o.classList.toggle("hidden",!this.isExpanded),i.classList.toggle("open",this.isExpanded),i.setAttribute("aria-expanded",this.isExpanded))})}}function k(r){const e={};return r.forEach(({loc:i,lastmod:o,changefreq:n,priority:t})=>{const s=`${new URL(i).origin}/`;e[s]||(e[s]={children:{},details:{}});let l=e[s];const d=i.replace(s,"").split("/").filter(Boolean);d.length===0?l.details={lastmod:o,changefreq:n,priority:t}:d.forEach((c,u)=>{const p=s+d.slice(0,u+1).join("/");l.children[p]||(l.children[p]={children:{},details:{}}),u===d.length-1&&(l.children[p].details={lastmod:o,changefreq:n,priority:t}),l=l.children[p]})}),e}function E(r,e,i,o){const n=document.createElement("li"),t=document.createElement("span");t.textContent=r;const a=Object.keys(e.children);if(a.length>0){t.className="toggle",t.setAttribute("aria-expanded",o?"true":"false"),o&&t.classList.add("open");const s=document.createElement("ul");a.sort((l,d)=>l.localeCompare(d)).forEach(l=>{s.appendChild(E(l,e.children[l],i,o))}),n.appendChild(t),n.appendChild(s)}else n.appendChild(t);if(e.details.lastmod&&e.details.lastmod!=="N/A"){const s=document.createElement("span");s.className="details",s.textContent=` (Priority: ${e.details.priority}, Last Modified: ${e.details.lastmod}, ${e.details.changefreq})`,n.appendChild(s)}return n}function w(){const r=document.createElement("filters"),i=window.location.pathname==="/results";return r.innerHTML=`
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
  `,i&&r.appendChild(w()),r}function T(r=0){var i,o;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=r,(i=document.getElementById("error"))==null||i.classList.add("hidden"),(o=document.getElementById("feedback"))==null||o.classList.add("hidden"))}function g(){const r=document.getElementById("loading");r&&r.classList.add("hidden")}function f(r){var i;g();const e=document.getElementById("error");e&&(e.textContent=r,e.classList.remove("hidden"),(i=document.getElementById("feedback"))==null||i.classList.add("hidden"))}let v=null,h=[];function q(r){const e=document.createElement("section");e.innerHTML=`
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
  `,r.appendChild(e);const i=e.querySelector("#filters"),o=e.querySelector("#toggleFiltersBtn");o==null||o.addEventListener("click",()=>{const t=o.getAttribute("aria-expanded")==="true";o.setAttribute("aria-expanded",String(!t)),i==null||i.classList.toggle("hidden")});const n=new URLSearchParams(window.location.search).get("id");if(!n){f("Missing ID in URL");return}T(),fetch(`/results-data?id=${n}`).then(t=>{if(!t.ok)throw new Error("Failed to load results data.");return t.json()}).then(t=>{if(g(),!Array.isArray(t.urls)||t.urls.length===0){f("No results found.");return}h=t.urls;const a=e.querySelector("#treeView");v=new R(a),v.render(h),P({urls:h,treeContainer:a,filtersContainer:i,id:n}),w(),e.querySelector("#stats").innerHTML=`<p>Total URLs: ${h.length}</p>`}).catch(t=>{g(),f(`Error loading data: ${t.message}`)})}document.getElementById("app");const L=document.querySelector("header"),m=document.getElementById("view");function b(){L.innerHTML="",L.appendChild(U())}function y(r){switch(m.innerHTML="",r){case"/":F(m);break;case"/results":q(m);break;default:m.innerHTML="<h2>404 - Page not found</h2>"}}function M(r){const e=r.target.closest("a");if(e&&e.href.startsWith(window.location.origin)){r.preventDefault();const i=new URL(e.href).pathname;window.history.pushState({},"",i),b(),y(i)}}function O(){b(),y(window.location.pathname),document.body.addEventListener("click",M),window.addEventListener("popstate",()=>{b(),y(window.location.pathname)})}O();
