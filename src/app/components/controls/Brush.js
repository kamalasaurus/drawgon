// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Button from '../Button.js';

//export default class Brush extends Button {
  //constructor(ctrl, children) {
    //const onclick = (vnode) => {
      //vnode.state.active = vnode.dom.classList.contains('active');
      //vnode.state.active = !vnode.state.active;
      //// I couldn't get the auto redraw to work...  oh well
      //Array.from(vnode.dom.parentElement.children)
        //.forEach(button => button.classList.remove('active'));

      //if (vnode.state.active) vnode.dom.classList.add('active');
      //return this;
    //}

    //super('Brush', onclick, children);
  //}
//}

export default function Brush() {
  return {
    view: ({attrs: { children }}) => m(
      Button, {
        name: 'Brush',
        children: children
      }
    )
  };
}

