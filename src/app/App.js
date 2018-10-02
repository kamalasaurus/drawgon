import m from '../../node_modules/mithril/mithril.js';

import AppState from './state/AppState.js';
import Container from './components/Container.js';
import Canvas from './components/Canvas.js';

import Brush from './components/controls/Brush.js';
import Color from './components/controls/Color.js';
import Line from './components/controls/Line.js';
import Undo from './components/controls/Undo.js';
import Redo from './components/controls/Redo.js';
import Save from './components/controls/Save.js';
import Clear from './components/controls/Clear.js';

export default function App(root) {

  const appState = new AppState({A: 4, dpi: 300});

  // attach keyboard shortcuts here. Might have to
  // instantiate buttons outside router to call
  // functions?  No, just, call them from appState
  // document.body.addEventListener('keypress', (e) => {
  //   e.preventDefault();
  //   appState.passMessage(e);
  //   return false;
  // });

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

