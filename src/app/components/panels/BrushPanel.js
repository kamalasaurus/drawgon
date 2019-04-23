import m from '../../../../node_modules/mithril/mithril.js';
import Brushes from '../../options/Brushes.js';
import Container from '../Container.js';

export default class BrushPanel extends Container{
  constructor(ctrl) {

    const listBrushes = () => {
      return Object
        .keys(Brushes)
        .map(name => {
          return m(
            'button', {
              onclick: function() { ctrl.setBrush(name) }
            },
            name
          );
        });
    };

    super('brush-panel', listBrushes());
  }
}

