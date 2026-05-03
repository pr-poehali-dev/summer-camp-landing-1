const CACHE_VERSION = "v1";
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;

const CDN_HOSTS = ["cdn.poehali.dev"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.endsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

const isImageRequest = (request) => {
  if (request.destination === "image") return true;
  const url = new URL(request.url);
  return /\.(png|jpg|jpeg|webp|gif|svg|avif|ico)$/i.test(url.pathname);
};

const isStaticAsset = (request) => {
  const url = new URL(request.url);
  return /\.(js|css|woff2?|ttf|otf)$/i.test(url.pathname);
};

const isCDN = (request) => {
  const url = new URL(request.url);
  return CDN_HOSTS.some((h) => url.hostname.includes(h));
};

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;
  if (request.url.startsWith("chrome-extension")) return;

  if (isImageRequest(request) || isCDN(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if (isStaticAsset(request)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    fetchAndUpdate(request, cache).catch(() => {});
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== "opaqueredirect") {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (err) {
    const fallback = await cache.match(request);
    if (fallback) return fallback;
    throw err;
  }
}

async function fetchAndUpdate(request, cache) {
  const response = await fetch(request);
  if (response && response.status === 200) {
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })
    .catch(() => cached);
  return cached || networkPromise;
}
