export default class AppState {
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

    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS);
      return this;
    };

    this.flattenHistory = () => {
      // ability to flatten to flattenedImage, blows away releveant history, but preserves image
      // history object: {brush: type, color: col, opacity: o, lineWidth: lw, path: [sx,sy,dx,dy]}
      state.flattenImage = 'canvascontext.toImageURL';
      state.history = [];
      return this;
    };

    this.assignCanvas = (c) => {
      canvas = c;
      return this;
    };

    this.pushState = (s) => {
      state.history.push(s);
      return this;
    };

    this.clearCanvas = () => {
      canvas.clear();
      return this;
    };

    this.restoreDefaults();
  }
}

