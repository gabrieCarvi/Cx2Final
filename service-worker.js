const CACHE_NAME = "Cx2-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pwa/192.png",
  "/pwa/512.png",
  "/form",
  "/dashboard",
  "/galeriacx2",
  "/galeriavehiculos",
  "/informespost",
  "/GaleriaBuscados"
];

self.addEventListener("install", (event) => {
  console.log("[SW] Instalando service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Cacheando archivos...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activando service worker...");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("[SW] Borrando cache antigua:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith("chrome-extension://")) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request)
          .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              if (event.request.method === "GET" && networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          })
          .catch(() => {
            // Fallback offline si es HTML
            if (event.request.mode === "navigate") {
              return caches.match("/");
            }
          })
      );
    })
  );
});
