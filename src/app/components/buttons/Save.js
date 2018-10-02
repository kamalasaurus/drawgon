import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class Save extends Button {
  constructor(appState) {
    const onclick = (e) => {
      let saved_image = appState.canvas.toDataURL('image/gif');
      // append image to an image tag or save it directly
      return this;
    };

    super('Save', onclick);
  }
}
