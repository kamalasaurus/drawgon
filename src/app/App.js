import m from '../../node_modules/mithril/mithril.js';

import AppState from './state/AppState.js';
import Container from './components/Container.js';
import Canvas from './components/Canvas.js';

import Brush from './components/buttons/Brush.js';
import Color from './components/buttons/Color.js';
import Line from './components/buttons/Line.js';
import Undo from './components/buttons/Undo.js';
import Redo from './components/buttons/Redo.js';
import Save from './components/buttons/Save.js';
import Clear from './components/buttons/Clear.js';

export default function App(root) {

  const appState = new AppState(/*width, height*/);

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

