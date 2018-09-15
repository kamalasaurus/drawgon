import App from './src/app/App.js';

void function() {

  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('service-worker.js', { scope: '/' });

  new App(document.getElementById('app'));

}();

