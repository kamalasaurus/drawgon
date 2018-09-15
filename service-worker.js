const PRECACHE_URLS = [
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "browserconfig.xml",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "index.html",
  "LICENSE",
  "main.js",
  "manifest.json",
  "mstile-150x150.png",
  "safari-pinned-tab.svg",
  "service-worker.js",
  "shader-list.js",
  "wasm-list.js",
  "src/app/App.js",
  "src/app/graphics/Canvas.js",
  "src/app/graphics/glsl/surface.vert",
  "src/app/graphics/glsl/texture.frag",
  "src/style.css",
  "node_modules/mithril/mithril.js"
]

const PRECACHE = 'version1';
const RUNTIME = 'runtime';

// caches our resources
// caches is now a global object!
// self refers to the SeviceWorkerGlobalContext -- it's a new semantic
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// cleans out old caches
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
      //self.clients.claim will make the new service worker take effect immediately on any open pages in its scope.
  );
});

self.addEventListener('fetch', event => {
  // skip x-origin requests

  //TODO: figure out why this is broken :(

  // if (event.request.url.startsWith(self.location.origin)) {
  //   event.respondWith(
  //     caches.match(event.request)
  //       .then(cachedResponse => {
  //         if (cachedResponse) return cachedResponse;

  //         return caches.open(RUNTIME)
  //           .then(cache => {
  //             return fetch(event.request)
  //               .then(response => {
  //                 return cache.put(event.request, response.clone())
  //                   .then(() => response);
  //               });
  //           });

  //       })
  //   );
  // }
});

