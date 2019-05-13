// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Container from '../Container.js';

export default class PlusPanel extends Container{
  constructor(ctrl) {

    const addBrush = () => {
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

    super('control-panel', addBrush());
  }
}

