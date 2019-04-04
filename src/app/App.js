import { h, Router } from '../../dependencies.js';

import Controller from './Controller.js';
import Container from './components/Container.js';
import New from './components/New.js';
import Canvas from './components/Canvas.js';

import Brush from './components/controls/Brush.js';
import Color from './components/controls/Color.js';
import Line from './components/controls/Line.js';
import Eraser from './components/controls/Eraser.js';
import Zoom from './components/controls/Zoom.js';
import Undo from './components/controls/Undo.js';
import Redo from './components/controls/Redo.js';
import Rotate from './components/controls/Rotate.js';
import Save from './components/controls/Save.js';
import Clear from './components/controls/Clear.js';

export default function App() {

  const ctrl = new Controller({});

  // attach keyboard shortcuts here. Might have to
  // instantiate buttons outside router to call
  // functions?  No, just, call them from ctrl
  // document.body.addEventListener('keypress', (e) => {
  //   e.preventDefault();
  //   ctrl.passMessage(e);
  //   return false;
  // });

  return h(Router, {},
    h(Container, {path: '/', class: 'layout'}, [
      h(new New(ctrl))
    ]),
    h(Container, {path: '/draw', class: 'layout'}, [
      h(new Canvas(ctrl)),
      h(Container, {class: 'controls'}, [
        h(new Brush(ctrl)),
        h(new Color(ctrl)),
        h(new Undo(ctrl)),
        h(new Redo(ctrl)),
        h(new Save(ctrl)),
        h(new Clear(ctrl))
      ]);
    ])
  );

};

