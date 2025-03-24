var zi=Object.defineProperty;var Oi=(t,e,n)=>e in t?zi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var zt=(t,e,n)=>Oi(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function Y(t=0){var n,r;const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),document.getElementById("loadProgress").value=t,(n=document.getElementById("error"))==null||n.classList.add("hidden"),(r=document.getElementById("feedback"))==null||r.classList.add("hidden"))}function nt(){const t=document.getElementById("loading");t&&t.classList.add("hidden")}function de(t){var n;nt();const e=document.getElementById("feedback");e&&(e.textContent=t,e.classList.remove("hidden"),(n=document.getElementById("error"))==null||n.classList.add("hidden"))}function pt(t){var n;nt();const e=document.getElementById("error");e&&(e.textContent=t,e.classList.remove("hidden"),(n=document.getElementById("feedback"))==null||n.classList.add("hidden"))}/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Ii(t,e,n){return(e=$i(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function On(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?On(Object(n),!0).forEach(function(r){Ii(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):On(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Fi(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function $i(t){var e=Fi(t,"string");return typeof e=="symbol"?e:e+""}const In=()=>{};let gn={},Ar={},Lr=null,Cr={mark:In,measure:In};try{typeof window<"u"&&(gn=window),typeof document<"u"&&(Ar=document),typeof MutationObserver<"u"&&(Lr=MutationObserver),typeof performance<"u"&&(Cr=performance)}catch{}const{userAgent:Fn=""}=gn.navigator||{},ut=gn,M=Ar,$n=Lr,te=Cr;ut.document;const st=!!M.documentElement&&!!M.head&&typeof M.addEventListener=="function"&&typeof M.createElement=="function",Tr=~Fn.indexOf("MSIE")||~Fn.indexOf("Trident/");var Ri=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Di=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Nr={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Bi={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Mr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],F="classic",Ee="duotone",Ui="sharp",Hi="sharp-duotone",Pr=[F,Ee,Ui,Hi],Vi={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},qi={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Yi=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),Xi={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},Wi=["fak","fa-kit","fakd","fa-kit-duotone"],Rn={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ji=["kit"],Gi={kit:{"fa-kit":"fak"}},Ki=["fak","fakd"],Ji={kit:{fak:"fa-kit"}},Dn={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},ee={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Zi=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],Qi=["fak","fa-kit","fakd","fa-kit-duotone"],ta={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},ea={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},na={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Ve={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},ra=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],qe=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...Zi,...ra],ia=["solid","regular","light","thin","duotone","brands"],zr=[1,2,3,4,5,6,7,8,9,10],aa=zr.concat([11,12,13,14,15,16,17,18,19,20]),sa=[...Object.keys(na),...ia,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",ee.GROUP,ee.SWAP_OPACITY,ee.PRIMARY,ee.SECONDARY].concat(zr.map(t=>"".concat(t,"x"))).concat(aa.map(t=>"w-".concat(t))),oa={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const rt="___FONT_AWESOME___",Ye=16,Or="fa",Ir="svg-inline--fa",xt="data-fa-i2svg",Xe="data-fa-pseudo-element",la="data-fa-pseudo-element-pending",yn="data-prefix",vn="data-icon",Bn="fontawesome-i2svg",ca="async",ua=["HTML","HEAD","STYLE","SCRIPT"],Fr=(()=>{try{return!0}catch{return!1}})();function jt(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[F]}})}const $r=p({},Nr);$r[F]=p(p(p(p({},{"fa-duotone":"duotone"}),Nr[F]),Rn.kit),Rn["kit-duotone"]);const fa=jt($r),We=p({},Xi);We[F]=p(p(p(p({},{duotone:"fad"}),We[F]),Dn.kit),Dn["kit-duotone"]);const Un=jt(We),je=p({},Ve);je[F]=p(p({},je[F]),Ji.kit);const xn=jt(je),Ge=p({},ea);Ge[F]=p(p({},Ge[F]),Gi.kit);jt(Ge);const ha=Ri,Rr="fa-layers-text",da=Di,ma=p({},Vi);jt(ma);const pa=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Pe=Bi,ga=[...ji,...sa],Dt=ut.FontAwesomeConfig||{};function ya(t){var e=M.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function va(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}M&&typeof M.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,r]=e;const i=va(ya(n));i!=null&&(Dt[r]=i)});const Dr={styleDefault:"solid",familyDefault:F,cssPrefix:Or,replacementClass:Ir,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Dt.familyPrefix&&(Dt.cssPrefix=Dt.familyPrefix);const Tt=p(p({},Dr),Dt);Tt.autoReplaceSvg||(Tt.observeMutations=!1);const x={};Object.keys(Dr).forEach(t=>{Object.defineProperty(x,t,{enumerable:!0,set:function(e){Tt[t]=e,Bt.forEach(n=>n(x))},get:function(){return Tt[t]}})});Object.defineProperty(x,"familyPrefix",{enumerable:!0,set:function(t){Tt.cssPrefix=t,Bt.forEach(e=>e(x))},get:function(){return Tt.cssPrefix}});ut.FontAwesomeConfig=x;const Bt=[];function xa(t){return Bt.push(t),()=>{Bt.splice(Bt.indexOf(t),1)}}const ot=Ye,j={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function wa(t){if(!t||!st)return;const e=M.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=M.head.childNodes;let r=null;for(let i=n.length-1;i>-1;i--){const a=n[i],s=(a.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=a)}return M.head.insertBefore(e,r),t}const ba="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ut(){let t=12,e="";for(;t-- >0;)e+=ba[Math.random()*62|0];return e}function Pt(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function wn(t){return t.classList?Pt(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Br(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _a(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Br(t[n]),'" '),"").trim()}function ke(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function bn(t){return t.size!==j.size||t.x!==j.x||t.y!==j.y||t.rotate!==j.rotate||t.flipX||t.flipY}function Ea(t){let{transform:e,containerWidth:n,iconWidth:r}=t;const i={transform:"translate(".concat(n/2," 256)")},a="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),u={transform:"".concat(a," ").concat(s," ").concat(o)},l={transform:"translate(".concat(r/2*-1," -256)")};return{outer:i,inner:u,path:l}}function ka(t){let{transform:e,width:n=Ye,height:r=Ye,startCentered:i=!1}=t,a="";return i&&Tr?a+="translate(".concat(e.x/ot-n/2,"em, ").concat(e.y/ot-r/2,"em) "):i?a+="translate(calc(-50% + ".concat(e.x/ot,"em), calc(-50% + ").concat(e.y/ot,"em)) "):a+="translate(".concat(e.x/ot,"em, ").concat(e.y/ot,"em) "),a+="scale(".concat(e.size/ot*(e.flipX?-1:1),", ").concat(e.size/ot*(e.flipY?-1:1),") "),a+="rotate(".concat(e.rotate,"deg) "),a}var Sa=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Ur(){const t=Or,e=Ir,n=x.cssPrefix,r=x.replacementClass;let i=Sa;if(n!==t||r!==e){const a=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");i=i.replace(a,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return i}let Hn=!1;function ze(){x.autoAddCss&&!Hn&&(wa(Ur()),Hn=!0)}var Aa={mixout(){return{dom:{css:Ur,insertCss:ze}}},hooks(){return{beforeDOMElementCreation(){ze()},beforeI2svg(){ze()}}}};const it=ut||{};it[rt]||(it[rt]={});it[rt].styles||(it[rt].styles={});it[rt].hooks||(it[rt].hooks={});it[rt].shims||(it[rt].shims=[]);var G=it[rt];const Hr=[],Vr=function(){M.removeEventListener("DOMContentLoaded",Vr),me=1,Hr.map(t=>t())};let me=!1;st&&(me=(M.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(M.readyState),me||M.addEventListener("DOMContentLoaded",Vr));function La(t){st&&(me?setTimeout(t,0):Hr.push(t))}function Gt(t){const{tag:e,attributes:n={},children:r=[]}=t;return typeof t=="string"?Br(t):"<".concat(e," ").concat(_a(n),">").concat(r.map(Gt).join(""),"</").concat(e,">")}function Vn(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Oe=function(e,n,r,i){var a=Object.keys(e),s=a.length,o=n,u,l,c;for(r===void 0?(u=1,c=e[a[0]]):(u=0,c=r);u<s;u++)l=a[u],c=o(c,e[l],l,e);return c};function Ca(t){const e=[];let n=0;const r=t.length;for(;n<r;){const i=t.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){const a=t.charCodeAt(n++);(a&64512)==56320?e.push(((i&1023)<<10)+(a&1023)+65536):(e.push(i),n--)}else e.push(i)}return e}function Ke(t){const e=Ca(t);return e.length===1?e[0].toString(16):null}function Ta(t,e){const n=t.length;let r=t.charCodeAt(e),i;return r>=55296&&r<=56319&&n>e+1&&(i=t.charCodeAt(e+1),i>=56320&&i<=57343)?(r-55296)*1024+i-56320+65536:r}function qn(t){return Object.keys(t).reduce((e,n)=>{const r=t[n];return!!r.icon?e[r.iconName]=r.icon:e[n]=r,e},{})}function Je(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:r=!1}=n,i=qn(e);typeof G.hooks.addPack=="function"&&!r?G.hooks.addPack(t,qn(e)):G.styles[t]=p(p({},G.styles[t]||{}),i),t==="fas"&&Je("fa",e)}const{styles:Ht,shims:Na}=G,qr=Object.keys(xn),Ma=qr.reduce((t,e)=>(t[e]=Object.keys(xn[e]),t),{});let _n=null,Yr={},Xr={},Wr={},jr={},Gr={};function Pa(t){return~ga.indexOf(t)}function za(t,e){const n=e.split("-"),r=n[0],i=n.slice(1).join("-");return r===t&&i!==""&&!Pa(i)?i:null}const Kr=()=>{const t=r=>Oe(Ht,(i,a,s)=>(i[s]=Oe(a,r,{}),i),{});Yr=t((r,i,a)=>(i[3]&&(r[i[3]]=a),i[2]&&i[2].filter(o=>typeof o=="number").forEach(o=>{r[o.toString(16)]=a}),r)),Xr=t((r,i,a)=>(r[a]=a,i[2]&&i[2].filter(o=>typeof o=="string").forEach(o=>{r[o]=a}),r)),Gr=t((r,i,a)=>{const s=i[2];return r[a]=a,s.forEach(o=>{r[o]=a}),r});const e="far"in Ht||x.autoFetchSvg,n=Oe(Na,(r,i)=>{const a=i[0];let s=i[1];const o=i[2];return s==="far"&&!e&&(s="fas"),typeof a=="string"&&(r.names[a]={prefix:s,iconName:o}),typeof a=="number"&&(r.unicodes[a.toString(16)]={prefix:s,iconName:o}),r},{names:{},unicodes:{}});Wr=n.names,jr=n.unicodes,_n=Se(x.styleDefault,{family:x.familyDefault})};xa(t=>{_n=Se(t.styleDefault,{family:x.familyDefault})});Kr();function En(t,e){return(Yr[t]||{})[e]}function Oa(t,e){return(Xr[t]||{})[e]}function gt(t,e){return(Gr[t]||{})[e]}function Jr(t){return Wr[t]||{prefix:null,iconName:null}}function Ia(t){const e=jr[t],n=En("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function ft(){return _n}const Zr=()=>({prefix:null,iconName:null,rest:[]});function Fa(t){let e=F;const n=qr.reduce((r,i)=>(r[i]="".concat(x.cssPrefix,"-").concat(i),r),{});return Pr.forEach(r=>{(t.includes(n[r])||t.some(i=>Ma[r].includes(i)))&&(e=r)}),e}function Se(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=F}=e,r=fa[n][t];if(n===Ee&&!t)return"fad";const i=Un[n][t]||Un[n][r],a=t in G.styles?t:null;return i||a||null}function $a(t){let e=[],n=null;return t.forEach(r=>{const i=za(x.cssPrefix,r);i?n=i:r&&e.push(r)}),{iconName:n,rest:e}}function Yn(t){return t.sort().filter((e,n,r)=>r.indexOf(e)===n)}function Ae(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let r=null;const i=qe.concat(Qi),a=Yn(t.filter(f=>i.includes(f))),s=Yn(t.filter(f=>!qe.includes(f))),o=a.filter(f=>(r=f,!Mr.includes(f))),[u=null]=o,l=Fa(a),c=p(p({},$a(s)),{},{prefix:Se(u,{family:l})});return p(p(p({},c),Ua({values:t,family:l,styles:Ht,config:x,canonical:c,givenPrefix:r})),Ra(n,r,c))}function Ra(t,e,n){let{prefix:r,iconName:i}=n;if(t||!r||!i)return{prefix:r,iconName:i};const a=e==="fa"?Jr(i):{},s=gt(r,i);return i=a.iconName||s||i,r=a.prefix||r,r==="far"&&!Ht.far&&Ht.fas&&!x.autoFetchSvg&&(r="fas"),{prefix:r,iconName:i}}const Da=Pr.filter(t=>t!==F||t!==Ee),Ba=Object.keys(Ve).filter(t=>t!==F).map(t=>Object.keys(Ve[t])).flat();function Ua(t){const{values:e,family:n,canonical:r,givenPrefix:i="",styles:a={},config:s={}}=t,o=n===Ee,u=e.includes("fa-duotone")||e.includes("fad"),l=s.familyDefault==="duotone",c=r.prefix==="fad"||r.prefix==="fa-duotone";if(!o&&(u||l||c)&&(r.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Da.includes(n)&&(Object.keys(a).find(h=>Ba.includes(h))||s.autoFetchSvg)){const h=Yi.get(n).defaultShortPrefixId;r.prefix=h,r.iconName=gt(r.prefix,r.iconName)||r.iconName}return(r.prefix==="fa"||i==="fa")&&(r.prefix=ft()||"fas"),r}class Ha{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];const i=n.reduce(this._pullDefinitions,{});Object.keys(i).forEach(a=>{this.definitions[a]=p(p({},this.definitions[a]||{}),i[a]),Je(a,i[a]);const s=xn[F][a];s&&Je(s,i[a]),Kr()})}reset(){this.definitions={}}_pullDefinitions(e,n){const r=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(r).map(i=>{const{prefix:a,iconName:s,icon:o}=r[i],u=o[2];e[a]||(e[a]={}),u.length>0&&u.forEach(l=>{typeof l=="string"&&(e[a][l]=o)}),e[a][s]=o}),e}}let Xn=[],Et={};const At={},Va=Object.keys(At);function qa(t,e){let{mixoutsTo:n}=e;return Xn=t,Et={},Object.keys(At).forEach(r=>{Va.indexOf(r)===-1&&delete At[r]}),Xn.forEach(r=>{const i=r.mixout?r.mixout():{};if(Object.keys(i).forEach(a=>{typeof i[a]=="function"&&(n[a]=i[a]),typeof i[a]=="object"&&Object.keys(i[a]).forEach(s=>{n[a]||(n[a]={}),n[a][s]=i[a][s]})}),r.hooks){const a=r.hooks();Object.keys(a).forEach(s=>{Et[s]||(Et[s]=[]),Et[s].push(a[s])})}r.provides&&r.provides(At)}),n}function Ze(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return(Et[t]||[]).forEach(s=>{e=s.apply(null,[e,...r])}),e}function wt(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];(Et[t]||[]).forEach(a=>{a.apply(null,n)})}function ht(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return At[t]?At[t].apply(null,e):void 0}function Qe(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||ft();if(e)return e=gt(n,e)||e,Vn(Qr.definitions,n,e)||Vn(G.styles,n,e)}const Qr=new Ha,Ya=()=>{x.autoReplaceSvg=!1,x.observeMutations=!1,wt("noAuto")},Xa={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return st?(wt("beforeI2svg",t),ht("pseudoElements2svg",t),ht("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;x.autoReplaceSvg===!1&&(x.autoReplaceSvg=!0),x.observeMutations=!0,La(()=>{ja({autoReplaceSvgRoot:e}),wt("watch",t)})}},Wa={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:gt(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=Se(t[0]);return{prefix:n,iconName:gt(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(x.cssPrefix,"-"))>-1||t.match(ha))){const e=Ae(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||ft(),iconName:gt(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=ft();return{prefix:e,iconName:gt(e,t)||t}}}},B={noAuto:Ya,config:x,dom:Xa,parse:Wa,library:Qr,findIconDefinition:Qe,toHtml:Gt},ja=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=M}=t;(Object.keys(G.styles).length>0||x.autoFetchSvg)&&st&&x.autoReplaceSvg&&B.dom.i2svg({node:e})};function Le(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>Gt(n))}}),Object.defineProperty(t,"node",{get:function(){if(!st)return;const n=M.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Ga(t){let{children:e,main:n,mask:r,attributes:i,styles:a,transform:s}=t;if(bn(s)&&n.found&&!r.found){const{width:o,height:u}=n,l={x:o/u/2,y:.5};i.style=ke(p(p({},a),{},{"transform-origin":"".concat(l.x+s.x/16,"em ").concat(l.y+s.y/16,"em")}))}return[{tag:"svg",attributes:i,children:e}]}function Ka(t){let{prefix:e,iconName:n,children:r,attributes:i,symbol:a}=t;const s=a===!0?"".concat(e,"-").concat(x.cssPrefix,"-").concat(n):a;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:p(p({},i),{},{id:s}),children:r}]}]}function kn(t){const{icons:{main:e,mask:n},prefix:r,iconName:i,transform:a,symbol:s,title:o,maskId:u,titleId:l,extra:c,watchable:f=!1}=t,{width:h,height:m}=n.found?n:e,v=Ki.includes(r),E=[x.replacementClass,i?"".concat(x.cssPrefix,"-").concat(i):""].filter(P=>c.classes.indexOf(P)===-1).filter(P=>P!==""||!!P).concat(c.classes).join(" ");let S={children:[],attributes:p(p({},c.attributes),{},{"data-prefix":r,"data-icon":i,class:E,role:c.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(h," ").concat(m)})};const y=v&&!~c.classes.indexOf("fa-fw")?{width:"".concat(h/m*16*.0625,"em")}:{};f&&(S.attributes[xt]=""),o&&(S.children.push({tag:"title",attributes:{id:S.attributes["aria-labelledby"]||"title-".concat(l||Ut())},children:[o]}),delete S.attributes.title);const _=p(p({},S),{},{prefix:r,iconName:i,main:e,mask:n,maskId:u,transform:a,symbol:s,styles:p(p({},y),c.styles)}),{children:A,attributes:T}=n.found&&e.found?ht("generateAbstractMask",_)||{children:[],attributes:{}}:ht("generateAbstractIcon",_)||{children:[],attributes:{}};return _.children=A,_.attributes=T,s?Ka(_):Ga(_)}function Wn(t){const{content:e,width:n,height:r,transform:i,title:a,extra:s,watchable:o=!1}=t,u=p(p(p({},s.attributes),a?{title:a}:{}),{},{class:s.classes.join(" ")});o&&(u[xt]="");const l=p({},s.styles);bn(i)&&(l.transform=ka({transform:i,startCentered:!0,width:n,height:r}),l["-webkit-transform"]=l.transform);const c=ke(l);c.length>0&&(u.style=c);const f=[];return f.push({tag:"span",attributes:u,children:[e]}),a&&f.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),f}function Ja(t){const{content:e,title:n,extra:r}=t,i=p(p(p({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),a=ke(r.styles);a.length>0&&(i.style=a);const s=[];return s.push({tag:"span",attributes:i,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:Ie}=G;function tn(t){const e=t[0],n=t[1],[r]=t.slice(4);let i=null;return Array.isArray(r)?i={tag:"g",attributes:{class:"".concat(x.cssPrefix,"-").concat(Pe.GROUP)},children:[{tag:"path",attributes:{class:"".concat(x.cssPrefix,"-").concat(Pe.SECONDARY),fill:"currentColor",d:r[0]}},{tag:"path",attributes:{class:"".concat(x.cssPrefix,"-").concat(Pe.PRIMARY),fill:"currentColor",d:r[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:r}},{found:!0,width:e,height:n,icon:i}}const Za={found:!1,width:512,height:512};function Qa(t,e){!Fr&&!x.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function en(t,e){let n=e;return e==="fa"&&x.styleDefault!==null&&(e=ft()),new Promise((r,i)=>{if(n==="fa"){const a=Jr(t)||{};t=a.iconName||t,e=a.prefix||e}if(t&&e&&Ie[e]&&Ie[e][t]){const a=Ie[e][t];return r(tn(a))}Qa(t,e),r(p(p({},Za),{},{icon:x.showMissingIcons&&t?ht("missingIconAbstract")||{}:{}}))})}const jn=()=>{},nn=x.measurePerformance&&te&&te.mark&&te.measure?te:{mark:jn,measure:jn},Ft='FA "6.7.2"',ts=t=>(nn.mark("".concat(Ft," ").concat(t," begins")),()=>ti(t)),ti=t=>{nn.mark("".concat(Ft," ").concat(t," ends")),nn.measure("".concat(Ft," ").concat(t),"".concat(Ft," ").concat(t," begins"),"".concat(Ft," ").concat(t," ends"))};var Sn={begin:ts,end:ti};const se=()=>{};function Gn(t){return typeof(t.getAttribute?t.getAttribute(xt):null)=="string"}function es(t){const e=t.getAttribute?t.getAttribute(yn):null,n=t.getAttribute?t.getAttribute(vn):null;return e&&n}function ns(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(x.replacementClass)}function rs(){return x.autoReplaceSvg===!0?oe.replace:oe[x.autoReplaceSvg]||oe.replace}function is(t){return M.createElementNS("http://www.w3.org/2000/svg",t)}function as(t){return M.createElement(t)}function ei(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?is:as}=e;if(typeof t=="string")return M.createTextNode(t);const r=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(a){r.setAttribute(a,t.attributes[a])}),(t.children||[]).forEach(function(a){r.appendChild(ei(a,{ceFn:n}))}),r}function ss(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const oe={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(ei(n),e)}),e.getAttribute(xt)===null&&x.keepOriginalSource){let n=M.createComment(ss(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~wn(e).indexOf(x.replacementClass))return oe.replace(t);const r=new RegExp("".concat(x.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const a=n[0].attributes.class.split(" ").reduce((s,o)=>(o===x.replacementClass||o.match(r)?s.toSvg.push(o):s.toNode.push(o),s),{toNode:[],toSvg:[]});n[0].attributes.class=a.toSvg.join(" "),a.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",a.toNode.join(" "))}const i=n.map(a=>Gt(a)).join(`
`);e.setAttribute(xt,""),e.innerHTML=i}};function Kn(t){t()}function ni(t,e){const n=typeof e=="function"?e:se;if(t.length===0)n();else{let r=Kn;x.mutateApproach===ca&&(r=ut.requestAnimationFrame||Kn),r(()=>{const i=rs(),a=Sn.begin("mutate");t.map(i),a(),n()})}}let An=!1;function ri(){An=!0}function rn(){An=!1}let pe=null;function Jn(t){if(!$n||!x.observeMutations)return;const{treeCallback:e=se,nodeCallback:n=se,pseudoElementsCallback:r=se,observeMutationsRoot:i=M}=t;pe=new $n(a=>{if(An)return;const s=ft();Pt(a).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!Gn(o.addedNodes[0])&&(x.searchPseudoElements&&r(o.target),e(o.target)),o.type==="attributes"&&o.target.parentNode&&x.searchPseudoElements&&r(o.target.parentNode),o.type==="attributes"&&Gn(o.target)&&~pa.indexOf(o.attributeName))if(o.attributeName==="class"&&es(o.target)){const{prefix:u,iconName:l}=Ae(wn(o.target));o.target.setAttribute(yn,u||s),l&&o.target.setAttribute(vn,l)}else ns(o.target)&&n(o.target)})}),st&&pe.observe(i,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function os(){pe&&pe.disconnect()}function ls(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((r,i)=>{const a=i.split(":"),s=a[0],o=a.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function cs(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"";let i=Ae(wn(t));return i.prefix||(i.prefix=ft()),e&&n&&(i.prefix=e,i.iconName=n),i.iconName&&i.prefix||(i.prefix&&r.length>0&&(i.iconName=Oa(i.prefix,t.innerText)||En(i.prefix,Ke(t.innerText))),!i.iconName&&x.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=t.firstChild.data)),i}function us(t){const e=Pt(t.attributes).reduce((i,a)=>(i.name!=="class"&&i.name!=="style"&&(i[a.name]=a.value),i),{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return x.autoA11y&&(n?e["aria-labelledby"]="".concat(x.replacementClass,"-title-").concat(r||Ut()):(e["aria-hidden"]="true",e.focusable="false")),e}function fs(){return{iconName:null,title:null,titleId:null,prefix:null,transform:j,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Zn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:r,rest:i}=cs(t),a=us(t),s=Ze("parseNodeAttributes",{},t);let o=e.styleParser?ls(t):[];return p({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:j,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:o,attributes:a}},s)}const{styles:hs}=G;function ii(t){const e=x.autoReplaceSvg==="nest"?Zn(t,{styleParser:!1}):Zn(t);return~e.extra.classes.indexOf(Rr)?ht("generateLayersText",t,e):ht("generateSvgReplacementMutation",t,e)}function ds(){return[...Wi,...qe]}function Qn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!st)return Promise.resolve();const n=M.documentElement.classList,r=c=>n.add("".concat(Bn,"-").concat(c)),i=c=>n.remove("".concat(Bn,"-").concat(c)),a=x.autoFetchSvg?ds():Mr.concat(Object.keys(hs));a.includes("fa")||a.push("fa");const s=[".".concat(Rr,":not([").concat(xt,"])")].concat(a.map(c=>".".concat(c,":not([").concat(xt,"])"))).join(", ");if(s.length===0)return Promise.resolve();let o=[];try{o=Pt(t.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),i("complete");else return Promise.resolve();const u=Sn.begin("onTree"),l=o.reduce((c,f)=>{try{const h=ii(f);h&&c.push(h)}catch(h){Fr||h.name==="MissingIcon"&&console.error(h)}return c},[]);return new Promise((c,f)=>{Promise.all(l).then(h=>{ni(h,()=>{r("active"),r("complete"),i("pending"),typeof e=="function"&&e(),u(),c()})}).catch(h=>{u(),f(h)})})}function ms(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ii(t).then(n=>{n&&ni([n],e)})}function ps(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=(e||{}).icon?e:Qe(e||{});let{mask:i}=n;return i&&(i=(i||{}).icon?i:Qe(i||{})),t(r,p(p({},n),{},{mask:i}))}}const gs=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=j,symbol:r=!1,mask:i=null,maskId:a=null,title:s=null,titleId:o=null,classes:u=[],attributes:l={},styles:c={}}=e;if(!t)return;const{prefix:f,iconName:h,icon:m}=t;return Le(p({type:"icon"},t),()=>(wt("beforeDOMElementCreation",{iconDefinition:t,params:e}),x.autoA11y&&(s?l["aria-labelledby"]="".concat(x.replacementClass,"-title-").concat(o||Ut()):(l["aria-hidden"]="true",l.focusable="false")),kn({icons:{main:tn(m),mask:i?tn(i.icon):{found:!1,width:null,height:null,icon:{}}},prefix:f,iconName:h,transform:p(p({},j),n),symbol:r,title:s,maskId:a,titleId:o,extra:{attributes:l,styles:c,classes:u}})))};var ys={mixout(){return{icon:ps(gs)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=Qn,t.nodeCallback=ms,t}}},provides(t){t.i2svg=function(e){const{node:n=M,callback:r=()=>{}}=e;return Qn(n,r)},t.generateSvgReplacementMutation=function(e,n){const{iconName:r,title:i,titleId:a,prefix:s,transform:o,symbol:u,mask:l,maskId:c,extra:f}=n;return new Promise((h,m)=>{Promise.all([en(r,s),l.iconName?en(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(v=>{let[E,S]=v;h([e,kn({icons:{main:E,mask:S},prefix:s,iconName:r,transform:o,symbol:u,maskId:c,title:i,titleId:a,extra:f,watchable:!0})])}).catch(m)})},t.generateAbstractIcon=function(e){let{children:n,attributes:r,main:i,transform:a,styles:s}=e;const o=ke(s);o.length>0&&(r.style=o);let u;return bn(a)&&(u=ht("generateAbstractTransformGrouping",{main:i,transform:a,containerWidth:i.width,iconWidth:i.width})),n.push(u||i.icon),{children:n,attributes:r}}}},vs={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return Le({type:"layer"},()=>{wt("beforeDOMElementCreation",{assembler:t,params:e});let r=[];return t(i=>{Array.isArray(i)?i.map(a=>{r=r.concat(a.abstract)}):r=r.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(x.cssPrefix,"-layers"),...n].join(" ")},children:r}]})}}}},xs={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:r=[],attributes:i={},styles:a={}}=e;return Le({type:"counter",content:t},()=>(wt("beforeDOMElementCreation",{content:t,params:e}),Ja({content:t.toString(),title:n,extra:{attributes:i,styles:a,classes:["".concat(x.cssPrefix,"-layers-counter"),...r]}})))}}}},ws={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=j,title:r=null,classes:i=[],attributes:a={},styles:s={}}=e;return Le({type:"text",content:t},()=>(wt("beforeDOMElementCreation",{content:t,params:e}),Wn({content:t,transform:p(p({},j),n),title:r,extra:{attributes:a,styles:s,classes:["".concat(x.cssPrefix,"-layers-text"),...i]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:r,transform:i,extra:a}=n;let s=null,o=null;if(Tr){const u=parseInt(getComputedStyle(e).fontSize,10),l=e.getBoundingClientRect();s=l.width/u,o=l.height/u}return x.autoA11y&&!r&&(a.attributes["aria-hidden"]="true"),Promise.resolve([e,Wn({content:e.innerHTML,width:s,height:o,transform:i,title:r,extra:a,watchable:!0})])}}};const bs=new RegExp('"',"ug"),tr=[1105920,1112319],er=p(p(p(p({},{FontAwesome:{normal:"fas",400:"fas"}}),qi),oa),ta),an=Object.keys(er).reduce((t,e)=>(t[e.toLowerCase()]=er[e],t),{}),_s=Object.keys(an).reduce((t,e)=>{const n=an[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function Es(t){const e=t.replace(bs,""),n=Ta(e,0),r=n>=tr[0]&&n<=tr[1],i=e.length===2?e[0]===e[1]:!1;return{value:Ke(i?e[0]:e),isSecondary:r||i}}function ks(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(e),i=isNaN(r)?"normal":r;return(an[n]||{})[i]||_s[n]}function nr(t,e){const n="".concat(la).concat(e.replace(":","-"));return new Promise((r,i)=>{if(t.getAttribute(n)!==null)return r();const s=Pt(t.children).filter(h=>h.getAttribute(Xe)===e)[0],o=ut.getComputedStyle(t,e),u=o.getPropertyValue("font-family"),l=u.match(da),c=o.getPropertyValue("font-weight"),f=o.getPropertyValue("content");if(s&&!l)return t.removeChild(s),r();if(l&&f!=="none"&&f!==""){const h=o.getPropertyValue("content");let m=ks(u,c);const{value:v,isSecondary:E}=Es(h),S=l[0].startsWith("FontAwesome");let y=En(m,v),_=y;if(S){const A=Ia(v);A.iconName&&A.prefix&&(y=A.iconName,m=A.prefix)}if(y&&!E&&(!s||s.getAttribute(yn)!==m||s.getAttribute(vn)!==_)){t.setAttribute(n,_),s&&t.removeChild(s);const A=fs(),{extra:T}=A;T.attributes[Xe]=e,en(y,m).then(P=>{const O=kn(p(p({},A),{},{icons:{main:P,mask:Zr()},prefix:m,iconName:_,extra:T,watchable:!0})),U=M.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(U,t.firstChild):t.appendChild(U),U.outerHTML=O.map(_t=>Gt(_t)).join(`
`),t.removeAttribute(n),r()}).catch(i)}else r()}else r()})}function Ss(t){return Promise.all([nr(t,"::before"),nr(t,"::after")])}function As(t){return t.parentNode!==document.head&&!~ua.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Xe)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function rr(t){if(st)return new Promise((e,n)=>{const r=Pt(t.querySelectorAll("*")).filter(As).map(Ss),i=Sn.begin("searchPseudoElements");ri(),Promise.all(r).then(()=>{i(),rn(),e()}).catch(()=>{i(),rn(),n()})})}var Ls={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=rr,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=M}=e;x.searchPseudoElements&&rr(n)}}};let ir=!1;var Cs={mixout(){return{dom:{unwatch(){ri(),ir=!0}}}},hooks(){return{bootstrap(){Jn(Ze("mutationObserverCallbacks",{}))},noAuto(){os()},watch(t){const{observeMutationsRoot:e}=t;ir?rn():Jn(Ze("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ar=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,r)=>{const i=r.toLowerCase().split("-"),a=i[0];let s=i.slice(1).join("-");if(a&&s==="h")return n.flipX=!0,n;if(a&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(a){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},e)};var Ts={mixout(){return{parse:{transform:t=>ar(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ar(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:r,containerWidth:i,iconWidth:a}=e;const s={transform:"translate(".concat(i/2," 256)")},o="translate(".concat(r.x*32,", ").concat(r.y*32,") "),u="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),l="rotate(".concat(r.rotate," 0 0)"),c={transform:"".concat(o," ").concat(u," ").concat(l)},f={transform:"translate(".concat(a/2*-1," -256)")},h={outer:s,inner:c,path:f};return{tag:"g",attributes:p({},h.outer),children:[{tag:"g",attributes:p({},h.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:p(p({},n.icon.attributes),h.path)}]}]}}}};const Fe={x:0,y:0,width:"100%",height:"100%"};function sr(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ns(t){return t.tag==="g"?t.children:[t]}var Ms={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),r=n?Ae(n.split(" ").map(i=>i.trim())):Zr();return r.prefix||(r.prefix=ft()),t.mask=r,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:r,main:i,mask:a,maskId:s,transform:o}=e;const{width:u,icon:l}=i,{width:c,icon:f}=a,h=Ea({transform:o,containerWidth:c,iconWidth:u}),m={tag:"rect",attributes:p(p({},Fe),{},{fill:"white"})},v=l.children?{children:l.children.map(sr)}:{},E={tag:"g",attributes:p({},h.inner),children:[sr(p({tag:l.tag,attributes:p(p({},l.attributes),h.path)},v))]},S={tag:"g",attributes:p({},h.outer),children:[E]},y="mask-".concat(s||Ut()),_="clip-".concat(s||Ut()),A={tag:"mask",attributes:p(p({},Fe),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[m,S]},T={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:Ns(f)},A]};return n.push(T,{tag:"rect",attributes:p({fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(y,")")},Fe)}),{children:n,attributes:r}}}},Ps={provides(t){let e=!1;ut.matchMedia&&(e=ut.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:p(p({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const a=p(p({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:p(p({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:p(p({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:p(p({},a),{},{values:"1;0;1;1;0;1;"})}),n.push(s),n.push({tag:"path",attributes:p(p({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:p(p({},a),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:p(p({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:p(p({},a),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},zs={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),r=n===null?!1:n===""?!0:n;return t.symbol=r,t}}}},Os=[Aa,ys,vs,xs,ws,Ls,Cs,Ts,Ms,Ps,zs];qa(Os,{mixoutsTo:B});B.noAuto;B.config;const Is=B.library,Fs=B.dom;B.parse;B.findIconDefinition;B.toHtml;B.icon;B.layer;B.text;B.counter;/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const $s={prefix:"fas",iconName:"file-csv",icon:[512,512,[],"f6dd","M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM200 352l16 0c22.1 0 40 17.9 40 40l0 8c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-8c0-4.4-3.6-8-8-8l-16 0c-4.4 0-8 3.6-8 8l0 80c0 4.4 3.6 8 8 8l16 0c4.4 0 8-3.6 8-8l0-8c0-8.8 7.2-16 16-16s16 7.2 16 16l0 8c0 22.1-17.9 40-40 40l-16 0c-22.1 0-40-17.9-40-40l0-80c0-22.1 17.9-40 40-40zm133.1 0l34.9 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-34.9 0c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1L304 512c-8.8 0-16-7.2-16-16s7.2-16 16-16l42.9 0c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16l0 31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66l0-31.6c0-8.8 7.2-16 16-16s16 7.2 16 16l0 31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6l0-31.6c0-8.8 7.2-16 16-16z"]},Rs={prefix:"fas",iconName:"file-code",icon:[384,512,[],"f1c9","M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"]},Ds={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},Bs={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]};Is.add(Rs,$s,Ds,Bs);function $e(t,e){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>t(...r),e)}}class Us{constructor(e,n={}){zt(this,"exportHTML",$e(async()=>{try{const e=`
        <!DOCTYPE html>
        <html><body><h1>Sitemap URLs</h1><ul>
        ${this.options.urls.map(n=>`<li><a href="${n.loc}">${n.loc}</a> (Last Modified: ${n.lastmod})</li>`).join("")}
        </ul></body></html>`;this.downloadFile(e,"sitemap.html","text/html")}catch{throw new Error("HTML export failed")}},300));zt(this,"exportCSV",$e(async()=>{try{const e=`URL,Last Modified,Change Frequency,Priority
`+this.options.urls.map(n=>`"${n.loc}","${n.lastmod}","${n.changefreq}","${n.priority}"`).join(`
`);this.downloadFile(e,"sitemap.csv","text/csv")}catch{throw new Error("CSV export failed")}},300));zt(this,"exportJSON",$e(async()=>{try{const e=JSON.stringify(this.options.urls,null,2);this.downloadFile(e,"sitemap.json","application/json")}catch{throw new Error("JSON export failed")}},300));this.container=e,this.options={urls:n.urls||[],path:n.path||window.location.pathname,...n},this.listeners=new Map,this.render(),this.setupEventListeners(),Fs.watch()}render(){const e=this.options.path==="/results";this.container.innerHTML=`
      <button id="exportHtmlBtn" ${!e||!this.options.urls.length?"disabled":""} aria-label="Export as HTML">
        <i class="fas fa-file-code"></i> Export HTML
      </button>
      <button id="exportCsvBtn" ${!e||!this.options.urls.length?"disabled":""} aria-label="Export as CSV">
        <i class="fas fa-file-csv"></i> Export CSV
      </button>
      <button id="exportJsonBtn" ${!e||!this.options.urls.length?"disabled":""} aria-label="Export as JSON">
        <i class="fas fa-file-code"></i> Export JSON
      </button>
      <button id="clearCacheBtn" aria-label="Clear cache">
        <i class="fas fa-trash"></i> Clear Cache
      </button>
      <button id="themeToggleBtn" aria-label="Toggle dark mode">
        <i class="fas fa-moon"></i> Toggle Theme
      </button>
    `}setupEventListeners(){this.cleanupListeners(),[["#exportHtmlBtn",this.exportHTML.bind(this),"Exporting HTML..."],["#exportCsvBtn",this.exportCSV.bind(this),"Exporting CSV..."],["#exportJsonBtn",this.exportJSON.bind(this),"Exporting JSON..."]].forEach(([i,a,s])=>{const o=this.container.querySelector(i);if(o){const u=async()=>{o.disabled=!0,o.textContent=s;try{await a()}catch(l){console.error(`Export failed (${i}):`,l),alert(`Failed to export: ${l.message}`)}o.disabled=!this.options.urls.length||this.options.path!=="/results",o.innerHTML=o.id==="exportHtmlBtn"?'<i class="fas fa-file-code"></i> Export HTML':o.id==="exportCsvBtn"?'<i class="fas fa-file-csv"></i> Export CSV':'<i class="fas fa-file-code"></i> Export JSON'};o.addEventListener("click",u),this.listeners.set(o,[["click",u]])}});const n=this.container.querySelector("#clearCacheBtn");if(n){const i=async()=>{Y();try{if(!(await fetch("/sitemap/clear-cache",{method:"POST"})).ok)throw new Error("Failed to clear cache");de("Cache cleared successfully"),setTimeout(()=>window.location.reload(),1e3)}catch(a){pt(a.message)}finally{nt()}};n.addEventListener("click",i),this.listeners.set(n,[["click",i]])}const r=this.container.querySelector("#themeToggleBtn");if(r){const i=()=>document.body.classList.toggle("dark-mode");r.addEventListener("click",i),this.listeners.set(r,[["click",i]])}}cleanupListeners(){this.listeners.forEach((e,n)=>{e.forEach(([r,i])=>n.removeEventListener(r,i))}),this.listeners.clear()}downloadFile(e,n,r){try{const i=new Blob([e],{type:r}),a=document.createElement("a");a.href=URL.createObjectURL(i),a.download=n,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(a.href)}catch(i){throw new Error(`Failed to download ${n}: ${i.message}`)}}updateRoute(e){this.options.path=e,this.render(),this.setupEventListeners()}updateUrls(e){this.options.urls=e,this.render(),this.setupEventListeners()}updateOptions(e){this.options={...this.options,...e},this.render(),this.setupEventListeners()}destroy(){this.cleanupListeners(),this.container.innerHTML=""}}class Hs{constructor(e,n={}){this.container=e,this.options={onBack:n.onBack||(()=>{}),onToggleFilters:n.onToggleFilters||(()=>{}),treeView:n.treeView||null,urls:n.urls||[],destroy:n.destroy||(()=>{}),...n},this.path=window.location.pathname,this.buttons=null,this.render()}render(){this.container.innerHTML=`
      <h1>Sitemap Explorer</h1>
      <div class="controls"></div>
    `;const e=this.container.querySelector(".controls");this.buttons=new Us(e,{onBack:this.options.onBack,urls:this.options.urls,path:this.path})}updateRoute(e){this.path=e,this.buttons.updateRoute(e)}updateUrls(e){this.options.urls=e,this.buttons.updateUrls(e)}updateOptions(e){this.options.destroy&&this.options.destroy(),this.options={...this.options,...e},this.buttons.updateOptions({onBack:this.options.onBack,urls:this.options.urls}),this.render()}destroy(){this.buttons&&this.buttons.destroy(),this.options.destroy&&this.options.destroy(),this.container.innerHTML=""}}function Vs(t){try{const e=new URL(t);return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function qs(t){t.innerHTML=`
    <h2>Load Sitemap</h2>
    <form id="sitemapUrlForm" method="POST" class="input-group">
      <label for="sitemapUrlInput">Enter Sitemap URL:</label>
      <input type="text" id="sitemapUrlInput" name="url" placeholder="https://example.com/sitemap.xml" />
      <button type="submit">Load Sitemap</button>
    </form>
    <form id="sitemapUploadForm" method="POST" enctype="multipart/form-data" class="input-group">
      <label for="sitemapFile">Upload Sitemap File:</label>
      <input type="file" id="sitemapFile" name="sitemapFile" accept=".xml" />
      <button type="submit">Upload</button>
    </form>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;const e=t.querySelector("#sitemapUrlForm"),n=t.querySelector("#sitemapUrlInput"),r=t.querySelector("#sitemapUploadForm");return e.addEventListener("submit",async i=>{i.preventDefault();const a=n.value.trim();if(!a){pt("Please enter a sitemap URL");return}if(!Vs(a)){pt("Invalid URL: Must start with http:// or https:// and be well-formed");return}Y(10);try{const s=await fetch("/sitemap/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a})});if(!s.ok){const c=await s.json();throw new Error(c.error||"Failed to fetch sitemap")}const{id:o,message:u,status:l}=await s.json();Y(50),window.history.pushState({},"",`/results?id=${o}`),_e("/results"),de(`${u} (${l.succeeded.length}/${l.attempted.length} sitemaps succeeded)`)}catch(s){pt(s.message)}finally{nt()}}),r.addEventListener("submit",async i=>{i.preventDefault();const a=new FormData(r);Y(10);try{const s=await fetch("/sitemap/upload",{method:"POST",body:a});if(!s.ok){const l=await s.json();throw new Error(l.error||"Failed to upload sitemap")}const{id:o,message:u}=await s.json();Y(50),window.history.pushState({},"",`/results?id=${o}`),_e("/results"),de(u)}catch(s){pt(s.message)}finally{nt()}}),{}}function Ys(t,e){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>t(...r),e)}}class Xs{constructor(e){zt(this,"render",Ys((e,n={},r="url",i="")=>{Y(50),this.urls=e;const a=this.filterUrls(e,n,i);this.treeData=this.buildTree(a,r),this.container.querySelector(".tree-list")||(this.container.innerHTML="",this.renderControls());const s=this.container.querySelector(".tree-list")||document.createElement("ul");s.className="tree-list",s.innerHTML="",this.renderTreeNode(this.treeData,s,"",r),this.container.contains(s)||this.container.appendChild(s),this.setupNodeListeners(),this.updateTreeVisibility(),nt()},200));this.container=e,this.isExpanded=!0,this.expandedNodes=new Set,this.treeData=null,this.urls=[],this.listeners=new Map,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="tree-controls",e.innerHTML=`
      <button id="toggleExpansionBtn" aria-expanded="${this.isExpanded}" aria-label="${this.isExpanded?"Collapse all nodes":"Expand all nodes"}">
        <i class="fas fa-${this.isExpanded?"compress-alt":"expand-alt"}"></i> ${this.isExpanded?"Collapse All":"Expand All"}
      </button>
    `,this.container.appendChild(e),this.setupControlListeners()}setupControlListeners(){this.cleanupListeners("controls");const e=this.container.querySelector("#toggleExpansionBtn");if(e){const n=()=>this.toggleExpansion();e.addEventListener("click",n),this.listeners.set(e,[["click",n]])}}toggleExpansion(){this.isExpanded=!this.isExpanded;const e=this.container.querySelector("#toggleExpansionBtn");e.innerHTML=`<i class="fas fa-${this.isExpanded?"compress-alt":"expand-alt"}"></i> ${this.isExpanded?"Collapse All":"Expand All"}`,e.setAttribute("aria-expanded",this.isExpanded),e.setAttribute("aria-label",this.isExpanded?"Collapse all nodes":"Expand all nodes"),this.expandedNodes.clear(),this.isExpanded&&this.buildExpandedNodes(this.treeData,""),this.updateTreeVisibility()}buildExpandedNodes(e,n){Object.entries(e.children).forEach(([r,i])=>{const a=n?`${n}/${i.name}`:i.name;this.expandedNodes.add(a),this.buildExpandedNodes(i,a)})}updateTreeVisibility(){this.container.querySelectorAll(".toggle").forEach(e=>{const n=e.dataset.path,r=this.isExpanded||this.expandedNodes.has(n);e.classList.toggle("open",r),e.setAttribute("aria-expanded",r);const i=e.nextElementSibling;i?(i.classList.toggle("hidden",!r),i.style.display=r?"block":"none"):console.warn(`No child <ul> found for toggle at path: ${n}`)})}setupNodeListeners(){this.cleanupListeners("nodes"),this.container.querySelectorAll(".toggle").forEach(e=>{const n=()=>this.toggleNode(e);e.addEventListener("click",n),e.addEventListener("keydown",r=>r.key==="Enter"&&this.toggleNode(e)),this.listeners.set(e,[["click",n],["keydown",r=>r.key==="Enter"&&this.toggleNode(e)]])})}cleanupListeners(e="all"){this.listeners.forEach((n,r)=>{(e==="all"||e==="controls"&&r.id==="toggleExpansionBtn"||e==="nodes"&&r.classList.contains("toggle"))&&(n.forEach(([i,a])=>r.removeEventListener(i,a)),this.listeners.delete(r))})}filterUrls(e,n,r){return e.filter(i=>{const a=parseFloat(i.priority)||0,s=i.lastmod?new Date(i.lastmod):null,o=parseFloat(n.priority)||0,u=n.lastmod?new Date(n.lastmod):null;return(!r||i.loc.toLowerCase().includes(r.toLowerCase()))&&a>=o&&(!u||s&&s>=u)})}sortUrls(e,n){return e.sort((r,i)=>n==="lastmod"?new Date(i.lastmod||0)-new Date(r.lastmod||0)||r.loc.localeCompare(i.loc):n==="priority"&&parseFloat(i.priority||0)-parseFloat(r.priority||0)||r.loc.localeCompare(i.loc))}buildTree(e,n){const r={children:{},urls:[]};return e.forEach(i=>{try{const a=new URL(i.loc||""),s=a.pathname==="/"?[""]:a.pathname.split("/").filter(l=>l.length);let o=r;const u=a.hostname;o.children[u]||(o.children[u]={name:u,children:{},urls:[]}),o=o.children[u],s.forEach(l=>{const c=l||"/";o.children[c]||(o.children[c]={name:c,children:{},urls:[]}),o=o.children[c]}),o.urls.push(i)}catch(a){console.warn(`Skipping invalid URL: ${i.loc}`,a)}}),this.sortTree(r,n),r}sortTree(e,n){e.urls.length&&(e.urls=this.sortUrls(e.urls,n)),Object.values(e.children).forEach(r=>this.sortTree(r,n))}renderTreeNode(e,n,r,i){Object.entries(e.children).sort(([s,o],[u,l])=>i==="url"?o.name.localeCompare(l.name):0).forEach(([s,o])=>{const u=r?`${r}/${o.name}`:o.name,l=document.createElement("li"),c=document.createElement("span"),f=this.isExpanded||this.expandedNodes.has(u);if(c.className=`toggle ${f?"open":""}`,c.setAttribute("aria-expanded",f),c.setAttribute("aria-label",`Toggle ${o.name} children`),c.setAttribute("role","button"),c.dataset.path=u,c.tabIndex=0,c.textContent=o.name==="/"?u:o.name,l.appendChild(c),o.urls.length||Object.keys(o.children).length){const h=document.createElement("ul");h.className=f?"":"hidden",h.style.display=f?"block":"none",o.urls.forEach(m=>{const v=document.createElement("li");v.innerHTML=`<span class="url-leaf" tabindex="0" aria-label="URL: ${m.loc}">${this.formatUrl(m)}</span>`,h.appendChild(v)}),Object.keys(o.children).length&&this.renderTreeNode(o,h,u,i),l.appendChild(h)}n.appendChild(l)})}formatUrl(e){let n=e.loc;return e.lastmod&&(n+=` (Last Modified: ${e.lastmod})`),e.changefreq&&(n+=`, ${e.changefreq}`),e.priority&&(n+=`, Priority: ${e.priority}`),n}toggleNode(e){const r=!e.classList.contains("open");e.classList.toggle("open",r),e.setAttribute("aria-expanded",r);const i=e.nextElementSibling,a=e.dataset.path;if(i?(i.classList.toggle("hidden",!r),i.style.display=r?"block":"none",console.debug(`Toggled ${a}: ${r?"shown":"hidden"}`)):console.warn(`No child <ul> found for toggle at path: ${a}`),r?this.expandedNodes.add(a):this.expandedNodes.delete(a),this.isExpanded&&!r){this.isExpanded=!1;const s=this.container.querySelector("#toggleExpansionBtn");s.innerHTML='<i class="fas fa-expand-alt"></i> Expand All',s.setAttribute("aria-expanded",!1),s.setAttribute("aria-label","Expand all nodes")}}destroy(){this.cleanupListeners(),this.container.innerHTML="",this.treeData=null,this.urls=[],this.expandedNodes.clear()}}var Ws={value:()=>{}};function Ln(){for(var t=0,e=arguments.length,n={},r;t<e;++t){if(!(r=arguments[t]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new le(n)}function le(t){this._=t}function js(t,e){return t.trim().split(/^|\s+/).map(function(n){var r="",i=n.indexOf(".");if(i>=0&&(r=n.slice(i+1),n=n.slice(0,i)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}le.prototype=Ln.prototype={constructor:le,on:function(t,e){var n=this._,r=js(t+"",n),i,a=-1,s=r.length;if(arguments.length<2){for(;++a<s;)if((i=(t=r[a]).type)&&(i=Gs(n[i],t.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++a<s;)if(i=(t=r[a]).type)n[i]=or(n[i],t.name,e);else if(e==null)for(i in n)n[i]=or(n[i],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new le(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var n=new Array(i),r=0,i,a;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(a=this._[t],r=0,i=a.length;r<i;++r)a[r].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,a=r.length;i<a;++i)r[i].value.apply(e,n)}};function Gs(t,e){for(var n=0,r=t.length,i;n<r;++n)if((i=t[n]).name===e)return i.value}function or(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){t[r]=Ws,t=t.slice(0,r).concat(t.slice(r+1));break}return n!=null&&t.push({name:e,value:n}),t}var sn="http://www.w3.org/1999/xhtml";const lr={svg:"http://www.w3.org/2000/svg",xhtml:sn,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Ce(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),lr.hasOwnProperty(e)?{space:lr[e],local:t}:t}function Ks(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===sn&&e.documentElement.namespaceURI===sn?e.createElement(t):e.createElementNS(n,t)}}function Js(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function ai(t){var e=Ce(t);return(e.local?Js:Ks)(e)}function Zs(){}function Cn(t){return t==null?Zs:function(){return this.querySelector(t)}}function Qs(t){typeof t!="function"&&(t=Cn(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a=e[i],s=a.length,o=r[i]=new Array(s),u,l,c=0;c<s;++c)(u=a[c])&&(l=t.call(u,u.__data__,c,a))&&("__data__"in u&&(l.__data__=u.__data__),o[c]=l);return new D(r,this._parents)}function to(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function eo(){return[]}function si(t){return t==null?eo:function(){return this.querySelectorAll(t)}}function no(t){return function(){return to(t.apply(this,arguments))}}function ro(t){typeof t=="function"?t=no(t):t=si(t);for(var e=this._groups,n=e.length,r=[],i=[],a=0;a<n;++a)for(var s=e[a],o=s.length,u,l=0;l<o;++l)(u=s[l])&&(r.push(t.call(u,u.__data__,l,s)),i.push(u));return new D(r,i)}function oi(t){return function(){return this.matches(t)}}function li(t){return function(e){return e.matches(t)}}var io=Array.prototype.find;function ao(t){return function(){return io.call(this.children,t)}}function so(){return this.firstElementChild}function oo(t){return this.select(t==null?so:ao(typeof t=="function"?t:li(t)))}var lo=Array.prototype.filter;function co(){return Array.from(this.children)}function uo(t){return function(){return lo.call(this.children,t)}}function fo(t){return this.selectAll(t==null?co:uo(typeof t=="function"?t:li(t)))}function ho(t){typeof t!="function"&&(t=oi(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a=e[i],s=a.length,o=r[i]=[],u,l=0;l<s;++l)(u=a[l])&&t.call(u,u.__data__,l,a)&&o.push(u);return new D(r,this._parents)}function ci(t){return new Array(t.length)}function mo(){return new D(this._enter||this._groups.map(ci),this._parents)}function ge(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}ge.prototype={constructor:ge,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function po(t){return function(){return t}}function go(t,e,n,r,i,a){for(var s=0,o,u=e.length,l=a.length;s<l;++s)(o=e[s])?(o.__data__=a[s],r[s]=o):n[s]=new ge(t,a[s]);for(;s<u;++s)(o=e[s])&&(i[s]=o)}function yo(t,e,n,r,i,a,s){var o,u,l=new Map,c=e.length,f=a.length,h=new Array(c),m;for(o=0;o<c;++o)(u=e[o])&&(h[o]=m=s.call(u,u.__data__,o,e)+"",l.has(m)?i[o]=u:l.set(m,u));for(o=0;o<f;++o)m=s.call(t,a[o],o,a)+"",(u=l.get(m))?(r[o]=u,u.__data__=a[o],l.delete(m)):n[o]=new ge(t,a[o]);for(o=0;o<c;++o)(u=e[o])&&l.get(h[o])===u&&(i[o]=u)}function vo(t){return t.__data__}function xo(t,e){if(!arguments.length)return Array.from(this,vo);var n=e?yo:go,r=this._parents,i=this._groups;typeof t!="function"&&(t=po(t));for(var a=i.length,s=new Array(a),o=new Array(a),u=new Array(a),l=0;l<a;++l){var c=r[l],f=i[l],h=f.length,m=wo(t.call(c,c&&c.__data__,l,r)),v=m.length,E=o[l]=new Array(v),S=s[l]=new Array(v),y=u[l]=new Array(h);n(c,f,E,S,y,m,e);for(var _=0,A=0,T,P;_<v;++_)if(T=E[_]){for(_>=A&&(A=_+1);!(P=S[A])&&++A<v;);T._next=P||null}}return s=new D(s,r),s._enter=o,s._exit=u,s}function wo(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function bo(){return new D(this._exit||this._groups.map(ci),this._parents)}function _o(t,e,n){var r=this.enter(),i=this,a=this.exit();return typeof t=="function"?(r=t(r),r&&(r=r.selection())):r=r.append(t+""),e!=null&&(i=e(i),i&&(i=i.selection())),n==null?a.remove():n(a),r&&i?r.merge(i).order():i}function Eo(t){for(var e=t.selection?t.selection():t,n=this._groups,r=e._groups,i=n.length,a=r.length,s=Math.min(i,a),o=new Array(i),u=0;u<s;++u)for(var l=n[u],c=r[u],f=l.length,h=o[u]=new Array(f),m,v=0;v<f;++v)(m=l[v]||c[v])&&(h[v]=m);for(;u<i;++u)o[u]=n[u];return new D(o,this._parents)}function ko(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r=t[e],i=r.length-1,a=r[i],s;--i>=0;)(s=r[i])&&(a&&s.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(s,a),a=s);return this}function So(t){t||(t=Ao);function e(f,h){return f&&h?t(f.__data__,h.__data__):!f-!h}for(var n=this._groups,r=n.length,i=new Array(r),a=0;a<r;++a){for(var s=n[a],o=s.length,u=i[a]=new Array(o),l,c=0;c<o;++c)(l=s[c])&&(u[c]=l);u.sort(e)}return new D(i,this._parents).order()}function Ao(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function Lo(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function Co(){return Array.from(this)}function To(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,a=r.length;i<a;++i){var s=r[i];if(s)return s}return null}function No(){let t=0;for(const e of this)++t;return t}function Mo(){return!this.node()}function Po(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var i=e[n],a=0,s=i.length,o;a<s;++a)(o=i[a])&&t.call(o,o.__data__,a,i);return this}function zo(t){return function(){this.removeAttribute(t)}}function Oo(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Io(t,e){return function(){this.setAttribute(t,e)}}function Fo(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function $o(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function Ro(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function Do(t,e){var n=Ce(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((e==null?n.local?Oo:zo:typeof e=="function"?n.local?Ro:$o:n.local?Fo:Io)(n,e))}function ui(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function Bo(t){return function(){this.style.removeProperty(t)}}function Uo(t,e,n){return function(){this.style.setProperty(t,e,n)}}function Ho(t,e,n){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function Vo(t,e,n){return arguments.length>1?this.each((e==null?Bo:typeof e=="function"?Ho:Uo)(t,e,n??"")):Nt(this.node(),t)}function Nt(t,e){return t.style.getPropertyValue(e)||ui(t).getComputedStyle(t,null).getPropertyValue(e)}function qo(t){return function(){delete this[t]}}function Yo(t,e){return function(){this[t]=e}}function Xo(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function Wo(t,e){return arguments.length>1?this.each((e==null?qo:typeof e=="function"?Xo:Yo)(t,e)):this.node()[t]}function fi(t){return t.trim().split(/^|\s+/)}function Tn(t){return t.classList||new hi(t)}function hi(t){this._node=t,this._names=fi(t.getAttribute("class")||"")}hi.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function di(t,e){for(var n=Tn(t),r=-1,i=e.length;++r<i;)n.add(e[r])}function mi(t,e){for(var n=Tn(t),r=-1,i=e.length;++r<i;)n.remove(e[r])}function jo(t){return function(){di(this,t)}}function Go(t){return function(){mi(this,t)}}function Ko(t,e){return function(){(e.apply(this,arguments)?di:mi)(this,t)}}function Jo(t,e){var n=fi(t+"");if(arguments.length<2){for(var r=Tn(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof e=="function"?Ko:e?jo:Go)(n,e))}function Zo(){this.textContent=""}function Qo(t){return function(){this.textContent=t}}function tl(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function el(t){return arguments.length?this.each(t==null?Zo:(typeof t=="function"?tl:Qo)(t)):this.node().textContent}function nl(){this.innerHTML=""}function rl(t){return function(){this.innerHTML=t}}function il(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function al(t){return arguments.length?this.each(t==null?nl:(typeof t=="function"?il:rl)(t)):this.node().innerHTML}function sl(){this.nextSibling&&this.parentNode.appendChild(this)}function ol(){return this.each(sl)}function ll(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function cl(){return this.each(ll)}function ul(t){var e=typeof t=="function"?t:ai(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function fl(){return null}function hl(t,e){var n=typeof t=="function"?t:ai(t),r=e==null?fl:typeof e=="function"?e:Cn(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function dl(){var t=this.parentNode;t&&t.removeChild(this)}function ml(){return this.each(dl)}function pl(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function gl(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function yl(t){return this.select(t?gl:pl)}function vl(t){return arguments.length?this.property("__data__",t):this.node().__data__}function xl(t){return function(e){t.call(this,e,this.__data__)}}function wl(t){return t.trim().split(/^|\s+/).map(function(e){var n="",r=e.indexOf(".");return r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),{type:e,name:n}})}function bl(t){return function(){var e=this.__on;if(e){for(var n=0,r=-1,i=e.length,a;n<i;++n)a=e[n],(!t.type||a.type===t.type)&&a.name===t.name?this.removeEventListener(a.type,a.listener,a.options):e[++r]=a;++r?e.length=r:delete this.__on}}}function _l(t,e,n){return function(){var r=this.__on,i,a=xl(e);if(r){for(var s=0,o=r.length;s<o;++s)if((i=r[s]).type===t.type&&i.name===t.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=n),i.value=e;return}}this.addEventListener(t.type,a,n),i={type:t.type,name:t.name,value:e,listener:a,options:n},r?r.push(i):this.__on=[i]}}function El(t,e,n){var r=wl(t+""),i,a=r.length,s;if(arguments.length<2){var o=this.node().__on;if(o){for(var u=0,l=o.length,c;u<l;++u)for(i=0,c=o[u];i<a;++i)if((s=r[i]).type===c.type&&s.name===c.name)return c.value}return}for(o=e?_l:bl,i=0;i<a;++i)this.each(o(r[i],e,n));return this}function pi(t,e,n){var r=ui(t),i=r.CustomEvent;typeof i=="function"?i=new i(e,n):(i=r.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function kl(t,e){return function(){return pi(this,t,e)}}function Sl(t,e){return function(){return pi(this,t,e.apply(this,arguments))}}function Al(t,e){return this.each((typeof e=="function"?Sl:kl)(t,e))}function*Ll(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,a=r.length,s;i<a;++i)(s=r[i])&&(yield s)}var gi=[null];function D(t,e){this._groups=t,this._parents=e}function Kt(){return new D([[document.documentElement]],gi)}function Cl(){return this}D.prototype=Kt.prototype={constructor:D,select:Qs,selectAll:ro,selectChild:oo,selectChildren:fo,filter:ho,data:xo,enter:mo,exit:bo,join:_o,merge:Eo,selection:Cl,order:ko,sort:So,call:Lo,nodes:Co,node:To,size:No,empty:Mo,each:Po,attr:Do,style:Vo,property:Wo,classed:Jo,text:el,html:al,raise:ol,lower:cl,append:ul,insert:hl,remove:ml,clone:yl,datum:vl,on:El,dispatch:Al,[Symbol.iterator]:Ll};function ct(t){return typeof t=="string"?new D([[document.querySelector(t)]],[document.documentElement]):new D([[t]],gi)}function Tl(t){let e;for(;e=t.sourceEvent;)t=e;return t}function dt(t,e){if(t=Tl(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop]}}return[t.pageX,t.pageY]}const on={capture:!0,passive:!1};function ln(t){t.preventDefault(),t.stopImmediatePropagation()}function Nl(t){var e=t.document.documentElement,n=ct(t).on("dragstart.drag",ln,on);"onselectstart"in e?n.on("selectstart.drag",ln,on):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function Ml(t,e){var n=t.document.documentElement,r=ct(t).on("dragstart.drag",null);e&&(r.on("click.drag",ln,on),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in n?r.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function Nn(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function yi(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Jt(){}var Vt=.7,ye=1/Vt,Lt="\\s*([+-]?\\d+)\\s*",qt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",K="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Pl=/^#([0-9a-f]{3,8})$/,zl=new RegExp(`^rgb\\(${Lt},${Lt},${Lt}\\)$`),Ol=new RegExp(`^rgb\\(${K},${K},${K}\\)$`),Il=new RegExp(`^rgba\\(${Lt},${Lt},${Lt},${qt}\\)$`),Fl=new RegExp(`^rgba\\(${K},${K},${K},${qt}\\)$`),$l=new RegExp(`^hsl\\(${qt},${K},${K}\\)$`),Rl=new RegExp(`^hsla\\(${qt},${K},${K},${qt}\\)$`),cr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Nn(Jt,Yt,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:ur,formatHex:ur,formatHex8:Dl,formatHsl:Bl,formatRgb:fr,toString:fr});function ur(){return this.rgb().formatHex()}function Dl(){return this.rgb().formatHex8()}function Bl(){return vi(this).formatHsl()}function fr(){return this.rgb().formatRgb()}function Yt(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=Pl.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?hr(e):n===3?new $(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?ne(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?ne(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=zl.exec(t))?new $(e[1],e[2],e[3],1):(e=Ol.exec(t))?new $(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Il.exec(t))?ne(e[1],e[2],e[3],e[4]):(e=Fl.exec(t))?ne(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=$l.exec(t))?pr(e[1],e[2]/100,e[3]/100,1):(e=Rl.exec(t))?pr(e[1],e[2]/100,e[3]/100,e[4]):cr.hasOwnProperty(t)?hr(cr[t]):t==="transparent"?new $(NaN,NaN,NaN,0):null}function hr(t){return new $(t>>16&255,t>>8&255,t&255,1)}function ne(t,e,n,r){return r<=0&&(t=e=n=NaN),new $(t,e,n,r)}function Ul(t){return t instanceof Jt||(t=Yt(t)),t?(t=t.rgb(),new $(t.r,t.g,t.b,t.opacity)):new $}function cn(t,e,n,r){return arguments.length===1?Ul(t):new $(t,e,n,r??1)}function $(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}Nn($,cn,yi(Jt,{brighter(t){return t=t==null?ye:Math.pow(ye,t),new $(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?Vt:Math.pow(Vt,t),new $(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new $(vt(this.r),vt(this.g),vt(this.b),ve(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:dr,formatHex:dr,formatHex8:Hl,formatRgb:mr,toString:mr}));function dr(){return`#${yt(this.r)}${yt(this.g)}${yt(this.b)}`}function Hl(){return`#${yt(this.r)}${yt(this.g)}${yt(this.b)}${yt((isNaN(this.opacity)?1:this.opacity)*255)}`}function mr(){const t=ve(this.opacity);return`${t===1?"rgb(":"rgba("}${vt(this.r)}, ${vt(this.g)}, ${vt(this.b)}${t===1?")":`, ${t})`}`}function ve(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function vt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function yt(t){return t=vt(t),(t<16?"0":"")+t.toString(16)}function pr(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new q(t,e,n,r)}function vi(t){if(t instanceof q)return new q(t.h,t.s,t.l,t.opacity);if(t instanceof Jt||(t=Yt(t)),!t)return new q;if(t instanceof q)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),a=Math.max(e,n,r),s=NaN,o=a-i,u=(a+i)/2;return o?(e===a?s=(n-r)/o+(n<r)*6:n===a?s=(r-e)/o+2:s=(e-n)/o+4,o/=u<.5?a+i:2-a-i,s*=60):o=u>0&&u<1?0:s,new q(s,o,u,t.opacity)}function Vl(t,e,n,r){return arguments.length===1?vi(t):new q(t,e,n,r??1)}function q(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}Nn(q,Vl,yi(Jt,{brighter(t){return t=t==null?ye:Math.pow(ye,t),new q(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?Vt:Math.pow(Vt,t),new q(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new $(Re(t>=240?t-240:t+120,i,r),Re(t,i,r),Re(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new q(gr(this.h),re(this.s),re(this.l),ve(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=ve(this.opacity);return`${t===1?"hsl(":"hsla("}${gr(this.h)}, ${re(this.s)*100}%, ${re(this.l)*100}%${t===1?")":`, ${t})`}`}}));function gr(t){return t=(t||0)%360,t<0?t+360:t}function re(t){return Math.max(0,Math.min(1,t||0))}function Re(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}const xi=t=>()=>t;function ql(t,e){return function(n){return t+n*e}}function Yl(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}function Xl(t){return(t=+t)==1?wi:function(e,n){return n-e?Yl(e,n,t):xi(isNaN(e)?n:e)}}function wi(t,e){var n=e-t;return n?ql(t,n):xi(isNaN(t)?e:t)}const yr=function t(e){var n=Xl(e);function r(i,a){var s=n((i=cn(i)).r,(a=cn(a)).r),o=n(i.g,a.g),u=n(i.b,a.b),l=wi(i.opacity,a.opacity);return function(c){return i.r=s(c),i.g=o(c),i.b=u(c),i.opacity=l(c),i+""}}return r.gamma=t,r}(1);function lt(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}var un=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,De=new RegExp(un.source,"g");function Wl(t){return function(){return t}}function jl(t){return function(e){return t(e)+""}}function Gl(t,e){var n=un.lastIndex=De.lastIndex=0,r,i,a,s=-1,o=[],u=[];for(t=t+"",e=e+"";(r=un.exec(t))&&(i=De.exec(e));)(a=i.index)>n&&(a=e.slice(n,a),o[s]?o[s]+=a:o[++s]=a),(r=r[0])===(i=i[0])?o[s]?o[s]+=i:o[++s]=i:(o[++s]=null,u.push({i:s,x:lt(r,i)})),n=De.lastIndex;return n<e.length&&(a=e.slice(n),o[s]?o[s]+=a:o[++s]=a),o.length<2?u[0]?jl(u[0].x):Wl(e):(e=u.length,function(l){for(var c=0,f;c<e;++c)o[(f=u[c]).i]=f.x(l);return o.join("")})}var vr=180/Math.PI,fn={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function bi(t,e,n,r,i,a){var s,o,u;return(s=Math.sqrt(t*t+e*e))&&(t/=s,e/=s),(u=t*n+e*r)&&(n-=t*u,r-=e*u),(o=Math.sqrt(n*n+r*r))&&(n/=o,r/=o,u/=o),t*r<e*n&&(t=-t,e=-e,u=-u,s=-s),{translateX:i,translateY:a,rotate:Math.atan2(e,t)*vr,skewX:Math.atan(u)*vr,scaleX:s,scaleY:o}}var ie;function Kl(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?fn:bi(e.a,e.b,e.c,e.d,e.e,e.f)}function Jl(t){return t==null||(ie||(ie=document.createElementNS("http://www.w3.org/2000/svg","g")),ie.setAttribute("transform",t),!(t=ie.transform.baseVal.consolidate()))?fn:(t=t.matrix,bi(t.a,t.b,t.c,t.d,t.e,t.f))}function _i(t,e,n,r){function i(l){return l.length?l.pop()+" ":""}function a(l,c,f,h,m,v){if(l!==f||c!==h){var E=m.push("translate(",null,e,null,n);v.push({i:E-4,x:lt(l,f)},{i:E-2,x:lt(c,h)})}else(f||h)&&m.push("translate("+f+e+h+n)}function s(l,c,f,h){l!==c?(l-c>180?c+=360:c-l>180&&(l+=360),h.push({i:f.push(i(f)+"rotate(",null,r)-2,x:lt(l,c)})):c&&f.push(i(f)+"rotate("+c+r)}function o(l,c,f,h){l!==c?h.push({i:f.push(i(f)+"skewX(",null,r)-2,x:lt(l,c)}):c&&f.push(i(f)+"skewX("+c+r)}function u(l,c,f,h,m,v){if(l!==f||c!==h){var E=m.push(i(m)+"scale(",null,",",null,")");v.push({i:E-4,x:lt(l,f)},{i:E-2,x:lt(c,h)})}else(f!==1||h!==1)&&m.push(i(m)+"scale("+f+","+h+")")}return function(l,c){var f=[],h=[];return l=t(l),c=t(c),a(l.translateX,l.translateY,c.translateX,c.translateY,f,h),s(l.rotate,c.rotate,f,h),o(l.skewX,c.skewX,f,h),u(l.scaleX,l.scaleY,c.scaleX,c.scaleY,f,h),l=c=null,function(m){for(var v=-1,E=h.length,S;++v<E;)f[(S=h[v]).i]=S.x(m);return f.join("")}}}var Zl=_i(Kl,"px, ","px)","deg)"),Ql=_i(Jl,", ",")",")"),tc=1e-12;function xr(t){return((t=Math.exp(t))+1/t)/2}function ec(t){return((t=Math.exp(t))-1/t)/2}function nc(t){return((t=Math.exp(2*t))-1)/(t+1)}const rc=function t(e,n,r){function i(a,s){var o=a[0],u=a[1],l=a[2],c=s[0],f=s[1],h=s[2],m=c-o,v=f-u,E=m*m+v*v,S,y;if(E<tc)y=Math.log(h/l)/e,S=function(U){return[o+U*m,u+U*v,l*Math.exp(e*U*y)]};else{var _=Math.sqrt(E),A=(h*h-l*l+r*E)/(2*l*n*_),T=(h*h-l*l-r*E)/(2*h*n*_),P=Math.log(Math.sqrt(A*A+1)-A),O=Math.log(Math.sqrt(T*T+1)-T);y=(O-P)/e,S=function(U){var _t=U*y,Zt=xr(P),Qt=l/(n*_)*(Zt*nc(e*_t+P)-ec(P));return[o+Qt*m,u+Qt*v,l*Zt/xr(e*_t+P)]}}return S.duration=y*1e3*e/Math.SQRT2,S}return i.rho=function(a){var s=Math.max(.001,+a),o=s*s,u=o*o;return t(s,o,u)},i}(Math.SQRT2,2,4);var Mt=0,$t=0,Ot=0,Ei=1e3,xe,Rt,we=0,bt=0,Te=0,Xt=typeof performance=="object"&&performance.now?performance:Date,ki=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Mn(){return bt||(ki(ic),bt=Xt.now()+Te)}function ic(){bt=0}function be(){this._call=this._time=this._next=null}be.prototype=Si.prototype={constructor:be,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Mn():+n)+(e==null?0:+e),!this._next&&Rt!==this&&(Rt?Rt._next=this:xe=this,Rt=this),this._call=t,this._time=n,hn()},stop:function(){this._call&&(this._call=null,this._time=1/0,hn())}};function Si(t,e,n){var r=new be;return r.restart(t,e,n),r}function ac(){Mn(),++Mt;for(var t=xe,e;t;)(e=bt-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Mt}function wr(){bt=(we=Xt.now())+Te,Mt=$t=0;try{ac()}finally{Mt=0,oc(),bt=0}}function sc(){var t=Xt.now(),e=t-we;e>Ei&&(Te-=e,we=t)}function oc(){for(var t,e=xe,n,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:xe=n);Rt=t,hn(r)}function hn(t){if(!Mt){$t&&($t=clearTimeout($t));var e=t-bt;e>24?(t<1/0&&($t=setTimeout(wr,t-Xt.now()-Te)),Ot&&(Ot=clearInterval(Ot))):(Ot||(we=Xt.now(),Ot=setInterval(sc,Ei)),Mt=1,ki(wr))}}function br(t,e,n){var r=new be;return e=e==null?0:+e,r.restart(i=>{r.stop(),t(i+e)},e,n),r}var lc=Ln("start","end","cancel","interrupt"),cc=[],Ai=0,_r=1,dn=2,ce=3,Er=4,mn=5,ue=6;function Ne(t,e,n,r,i,a){var s=t.__transition;if(!s)t.__transition={};else if(n in s)return;uc(t,n,{name:e,index:r,group:i,on:lc,tween:cc,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:Ai})}function Pn(t,e){var n=X(t,e);if(n.state>Ai)throw new Error("too late; already scheduled");return n}function J(t,e){var n=X(t,e);if(n.state>ce)throw new Error("too late; already running");return n}function X(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function uc(t,e,n){var r=t.__transition,i;r[e]=n,n.timer=Si(a,0,n.time);function a(l){n.state=_r,n.timer.restart(s,n.delay,n.time),n.delay<=l&&s(l-n.delay)}function s(l){var c,f,h,m;if(n.state!==_r)return u();for(c in r)if(m=r[c],m.name===n.name){if(m.state===ce)return br(s);m.state===Er?(m.state=ue,m.timer.stop(),m.on.call("interrupt",t,t.__data__,m.index,m.group),delete r[c]):+c<e&&(m.state=ue,m.timer.stop(),m.on.call("cancel",t,t.__data__,m.index,m.group),delete r[c])}if(br(function(){n.state===ce&&(n.state=Er,n.timer.restart(o,n.delay,n.time),o(l))}),n.state=dn,n.on.call("start",t,t.__data__,n.index,n.group),n.state===dn){for(n.state=ce,i=new Array(h=n.tween.length),c=0,f=-1;c<h;++c)(m=n.tween[c].value.call(t,t.__data__,n.index,n.group))&&(i[++f]=m);i.length=f+1}}function o(l){for(var c=l<n.duration?n.ease.call(null,l/n.duration):(n.timer.restart(u),n.state=mn,1),f=-1,h=i.length;++f<h;)i[f].call(t,c);n.state===mn&&(n.on.call("end",t,t.__data__,n.index,n.group),u())}function u(){n.state=ue,n.timer.stop(),delete r[e];for(var l in r)return;delete t.__transition}}function fe(t,e){var n=t.__transition,r,i,a=!0,s;if(n){e=e==null?null:e+"";for(s in n){if((r=n[s]).name!==e){a=!1;continue}i=r.state>dn&&r.state<mn,r.state=ue,r.timer.stop(),r.on.call(i?"interrupt":"cancel",t,t.__data__,r.index,r.group),delete n[s]}a&&delete t.__transition}}function fc(t){return this.each(function(){fe(this,t)})}function hc(t,e){var n,r;return function(){var i=J(this,t),a=i.tween;if(a!==n){r=n=a;for(var s=0,o=r.length;s<o;++s)if(r[s].name===e){r=r.slice(),r.splice(s,1);break}}i.tween=r}}function dc(t,e,n){var r,i;if(typeof n!="function")throw new Error;return function(){var a=J(this,t),s=a.tween;if(s!==r){i=(r=s).slice();for(var o={name:e,value:n},u=0,l=i.length;u<l;++u)if(i[u].name===e){i[u]=o;break}u===l&&i.push(o)}a.tween=i}}function mc(t,e){var n=this._id;if(t+="",arguments.length<2){for(var r=X(this.node(),n).tween,i=0,a=r.length,s;i<a;++i)if((s=r[i]).name===t)return s.value;return null}return this.each((e==null?hc:dc)(n,t,e))}function zn(t,e,n){var r=t._id;return t.each(function(){var i=J(this,r);(i.value||(i.value={}))[e]=n.apply(this,arguments)}),function(i){return X(i,r).value[e]}}function Li(t,e){var n;return(typeof e=="number"?lt:e instanceof Yt?yr:(n=Yt(e))?(e=n,yr):Gl)(t,e)}function pc(t){return function(){this.removeAttribute(t)}}function gc(t){return function(){this.removeAttributeNS(t.space,t.local)}}function yc(t,e,n){var r,i=n+"",a;return function(){var s=this.getAttribute(t);return s===i?null:s===r?a:a=e(r=s,n)}}function vc(t,e,n){var r,i=n+"",a;return function(){var s=this.getAttributeNS(t.space,t.local);return s===i?null:s===r?a:a=e(r=s,n)}}function xc(t,e,n){var r,i,a;return function(){var s,o=n(this),u;return o==null?void this.removeAttribute(t):(s=this.getAttribute(t),u=o+"",s===u?null:s===r&&u===i?a:(i=u,a=e(r=s,o)))}}function wc(t,e,n){var r,i,a;return function(){var s,o=n(this),u;return o==null?void this.removeAttributeNS(t.space,t.local):(s=this.getAttributeNS(t.space,t.local),u=o+"",s===u?null:s===r&&u===i?a:(i=u,a=e(r=s,o)))}}function bc(t,e){var n=Ce(t),r=n==="transform"?Ql:Li;return this.attrTween(t,typeof e=="function"?(n.local?wc:xc)(n,r,zn(this,"attr."+t,e)):e==null?(n.local?gc:pc)(n):(n.local?vc:yc)(n,r,e))}function _c(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function Ec(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function kc(t,e){var n,r;function i(){var a=e.apply(this,arguments);return a!==r&&(n=(r=a)&&Ec(t,a)),n}return i._value=e,i}function Sc(t,e){var n,r;function i(){var a=e.apply(this,arguments);return a!==r&&(n=(r=a)&&_c(t,a)),n}return i._value=e,i}function Ac(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var r=Ce(t);return this.tween(n,(r.local?kc:Sc)(r,e))}function Lc(t,e){return function(){Pn(this,t).delay=+e.apply(this,arguments)}}function Cc(t,e){return e=+e,function(){Pn(this,t).delay=e}}function Tc(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Lc:Cc)(e,t)):X(this.node(),e).delay}function Nc(t,e){return function(){J(this,t).duration=+e.apply(this,arguments)}}function Mc(t,e){return e=+e,function(){J(this,t).duration=e}}function Pc(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Nc:Mc)(e,t)):X(this.node(),e).duration}function zc(t,e){if(typeof e!="function")throw new Error;return function(){J(this,t).ease=e}}function Oc(t){var e=this._id;return arguments.length?this.each(zc(e,t)):X(this.node(),e).ease}function Ic(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;J(this,t).ease=n}}function Fc(t){if(typeof t!="function")throw new Error;return this.each(Ic(this._id,t))}function $c(t){typeof t!="function"&&(t=oi(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a=e[i],s=a.length,o=r[i]=[],u,l=0;l<s;++l)(u=a[l])&&t.call(u,u.__data__,l,a)&&o.push(u);return new at(r,this._parents,this._name,this._id)}function Rc(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,r=e.length,i=n.length,a=Math.min(r,i),s=new Array(r),o=0;o<a;++o)for(var u=e[o],l=n[o],c=u.length,f=s[o]=new Array(c),h,m=0;m<c;++m)(h=u[m]||l[m])&&(f[m]=h);for(;o<r;++o)s[o]=e[o];return new at(s,this._parents,this._name,this._id)}function Dc(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function Bc(t,e,n){var r,i,a=Dc(e)?Pn:J;return function(){var s=a(this,t),o=s.on;o!==r&&(i=(r=o).copy()).on(e,n),s.on=i}}function Uc(t,e){var n=this._id;return arguments.length<2?X(this.node(),n).on.on(t):this.each(Bc(n,t,e))}function Hc(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function Vc(){return this.on("end.remove",Hc(this._id))}function qc(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Cn(t));for(var r=this._groups,i=r.length,a=new Array(i),s=0;s<i;++s)for(var o=r[s],u=o.length,l=a[s]=new Array(u),c,f,h=0;h<u;++h)(c=o[h])&&(f=t.call(c,c.__data__,h,o))&&("__data__"in c&&(f.__data__=c.__data__),l[h]=f,Ne(l[h],e,n,h,l,X(c,n)));return new at(a,this._parents,e,n)}function Yc(t){var e=this._name,n=this._id;typeof t!="function"&&(t=si(t));for(var r=this._groups,i=r.length,a=[],s=[],o=0;o<i;++o)for(var u=r[o],l=u.length,c,f=0;f<l;++f)if(c=u[f]){for(var h=t.call(c,c.__data__,f,u),m,v=X(c,n),E=0,S=h.length;E<S;++E)(m=h[E])&&Ne(m,e,n,E,h,v);a.push(h),s.push(c)}return new at(a,s,e,n)}var Xc=Kt.prototype.constructor;function Wc(){return new Xc(this._groups,this._parents)}function jc(t,e){var n,r,i;return function(){var a=Nt(this,t),s=(this.style.removeProperty(t),Nt(this,t));return a===s?null:a===n&&s===r?i:i=e(n=a,r=s)}}function Ci(t){return function(){this.style.removeProperty(t)}}function Gc(t,e,n){var r,i=n+"",a;return function(){var s=Nt(this,t);return s===i?null:s===r?a:a=e(r=s,n)}}function Kc(t,e,n){var r,i,a;return function(){var s=Nt(this,t),o=n(this),u=o+"";return o==null&&(u=o=(this.style.removeProperty(t),Nt(this,t))),s===u?null:s===r&&u===i?a:(i=u,a=e(r=s,o))}}function Jc(t,e){var n,r,i,a="style."+e,s="end."+a,o;return function(){var u=J(this,t),l=u.on,c=u.value[a]==null?o||(o=Ci(e)):void 0;(l!==n||i!==c)&&(r=(n=l).copy()).on(s,i=c),u.on=r}}function Zc(t,e,n){var r=(t+="")=="transform"?Zl:Li;return e==null?this.styleTween(t,jc(t,r)).on("end.style."+t,Ci(t)):typeof e=="function"?this.styleTween(t,Kc(t,r,zn(this,"style."+t,e))).each(Jc(this._id,t)):this.styleTween(t,Gc(t,r,e),n).on("end.style."+t,null)}function Qc(t,e,n){return function(r){this.style.setProperty(t,e.call(this,r),n)}}function tu(t,e,n){var r,i;function a(){var s=e.apply(this,arguments);return s!==i&&(r=(i=s)&&Qc(t,s,n)),r}return a._value=e,a}function eu(t,e,n){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,tu(t,e,n??""))}function nu(t){return function(){this.textContent=t}}function ru(t){return function(){var e=t(this);this.textContent=e??""}}function iu(t){return this.tween("text",typeof t=="function"?ru(zn(this,"text",t)):nu(t==null?"":t+""))}function au(t){return function(e){this.textContent=t.call(this,e)}}function su(t){var e,n;function r(){var i=t.apply(this,arguments);return i!==n&&(e=(n=i)&&au(i)),e}return r._value=t,r}function ou(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,su(t))}function lu(){for(var t=this._name,e=this._id,n=Ti(),r=this._groups,i=r.length,a=0;a<i;++a)for(var s=r[a],o=s.length,u,l=0;l<o;++l)if(u=s[l]){var c=X(u,e);Ne(u,t,n,l,s,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new at(r,this._parents,t,n)}function cu(){var t,e,n=this,r=n._id,i=n.size();return new Promise(function(a,s){var o={value:s},u={value:function(){--i===0&&a()}};n.each(function(){var l=J(this,r),c=l.on;c!==t&&(e=(t=c).copy(),e._.cancel.push(o),e._.interrupt.push(o),e._.end.push(u)),l.on=e}),i===0&&a()})}var uu=0;function at(t,e,n,r){this._groups=t,this._parents=e,this._name=n,this._id=r}function Ti(){return++uu}var tt=Kt.prototype;at.prototype={constructor:at,select:qc,selectAll:Yc,selectChild:tt.selectChild,selectChildren:tt.selectChildren,filter:$c,merge:Rc,selection:Wc,transition:lu,call:tt.call,nodes:tt.nodes,node:tt.node,size:tt.size,empty:tt.empty,each:tt.each,on:Uc,attr:bc,attrTween:Ac,style:Zc,styleTween:eu,text:iu,textTween:ou,remove:Vc,tween:mc,delay:Tc,duration:Pc,ease:Oc,easeVarying:Fc,end:cu,[Symbol.iterator]:tt[Symbol.iterator]};function fu(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var hu={time:null,delay:0,duration:250,ease:fu};function du(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function mu(t){var e,n;t instanceof at?(e=t._id,t=t._name):(e=Ti(),(n=hu).time=Mn(),t=t==null?null:t+"");for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var s=r[a],o=s.length,u,l=0;l<o;++l)(u=s[l])&&Ne(u,t,e,l,s,n||du(u,e));return new at(r,this._parents,t,e)}Kt.prototype.interrupt=fc;Kt.prototype.transition=mu;function pu(t){var e=0,n=t.children,r=n&&n.length;if(!r)e=1;else for(;--r>=0;)e+=n[r].value;t.value=e}function gu(){return this.eachAfter(pu)}function yu(t,e){let n=-1;for(const r of this)t.call(e,r,++n,this);return this}function vu(t,e){for(var n=this,r=[n],i,a,s=-1;n=r.pop();)if(t.call(e,n,++s,this),i=n.children)for(a=i.length-1;a>=0;--a)r.push(i[a]);return this}function xu(t,e){for(var n=this,r=[n],i=[],a,s,o,u=-1;n=r.pop();)if(i.push(n),a=n.children)for(s=0,o=a.length;s<o;++s)r.push(a[s]);for(;n=i.pop();)t.call(e,n,++u,this);return this}function wu(t,e){let n=-1;for(const r of this)if(t.call(e,r,++n,this))return r}function bu(t){return this.eachAfter(function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n})}function _u(t){return this.eachBefore(function(e){e.children&&e.children.sort(t)})}function Eu(t){for(var e=this,n=ku(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r}function ku(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;for(t=n.pop(),e=r.pop();t===e;)i=t,t=n.pop(),e=r.pop();return i}function Su(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e}function Au(){return Array.from(this)}function Lu(){var t=[];return this.eachBefore(function(e){e.children||t.push(e)}),t}function Cu(){var t=this,e=[];return t.each(function(n){n!==t&&e.push({source:n.parent,target:n})}),e}function*Tu(){var t=this,e,n=[t],r,i,a;do for(e=n.reverse(),n=[];t=e.pop();)if(yield t,r=t.children)for(i=0,a=r.length;i<a;++i)n.push(r[i]);while(n.length)}function kt(t,e){t instanceof Map?(t=[void 0,t],e===void 0&&(e=Pu)):e===void 0&&(e=Mu);for(var n=new Wt(t),r,i=[n],a,s,o,u;r=i.pop();)if((s=e(r.data))&&(u=(s=Array.from(s)).length))for(r.children=s,o=u-1;o>=0;--o)i.push(a=s[o]=new Wt(s[o])),a.parent=r,a.depth=r.depth+1;return n.eachBefore(Ou)}function Nu(){return kt(this).eachBefore(zu)}function Mu(t){return t.children}function Pu(t){return Array.isArray(t)?t[1]:null}function zu(t){t.data.value!==void 0&&(t.value=t.data.value),t.data=t.data.data}function Ou(t){var e=0;do t.height=e;while((t=t.parent)&&t.height<++e)}function Wt(t){this.data=t,this.depth=this.height=0,this.parent=null}Wt.prototype=kt.prototype={constructor:Wt,count:gu,each:yu,eachAfter:xu,eachBefore:vu,find:wu,sum:bu,sort:_u,path:Eu,ancestors:Su,descendants:Au,leaves:Lu,links:Cu,copy:Nu,[Symbol.iterator]:Tu};function Iu(t,e){return t.parent===e.parent?1:2}function Be(t){var e=t.children;return e?e[0]:t.t}function Ue(t){var e=t.children;return e?e[e.length-1]:t.t}function Fu(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,t.c+=r,e.z+=n,e.m+=n}function $u(t){for(var e=0,n=0,r=t.children,i=r.length,a;--i>=0;)a=r[i],a.z+=e,a.m+=e,e+=a.s+(n+=a.c)}function Ru(t,e,n){return t.a.parent===e.parent?t.a:n}function he(t,e){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}he.prototype=Object.create(Wt.prototype);function Du(t){for(var e=new he(t,0),n,r=[e],i,a,s,o;n=r.pop();)if(a=n._.children)for(n.children=new Array(o=a.length),s=o-1;s>=0;--s)r.push(i=n.children[s]=new he(a[s],s)),i.parent=n;return(e.parent=new he(null,0)).children=[e],e}function kr(){var t=Iu,e=1,n=1,r=null;function i(l){var c=Du(l);if(c.eachAfter(a),c.parent.m=-c.z,c.eachBefore(s),r)l.eachBefore(u);else{var f=l,h=l,m=l;l.eachBefore(function(_){_.x<f.x&&(f=_),_.x>h.x&&(h=_),_.depth>m.depth&&(m=_)});var v=f===h?1:t(f,h)/2,E=v-f.x,S=e/(h.x+v+E),y=n/(m.depth||1);l.eachBefore(function(_){_.x=(_.x+E)*S,_.y=_.depth*y})}return l}function a(l){var c=l.children,f=l.parent.children,h=l.i?f[l.i-1]:null;if(c){$u(l);var m=(c[0].z+c[c.length-1].z)/2;h?(l.z=h.z+t(l._,h._),l.m=l.z-m):l.z=m}else h&&(l.z=h.z+t(l._,h._));l.parent.A=o(l,h,l.parent.A||f[0])}function s(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function o(l,c,f){if(c){for(var h=l,m=l,v=c,E=h.parent.children[0],S=h.m,y=m.m,_=v.m,A=E.m,T;v=Ue(v),h=Be(h),v&&h;)E=Be(E),m=Ue(m),m.a=l,T=v.z+_-h.z-S+t(v._,h._),T>0&&(Fu(Ru(v,l,f),l,T),S+=T,y+=T),_+=v.m,S+=h.m,A+=E.m,y+=m.m;v&&!Ue(m)&&(m.t=v,m.m+=_-y),h&&!Be(E)&&(E.t=h,E.m+=S-A,f=l)}return f}function u(l){l.x*=e,l.y=l.depth*n}return i.separation=function(l){return arguments.length?(t=l,i):t},i.size=function(l){return arguments.length?(r=!1,e=+l[0],n=+l[1],i):r?null:[e,n]},i.nodeSize=function(l){return arguments.length?(r=!0,e=+l[0],n=+l[1],i):r?[e,n]:null},i}const ae=t=>()=>t;function Bu(t,{sourceEvent:e,target:n,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function et(t,e,n){this.k=t,this.x=e,this.y=n}et.prototype={constructor:et,scale:function(t){return t===1?this:new et(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new et(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Ct=new et(1,0,0);pn.prototype=et.prototype;function pn(t){for(;!t.__zoom;)if(!(t=t.parentNode))return Ct;return t.__zoom}function He(t){t.stopImmediatePropagation()}function It(t){t.preventDefault(),t.stopImmediatePropagation()}function Uu(t){return(!t.ctrlKey||t.type==="wheel")&&!t.button}function Hu(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t,t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]):[[0,0],[t.clientWidth,t.clientHeight]]}function Sr(){return this.__zoom||Ct}function Vu(t){return-t.deltaY*(t.deltaMode===1?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function qu(){return navigator.maxTouchPoints||"ontouchstart"in this}function Yu(t,e,n){var r=t.invertX(e[0][0])-n[0][0],i=t.invertX(e[1][0])-n[1][0],a=t.invertY(e[0][1])-n[0][1],s=t.invertY(e[1][1])-n[1][1];return t.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),s>a?(a+s)/2:Math.min(0,a)||Math.max(0,s))}function Xu(){var t=Uu,e=Hu,n=Yu,r=Vu,i=qu,a=[0,1/0],s=[[-1/0,-1/0],[1/0,1/0]],o=250,u=rc,l=Ln("start","zoom","end"),c,f,h,m=500,v=150,E=0,S=10;function y(d){d.property("__zoom",Sr).on("wheel.zoom",_t,{passive:!1}).on("mousedown.zoom",Zt).on("dblclick.zoom",Qt).filter(i).on("touchstart.zoom",Ni).on("touchmove.zoom",Mi).on("touchend.zoom touchcancel.zoom",Pi).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}y.transform=function(d,w,g,b){var k=d.selection?d.selection():d;k.property("__zoom",Sr),d!==k?P(d,w,g,b):k.interrupt().each(function(){O(this,arguments).event(b).start().zoom(null,typeof w=="function"?w.apply(this,arguments):w).end()})},y.scaleBy=function(d,w,g,b){y.scaleTo(d,function(){var k=this.__zoom.k,L=typeof w=="function"?w.apply(this,arguments):w;return k*L},g,b)},y.scaleTo=function(d,w,g,b){y.transform(d,function(){var k=e.apply(this,arguments),L=this.__zoom,C=g==null?T(k):typeof g=="function"?g.apply(this,arguments):g,N=L.invert(C),z=typeof w=="function"?w.apply(this,arguments):w;return n(A(_(L,z),C,N),k,s)},g,b)},y.translateBy=function(d,w,g,b){y.transform(d,function(){return n(this.__zoom.translate(typeof w=="function"?w.apply(this,arguments):w,typeof g=="function"?g.apply(this,arguments):g),e.apply(this,arguments),s)},null,b)},y.translateTo=function(d,w,g,b,k){y.transform(d,function(){var L=e.apply(this,arguments),C=this.__zoom,N=b==null?T(L):typeof b=="function"?b.apply(this,arguments):b;return n(Ct.translate(N[0],N[1]).scale(C.k).translate(typeof w=="function"?-w.apply(this,arguments):-w,typeof g=="function"?-g.apply(this,arguments):-g),L,s)},b,k)};function _(d,w){return w=Math.max(a[0],Math.min(a[1],w)),w===d.k?d:new et(w,d.x,d.y)}function A(d,w,g){var b=w[0]-g[0]*d.k,k=w[1]-g[1]*d.k;return b===d.x&&k===d.y?d:new et(d.k,b,k)}function T(d){return[(+d[0][0]+ +d[1][0])/2,(+d[0][1]+ +d[1][1])/2]}function P(d,w,g,b){d.on("start.zoom",function(){O(this,arguments).event(b).start()}).on("interrupt.zoom end.zoom",function(){O(this,arguments).event(b).end()}).tween("zoom",function(){var k=this,L=arguments,C=O(k,L).event(b),N=e.apply(k,L),z=g==null?T(N):typeof g=="function"?g.apply(k,L):g,W=Math.max(N[1][0]-N[0][0],N[1][1]-N[0][1]),I=k.__zoom,H=typeof w=="function"?w.apply(k,L):w,Z=u(I.invert(z).concat(W/I.k),H.invert(z).concat(W/H.k));return function(V){if(V===1)V=H;else{var Q=Z(V),Me=W/Q[2];V=new et(Me,z[0]-Q[0]*Me,z[1]-Q[1]*Me)}C.zoom(null,V)}})}function O(d,w,g){return!g&&d.__zooming||new U(d,w)}function U(d,w){this.that=d,this.args=w,this.active=0,this.sourceEvent=null,this.extent=e.apply(d,w),this.taps=0}U.prototype={event:function(d){return d&&(this.sourceEvent=d),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(d,w){return this.mouse&&d!=="mouse"&&(this.mouse[1]=w.invert(this.mouse[0])),this.touch0&&d!=="touch"&&(this.touch0[1]=w.invert(this.touch0[0])),this.touch1&&d!=="touch"&&(this.touch1[1]=w.invert(this.touch1[0])),this.that.__zoom=w,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(d){var w=ct(this.that).datum();l.call(d,this.that,new Bu(d,{sourceEvent:this.sourceEvent,target:y,transform:this.that.__zoom,dispatch:l}),w)}};function _t(d,...w){if(!t.apply(this,arguments))return;var g=O(this,w).event(d),b=this.__zoom,k=Math.max(a[0],Math.min(a[1],b.k*Math.pow(2,r.apply(this,arguments)))),L=dt(d);if(g.wheel)(g.mouse[0][0]!==L[0]||g.mouse[0][1]!==L[1])&&(g.mouse[1]=b.invert(g.mouse[0]=L)),clearTimeout(g.wheel);else{if(b.k===k)return;g.mouse=[L,b.invert(L)],fe(this),g.start()}It(d),g.wheel=setTimeout(C,v),g.zoom("mouse",n(A(_(b,k),g.mouse[0],g.mouse[1]),g.extent,s));function C(){g.wheel=null,g.end()}}function Zt(d,...w){if(h||!t.apply(this,arguments))return;var g=d.currentTarget,b=O(this,w,!0).event(d),k=ct(d.view).on("mousemove.zoom",z,!0).on("mouseup.zoom",W,!0),L=dt(d,g),C=d.clientX,N=d.clientY;Nl(d.view),He(d),b.mouse=[L,this.__zoom.invert(L)],fe(this),b.start();function z(I){if(It(I),!b.moved){var H=I.clientX-C,Z=I.clientY-N;b.moved=H*H+Z*Z>E}b.event(I).zoom("mouse",n(A(b.that.__zoom,b.mouse[0]=dt(I,g),b.mouse[1]),b.extent,s))}function W(I){k.on("mousemove.zoom mouseup.zoom",null),Ml(I.view,b.moved),It(I),b.event(I).end()}}function Qt(d,...w){if(t.apply(this,arguments)){var g=this.__zoom,b=dt(d.changedTouches?d.changedTouches[0]:d,this),k=g.invert(b),L=g.k*(d.shiftKey?.5:2),C=n(A(_(g,L),b,k),e.apply(this,w),s);It(d),o>0?ct(this).transition().duration(o).call(P,C,b,d):ct(this).call(y.transform,C,b,d)}}function Ni(d,...w){if(t.apply(this,arguments)){var g=d.touches,b=g.length,k=O(this,w,d.changedTouches.length===b).event(d),L,C,N,z;for(He(d),C=0;C<b;++C)N=g[C],z=dt(N,this),z=[z,this.__zoom.invert(z),N.identifier],k.touch0?!k.touch1&&k.touch0[2]!==z[2]&&(k.touch1=z,k.taps=0):(k.touch0=z,L=!0,k.taps=1+!!c);c&&(c=clearTimeout(c)),L&&(k.taps<2&&(f=z[0],c=setTimeout(function(){c=null},m)),fe(this),k.start())}}function Mi(d,...w){if(this.__zooming){var g=O(this,w).event(d),b=d.changedTouches,k=b.length,L,C,N,z;for(It(d),L=0;L<k;++L)C=b[L],N=dt(C,this),g.touch0&&g.touch0[2]===C.identifier?g.touch0[0]=N:g.touch1&&g.touch1[2]===C.identifier&&(g.touch1[0]=N);if(C=g.that.__zoom,g.touch1){var W=g.touch0[0],I=g.touch0[1],H=g.touch1[0],Z=g.touch1[1],V=(V=H[0]-W[0])*V+(V=H[1]-W[1])*V,Q=(Q=Z[0]-I[0])*Q+(Q=Z[1]-I[1])*Q;C=_(C,Math.sqrt(V/Q)),N=[(W[0]+H[0])/2,(W[1]+H[1])/2],z=[(I[0]+Z[0])/2,(I[1]+Z[1])/2]}else if(g.touch0)N=g.touch0[0],z=g.touch0[1];else return;g.zoom("touch",n(A(C,N,z),g.extent,s))}}function Pi(d,...w){if(this.__zooming){var g=O(this,w).event(d),b=d.changedTouches,k=b.length,L,C;for(He(d),h&&clearTimeout(h),h=setTimeout(function(){h=null},m),L=0;L<k;++L)C=b[L],g.touch0&&g.touch0[2]===C.identifier?delete g.touch0:g.touch1&&g.touch1[2]===C.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(C=dt(C,this),Math.hypot(f[0]-C[0],f[1]-C[1])<S)){var N=ct(this).on("dblclick.zoom");N&&N.apply(this,arguments)}}}return y.wheelDelta=function(d){return arguments.length?(r=typeof d=="function"?d:ae(+d),y):r},y.filter=function(d){return arguments.length?(t=typeof d=="function"?d:ae(!!d),y):t},y.touchable=function(d){return arguments.length?(i=typeof d=="function"?d:ae(!!d),y):i},y.extent=function(d){return arguments.length?(e=typeof d=="function"?d:ae([[+d[0][0],+d[0][1]],[+d[1][0],+d[1][1]]]),y):e},y.scaleExtent=function(d){return arguments.length?(a[0]=+d[0],a[1]=+d[1],y):[a[0],a[1]]},y.translateExtent=function(d){return arguments.length?(s[0][0]=+d[0][0],s[1][0]=+d[1][0],s[0][1]=+d[0][1],s[1][1]=+d[1][1],y):[[s[0][0],s[0][1]],[s[1][0],s[1][1]]]},y.constrain=function(d){return arguments.length?(n=d,y):n},y.duration=function(d){return arguments.length?(o=+d,y):o},y.interpolate=function(d){return arguments.length?(u=d,y):u},y.on=function(){var d=l.on.apply(l,arguments);return d===l?y:d},y.clickDistance=function(d){return arguments.length?(E=(d=+d)*d,y):Math.sqrt(E)},y.tapDistance=function(d){return arguments.length?(S=+d,y):S},y}function Wu(t,e){let n;return(...r)=>{n||(t(...r),n=!0,setTimeout(()=>n=!1,e))}}class ju{constructor(e){this.container=e,this.svg=null,this.g=null,this.width=e.clientWidth||1e3,this.height=Math.max(window.innerHeight-200,600),this.expandedNodes=new Set,this.zoomLevel=1,this.nodeId=0,this.zoomBehavior=null,this.treeData=null,this.listeners=new Map,this.renderControls()}renderControls(){const e=document.createElement("div");e.className="diagram-controls",e.innerHTML=`
      <div class="control-group">
        <button id="zoomInBtn" title="Zoom In" aria-label="Zoom in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
        <button id="zoomOutBtn" title="Zoom Out" aria-label="Zoom out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"/>
          </svg>
        </button>
        <span id="zoomLevel" class="zoom-level" aria-live="polite">100%</span>
      </div>
      <div class="control-group">
        <button id="expandAllBtn" title="Expand All" aria-label="Expand all nodes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16v16H4zM8 12h8M12 8v8"/>
          </svg>
        </button>
        <button id="collapseAllBtn" title="Collapse All" aria-label="Collapse all nodes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16v16H4zM8 12h8"/>
          </svg>
        </button>
      </div>
      <div class="control-group">
        <button id="resetViewBtn" title="Reset View" aria-label="Reset view">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4c5-5 14-5 19 0M4 20c5 5 14 5 19 0"/>
          </svg>
        </button>
      </div>
    `,this.container.appendChild(e),this.setupControlListeners()}setupControlListeners(){this.cleanupListeners("controls"),Object.entries({"#zoomInBtn":()=>this.zoom(1.2),"#zoomOutBtn":()=>this.zoom(.8),"#expandAllBtn":()=>this.expandAll(),"#collapseAllBtn":()=>this.collapseAll(),"#resetViewBtn":()=>this.resetView()}).forEach(([n,r])=>{const i=this.container.querySelector(n);if(i){const a=()=>r();i.addEventListener("click",a),this.listeners.set(i,[["click",a]])}})}cleanupListeners(e="all"){this.listeners.forEach((n,r)=>{(e==="all"||e==="controls"&&r.tagName==="BUTTON")&&(n.forEach(([i,a])=>r.removeEventListener(i,a)),this.listeners.delete(r))})}render(e,n={},r="url",i=""){Y(50),this.container.innerHTML="",this.svg=null,this.g=null,this.treeData=null,this.renderControls();const a=this.filterUrls(e,n,i),s=this.sortUrls(a,r);this.treeData=this.buildTree(s);try{this.drawDiagram()}catch(o){console.error("Failed to render diagram:",o)}nt()}filterUrls(e,n,r){return e.filter(i=>{const a=parseFloat(i.priority)||0,s=i.lastmod?new Date(i.lastmod):null,o=parseFloat(n.priority)||0,u=n.lastmod?new Date(n.lastmod):null;return(!r||i.loc.toLowerCase().includes(r.toLowerCase()))&&a>=o&&(!u||s&&s>=u)})}sortUrls(e,n){return e.sort((r,i)=>n==="lastmod"?new Date(i.lastmod||0)-new Date(r.lastmod||0)||r.loc.localeCompare(i.loc):n==="priority"&&parseFloat(i.priority||0)-parseFloat(r.priority||0)||r.loc.localeCompare(i.loc))}buildTree(e){const n={name:"Sitemap",children:[],isLazy:!0},r=new Map;return e.forEach(i=>{try{const s=new URL(i.loc||"").hostname;let o=r.get(s);o||(o={name:s,children:[],isLazy:!0},r.set(s,o),n.children.push(o)),o.children.length||o.children.push({name:"URLs",urlCount:0,children:[],isLazy:!0}),o.children[0].urlCount=(o.children[0].urlCount||0)+1,o.children[0].urls=o.children[0].urls||[],o.children[0].urls.push(i)}catch(a){console.warn(`Skipping invalid URL: ${i.loc}`,a)}}),n}async loadLazyChildren(e){e.data.isLazy&&e.data.urls&&!e.children&&(e.children=e.data.urls.map(n=>({name:n.loc.split("/").pop(),url:n,children:[]})),e.data.isLazy=!1)}drawDiagram(){const e={top:60,right:120,bottom:60,left:120};this.width=this.container.clientWidth-e.left-e.right,this.height=this.container.clientHeight-e.top-e.bottom,this.svg=ct(this.container).append("svg").attr("width",this.width+e.left+e.right).attr("height",this.height+e.top+e.bottom).attr("role","tree").style("background","#fafafa"),this.g=this.svg.append("g").attr("transform",`translate(${e.left},${e.top})`),this.zoomBehavior=Xu().scaleExtent([.3,5]).on("zoom",Wu(a=>this.zoomed(a),50)),this.svg.call(this.zoomBehavior).on("dblclick.zoom",null).on("wheel.zoom",null),this.svg.on("wheel",a=>{a.preventDefault();const s=a.deltaY<0?1.1:.9;this.zoom(s,a.clientX,a.clientY)});const n=kt(this.treeData),i=kr().nodeSize([60,250])(n);i.x0=this.width/2,i.y0=0,i.children.forEach(a=>this.collapse(a,!0)),this.g.datum(i),this.update(i),this.fitToView(i)}zoomed(e){this.g&&(this.g.attr("transform",e.transform),this.zoomLevel=e.transform.k,this.updateZoomLevelDisplay())}zoom(e,n=null,r=null){if(!this.svg||!this.zoomBehavior)return;const i=pn(this.svg.node());let a=i.k*e;if(n&&r){const s=this.svg.node().getBoundingClientRect(),o=n-s.left,u=r-s.top,l=o-(o-i.x)*e/i.k,c=u-(u-i.y)*e/i.k;this.svg.transition().duration(300).call(this.zoomBehavior.transform,Ct.translate(l,c).scale(a))}else this.svg.transition().duration(300).call(this.zoomBehavior.scaleBy,e)}updateZoomLevelDisplay(){const e=Math.round(this.zoomLevel*100),n=this.container.querySelector("#zoomLevel");n&&(n.textContent=`${e}%`)}update(e){const i=kr().nodeSize([60,250])(e),a=this.g.selectAll(".link").data(i.links(),c=>c.target.id),s=a.enter().append("path").attr("class","link").attr("d",c=>this.diagonal({x:e.x0,y:e.y0},{x:e.x0,y:e.y0}));a.merge(s).transition().duration(650).attr("d",c=>this.diagonal(c.source,c.target)),a.exit().transition().duration(650).attr("d",c=>this.diagonal({x:e.x,y:e.y},{x:e.x,y:e.y})).remove();const o=this.g.selectAll(".node").data(i.descendants(),c=>c.id||(c.id=++this.nodeId)),u=o.enter().append("g").attr("class","node").attr("transform",c=>`translate(${e.y0},${e.x0})`).on("click",async(c,f)=>{f.data.isLazy&&!f.children&&!f._children?(Y(50),await this.loadLazyChildren(f),nt(),f.children&&this.update(f)):f.children?(f._children=f.children,f.children=null,this.expandedNodes.delete(f.data.name)):f._children&&(f.children=f._children,f._children=null,this.expandedNodes.add(f.data.name)),this.update(f),this.centerNode(f)});u.filter(c=>c.children||c._children||c.data.isLazy).append("rect").attr("class","folder-bg").attr("width",160).attr("height",40).attr("x",-80).attr("y",-20).attr("rx",8),u.filter(c=>c.children||c._children||c.data.isLazy).append("path").attr("class","folder-icon").attr("d","M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8L10 4z").attr("transform","translate(-65, -18) scale(1.2)"),u.append("text").attr("dy","0.35em").attr("x",c=>c.children||c._children||c.data.isLazy?-30:10).attr("text-anchor",c=>c.children||c._children||c.data.isLazy?"end":"start").attr("class",c=>c.children||c._children||c.data.isLazy?"folder-label":"url-label").text(c=>c.data.urlCount?`${c.data.name} (${c.data.urlCount})`:c.data.name.length>25?`${c.data.name.slice(0,22)}...`:c.data.name).on("click",(c,f)=>{c.stopPropagation(),f.data.url&&window.open(f.data.url.loc,"_blank")}),u.append("title").text(c=>c.data.url?this.formatUrl(c.data.url):c.data.name);const l=o.merge(u).transition().duration(650).attr("transform",c=>`translate(${c.y},${c.x})`);l.select(".folder-bg").attr("x",-80).attr("y",-20),l.select(".folder-icon").attr("transform","translate(-65, -18) scale(1.2)"),l.select("text").attr("x",c=>c.children||c._children||c.data.isLazy?-30:10).attr("text-anchor",c=>c.children||c._children||c.data.isLazy?"end":"start"),o.exit().transition().duration(650).attr("transform",c=>`translate(${e.y},${e.x})`).remove(),i.each(c=>{c.x0=c.x,c.y0=c.y})}diagonal(e,n){return`M ${e.y} ${e.x} C ${e.y} ${(e.x+n.x)/2}, ${n.y} ${(e.x+n.x)/2}, ${n.y} ${n.x}`}formatUrl(e){let n=e.loc;return e.lastmod&&(n+=`
Last Modified: ${e.lastmod}`),e.changefreq&&(n+=`
Change Frequency: ${e.changefreq}`),e.priority&&(n+=`
Priority: ${e.priority}`),n}centerNode(e){if(!this.svg||!this.zoomBehavior||!this.g)return;const r=pn(this.svg.node()).k,i=-e.y*r+this.width/2,a=-e.x*r+this.height/2;this.svg.transition().duration(650).call(this.zoomBehavior.transform,Ct.translate(i,a).scale(r))}expandAll(){if(!this.g)return;const e=kt(this.g.datum());e.descendants().forEach(async n=>{n.data.isLazy&&await this.loadLazyChildren(n),n._children&&(n.children=n._children,n._children=null,this.expandedNodes.add(n.data.name))}),this.update(e),this.fitToView(e)}collapseAll(){if(!this.g)return;const e=kt(this.g.datum());e.descendants().forEach(n=>this.collapse(n)),this.update(e),this.fitToView(e)}collapse(e,n=!1){e.children&&(e._children=e.children,e._children.forEach(r=>this.collapse(r)),e.children=null,n||this.expandedNodes.delete(e.data.name))}fitToView(e){if(!this.zoomBehavior||!this.g)return;const n=this.getTreeBounds(e),r=n.maxY-n.minY,i=n.maxX-n.minX,a=this.width/(r||1),s=this.height/(i||1),o=Math.min(a,s,2)*.9,u=this.width/2-(n.minY+r/2)*o,l=this.height/2-(n.minX+i/2)*o;this.svg.transition().duration(650).call(this.zoomBehavior.transform,Ct.translate(u,l).scale(o)),this.zoomLevel=o,this.updateZoomLevelDisplay()}getTreeBounds(e){let n=1/0,r=-1/0,i=1/0,a=-1/0;return e.each(s=>{n=Math.min(n,s.x),r=Math.max(r,s.x),i=Math.min(i,s.y),a=Math.max(a,s.y)}),{minX:n,maxX:r,minY:i,maxY:a}}resetView(){if(!this.g)return;const e=kt(this.g.datum());this.fitToView(e)}destroy(){this.svg&&(this.svg.on(".zoom",null),this.svg.on("wheel",null)),this.cleanupListeners(),this.container.innerHTML="",this.svg=null,this.g=null,this.zoomBehavior=null,this.treeData=null,this.expandedNodes.clear()}}function Gu(t,e){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>t(...r),e)}}class Ku{constructor(e,n={}){this.container=e,this.options={onApply:n.onApply||(()=>{}),onReset:n.onReset||(()=>{}),onSearch:n.onSearch||(()=>{}),...n},this.isExpanded=!1,this.state={search:"",priority:"0",lastmod:"",sortBy:"url"},this.listeners=new Map,this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
      <div class="search-container">
        <input type="text" id="urlSearch" placeholder="Search URLs..." value="${this.state.search}" aria-label="Search URLs">
        <span id="toggleFiltersLink" class="filter-toggle" aria-expanded="${this.isExpanded}" role="button" tabindex="0">
          ${this.isExpanded?"Hide filters":"Show filters"}
        </span>
      </div>
      <div id="additional-filters" class="${this.isExpanded?"":"hidden"}">
        <div class="filter-group">
          <label for="priorityFilter">Min Priority:</label>
          <input type="number" id="priorityFilter" min="0" max="1" step="0.1" value="${this.state.priority}" aria-label="Minimum priority filter">
        </div>
        <div class="filter-group">
          <label for="lastmodFilter">Last Modified After:</label>
          <input type="date" id="lastmodFilter" value="${this.state.lastmod}" aria-label="Last modified after date filter">
        </div>
        <div class="filter-group">
          <label for="sortBy">Sort By:</label>
          <select id="sortBy" aria-label="Sort by">
            <option value="url" ${this.state.sortBy==="url"?"selected":""}>URL</option>
            <option value="lastmod" ${this.state.sortBy==="lastmod"?"selected":""}>Last Modified</option>
            <option value="priority" ${this.state.sortBy==="priority"?"selected":""}>Priority</option>
          </select>
        </div>
        <div class="filter-actions">
          <button id="applyFiltersBtn" aria-label="Apply filters">Apply</button>
          <button id="resetFiltersBtn" aria-label="Reset filters">Reset</button>
        </div>
      </div>
    `}setupEventListeners(){this.cleanupListeners();const e=this.container.querySelector("#urlSearch");if(e){const a=Gu(()=>{this.state.search=e.value.toLowerCase(),this.options.onSearch(this.state.search)},300);e.addEventListener("input",a),this.listeners.set(e,[["input",a]])}const n=this.container.querySelector("#toggleFiltersLink");if(n){const a=()=>{this.isExpanded=!this.isExpanded,this.render(),this.setupEventListeners(),n.focus()};n.addEventListener("click",a),n.addEventListener("keydown",s=>s.key==="Enter"&&a()),this.listeners.set(n,[["click",a],["keydown",s=>s.key==="Enter"&&a()]])}const r=this.container.querySelector("#applyFiltersBtn");if(r){const a=()=>{const s=Math.min(1,Math.max(0,parseFloat(this.container.querySelector("#priorityFilter").value)||0)).toString(),o=this.container.querySelector("#lastmodFilter").value,u=this.container.querySelector("#sortBy").value;(s!==this.state.priority||o!==this.state.lastmod||u!==this.state.sortBy)&&(this.state.priority=s,this.state.lastmod=o,this.state.sortBy=u,this.options.onApply({priority:this.state.priority,lastmod:this.state.lastmod},this.state.sortBy))};r.addEventListener("click",a),this.listeners.set(r,[["click",a]])}const i=this.container.querySelector("#resetFiltersBtn");if(i){const a=()=>{this.state={search:"",priority:"0",lastmod:"",sortBy:"url"},this.render(),this.setupEventListeners(),this.options.onReset()};i.addEventListener("click",a),this.listeners.set(i,[["click",a]])}}cleanupListeners(){this.listeners.forEach((e,n)=>{e.forEach(([r,i])=>n.removeEventListener(r,i))}),this.listeners.clear()}toggleVisibility(e){this.isExpanded=e,this.render(),this.setupEventListeners()}destroy(){this.cleanupListeners(),this.container.innerHTML=""}}function Ju(t){t.innerHTML=`
    <h2>Sitemap Scan</h2>
    <div id="view-toggle">
      <button id="treeViewBtn" class="view-btn active">Tree View</button>
      <button id="diagramViewBtn" class="view-btn">Diagram View</button>
    </div>
    <div id="filters-container">
      <div id="filters"></div>
    </div>
    <div id="stats">
      <p>Total URLs: <span id="totalUrls">0</span></p>
      <p>Unique Domains: <span id="uniqueDomains">0</span></p>
      <p>Matches: <span id="matchCount"></span></p>
    </div>
    <div id="view-container">
      <div id="tree" class="tree"></div>
      <div id="diagram" class="diagram view-hidden"></div>
    </div>
    <div id="status">
      <div id="loading" class="hidden">
        <progress id="loadProgress" max="100" value="0"></progress>
        <span>Loading...</span>
      </div>
      <div id="feedback" class="hidden"></div>
      <div id="error" class="hidden"></div>
    </div>
  `;const n=t.querySelector("#filters-container").querySelector("#filters"),r=t.querySelector("#tree"),i=t.querySelector("#diagram"),a=new Xs(r),s=new ju(i);let o=[],u={},l="url",c="",f="tree";const h=new Ku(n,{onApply:(_,A)=>{u=_,l=A,m(),v()},onReset:()=>{u={},l="url",c="",m(),v()},onSearch:_=>{c=_,m(),v()}});function m(){f==="tree"?(a.render(o,u,l,c),r.classList.remove("view-hidden"),i.classList.add("view-hidden")):(s.render(o,u,l,c),i.classList.remove("view-hidden"),r.classList.add("view-hidden"))}function v(){const A=(f==="tree"?r:i).querySelectorAll(f==="tree"?".url-leaf":".node text.url-label").length;t.querySelector("#matchCount").textContent=`(${A} of ${o.length} URLs)`}const E=t.querySelector("#treeViewBtn"),S=t.querySelector("#diagramViewBtn");return E.addEventListener("click",()=>{f!=="tree"&&(f="tree",E.classList.add("active"),S.classList.remove("active"),m(),v())}),S.addEventListener("click",()=>{f!=="diagram"&&(f="diagram",S.classList.add("active"),E.classList.remove("active"),m(),v())}),(async()=>{const A=new URLSearchParams(window.location.search).get("id");if(!A){pt("No sitemap ID provided. Please load a sitemap first.");return}Y(10);try{const T=await fetch(`/sitemap/results-data?id=${A}`);if(!T.ok){const O=await T.json();throw new Error(O.error||"Failed to load sitemap data")}const P=await T.json();o=P.urls,Y(50),m(),Y(100),de(`Loaded ${P.urlCount} URLs`),t.querySelector("#totalUrls").textContent=P.urlCount,t.querySelector("#uniqueDomains").textContent=new Set(o.map(O=>new URL(O.loc).hostname)).size,St.updateUrls(o),v()}catch(T){pt(T.message)}finally{nt()}})(),{treeView:a,onToggleFilters:_=>{h.toggleVisibility(_)},urls:o}}let St,R,mt=null;function _e(t){if((!R||!document.getElementById("view"))&&(console.error("Main element not available or invalid for routing:",{mainElExists:!!R,viewInDOM:!!document.getElementById("view")}),R=document.getElementById("view"),!R))return;console.debug("Routing to:",t),mt&&(console.debug("Cleaning up previous page before routing"),mt(),mt=null),R.innerHTML="",console.debug("Cleared mainEl content");let e={};try{switch(t){case"/":console.debug("Setting up input page"),e=qs(R)||{},mt=null;break;case"/results":console.debug("Setting up results page"),e=Ju(R)||{},mt=e.cleanup||null;break;default:R.innerHTML="<h2>404 - Page not found</h2>",mt=null}St?(console.debug("Updating header with path:",t),St.updateRoute(t),e.urls&&St.updateUrls(e.urls),(e.treeView||e.onToggleFilters)&&St.updateOptions({treeView:e.treeView,onToggleFilters:e.onToggleFilters})):console.warn("Header instance not initialized during route update"),console.debug("Route completed, mainEl content:",R.innerHTML.substring(0,100))}catch(n){console.error("Routing error:",n),R.innerHTML=`<h2>Error: ${n.message}</h2>`,mt=null}}document.addEventListener("DOMContentLoaded",()=>{R=document.getElementById("view");const t=document.getElementById("header");if(!R||!t){console.error("DOM initialization failed:",{mainFound:!!R,headerFound:!!t,documentBody:document.body.innerHTML.substring(0,200)}),document.body.innerHTML="<h2>Error: Required DOM elements not found</h2>";return}St=new Hs(t),_e(window.location.pathname),window.addEventListener("popstate",e=>{console.debug("Popstate event triggered, routing to:",window.location.pathname),_e(window.location.pathname)})});
