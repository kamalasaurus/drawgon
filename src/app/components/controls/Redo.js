import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Redo extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      // reattach motions to memory stack
      return this;
    };

    super('Redo', onclick);
  }
}
