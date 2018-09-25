import m from '../../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(classname, imagesrc, onclick) {

    const name = classname ? ' '.concat(classname) : '';

    this.onclick = (e) => {
      e.preventDefault();
      console.log(`clicked ${classname || 'Button'}`);
    };

    this.view = (vnode) => {
      return m('div', {
        class: `button${name}`,
        onclick: (onclick || this.onclick)
      }, [
        m('img', {src: `../../../icons/${imagesrc}`, class: 'icon'})
      ]);
    };

  }
}
