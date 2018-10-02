import m from '../../node_modules/mithril/mithril.js';

import Context from './state/AppState.js';
import Container from './Container.js';
import Canvas from './components/Canvas.js';

import Brush from './components/buttons/Brush.js';
import Color from './components/buttons/Color.js';
import Line from './components/buttons/Line.js';
import Undo from './components/buttons/Undo.js';
import Redo from './components/buttons/Redo.js';
import Save from './components/buttons/Save.js';
import Clear from './components/buttons/Clear.js';

export default function App(root) {

  // might want to make state its own module

  // ability to flatten to flattenedImage, blows away releveant history, but preserves image
  // history object: {brush: type, color: col, opacity: o, lineWidth: lw, path: [sx,sy,dx,dy]}

  const appState = new AppState();

  m.route(root, '/', {
    '/': (new Container('layout', [
      m(new Canvas(appState)),
      m(new Container('controls', [
        m(new Brush(appState)),
        m(new Color(appState)),
        m(new Line(appState)),
        m(new Undo(appState)),
        m(new Redo(appState)),
        m(new Save(appState)),
        m(new Clear(appState))
      ]))
    ]))
  });
};

