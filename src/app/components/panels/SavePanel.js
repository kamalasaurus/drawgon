// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Container from '../Container.js';

export default class SavePanel extends Container{
  constructor(ctrl) {

    const listOptions = () => {
      return ['saveSVG', 'savePNG']
        .map(name => {
          return m(
            'button', {
              onclick: function() { ctrl[name](); }
            },
            name
          );
        });
    };

    super('control-panel', listOptions());
  }
}

