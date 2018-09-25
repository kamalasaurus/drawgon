import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class BrushControl extends Button {
  constructor(context) {
    const onclick = (e) => {
      // display brush selection buttons
      // interact with context appropriately
      return this;
    };

    super(this.constructor.name, onclick);
  }
}
