import m from '../../../node_modules/mithril/mithril.js';

export default class New {
  constructor(ctrl) {
    this.form = m(
      'form',
      { class: 'new' },
      [
        m('div', [
          m('label', {class: 'label'}, 'filename')
        ]),
        m('div', [
          m('input', {type: 'text', name: 'filename', placeholder: 'image', value: 'image0'})
        ]),
        m('div', [
          m('label', {class: 'label'}, 'image type')
        ]),
        m('div', [
          m('select', {name: 'mime'}, [
            m('option', {value: 'png', selected: 'selected'}, 'png'),
            m('option', {value: 'svg'}, 'svg')
          ])
        ]),
        m('div', [
          m('label', {class: 'label'}, 'size')
        ]),
        m('div', [
          m('select', {name: 'A'}, [
            m('option', {value: '0'}, 'A0'),
            m('option', {value: '1'}, 'A1'),
            m('option', {value: '2'}, 'A2'),
            m('option', {value: '3'}, 'A3'),
            m('option', {value: '4', selected: 'selected'}, 'A4'),
            m('option', {value: '5'}, 'A5'),
            m('option', {value: '6'}, 'A6'),
            m('option', {value: '7'}, 'A7'),
            m('option', {value: '8'}, 'A8'),
            m('option', {value: '9'}, 'A9'),
            m('option', {value: '10'}, 'A10')
          ])
        ]),
        m('div', [
          m('label', {class: 'label'}, 'dpi'),
        ]),
        m('div', [
          m('select', {name: 'dpi'}, [
            m('option', {value: '72'}, '72'),
            m('option', {value: '300', selected: 'selected'}, '300'),
          ])
        ]),
        m('div', [
          m('div', {class: 'form-button', onclick: this.submit.bind(this)}, 'Ok')
        ])
      ]
    ); // end form template
  }

  submit(e) {
    const opts = Array
      .from(this.form.dom.elements)
      .reduce((obj, el) => {
        return obj[el.name] = el.value, obj;
      }, {});

    ctrl
      .assignOptions(opts)
      .restoreDefaults();

    m.route.set('/draw');
  }

  view(vnode) {
    return this.form;
  }

} // end class
