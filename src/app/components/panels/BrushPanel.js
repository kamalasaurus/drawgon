import m from '../../../../node_modules/mithril/mithril.js';
import Brushes from '../../options/Brushes.js';
import Container from '../Container.js';
import Button from '../Button.js';

export default class BrushPanel extends Container {
  constructor() {
    super('brush-panel', BrushPanel.prototype.listBrushes());
  }

  listBrushes() {
    return Object
      .keys(Brushes)
      .map(name => m('div', {class: 'BrushButton'}, name))
  }
}

