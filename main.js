import App from './src/app/App.js';

void function() {

  if ('serviceWorker' in navigator) {
    if (/webdraw/.test(window.location.href))
      navigator.serviceWorker.register('./service-worker.js', { scope: '/webdraw/' });
    else
      navigator.serviceWorker.register('./service-worker.js', { scope: '/' });
  }

  new App(document.getElementById('app'));

}();

