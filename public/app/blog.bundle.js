webpackJsonp([6],{14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(7),r=(function(e){e&&e.__esModule}(a),function(){function e(){o.removeEventListener("animationend",e,!1),r.appendChild(c),o.style.transform="scale(0.001)",o.style.WebkitTransform="scale(0.001)",o.classList.remove("animate"),c.classList.add("to_open");var t=c.querySelector("#closeOverlay"),n=window.location.pathname;c.querySelector('.c-hamburger-nav__link[href="'+n+'"]').parentElement.addEventListener("click",a),t.addEventListener("click",a,!1),r.addEventListener("keydown",d,!1)}function t(t){t.preventDefault(),o.classList.add("animate"),o.addEventListener("animationend",e,!1)}function n(){this.removeEventListener("animationend",n,!1),this.classList.remove("animate"),c.classList.remove("to_close"),c.classList.remove("to_open"),c.remove(),o.style.transform="scale(1.1)",o.style.WebkitTransform="scale(1.1)",o.addEventListener("click",t,!1)}function a(e){e.preventDefault();var t=c.querySelector("#closeOverlay");t.removeEventListener("click",a,!1),r.removeEventListener("keydown",d,!1),c.classList.add("to_close"),t.classList.add("animate"),t.addEventListener("animationend",n,!1)}var r=document.body,i=r.querySelector(".c-hamburger-nav"),o=i.querySelector("#openOverlay"),c=void 0,s=i.querySelector("#hamburgerTemplate"),l=function(){c=document.createElement("div"),c.classList.add("overlay"),c.innerHTML=s.innerHTML},d=function(e){switch(e.which){case 27:a(e);break;default:return}return!1};return{handler:function(){l(),o.addEventListener("click",t,!1)}}}());t.default=r},186:function(e,t,n){e.exports=n(187)},187:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}n(11),n(188);var r=n(12),i=a(r),o=n(189),c=a(o),s=n(14),l=a(s),d=n(8),u=a(d),f=n(190),v=a(f);(0,i.default)(),n.e(0).then(function(){var e=[n(15)];u.default.apply(null,e)}.bind(this)).catch(n.oe);var m=function(){(0,c.default)(),v.default.init(),l.default.handler()};window.onload=m,console.log("It` work %%%!")},188:function(e,t){},189:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e=document.body.querySelectorAll("pre");[].forEach.call(e,function(e){e.classList.add("prettyprint"),e.classList.add("linenums")});var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)};t.default=a},190:function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){f=document.createElement("div"),f.id="fixedNav",f.classList.add("c-blog__aside"),f.classList.add("visually-hidden"),f.classList.add("pos-fixed"),f.innerHTML=c.innerHTML,n.appendChild(f),[].concat(a(f.querySelectorAll(".c-blog__nav-link"))).forEach(function(e){e.addEventListener("click",t,!1)}),v.matches&&f.querySelector(".c-blog__menu-swipe").addEventListener("click",E,!1)}function t(e){if(window.location.hash){var t=e?this.getAttribute("href"):window.location.hash,c=n.querySelector('.c-blog__article[data-section="'+t.replace(/#/,"")+'"'),s=[].concat(a(n.querySelectorAll('.c-blog__nav-link[href="'+t+'"'))),l=r.indexOf(c);p(s),window.location.hash=c.dataset.section;var m=0===l?d:d+o[l]+.05*u.width;i.removeEventListener("scroll",L,!1),e?(v.matches&&(f.classList.add("animateClose"),f.addEventListener("animationend",g,!1)),b(e,m)):i.scrollTop=m}}var n=document.body,r=[].concat(a(n.querySelectorAll(".c-blog__article"))),i=n.querySelector(".l-scroll-parallax-container"),o=r.map(function(e){return e.offsetTop}),c=n.querySelector("#absoluteNav"),s=[].concat(a(c.querySelectorAll(".c-blog__nav-link"))),l=c.querySelector(".c-blog__menu-swipe"),d=n.querySelector(".parallax__content").offsetTop,u=n.querySelector(".l-hero_blog").getBoundingClientRect(),f=void 0,v=window.matchMedia("(max-width: 768px)"),m=function(e){return[].concat(a(e.parentElement.children)).filter(function(t){return t!=e})},y=!1,h=function(e){if(e<=o[0])return 0;for(var t=0;t<o.length-1;t++)if(e>o[t]&&e<o[t+1])return t;return o.length-1},p=function(e){e.forEach(function(e){var t=e.parentElement;t.classList.add("is-active"),[].forEach.call(m(t),function(e){e.classList.contains("is-active")&&e.classList.remove("is-active")})})},L=function(){var e=i.scrollTop;f&&e<=o[0]+d&&c.classList.contains("visually-hidden")&&(v.matches&&f.classList.contains("animateOpen")||(f.classList.add("visually-hidden"),c.classList.remove("visually-hidden"))),f&&e>d-.04*u.width&&(c.classList.add("visually-hidden"),f.classList.contains("visually-hidden")&&f.classList.remove("visually-hidden"));var t=r[h(e-.04*u.width)].dataset.section,s=[].concat(a(n.querySelectorAll('.c-blog__nav-link[href="#'+t+'"')));y||(window.location.hash=t,p(s)),y=!1},g=function e(){f.classList.remove("animateOpen"),f.removeEventListener("animationend",e,!1)},_=function(e){y=!0;var t=performance.now(),n=i.scrollTop;requestAnimationFrame(function a(r){var o=(r-t)/e.duration;o>1&&(o=1,i.addEventListener("scroll",L,!1));var c=e.timing(o);e.move(c,n),o<1&&requestAnimationFrame(a)})},b=function(e,t){e.preventDefault(),_({duration:700,timing:function(e){return e},move:function(e,n){i.scrollTop=n+(t-n)*e}})},E=function(e){e.preventDefault(),c.classList.add("visually-hidden"),f.classList.remove("visually-hidden"),f.classList.remove("animateClose"),f.classList.add("overlay-mobile"),f.classList.add("animateOpen")};return{init:function(){e(),t(),i.addEventListener("scroll",L,!1),s.forEach(function(e){e.addEventListener("click",t,!1)}),l.addEventListener("click",E,!1)}}}();t.default=r},8:function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t=new e,n=document.body,r=[].concat(a(n.querySelectorAll("img"))),i=r.map(function(e){return e.src}),o=["../assets/images/decor/bg/mountains.jpg"],c=n.querySelector("#loader"),s=c.querySelector("#preloaderText"),l=[].concat(a(i),o),d=[].concat(a(c.querySelectorAll("circle"))).reverse(),u=l.length,f=0;t.onProgress=function(){s.textContent=""+parseInt(++f/u*100),d.forEach(function(e,t){var n=2*Math.PI*e.getAttributeNode("r").nodeValue,a=(n*(1-(f-1)/(u-1))).toFixed(4);e.setAttribute("stroke-dashoffset",""+a*(t+1)*.7)})},function(){d.forEach(function(e){var t=(2*Math.PI*e.getAttributeNode("r").nodeValue).toFixed(4);e.setAttribute("stroke-dasharray",""+t),e.setAttribute("stroke-dashoffset",""+t),e.style.opacity="1"})}(),t.preload(l).then(function(){setTimeout(function(){n.querySelector(".l-wrapper").style.height="100%",r.forEach(function(e){e.style.display="block"}),n.classList.add("loaded")},500)})};t.default=r}},[186]);
//# sourceMappingURL=blog.bundle.js.map