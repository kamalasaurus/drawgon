import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Save extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      return ctrl.saveCanvas()
    };

    super('Save', onclick);
  }
}
