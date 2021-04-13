/* eslint-disable no-restricted-globals */
const cacheName = 'v1';

const cacheAssets = [
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  'https://cdn.materialdesignicons.com/3.8.95/css/materialdesignicons.min.css',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting())
  )
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache)
           }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Fetching')
});
    