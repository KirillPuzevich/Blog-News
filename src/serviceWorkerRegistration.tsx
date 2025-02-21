const isPWA = window.matchMedia('(display-mode: standalone)').matches;

export const urlApi = isPWA ? 'http://172.20.10.2:8080/' : 'http://localhost:8080/';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.protocol === 'https:' ||
  window.location.port !== '80'
);

const register = (config?: any) => {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(
      process.env.PUBLIC_URL || '',
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
};

const registerValidSW = (swUrl: string, config: any) => {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      if (config && config.onSuccess) {
        config.onSuccess(registration);
      }
      if (isPWA) {
        console.log('App is running as a PWA');
      } else {
        console.log('App is running in a regular browser mode');
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
};

const checkValidServiceWorker = (swUrl: string, config: any) => {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
};

export { register };