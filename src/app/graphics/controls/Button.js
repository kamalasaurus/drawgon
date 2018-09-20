import m from '../../../../node_modules/mithril/mithril.js';

export default class Button {
  constructor(context, onclick, classname) {

    let name = classname ? '.'.concat(classname) : '';

    this.onclick = (e) => {
      e.preventDefault();
      console.log(`clicked ${classname || this.prototype.name}`);
    };

    this.view = (vnode) => {
      return m(`div.button${name}`, {
        onclick: (onclick || this.onclick)
      });
    };

  }
}
