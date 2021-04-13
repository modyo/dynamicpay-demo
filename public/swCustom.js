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
  if(e.request.url.indexOf('https') === 0){
    console.log('Service Worker: Fetching');
    e.respondWith(
      caches.match(e.request).then(response => {
        // If the request is in the cache
        if(response){
          console.log(`  %cService Worker found in cache ${e.request.url}`, "color: #28a745");
          return response;
        }
        
        // If the request is NOT in the cache, fetch and cache
        var reqClone = e.request.clone();
        //Fetching
        return fetch(reqClone).then( res => {
          if ( !res ) {
            console.log("%cService Worker no response from fetch ", "color: #7d030f")
            return res;
          }
          //Caching 
          caches.open(cacheName).then(cache => {
            cache.put(e.request, res.clone())
            console.log('%cService Worker new data cached ' + e.request.url, "color:#ffc107");
            return res
          })
        }).catch( err => {
          console.log('Service Worker Error fetching and caching', err);
        })
      })
    )
  }
});
    