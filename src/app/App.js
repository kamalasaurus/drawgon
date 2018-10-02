import m from '../../node_modules/mithril/mithril.js';

import Context from './state/Context.js';
import Container from './Container.js';
import Canvas from './graphics/Canvas.js';

import Brush from './graphics/buttons/Brush.js';
import Color from './graphics/buttons/Color.js';
import Line from './graphics/buttons/Line.js';
import Undo from './graphics/buttons/Undo.js';
import Redo from './graphics/buttons/Redo.js';
import Save from './graphics/buttons/Save.js';
import Clear from './graphics/buttons/Clear.js';

export default function App(root) {

  // might want to make state its own module

  // ability to flatten to flattenedImage, blows away releveant history, but preserves image
  // history object: {brush: type, color: col, opacity: o, lineWidth: lw, path: [sx,sy,dx,dy]}

  const context = new Context();

  m.route(root, '/', {
    '/': (new Container('layout', [
      m(new Canvas(context)),
      m(new Container('controls', [
        m(new Brush(context)),
        m(new Color(context)),
        m(new Line(context)),
        m(new Undo(context)),
        m(new Redo(context)),
        m(new Save(context)),
        m(new Clear(context))
      ]))
    ]))
  });
};

