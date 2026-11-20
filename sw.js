/* Service worker: makes the site installable and usable offline.
   Pages and scripts: network first (you always get the latest when online),
   falling back to the cached copy offline.
   Books (PDFs) and CDN libraries: cache first. A book opened once stays readable offline. */
const VERSION = "v1";
const SHELL = "shell-" + VERSION, BOOKS = "books-v1", LIBS = "libs-v1";
const PRECACHE = [
  "./", "./index.html", "./rrb-practice.html", "./rrb-syllabus.html", "./reader.html",
  "./tutor.html", "./daily.html", "./rrb-gen.js", "./ai.js", "./pwa.js",
  "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png",
  "./7-RRB-Station-Master/README.md",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith("shell-") && k !== SHELL).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return; // let partial requests pass straight through
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;

  if (sameOrigin && url.pathname.endsWith(".pdf")) {
    e.respondWith(cacheFirst(BOOKS, req));
  } else if (!sameOrigin && /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com/.test(url.host)) {
    e.respondWith(cacheFirst(LIBS, req));
  } else if (sameOrigin) {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(name, req) {
  const c = await caches.open(name);
  const hit = await c.match(req, { ignoreSearch: false });
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.status === 200) c.put(req, res.clone());
  return res;
}
async function networkFirst(req) {
  const c = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res.ok && res.status === 200) c.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === "navigate") return (await c.match("./index.html")) || Response.error();
    throw err;
  }
}
