const VERSION = '20220614';
const PRECACHE = 'precache-' + VERSION;
const MODES = 'modes-' + VERSION;

// A regexp to detect mode files
//const MODE_REGEXP = /^https:\/\/cdn\.jsdelivr.net\/npm\/codemirror@.+?\/mode\//;

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    '/',
    'script.js',
    'style.css',
    'styles2.css'
    'favicon.ico',
    'script2.js'

];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, MODES];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// The fetch handler serves responses from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(self.location.origin) && !event.request.url.startsWith('')) {
        return;
    }
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            if (!event.request.url.match(MODE_REGEXP)) {
                return fetch(event.request);
            }

            return caches.open(MODES).then((cache) => {
                return fetch(event.request).then((response) => {
                    // Put a copy of the response in the runtime cache.
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});
