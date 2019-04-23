import m from '../../../../node_modules/mithril/mithril.js';
import Brushes from '../../options/Brushes.js';
import Container from '../Container.js';

export default class BrushPanel extends Container{
  constructor(ctrl) {

    const listBrushes = () => {
      return Object
        .keys(Brushes)
        .map(name => {
          return m('button', name);
        });
    };

    super('brush-panel', [m('button', {class: close}, 'close')].concat(listBrushes()))

  }
}

