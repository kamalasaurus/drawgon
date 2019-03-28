import m from '../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(name, onclick) {

    const classname = name ? ' '.concat(name) : '';
    const imgname = name ? name.concat('.png') : '';

    this.active = false;

    this.onclick = (e) => {
      e.preventDefault();
      console.log(`clicked ${name || 'Button'}`);
    };

    this.view = (vnode) => {
      return m('div', {
        class: `button${classname}`,
        onclick: (onclick || this.onclick)
      }, [
        m('img', {src: `./src/app/icons/controls/${imgname}`, class: 'icon'})
      ]);
    };

  }
}

