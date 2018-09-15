import m from '../../node_modules/mithril/mithril.js';
import Canvas from './graphics/Canvas.js';

export default function App(root) {
  // initialize weassembly either here or in a double fancy canvas module
  m.route(root, '/', {
    '/': new Canvas()
  });
};

