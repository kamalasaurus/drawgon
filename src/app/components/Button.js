import m from '../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(name, onclick) {

    const classname = name ? ' '.concat(name) : '';
    const imgname = name ? name.concat('.png') : '';

    let active = false;

    const css = () => {
      return active ?
        `button${classname} active`:
        `button${classname}`;
    };

    this.view = (vnode) => {
      return m('div', {
        class: css(),
        onclick: function(e) {
          active = !active;
          onclick();
        }.bind(this)
      }, [
        m('img', {src: `./src/app/icons/controls/${imgname}`, class: 'icon'})
      ]);
    };

  }
}

