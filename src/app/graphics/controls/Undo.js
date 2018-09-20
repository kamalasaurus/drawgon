import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class Undo extends Button {
  constructor(context) {
    this.onclick = (e) => {
      // pop last movement off memory stack, redraw
      return this;
    };

    super(context, this.onclick, this.prototype.name);
  }
}
