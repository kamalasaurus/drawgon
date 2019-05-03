// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default function New() {

  const submit = (ctrl, e) => {
    e.preventDefault();

    const opts = Array
      .from(e.target.closest('form').elements)
      .reduce((obj, el) => {
        return obj[el.name] = el.value, obj;
      }, {});

    ctrl
      .assignOptions(opts)
      .restoreDefaults();

    m.route.set('/draw');
  };

  const makePaper = (A, a) => {
    return m('option', {value: a, selected: (A === a)}, `A${a}`);
  };

  const paperOptions = (A) => {
    return m('div', [
      m('select', {name: 'A'}, Array.from({length: 11}, (e, i) => makePaper(A, i)))
    ]);
  };

  const makeDpi = (dpi, choice) => {
    return m('option', {value: choice, selected: (dpi === choice)}, choice);
  };

  const dpiOptions = (dpi) => {
    return m('div', [
      m('select', {name: 'dpi'}, [
        makeDpi(dpi, 72),
        makeDpi(dpi, 300)
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
          paperOptions(ctrl.state.A),
          m('div', [
            m('label.label', 'dpi'),
          ]),
          dpiOptions(ctrl.state.dpi),
          m('div.submit-container', [
            m('button', { onclick: submit.bind(this, ctrl) }, 'Ok')
          ])
        ]
      );
    }
  };

}

