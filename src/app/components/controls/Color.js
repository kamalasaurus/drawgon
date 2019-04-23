import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Color extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      // display sunflower colorwheel!
      // TODO: gradient strokes
      ctrl.strokeStyle = "#000000";
      return this;
    };

    super('Color', onclick);
  }
}

