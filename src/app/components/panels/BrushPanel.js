// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Brushes from '../../options/Brushes.js';
import Container from '../Container.js';

export default function BrushPanel() {

  const listBrushes = (ctrl) => {
    return Object
      .keys(Brushes)
      .map(name => {
        return m(
          'button', {
            onclick: () => ctrl.setBrush(name)
          },
          name
        );
      });
  };

  return {
    view: ({attrs: { ctrl }}) => m(
      Container,
      {name: 'control-panel'},
      listBrushes(ctrl)
    )
  };
}

