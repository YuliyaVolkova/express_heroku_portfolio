webpackJsonp([0],{15:function(n,t,r){n.exports=r(267)},267:function(n,t,r){var e=r(268),o=function(n,t){this.onProgress="function"==typeof t?t:null,this.fallbackImage="string"==typeof n||n instanceof HTMLImageElement?n:null};o.simplePreload=function(n){return new Promise(function(t,r){var e;n instanceof HTMLImageElement?(e=n,e.complete?e.naturalHeight?t(e):r(e):(e.onload=t.bind(null,e),e.onerror=e.onabort=r.bind(null,e))):"string"==typeof n&&(e=new Image,e.onload=t.bind(null,e),e.onerror=e.onabort=r.bind(null,e),e.src=n)})},o.prototype.preload=function(n){var t=this,r=Array.prototype.concat.apply([],Array.prototype.slice.call(arguments));return r=r.map(function(n){return o.simplePreload(n).catch(function(n){return t.fallbackImage?o.simplePreload(t.fallbackImage).then(function(t){return n.setAttribute("data-fail-src",n.src),n.src=t.src,n},function(){return Promise.reject(n)}):Promise.reject(n)})}),e(r,t.onProgress)},n.exports=o},268:function(n,t){function r(n,t){var r=n.map(function(n){return n.then(function(n){return{value:n,status:!0}},function(n){return{value:n,status:!1}}).then(function(n){return"function"==typeof t&&t(n),n})});return Promise.all(r)}n.exports=r}});
//# sourceMappingURL=0.bundle.js.map