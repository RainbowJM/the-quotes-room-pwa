
self.addEventListener('install', event => {
  console.log('Installing service worker')
});

self.addEventListener('activate', event => {
  console.log('Activating service worker')
});

self.addEventListener('fetch', event => {
  console.log('Fetch event: ', event.request.url);
});
