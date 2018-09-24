import m from '../../node_modules/mithril/mithril.js';
import Canvas from './graphics/Canvas.js';

// control buttons //////////////////////////////////////////////////////
import BrushSelect from './graphics/controls/BrushSelect.js';
import ColorWheel from './graphics/controls/ColorWheel.js';
import LineWeight from './graphics/controls/LineWeight.js';
import Undo from './graphics/controls/Undo.js';
import Redo from './graphics/controls/Redo.js';
import Save from './graphics/controls/Save.js';
import Clear from './graphics/controls/Clear.js';
// end control buttonss /////////////////////////////////////////////////

export default function App(root) {
  // initialize webassembly either here or in a double fancy canvas module
  m.route(root, '/', {
    '/': new Canvas()
  });
  m.route(root, '/', {
    '/': m('div.container', [
      (new Canvas()),
      m('div.controls', [
        (new BrushSelect()),
        (new ColorWheel()),
        (new LineWeight()),
        (new Undo()),
        (new Redo()),
        (new Save()),
        (new Clear())
      ])
    ])
  });
};

