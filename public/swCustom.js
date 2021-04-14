/* eslint-disable no-restricted-globals */
const cacheName = 'v1';

const cacheAssets = [
  '/',
  '/index.html',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  'https://cdn.materialdesignicons.com/3.8.95/css/materialdesignicons.min.css',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
  'https://cdn.materialdesignicons.com/3.8.95/fonts/materialdesignicons-webfont.woff2?v=3.8.95',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  '/static/js/2.2c0a517d.chunk.js',
  '/static/js/main.1119b12b.chunk.js',
  '/static/css/main.a97a998c.chunk.css'
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

function isInArray( string, array ) {
  let cachePath
  if ( string.indexOf( self.origin ) === 0 ) {
    cachePath = string.substring( self.origin.length )
  } else {
    cachePath = string
  }
  return array.indexOf( cachePath ) > -1
}

self.addEventListener('fetch', e => {
  const requestURL = new URL(e.request.url)
  if(/https/.test(requestURL.protocol)){
    if ( isInArray( e.request.url, cacheAssets )) {
      console.log(`  %cService Worker found in cache ${e.request.url}`, "color: #28a745");
      e.respondWith( caches.match( e.request ))
    } 
    else if (/^\/api\//.test(requestURL.pathname)){
      console.log('Service Worker: Fetching');
      e.respondWith(fetch(e.request))
    }
    else if (/^\/assets|uploads\//.test(requestURL.pathname)) {
      console.log('Service Worker: Fetching');
      e.respondWith(async function() {
        try {
          const response = await fetch(e.request)
          const cache = await caches.open(cacheName)
          cache.put(e.request.url, response.clone())
          return response
        } catch (err) {
          return caches.match(e.request)
        }
      }())
    }
    else {
      e.respondWith(async function() {
        const cacheResponse = await caches.match(e.request)
        if (cacheResponse) return cacheResponse
        try {
          const fetchResponse = await fetch(e.request)
          console.log('%cService Worker new data cached ' + e.request.url, "color:#ffc107");
          const cache = await caches.open(cacheName)
          cache.put(e.request.url, fetchResponse.clone())
          return fetchResponse
        } catch(err) {
          console.log('ERROR')
          console.error(err)
          // const cache = await caches.open(STATIC_CACHE)
          // if ( event.request.headers.get( 'accept' ).includes( 'text/html' )) {
          //   return cache.match( './offline' )
          // }
        }
      }())
    }
  }
});
