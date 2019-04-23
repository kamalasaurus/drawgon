import m from '../../node_modules/mithril/mithril.js';

import Controller from './Controller.js';
import Container from './components/Container.js';
import New from './components/New.js';
import Canvas from './components/Canvas.js';

import Brush from './components/controls/Brush.js';
import Color from './components/controls/Color.js';
import Undo from './components/controls/Undo.js';
import Redo from './components/controls/Redo.js';
import Save from './components/controls/Save.js';
import Clear from './components/controls/Clear.js';

export default function App(root) {

  const ctrl = new Controller({});

  // attach keyboard shortcuts here. Might have to
  // instantiate buttons outside router to call
  // functions?  No, just, call them from ctrl
  // document.body.addEventListener('keypress', (e) => {
  //   e.preventDefault();
  //   ctrl.passMessage(e);
  //   return false;
  // });

  window.addEventListener('keydown', function(e) {
    if (!e.metaKey) return;
    if (e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) ctrl.redo();
      else ctrl.undo();
    }
  });

  m.route(root, '/', {
    '/': (new Container('layout', [
      m(new New(ctrl))
    ])),
    '/draw': (new Container('layout', [
      m(new Canvas(ctrl)),
      m(new Container('controls', [
        m(new Brush(ctrl)),
        m(new Color(ctrl)),
        m(new Undo(ctrl)),
        m(new Redo(ctrl)),
        m(new Save(ctrl)),
        m(new Clear(ctrl))
      ]))
    ]))
  });
};

