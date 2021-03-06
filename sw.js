const staticCacheName= 'site-static v-x';
const dynamicCache = 'site-dynamic';
const assets = [
    '/',
    'index.html',
    'css/style.css',
    'app.js'
]

//install service worker

self.addEventListener('install',evt =>{
    // console.log('service worker has been installed');
   evt.waitUntil(caches.open(staticCacheName).then(cache =>{
    console.log('cashing shell assets');
    cache.addAll(assets);
}))
})

//active service worker

self.addEventListener('activate',evt =>{
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key=>key !== staticCacheName)
                .map(key => caches.delete(key))
                )
            
        })
    );
});









self.addEventListener('fetch',evt =>{
    // console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes =>{
                return caches.open(dynamicCache).then(cache =>{
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes; 
                })
            });
        })
    );
});