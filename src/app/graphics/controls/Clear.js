import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class Clear extends Button {
  constructor(context) {
    this.onclick = () => {
      context.clearRect(0, 0, context.width, context.height);
      return this;
    }

    super(context, this.onclick);
  }
}
