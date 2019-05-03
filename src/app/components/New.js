// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default class New {
  constructor(ctrl) {

    const submit = (e) => {
      e.preventDefault();

      const opts = Array
        .from(form.dom.elements)
        .reduce((obj, el) => {
          return obj[el.name] = el.value, obj;
        }, {});

      ctrl
        .assignOptions(opts)
        .restoreDefaults();

      m.route.set('/draw');
    };

    const makePaper = (a) => {
      return m('option', {value: a, selected: (a === ctrl.state.A)}, `A${a}`);
    };

    const paperOptions = () => {
      return m('div', [
        m('select', {name: 'A'}, Array.from({length: 11}, (e, i) => makePaper(i)))
      ]);
    };

    const makeDpi = (dpi) => {
      return m('option', {value: dpi, selected: (dpi === ctrl.state.dpi)}, dpi);
    };

    const dpiOptions = () => {
      return m('div', [
        m('select', {name: 'dpi'}, [
          makeDpi(72),
          makeDpi(300)
        ])
      ]);
    };

    let form = m(
      'form',
      { class: 'new' },
      [
        m('div', [
          m('label', {class: 'label'}, 'filename')
        ]),
        m('div', [
          m('input', {type: 'text', name: 'filename', placeholder: 'image', value: 'image'})
        ]),
        m('div', [
          m('label', {class: 'label'}, 'size')
        ]),
        paperOptions(),
        m('div', [
          m('label', {class: 'label'}, 'dpi'),
        ]),
        dpiOptions(),
        m('div', [
          m('button', {class: 'form-button', onclick: submit}, 'Ok')
        ])
      ]
    ); // end form template

    this.view = (vnode) => {
      return form;
    }
  } // end constructor
} // end class

