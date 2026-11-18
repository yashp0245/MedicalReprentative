const CACHE_NAME = 'pharma-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './CAPITAL PHARMA.jpeg'
];

// Install the service worker and cache core files
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Intercept requests: serve from cache if available, otherwise fetch and cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then((fetchRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Automatically cache new medicine images as you tap them
          if (e.request.url.startsWith('http')) {
            cache.put(e.request, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    })
  );
});
