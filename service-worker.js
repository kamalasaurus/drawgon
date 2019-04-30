let cacheName = 'v1';

let cacheFiles = [
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
  "src/app/App.js",
  "src/app/Controller.js",
  "src/app/components/Button.js",
  "src/app/components/Canvas.js",
  "src/app/components/Container.js",
  "src/app/components/New.js",
  "src/app/components/controls/Brush.js",
  "src/app/components/controls/Clear.js",
  "src/app/components/controls/Redo.js",
  "src/app/components/controls/Save.js",
  "src/app/components/controls/Undo.js",
  "src/app/components/panels/BrushPanel.js",
  "src/app/components/panells/SavelPanel.js",
  "src/app/components/icons/controls/Brush.js",
  "src/app/components/icons/controls/Clear.js",
  "src/app/components/icons/controls/Redo.js",
  "src/app/components/icons/controls/Save.js",
  "src/app/components/icons/controls/Undo.js",
  "src/app/components/icons/cursors/Pencil.js",
  "src/app/components/options/Brushes.js",
  "src/style.css",
  "node_modules/mithril/mithril.js",
  "node_modules/pressure/dist/pressure.js",
  "node_modules/downloadjs/download.js",
  "node_modules/canvas2svg/canvas2svg.js"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(cacheFiles);
      }, function(err) {
        console.log('service worker on install', err)
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) return caches.delete(thisCacheName);
        }))
        .catch(function(err) { console.log('service worker on activate', err) });
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request);
	event.respondWith(
		caches
      .match(event.request)
			.then(function(response) {
				if (response) return response;

				var requestClone = event.request.clone();
				return fetch(requestClone)
					.then(function(response) {
				    if (!response) return response;
					  var responseClone = response.clone();
				    caches
              .open(cacheName)
              .then(function(cache) {
							  cache.put(event.request, responseClone);
							  return response;
				      }, function(err) {
                console.log('service worker on request clone', err)
              }); // end caches.open
          }, function(err) {
            console.log('service worker on fetch', err);
          })
      }, function(err) {
        console.log('service worker on fetch match', err);
      })
	);
});

