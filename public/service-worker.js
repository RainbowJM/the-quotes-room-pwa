const cacheName = 'cache-v4';
const runtimeCacheName = 'runtime-cache'
const assets = [
    '/',
    '/css/style.min.css',
    '/img/logo.ico',
    '/offline',
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size){
                cache.delete(keys[0].then(limitCacheSize(name,size)));
            }
        });
    });
};

self.addEventListener('install', event => {
    console.log('Installed service worker');

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                cache.addAll(assets)
                    .then(() => self.skipWaiting());
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Activating service worker')
    event.waitUntil(
        caches.keys()
            .then(names => {
                return Promise.all(names
                    .filter(name => name !== cacheName && name !== runtimeCacheName)
                    .map(key => caches.delete(key)))
            })
    )
});

self.addEventListener('fetch', event => {
    console.log('Fetch event: ', event.request.url);
    if (isCoreGetRequest(event.request)) {
        event.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(event.request.url))
        );
    } else if (isHtmlGetRequest(event.request)) {
        event.respondWith(
            caches.open(runtimeCacheName)
                .then(cache => cache.match(event.request.url))
                .then(response => response ? response : fetchAndCache(event.request, runtimeCacheName))
                .catch(e => {
                    return caches.open(cacheName)
                        .then(cache => cache.match('/offline'))
                })
        );
    }
});

function isCoreGetRequest(request) {
    return request.method === 'GET' && assets.includes(getPathName(request.url));
}

function isHtmlGetRequest(request) {
    return request.method === 'GET' && 
    (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}

function fetchAndCache(request, cacheName) {
    return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new TypeError('Bad response status');
            }
            const clone = response.clone();
            caches.open(cacheName).then((cache) => cache.put(request, clone));
            limitCacheSize(cacheName,5);
            return response;
        })
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}