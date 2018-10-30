import Button from '../../controls/Button.js';

export default class Close extends Button {
  constructor(ctrl) {
    const onclick = (e) => {
      console.log('close parent');
      // call the appropriate close method on the event bus
      return this;
    };

    super('Close', onclick);
  }
}
