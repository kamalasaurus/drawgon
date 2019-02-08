import m from '../../../node_modules/mithril/mithril.js';

export default class New {
  constructor(ctrl) {

    const submit = (e) => {
      console.log(ctrl);
      m.route.set('/draw');
    };

    this.view = (vnode) => {
      return m('form', {
        class: 'new'
      }, [
        m('div', [
          m('label', {class: 'label'}, 'name')
        ]),
        m('div', [
          m('input', {type: 'text', name: 'name', placeholder: 'image', value: 'image'})
        ]),
        m('div', [
          m('label', {class: 'label'}, 'image type')
        ]),
        m('div', [
          m('select', [
            m('option', {value: 'png', selected: 'selected'}, 'png'),
            m('option', {value: 'gif'}, 'gif')
          ])
        ]),
        m('div', [
          m('label', {class: 'label'}, 'size')
        ]),
        m('div', [
          m('select', [
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
          m('select', [
            m('option', {value: '72'}, '72'),
            m('option', {value: '300', selected: 'selected'}, '300'),
          ])
        ]),
        m('div', [
          m('div', {class: 'form-button', onclick: submit}, 'Ok')
        ])
      ]);
    };
  }
}

