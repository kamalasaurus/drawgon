import m from '../../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(context, onclick) {

    this.onclick = (e) => {
      e.preventDefault();
      console.log(`clicked ${this.prototype.name}`);
    };

    this.view = (vnode) => {
      return m('div.button', {
        onclick: (onclick || this.onclick)
      });
    };

  }
}
