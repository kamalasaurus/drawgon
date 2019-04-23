import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Redo extends Button {
  constructor(ctrl) {
    super('Redo', ctrl.redo);
  }
}

