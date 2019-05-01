import m from '../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(name, onclick, childNodes) {

    const classname = name ? ' '.concat(name) : '';
    const imgname = name ? name.concat('.png') : '';

    this.oninit = (vnode) => {
      vnode.state.active = false;
    };

    this.view = (vnode) => {

      const img = [
        m('img', {
          src: `./src/app/icons/controls/${imgname}`,
          class: 'icon',
          title: name,
          alt: name
        })
      ];

      const children = childNodes ? img.concat(childNodes) : img;

      return m('div', {
        class: `button${classname}`,
        onclick: function(e) { onclick(vnode) }
      }, children);
    };

  }
}

