//Let there be SERVICEWORKERS!

self.addEventListener('install', event => {
    console.log('Service worker installed', new Date().toLocaleTimeString());
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(['index.html', 'offline.html', 'offline.css', 'assets/css/main.css' ])
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service worker online', new Date().toLocaleTimeString());
});

//Offline fallback

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (!navigator.onLine) {
                if (response) {
                    return response;
                } else {
                    return caches.match(new Request('offline.html'));
                }
            } else {
                return updateCache(event.request);
            }
        })
    )
});

//Update zhe Caches

async function updateCache(request) {
    return fetch(request).then((response) => {
        if (response) {
            return caches.open('v1').then((cache) => {
                return cache.put(request, response.clone())
                    .then(() => {
                        return response;
                    })
            });
        }
    })
}