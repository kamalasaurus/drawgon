import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';
import BrushPanel from '../panels/BrushPanel.js';

export default class Brush extends Button {
  constructor(ctrl, children) {
    const onclick = (vnodeDom) => {
      console.log(ctrl)
      return this;
    }

    super('Brush', onclick, children);
  }
}

