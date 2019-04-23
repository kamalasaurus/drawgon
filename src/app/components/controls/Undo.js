import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Undo extends Button {
  constructor(ctrl) {
    super('Undo', ctrl.undo);
  }
}

