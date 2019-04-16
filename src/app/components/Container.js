import m from '../../../node_modules/mithril/mithril.js';

export default class Container {
  constructor(name, children) {
    this.classname = name ? ' '.concat(name) : '';
    this.children = children || [];
  }

  view(vnode) {
    return m('div', {class: `container${this.classname}`}, this.children);
  }
}

