import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Clear extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      ctrl.clearCanvas();
      return this;
    }

    super('Clear', onclick);
  }
}
