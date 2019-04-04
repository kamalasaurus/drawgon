import { h, render } from './dependencies.js';
import App from './src/app/App.js';

void function() {

  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('service-worker.js', { scope: '/' });

  render(h(App), document.getElementById('app'));

}();

