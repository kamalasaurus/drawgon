import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Eraser extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      console.log('Eraser')
      // display brush selection buttons
      // interact with context appropriately
      return this;
    };

    ctrl.addEventListener('Eraser', onclick);

    super('Eraser', ctrl.dispatchEvent.bind(null, 'Eraser'));
  }
}
