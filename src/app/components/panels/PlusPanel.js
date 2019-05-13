// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../../node_modules/mithril/mithril.js';
import Container from '../Container.js';

export default class PlusPanel extends Container{
  constructor(ctrl) {

    const addBrush = () => {
      return m('div', {contenteditable: true}, `
        round(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
          draw('beginPath');
          draw('moveTo', pX, pY);
          draw('lineTo', x, y);
          draw('closePath');
          draw('lineWidth', lineWidth * force);
          draw('stroke');
        }
      `);
    };

    super('control-panel', addBrush());
  }
}

