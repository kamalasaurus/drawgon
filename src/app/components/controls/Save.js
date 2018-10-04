import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Save extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      let saved_image = ctrl.canvas.toDataURL('image/gif');
      // make this event driven!
      // append image to an image tag or save it directly
      return this;
    };

    super('Save', onclick);
  }
}
