import m from '../../../node_modules/mithril/mithril.js';
import Pressure from '../../../node_modules/pressure/dist/pressure.js';

export default class Canvas {
  constructor(opts) {

    //TODO:  turn off anti-alias

    this.clear = () => {
      // clear canvas contents, erase signature data
      this.context.clearRect(0, 0, this.canvas.dom.width, this.canvas.dom.height);
      // this.value('');
      return this;
    };

    this.down = (e) => {
      // prevent screen drag, enable drawing
      e.preventDefault();
      this.tapped = true;
      return this;
    };

    this.move = (e) => {
      e.preventDefault();
      if (!this.tapped) return;

      // starting conditions
      var isTouch = e.type === 'touchmove';
      var isFirstTouch = (!Number.isFinite(this.prevX) || !Number.isFinite(this.prevY));

      var rect = this.canvas.dom.getBoundingClientRect();

      // position on screen
      var cX = isTouch ? e.touches[0].clientX : e.clientX;
      var cY = isTouch ? e.touches[0].clientY : e.clientY;

      // previous position on canvas
      var pX = isFirstTouch ? x : this.prevX;
      var pY = isFirstTouch ? y : this.prevY;

      // position on canvas, normalize for style size and declared size of canvas
      var x = (cX - rect.left) / (rect.right - rect.left) * this.canvas.dom.width;
      var y = (cY - rect.top) / (rect.bottom - rect.top) * this.canvas.dom.height;

      // draw line from previous position to current position
      this.context.beginPath();
      this.context.moveTo(pX, pY);
      this.context.lineTo(x, y);
      this.context.stroke();

      // set current value for the next previous value
      this.prevX = x;
      this.prevY = y;

      console.log(this.force);

      return this;
    };

    this.up = (e) => {
      // disable drawing, clear conditions, write signature as image data in prop
      e.preventDefault();
      this.tapped = false;
      this.prevX = null;
      this.prevY = null;
      // this.value(this.canvas.dom.toDataURL('image/png'));
      return this;
    };

    this.conditionalEvents = () => {
      // plug in pressure.js here
      // use declarative syntax to avoid the hoisting problem :/

      const mouseEvents = {
        onmousedown: this.down,
        onmousemove: this.move,
        onmouseup: this.up
      };

      const touchEvents = {
        ontouchstart: this.down,
        ontouchmove: this.move,
        ontouchend: this.up
      };

      return 'ontouchstart' in window ?
        touchEvents :
        mouseEvents;
    };

    this.canvas = m(
      'canvas.surface[width="400"][height="250"]',
      Object.assign(
        { id: 'surface'},
        this.conditionalEvents()
      )
    );

    this.oncreate = (vnode) => {
      this.context = vnode.dom.getContext('2d');

      this.force = 1;
      this.tapped  = false;
      this.isDrawn = false;
      this.prevX = null;
      this.prevY = null;

      Pressure.set(vnode.dom, {
        change: (force) => {
          this.force = force;
        }
      });
    };

    this.view = (vnode) => {
      return this.canvas;
    };

  }
}

