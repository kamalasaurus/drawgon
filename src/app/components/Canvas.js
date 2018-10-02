import m from '../../../node_modules/mithril/mithril.js';
import Pressure from '../../../node_modules/pressure/dist/pressure.js';

export default class Canvas {
  constructor(context) {

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
      const isTouch = e.type === 'touchmove';
      const isFirstTouch = (!Number.isFinite(this.prevX) || !Number.isFinite(this.prevY));

      const rect = this.canvas.dom.getBoundingClientRect();

      // position on screen
      const cX = isTouch ? e.touches[0].clientX : e.clientX;
      const cY = isTouch ? e.touches[0].clientY : e.clientY;

      // position on canvas, normalize for style size and declared size of canvas
      const x = (cX - rect.left) / (rect.right - rect.left) * this.canvas.dom.width;
      const y = (cY - rect.top) / (rect.bottom - rect.top) * this.canvas.dom.height;

      // previous position on canvas
      const pX = isFirstTouch ? x : this.prevX;
      const pY = isFirstTouch ? y : this.prevY;

      // draw line from previous position to current position
      this.context.beginPath();
      this.context.moveTo(pX, pY);
      this.context.lineTo(x, y);
      this.context.lineWidth = context.lineWidth * this.force;
      this.context.stroke();

      context.history.push({
        brush: context.brush,
        color: context.color, //TODO: get live color
        opacity: context.opacity, //TODO: get live opacity
        lineWidth: this.context.lineWidth,
        path: [pX, pY, x, y]
      });

      // set current value for the next previous value
      this.prevX = x;
      this.prevY = y;

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
      'canvas',
      Object.assign(
        {
          id: 'surface',
          class: 'surface',
          width: '400',
          height: '400'
        },
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

