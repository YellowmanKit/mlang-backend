"use strict";var precacheConfig=[["/index.html","992c9244cec419b33de98189586e2b1a"],["/static/css/main.e943e914.css","90ad5fcc5a65efae36ffa71c962d5db0"],["/static/js/main.08b3c3c8.js","09120d085e5d728322256fd06c7095d6"],["/static/media/A.a1c8df69.png","a1c8df69606862aaf717d5d5015fb57c"],["/static/media/B.35addca5.png","35addca537e276669f76d769cce7b5f8"],["/static/media/C.cbea7505.png","cbea7505c9f7e9856749e4dd339f2fb0"],["/static/media/D.1352add4.png","1352add48f346554932466fd069b20e9"],["/static/media/G.36ad3246.png","36ad3246ad98eabaa7276e04a96ea354"],["/static/media/H.b793c9f1.png","b793c9f1e4a7d9b34500f9ff805905a6"],["/static/media/alert2.3ec6dd8b.png","3ec6dd8b6cdded83c6bdfad316773efd"],["/static/media/animal.1a288700.png","1a2887000104621213b3422ef4e40ee7"],["/static/media/avatar1.15323a5d.png","15323a5d50305771bc2cbf4444adecdd"],["/static/media/avatar2.d1be9174.png","d1be917418f15b9b13868c3325d1486c"],["/static/media/avatar3.9c37d710.png","9c37d7105288c10cafb38210c5397135"],["/static/media/avatar4.23a5577b.png","23a5577ba03150f579e2f2932d61c827"],["/static/media/background.c8dead68.png","c8dead68e11373f6dbdb9b57d9ae0abb"],["/static/media/badge_corner_featured.149ec2cd.png","149ec2cd15984592efb9f258636a175f"],["/static/media/badge_corner_passed.ca733c0e.png","ca733c0eabb2db9344b2814354abe6e7"],["/static/media/btn_green.c117b24f.png","c117b24fd7487b7b91886924f0747144"],["/static/media/btn_red.4b2aef9e.png","4b2aef9e5fc5162eddd50f1b88569cfe"],["/static/media/cards_lightgrey.5d2597a0.png","5d2597a0db921cfd6ec3e91d825ab9e3"],["/static/media/comment.1f067f12.png","1f067f122a8ea1a86f75696426b99ef0"],["/static/media/copy.285778c3.png","285778c316507bca29f1e8820c805eb6"],["/static/media/copy_grey.27d6ff68.png","27d6ff688746dfcbf59d5a8fb52a71f6"],["/static/media/event_grey.e889df44.png","e889df4449d2375ad3c9f20b3fef51f4"],["/static/media/expired.7fcafd2f.png","7fcafd2f8b9861d615e9aa694dea6efb"],["/static/media/family.8f70f375.jpg","8f70f375668d9005e5aebfb4d57b1392"],["/static/media/hongkong.23b72487.png","23b72487e8685bbdad06f276428c7a33"],["/static/media/menu_bg.5281c8aa.png","5281c8aab1873e44dff9fdbb2c0a4162"],["/static/media/mlang_green.7b6388fe.png","7b6388fe99c43b2bd58e367333c229f0"],["/static/media/mlanghku.8204b9ee.png","8204b9eeeb6b920787256575e17b9f78"],["/static/media/no_image.57f701ae.png","57f701ae17ffa8994defacd7e610f1e0"],["/static/media/nsm.28035f03.jpg","28035f032aab152bfbe5f880054a6496"],["/static/media/paperBox.e0e17bf9.png","e0e17bf9ba7af861eb8011a7c8e8e6c1"],["/static/media/shadow.864a6c8c.png","864a6c8c3c00c2824ff17a5da49f8380"],["/static/media/star2_lightgrey.826caadb.png","826caadb389d3bdffb90b6b6b7d2356f"],["/static/media/stcc.30837369.jpg","30837369ab71a02628082722d988d016"],["/static/media/swipeLeft.e9c29b90.png","e9c29b90648fd70bb78830b243126719"],["/static/media/swipeRight.bcb1d0eb.png","bcb1d0ebb55fc6027e5f7b12f350649f"],["/static/media/top_bar.d0fd8405.png","d0fd84051fe892bae71a8a3c157696a9"],["/static/media/yckss.58101994.png","58101994f0c7c9abf3b9418c8cacfd8c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});