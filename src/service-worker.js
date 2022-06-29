workbox.core.setCacheNameDetails({ prefix: "appsyncmasterclass-frontend" });

workbox.core.skipWaiting()
workbox.core.clientsClaim()

const cacheFiles = [
  {
    "revision": "931caf57a56b47ef400c",
    "url": "/img/icons/android-chrome-192x192.png"
  },
  {
    "revision": "81b4ff3d9ff09591cc33",
    "url": "/img/icons/favicon-16x16.png"
  },
  {
    "revision": "29372bb30481defdc33d",
    "url": "/img/icons/favicon-32x32.png"
  },
  {
    "revision": "e653ab4d124bf16b5232",
    "url": "https://ka-f.fontawesome.com/releases/v5.15.4/css/free.min.css?token=11146ec54d"
  },
  {
    "revision": "e653ab4d124bf16b5232",
    "url": "https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-shims.min.css?token=11146ec54d"
  },
  {
    "revision": "e653ab4d124bf16b5232",
    "url": "https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-font-face.min.css?token=11146ec54d"
  },
  {
    "revision": "66b946627566f0b6fa10",
    "url": "service-worker.js"
  }
]

self.__precacheManifest = cacheFiles.concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {}) 