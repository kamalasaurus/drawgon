// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import App from './src/app/App.js';

void function() {

  if ('serviceWorker' in navigator) {
    if (/drawgon/.test(window.location.href))
      navigator.serviceWorker.register('./service-worker.js', { scope: '/drawgon/' });
    else
      navigator.serviceWorker.register('./service-worker.js', { scope: '/' });
  }

  new App(document.getElementById('app'));

}();

