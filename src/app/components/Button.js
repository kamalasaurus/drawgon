// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

//export default class Button {
  //constructor(name, onclick, childNodes) {

    //const classname = name ? ' '.concat(name) : '';
    //const imgname = name ? name.concat('.png') : '';

    //this.oninit = (vnode) => {
      //vnode.state.active = false;
    //};

    //this.view = (vnode) => {

      //const img = [
        //m('img', {
          //src: `./src/app/icons/controls/${imgname}`,
          //class: 'icon',
          //title: name,
          //alt: name
        //})
      //];

      //const children = childNodes ? img.concat(childNodes) : img;

      //return m('div', {
        //class: `button${classname}`,
        //onclick: function(e) { onclick(vnode) }
      //}, children);
    //};

  //}
//}

export default function Button() {

  let active = false;

  const img = (name) => [
    m('img.icon', {
      src: `./src/app/icons/controls/${name.concat('.png')}`,
      title: name,
      alt: name
    })
  ];

  return {
    view: ({attrs: { name = '', children = [], onclick }}) => {
      return m(
        `div.button.${name}`, {
          class: active ? 'active': '',
          onclick: (onclick || (() =>  active = !active))
        },
        active ?
          img(name).concat(children) :
          img(name)
      )
    }
  };
}

//const Button = {
  //view: ({attrs: { name = '', children = [], onclick }}) => {

    //let active = false;
    //this.children = children;

    //const img = (name) => [
      //m('img.icon', {
        //src: `./src/app/icons/controls/${name.concat('.png')}`,
        //title: name,
        //alt: name
      //})
    //];

    //return m(
      //`div.button.${name}`, {
        //class: active ? 'active': '',
        //onclick: (onclick || (() => { debugger; active = !active; }))
      //},
      //img(name),
      //active && this.children
    //);
  //}
//}

//export default Button;

