// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default function Container(ctrl, name = '', children = []) {
  return {
    view: () => m(`div.container.${name}`, children)
  }
};

