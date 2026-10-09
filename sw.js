/* Offline cache for the GitHub Pages copy. VERSION is filled in by build.py on every build,
   so each deploy is a new service worker and phones pick it up on the next launch. */
var VERSION='zzp-v4-a94bf594ac';
var FILES=['./','index.html','manifest.json','app-icon-192.png','app-icon-512.png','app-icon-maskable-192.png','app-icon-maskable-512.png','apple-touch-icon-v3.png','favicon-32.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(FILES.map(function(f){return new Request(f,{cache:'reload'})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('message',function(e){if(e.data==='skipWaiting')self.skipWaiting()});
/* Network first, skipping the browser's HTTP cache (GitHub Pages caches pages for 10 minutes), so an update shows
   on the next launch. The cached copy is used only when there is no signal. version.json is never cached.
   Shared links (Google Maps -> Share -> Zim Zam) open ./?title=&text=&url=; those pages are not cached, and offline they get the cached app. */
self.addEventListener('fetch',function(e){var req=e.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==location.origin)return;
  if(/version\.json$/.test(url.pathname)){e.respondWith(fetch(req,{cache:'no-store'}).catch(function(){return new Response('{}',{headers:{'Content-Type':'application/json'}})}));return}
  var shared=/[?&](?:title|text|url)=/.test(url.search);
  e.respondWith(fetch(req,{cache:'no-cache'}).then(function(r){if(r&&r.ok&&!shared){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp)})}return r})
    .catch(function(){return caches.match(req,{ignoreSearch:true}).then(function(m){return m||caches.match('index.html')})}))});
