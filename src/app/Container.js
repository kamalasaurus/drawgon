import m from '../../../node_modules/mithril/mithril.js';

export default class Container {
  constructor(classname, children) {

    const name = classname ? ' '.concat(classname) : '';

    this.view = (vnode) => {
      return m('div', {class: `container${name}`}, children || []);
    };
  }
}

