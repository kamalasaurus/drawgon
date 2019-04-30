import download from '../../node_modules/downloadjs/download.js';

export default class Controller {
  constructor({filename = 'image', mime = 'png', A = 4, dpi = 300}) {

    // currently only supports A-series papers, change base length for B-series
    // https://www.prepressure.com/library/paper-size/din-a3
    // https://en.wikipedia.org/wiki/Paper_size#Overview:_ISO_paper_sizes
    // aSize: [0, 10] dpi: 72, 300

    const DEFAULTS = {
      brush: 'round',
      lineWidth: 5
    };

    // runs a couple pixels large from what the internet round numbers are
    const dimensions = (aSize, dpi) => {
      const αA = dpi * 39.3701 * (2 ** (1/4)); // 39.3701in == 1000mm
      const width = Math.floor(αA * (2 ** (-(aSize + 1) / 2)));
      const height = Math.floor(αA * (2 ** (-aSize / 2)));
      return {width, height}
    };

    const downloadImage = (dataUrl, isSvg) => {
      //TODO: this is async and stateful, only saves svg currently
      //probably just don't save a png, or, have it wait before saving
      //second image
      if (isSvg) {
        const filenameSvg = [filename, 'svg'].join('.');
        download(dataUrl, filenameSvg, 'image/svg');
      } else {
        const filenamePng = [filename, mime].join('.');
        download(dataUrl, filenamePng, 'image/png');
      }
      return true;
    };

    //TODO: just use svg2canvas project for history state, remove
    //child nodes from there.  Way simpler than having independent
    //history since it's implicitly created by svg2canvas /shrug
    let state = {
      //flattenedImage: '',
      //history: []
    };

    let canvas = null;

    // public

    this.undo = () => {
      canvas.undo();
      return this;
    };

    this.redo = () => {
      canvas.redo();
      return this;
    };

    this.savePNG = () => {
      const saved_image = canvas.savePNG();
      downloadImage(saved_image);
      return this;
    };

    this.saveSVG = () => {
      const saved_svg = canvas.saveSVG();
      downloadImage(saved_svg, true);
      return this;
    };

    this.clear = () => {
      canvas.clear();
      return this;
    };

    this.setBrush = (name) => {
      state.brush = name;
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

    this.assignCanvas = (c) => {
      canvas = c;
      return this;
    };

    this.restoreDefaults();
  }
}

