import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Color extends Button {
  constructor(appState) {
    const onclick = (e) => {
      // display sunflower colorwheel!
      // TODO: gradient strokes
      appState.strokeStyle = "#000000";
      return this;
    };

    super('Color', onclick);
  }
}
