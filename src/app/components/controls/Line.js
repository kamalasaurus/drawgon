import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Line extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      // display a slider to select line width
      ctrl.lineWidth = 5;
      ctrl.opacity = 1;
      return this;
    };

    super('Line', onclick);
  }
}
