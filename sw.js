const CACHE = "bonjour-tc-v1";
const FICHIERS = ["/", "/index.html", "/style.css", "/app.js"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FICHIERS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});