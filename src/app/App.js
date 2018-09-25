import m from '../../node_modules/mithril/mithril.js';

import Container from './Container.js';
import Canvas from './graphics/Canvas.js';

import BrushSelect from './graphics/controls/BrushSelect.js';
import ColorWheel from './graphics/controls/ColorWheel.js';
import LineWeight from './graphics/controls/LineWeight.js';
import Undo from './graphics/controls/Undo.js';
import Redo from './graphics/controls/Redo.js';
import Save from './graphics/controls/Save.js';
import Clear from './graphics/controls/Clear.js';

export default function App(root) {

  const context = {};

  m.route(root, '/', {
    '/': (
      new Container(null, [
        (new Canvas(context)).view(),
        (new Container('controls', [
          (new BrushSelect(context)).view(),
          (new ColorWheel(context)).view(),
          (new LineWeight(context)).view(),
          (new Undo(context)).view(),
          (new Redo(context)).view(),
          (new Save(context)).view(),
          (new Clear(context)).view()
        ])).view()
      ])
    )
  });
};

