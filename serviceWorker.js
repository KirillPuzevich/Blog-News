// service-worker.js
self.addEventListener('install', (event) => {
    // Здесь можно добавить кэширование необходимых ресурсов
    console.log('Service Worker installing.');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
  });