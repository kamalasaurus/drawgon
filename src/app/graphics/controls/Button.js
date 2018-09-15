import m from '../../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(context) {

    this.click = (e) => {
      e.preventDefault();
      console.log(`clicked ${this.prototype.name}`);
    };

    this.view = (vnode) => {
      return m('div.button', {
        onclick: this.click
      });
    };

  }
}