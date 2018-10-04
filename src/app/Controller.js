export default class AppController {
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

var EventBus = (function() {
  'use strict';

  var bus = {};

  var contains = function(array, name) {
    return array.indexOf(name) !== -1;
  };

  //var events = []
    //.concat(vastEvents)
    //.concat(Object.keys(vpaidEvents))
    //.reduce(function(obj, name) {
      //obj[name] = contains(vastEvents, name) ?
        //[ sendEvent ] :
        //[ Reporter.log ].concat(vpaidEvents[name]);
      //return obj;
    //}, {});

  // private
  var notSubscribable = function(name) {
    return !contains(Object.keys(events), name);
  };

  // remove callback from event subscription arrays
  var removeIfExistingCallback = function(callback, name) {
    var cbArray = events[name].slice();
    var idx = cbArray.indexOf(callback);
    if (idx !== -1) { cbArray.splice(idx, 1); }
    return cbArray;
  };

  // public
  bus.subscribe = function(callback, name) {
    // test for case -- maybe have to compare all lowercase and filter?
    if (notSubscribable(name)) { return; }
    // prevent multiple subscriptions to the same callback
    var cbArray = removeIfExistingCallback(callback, name);
    events[name] = cbArray.concat(callback);
  };

  bus.unsubscribe = function(callback, name) {
    if (notSubscribable(name)) { return; }
    events[name] = removeIfExistingCallback(callback, name);
  };

  bus.dispatchEvent = function(name, arg) {
    // have to work on making sure all clickthrough arguments are passed through
    // have logging here, so name doesn't have to be passed down
    // TODO: migrate external ad event behavior into this function
    var event = {
      type: name,
      arg: arg
    };
    events[name].forEach(function(cb) {
      cb.call(bus, event);
    });
  };

  return bus;

})();
