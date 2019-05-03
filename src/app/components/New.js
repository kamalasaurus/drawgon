// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

export default function New() {

  let _ctrl = {};

  const submit = (e) => {
    e.preventDefault();

    const opts = Array
      .from(e.target.closest('form').elements)
      .reduce((obj, el) => {
        return obj[el.name] = el.value, obj;
      }, {});

    _ctrl
      .assignOptions(opts)
      .restoreDefaults();

    m.route.set('/draw');
  };

  const makePaper = (a) => {
    return m('option', {value: a, selected: (a === _ctrl.state.A)}, `A${a}`);
  };

  const paperOptions = () => {
    return m('div', [
      m('select', {name: 'A'}, Array.from({length: 11}, (e, i) => makePaper(i)))
    ]);
  };

  const makeDpi = (dpi) => {
    return m('option', {value: dpi, selected: (dpi === _ctrl.state.dpi)}, dpi);
  };

  const dpiOptions = () => {
    return m('div', [
      m('select', {name: 'dpi'}, [
        makeDpi(72),
        makeDpi(300)
      ])
    ]);
  };

  return {
    view: ({attrs: { ctrl }}) => {

      _ctrl = ctrl;

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
          paperOptions(),
          m('div', [
            m('label.label', 'dpi'),
          ]),
          dpiOptions(),
          m('div.submit-container', [
            m('button', { onclick: submit }, 'Ok')
          ])
        ]
      );
    }
  }

};

