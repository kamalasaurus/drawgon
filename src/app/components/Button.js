import m from '../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(name, onclick) {
    this.classname = name ? ' '.concat(name) : '';
    this.imgname = name ? name.concat('.png') : '';
    this.active = false;
  }

  view(vnode) {
    const css = () => {
      return this.active ?
        `button${this.classname} active`:
        `button${this.classname}`;
    };

    return m('div', {
      class: css(),
      onclick: (e) => {
        this.active = !this.active;
        onclick();
      }
    }, [
      m('img', {src: `./src/app/icons/controls/${this.imgname}`, class: 'icon'})
    ]);
  }

}

