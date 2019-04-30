import App from './src/app/App.js';

void function() {

  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('service-worker.js', { scope: '/webdraw/' });

  new App(document.getElementById('app'));

}();

