import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class ColorWheel extends Button {
  constructor(context) {
    this.onclick = (e) => {
      // display sunflower colorwheel!
      // TODO: gradient strokes
      context.strokeStyle = "#000000";
      return this;
    };

    super(context, this.onclick, this.prototype.name);
  }
}
