// custom install button for PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent default mini-infobar
  e.preventDefault();
  deferredPrompt = e;

  // Show your custom install button
  document.getElementById('installButton').style.display = 'block';
});
const installButton = document.getElementById('installButton');

installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show native prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = 'none';
  }
});

// On install - caching the application shell
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('sw-cache').then(function (cache) {
      // cache any static files that make up the application shell
      return cache.add('index.html');
    })
  );
});

// On network request
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function (response) {
      //If response found return it, else fetch again
      return response || fetch(event.request);
    })
  );
});
