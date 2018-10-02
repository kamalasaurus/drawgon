import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

export default class Clear extends Button {
  constructor(appState) {
    const onclick = (e) => {
      appState.clearCanvas();
      return this;
    }

    super('Clear', onclick);
  }
}
