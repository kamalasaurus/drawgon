export default class Context {
  constructor() {
    const DEFAULTS = {
      brush: 'round',
      color: '#000000',
      opacity: 1,
      lineWidth: 5
    };

    let state = {
      flattenedImage: '',
      history: []
    };

    let canvas = null;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS);
    };

    this.flattenHistory = () => {
      state.flattenImage = 'canvascontext.toImageURL';
      state.history = [];
    };

    this.assignCanvas = (c) => {
      canvas = c;
    };

    this.restoreDefaults();
  }
}

