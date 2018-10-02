import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Line extends Button {
  constructor(appState) {
    const onclick = (e) => {
      // display a slider to select line width
      appState.lineWidth = 5;
      appState.opacity = 1;
      return this;
    };

    super('Line', onclick);
  }
}
