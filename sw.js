// Minimale service worker: nodig om de pagina als app te kunnen installeren. Cachet niets.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
