import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';
import BrushPanel from '../panels/BrushPanel.js';

export default class Brush extends Button {
  constructor(ctrl) {
    const onclick = function() {
      return this;
    }

    super('Brush', onclick);
  }
}

