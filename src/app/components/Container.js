// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default class Container {
  constructor(name, children) {

    const classname = name ? ' '.concat(name) : '';

    this.view = (vnode) => {
      return m('div', {class: `container${classname}`}, children || []);
    };
  }
}

