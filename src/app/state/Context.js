export default class Context {
  constructor(/*canvascontext*/) {
    const DEFAULTS = {}

    this.flattenedImage = '';
    this.history = [];

    this.restoreDefaults = () => {
      this = Object.assign(this, DEFAULTS);
    };

    this.flattenHistory = () => {
      this.flattenHistory = 'canvascontext.toImageURL';
      this.history = [];
    }

    this.restoreDefaults();
  }
}

