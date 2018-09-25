import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class ColorWheel extends Button {
  constructor(context) {
    const onclick = (e) => {
      // display sunflower colorwheel!
      // TODO: gradient strokes
      context.strokeStyle = "#000000";
      return this;
    };

    super(context, onclick, 'ColorWheel');
  }
}
