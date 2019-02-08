import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Brush extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      console.log('Brush');
      // display brush selection buttons
      // interact with context appropriately
      return this;
    };

    ctrl.addEventListener('Brush', onclick);

    super('Brush', ctrl.dispatchEvent.bind(null, 'Brush'));
  }
}
