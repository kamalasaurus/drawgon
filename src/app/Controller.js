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

    // public

    this.undo = () => {
      console.log('undo!');
    };

    this.redo = () => {
      console.log('redo!');
    }

    this.save = () => {
      // have ternary to select which image gets saved
      const saved_image = canvas.save();
      const saved_svg = canvas.saveSVG();
      downloadImage(saved_image);
      return this;
    }

    this.clear = () => {
      canvas.clear();
      return this;
    };



    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS, dimensions(A, dpi));
      return this;
    };

    this.assignOptions = (opts) => {
      // update initial parameter list with 'New' options
      filename = opts.filename;
      mime = opts.mime;
      // cast form type from string to number for following fields
      A = +opts.A;
      dpi = +opts.dpi;
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

    this.restoreDefaults();
  }
}

