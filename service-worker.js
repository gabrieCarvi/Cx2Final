
// const CACHE_NAME = "Cx2-app-cache-v1";
// const urlsToCache = ["/", "/index.html", "/static/js/bundle.js", "/form"];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache - estoy activo - CACHE-CX2");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName); // Elimina cachés obsoletas
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   // Excluir solicitudes con esquema 'chrome-extension://'
//   if (event.request.url.startsWith('chrome-extension://')) {
//     return;
//   }

//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response; // Devuelve de caché si está disponible
//       }

//       // Si no está en caché, intenta obtener de la red
//       return fetch(event.request).then((networkResponse) => {
//         // Cachea las respuestas de la red para futuras peticiones
//         return caches.open(CACHE_NAME).then((cache) => {
//           if (event.request.method === 'GET' && networkResponse) {
//             cache.put(event.request, networkResponse.clone());
//           }
//           return networkResponse;
//         });
//       });
//     }).catch(err => {
//       console.log('Error de red:', err);
//       return new Response('No se pudo conectar a la red. - Verifica la Conexion de Red e Internet', { status: 503 });
//     })
//   );
// });

