// 🧠 Detección automática del entorno
const IS_LOCALHOST = self.location.hostname === 'localhost';

// 💾 Nombre del caché (solo cambia en producción)
const CACHE_NAME = 'm5-cache-v3';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/bundle.js',
  '/image.png',
  '/datos.yaml',
  '/datos.csv',
  '/datos.json5'
];

// 🔹 INSTALACIÓN
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando…');

  if (!IS_LOCALHOST) {
    // En producción: precachea todo
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Precaching archivos');
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  }

  // Activa el nuevo SW inmediatamente
  self.skipWaiting();
});

// 🔹 ACTIVACIÓN
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando…');

  // Limpia caches viejas (en ambos modos)
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => {
        if (k !== CACHE_NAME) {
          console.log('[SW] Eliminando caché antigua:', k);
          return caches.delete(k);
        }
      }))
    )
  );

  self.clients.claim();
});

// 🔹 FETCH HANDLER
self.addEventListener('fetch', (event) => {
  if (IS_LOCALHOST) {
    // 💻 DEV MODE: intenta siempre la red primero
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  } else {
    // 🌍 PROD MODE: usa estrategia "cache first"
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
