import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Rotate extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      // display brush selection buttons
      // interact with context appropriately
      //return this;
    };

    super('Rotate', onclick);
  }
}
