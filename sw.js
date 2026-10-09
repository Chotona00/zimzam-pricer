/* Offline cache for the GitHub Pages copy. Bump VERSION after each deploy. */
var VERSION='zzp-v2';
var FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
/* Network first (so updates show up), cache as fallback when offline */
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('index.html')})}))});
