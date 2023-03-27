const cacheName = 'site-static';
const assets = [
    '/',
    '/css/style.css',
    // '/offline.ejs'

]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Installed service worker')
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', event => {
    // console.log('Activating service worker')
});

self.addEventListener('fetch', event => {
    // console.log('Fetch event: ', event);
});
