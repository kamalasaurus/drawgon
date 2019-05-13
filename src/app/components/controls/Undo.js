// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import Button from '../Button.js';

export default class Undo extends Button {
  constructor(ctrl) {
    super('Undo', ctrl.undo);
  }
}

