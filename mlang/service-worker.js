"use strict";var precacheConfig=[["/index.html","78c7160c8f49c1a9f053b55232c9f374"],["/static/css/main.65027555.css","41e5e45b9b5d9ecaa09b72c11eed3386"],["/static/js/main.95d4ea61.js","157af75f6b705057b74d85e5f890521f"],["/static/media/background.c8dead68.png","c8dead68e11373f6dbdb9b57d9ae0abb"],["/static/media/background2.8b915a4f.png","8b915a4f014550c0c2875518739b638a"],["/static/media/badge_corner_featured.149ec2cd.png","149ec2cd15984592efb9f258636a175f"],["/static/media/badge_corner_passed.ca733c0e.png","ca733c0eabb2db9344b2814354abe6e7"],["/static/media/btn_green.c117b24f.png","c117b24fd7487b7b91886924f0747144"],["/static/media/btn_red.4b2aef9e.png","4b2aef9e5fc5162eddd50f1b88569cfe"],["/static/media/cards_lightgrey.5d2597a0.png","5d2597a0db921cfd6ec3e91d825ab9e3"],["/static/media/event_grey.e889df44.png","e889df4449d2375ad3c9f20b3fef51f4"],["/static/media/menu_bg.5281c8aa.png","5281c8aab1873e44dff9fdbb2c0a4162"],["/static/media/mlang_green.ef0a45b0.png","ef0a45b080a088fccd7ead54958aa7b4"],["/static/media/no_image.57f701ae.png","57f701ae17ffa8994defacd7e610f1e0"],["/static/media/star2_lightgrey.826caadb.png","826caadb389d3bdffb90b6b6b7d2356f"],["/static/media/top_bar.d0fd8405.png","d0fd84051fe892bae71a8a3c157696a9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});