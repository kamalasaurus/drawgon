// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import download from '../../node_modules/downloadjs/download.js';
import Brushes from './options/Brushes.js';

export default class Controller {
  constructor({filename = 'image', A = 4, dpi = 300}) {

    // currently only supports A-series papers, change base length for B-series
    // https://www.prepressure.com/library/paper-size/din-a3
    // https://en.wikipedia.org/wiki/Paper_size#Overview:_ISO_paper_sizes
    // aSize: [0, 10] dpi: 72, 300

    const DEFAULTS = {
      brush: 'round',
      lineWidth: 3
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
        const filenamePng = [filename, 'png'].join('.');
        download(dataUrl, filenamePng, 'image/png');
      }
      return true;
    };

    //TODO: figure out mithril rerendering issues and don't do this manually
    const appendBrushTemp = (brush) => {
      this.setBrush(brush.name);
      let bPanel = document.querySelector('.Brush > .control-panel');
      bPanel.innerHTML = '';
      Object
        .keys(state.userBrushes)
        .map(name => {
          let b = document.createElement('button');
          b.innerHTML = name;
          b.onclick = (() => this.setBrush(name));
          return b;
        })
        .forEach(el => (
          bPanel.appendChild(el)
        ));
    };

    let state = {
      undoHistory: [],
      userBrushes: Brushes
    };

    let canvas = null;

    // public

    this.addBrush = (newBrush) => {
      let brush;
      //TODO: run the brush in a worker to make it secure
      //from potentially toxic newBrushes
      try { brush = eval(newBrush) }
      catch(error) { alert(error) }
      state.userBrushes = Object.assign({}, {[brush.name]: brush}, Brushes);
      appendBrushTemp(brush);
      return this;
    };

    this.undo = () => {
      const lastChild = canvas.undo();
      if (lastChild) state.undoHistory.push(lastChild);
      return this;
    };

    this.redo = () => {
      canvas.redo(state.undoHistory.pop());
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

    this.clearHistory = () => {
      state.undoHistory = [];
      return this;
    };

    this.setBrush = (name) => {
      state.brush = name;
      return this;
    };



    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS, dimensions(A, dpi), {A, dpi});
      return this;
    };

    this.assignOptions = (opts) => {
      // update initial parameter list with 'New' options
      filename = opts.filename;
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

