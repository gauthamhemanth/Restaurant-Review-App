const cacheVersion = 'Site-v1';

const cacheContentArray = [

    './index.html',
    './restaurant.html',
    './css/styles.css',
    './css/responsive_styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'

];

/* add web pages to local cache storage */
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(CacheVersion)
            .then(cache => cache.addAll(cacheContentArray)).then(() => self.skipWaiting())

    );

});

/* maintain only one copy of storage*/
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheVersion) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

/* offline mode only : Fetch pages from cache storage*/
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.match(e.request))
    );
});