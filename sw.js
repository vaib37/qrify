const CACHE_NAME = "qrify-v3";


const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",

    "./libs/qrcode.min.js",

    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* ========================================
   INSTALL
======================================== */

self.addEventListener(
    "install",
    (event) => {

        console.log(
            "QRify Service Worker: installing..."
        );

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then((cache) => {

                    return cache.addAll(
                        APP_FILES
                    );

                })

        );

        self.skipWaiting();

    }
);


/* ========================================
   ACTIVATE
======================================== */

self.addEventListener(
    "activate",
    (event) => {

        console.log(
            "QRify Service Worker: activated."
        );

        event.waitUntil(

            caches
                .keys()
                .then((cacheNames) => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                (cacheName) =>
                                    cacheName !== CACHE_NAME
                            )
                            .map(
                                (cacheName) =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                })

        );

        self.clients.claim();

    }
);


/* ========================================
   FETCH
======================================== */

self.addEventListener(
    "fetch",
    (event) => {

        event.respondWith(

            caches
                .match(event.request)
                .then((cachedResponse) => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }

                    return fetch(event.request);

                })

        );

    }
);