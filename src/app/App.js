import m from '../../node_modules/mithril/mithril.js';

import Container from './Container.js';
import Canvas from './graphics/Canvas.js';

import BrushControl from './graphics/controls/BrushControl.js';
import ColorControl from './graphics/controls/ColorControl.js';
import LineControl from './graphics/controls/LineControl.js';
import Undo from './graphics/controls/Undo.js';
import Redo from './graphics/controls/Redo.js';
import Save from './graphics/controls/Save.js';
import Clear from './graphics/controls/Clear.js';

export default function App(root) {

  // might want to make state its own module
  const DEFAULTS = {
    brush: 'round',
    color: '#000000',
    opacity: 1,
    lineWidth: 5
  };

  // ability to flatten to flattenedImage, blows away releveant history, but preserves image
  // history object: {brush: type, color: col, opacity: o, lineWidth: lw, path: [sx,sy,dx,dy]}

  let context = Object.assign({
    flattenedImage: '',
    history: []
  }, DEFAULTS);

  m.route(root, '/', {
    '/': (new Container(null, [
      m(new Canvas(context)),
      m(new Container('controls', [
        m(new BrushControl(context)),
        m(new ColorControl(context)),
        m(new LineControl(context)),
        m(new Undo(context)),
        m(new Redo(context)),
        m(new Save(context)),
        m(new Clear(context))
      ]))
    ]))
  });
};

