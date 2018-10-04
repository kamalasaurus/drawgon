import Container from '../../Container.js';
import Button from '../controls/Button.js';

export default class LinePanel {
  constructor() {
    this.view = (vnode) => {
      return m(new Container(this.constructor.name, BrushPanel.listBrushes()))
    };
  }

  listBrushes() {
    return Object
      .keys(Brushes)
      .map(name => new Button(name))
  }
}

