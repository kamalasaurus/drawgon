// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Container from '../Container.js';

export default class PlusPanel extends Container{
  constructor(ctrl) {

    const addBrush = () => {
      return [
        m('textarea.add-brush', {
          cols: 50,
          rows: 10,
          onclick: ((e) => e.stopPropagation())
        }, `
        round(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
          draw('beginPath');
          draw('moveTo', pX, pY);
          draw('lineTo', x, y);
          draw('closePath');
          draw('lineWidth', lineWidth * force);
          draw('stroke');
        }`),
        m('br'),
        m('button.add-brush', {
          onclick: ((e) => ctrl.addBrush(e.target.previousSibling.previousSibling.value.trim()))
        }, 'addBrush')
      ]
    };

    super('control-panel', addBrush());
  }
}

