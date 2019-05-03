// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default function New() {

  const submit = (ctrl, e) => {
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

  const makePaper = (ctrl, a) => {
    return m('option', {value: a, selected: (a === ctrl.state.A)}, `A${a}`);
  };

  const paperOptions = (ctrl) => {
    return m('div', [
      m('select', {name: 'A'}, Array.from({length: 11}, (e, i) => makePaper(ctrl, i)))
    ]);
  };

  const makeDpi = (ctrl, dpi) => {
    return m('option', {value: dpi, selected: (dpi === ctrl.state.dpi)}, dpi);
  };

  const dpiOptions = (ctrl) => {
    return m('div', [
      m('select', {name: 'dpi'}, [
        makeDpi(ctrl, 72),
        makeDpi(ctrl, 300)
      ])
    ]);
  };

  return {
    view: ({attrs: { ctrl }}) => {
      return m(
        'form.new',
        [
          m('div.title', [
            m('object.logo', { type: 'image/svg+xml', data: './green-drawgon.svg' })
          ]),
          m('div', [
            m('label.label', 'filename')
          ]),
          m('div', [
            m('input', {type: 'text', name: 'filename', placeholder: 'image', value: 'image'})
          ]),
          m('div', [
            m('label.label', 'size')
          ]),
          paperOptions(ctrl),
          m('div', [
            m('label.label', 'dpi'),
          ]),
          dpiOptions(ctrl),
          m('div.submit-container', [
            m('button', { onclick: submit.bind(this, ctrl) }, 'Ok')
          ])
        ]
      );
    }
  }

};

