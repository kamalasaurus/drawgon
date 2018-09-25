import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class BrushSelect extends Button {
  constructor(context) {
    const onclick = (e) => {
      // display brush selection buttons
      // interact with context appropriately
      return this;
    };

    super(this.name, '', onclick);
  }
}
