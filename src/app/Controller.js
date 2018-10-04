export default class Controller {
  constructor({A, dpi}) {

    // currently only supports A-series papers, change base length for B-series
    // https://www.prepressure.com/library/paper-size/din-a3
    // https://en.wikipedia.org/wiki/Paper_size#Overview:_ISO_paper_sizes
    // aSize: [0, 10] dpi: 72, 300

    const DEFAULTS = {
      brush: 'round',
      color: '#000000',
      opacity: 1,
      lineWidth: 5
    };

    // runs a couple pixels large from what the internet round numbers are
    const dimensions = (aSize, dpi) => {
      const αA = dpi * 39.3701 * (2 ** (1/4)); // 39.3701in == 1000mm
      const width = Math.floor(αA * (2 ** (-(aSize + 1) / 2)));
      const height = Math.floor(αA * (2 ** (-aSize / 2)));
      return {width, height}
    };

    let state = {
      flattenedImage: '',
      history: []
    };

    let canvas = null;


    // public
    ///////// events!

    const events = {};

    this.addEventListener = (name, callback) => {
      const arr = events[name] || [];
      events[name] = arr.concat(callback);
    };

    this.removeEventListener = (name, callback) => {
      const arr = events[name] || [];
      events[name] = arr.reduce((arr, cb) => {
        return cb != callback ? arr.concat(cb) : arr;
      }, []);
    };

    this.dispatchEvent = (name, ...args) => {
      const call = (cb) => cb({name, args});
      events[name].forEach(call);
    };

    ///////// end events!

    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS, dimensions(A, dpi));
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

