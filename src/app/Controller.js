import download from '../../node_modules/downloadjs/download.js';

export default class Controller {
  constructor({filename = 'image', mime = 'png', A = 4, dpi = 300}) {

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

    const downloadImage = (dataUrl) => {
      // ternary for SVG download
      const filenameWithExt = [filename, mime].join('.');
      download(dataUrl, filenameWithExt, 'image/png');
      return true;
    };

    let state = {
      flattenedImage: '',
      history: []
    };

    let canvas = null;


    ///////// events!

    const events = {};

    const norm = (name = '') => {
      const n = name.toLowerCase();
      const arr = (events[n] || []).slice();
      return {n, arr};
    };

    this.addEventListener = (name, callback) => {
      const {n, arr} = norm(name);
      if (n && 'function' === typeof callback)
        events[n] = arr.concat(callback);
    };

    this.removeEventListener = (name, callback) => {
      const {n, arr} = norm(name);
      events[n] = arr.reduce((arr, cb) => {
        return cb != callback ? arr.concat(cb) : arr;
      }, []);
    };

    this.dispatchEvent = (name, ...args) => {
      const {n, arr} = norm(name);
      arr.forEach(cb => cb({n, args}));
    };

    ///////// end events!

    // public

    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS, dimensions(A, dpi));
      return this;
    };

    this.assignOptions = (opts) => {
      // update initial parameter list with 'New' options
      filename = opts.filename;
      mime = opts.mime;
      A = opts.A;
      dpi = opts.dpi;
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

    this.saveCanvas = () => {
      // have ternary to select which image gets saved
      const saved_image = canvas.save();
      const saved_svg = canvas.saveSVG();
      downloadImage(saved_image);
      return this;
    }

    this.restoreDefaults();
  }
}

