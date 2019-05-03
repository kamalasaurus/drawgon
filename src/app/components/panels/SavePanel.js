// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Container from '../Container.js';

export default function SavePanel() {

  const listOptions = (ctrl) => {
    return ['saveSVG', 'savePNG']
      .map(name => {
        return m(
          'button', {
            onclick: () => ctrl[name]()
          },
          name
        );
      });
  };

  return {
    view: ({attrs: { ctrl }}) => m(
      Container, {
        name: 'control-panel',
        children: listOptions(ctrl)
      }
    )
  };
}

