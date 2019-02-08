import m from '../../../node_modules/mithril/mithril.js';
import Pressure from '../../../node_modules/pressure/dist/pressure.js';
import C2S from '../../../node_modules/canvas2svg/canvas2svg.js';

export default class Canvas {
  constructor(ctrl) {

    // private
    const clear = () => {
      // TODO: replace w/ clearRect and make a background div with white or
      // checkerboard pattern.  This is necessary for a useful eraser and layers!
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.canvas.dom.width, this.canvas.dom.height);
      // clearRect actually makes it transparent
      // this.value('');
      return this;
    };

    const save = () => {
      return this.canvas.dom.toDataURL('image/png');
    };

    const down = (e) => {
      // prevent screen drag, enable drawing
      e.preventDefault();
      this.tapped = true;
      return this;
    };

    const move = (e) => {
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
      this.context.lineWidth = ctrl.state.lineWidth * this.force;
      this.context.stroke();

      // assign action to history
      ctrl.pushState({
        brush: ctrl.state.brush,
        color: ctrl.state.color, //TODO: get live color
        opacity: ctrl.state.opacity, //TODO: get live opacity
        lineWidth: this.context.lineWidth,
        path: [pX, pY, x, y]
      });

      // set current value for the next previous value
      this.prevX = x;
      this.prevY = y;

      return this;
    };

    const up = (e) => {
      // disable drawing, clear conditions, write signature as image data in prop
      e.preventDefault();
      this.tapped = false;
      this.prevX = null;
      this.prevY = null;
      return this;
    };

    const conditionalEvents = () => {
      const mouseEvents = {
        onmousedown: down,
        onmousemove: move,
        onmouseup: up
      };

      const touchEvents = {
        ontouchstart: down,
        ontouchmove: move,
        ontouchend: up
      };

      return 'ontouchstart' in window ?
        touchEvents :
        mouseEvents;
    };

    // public
    this.clear = clear;
    this.save = save;

    this.canvas = m(
      'canvas',
      Object.assign(
        {
          id: 'surface',
          class: 'surface',
          width: ctrl.state.width,
          height: ctrl.state.height,
          style: '--aspect-ratio: 1.414/1;' // TODO: A3 and A4 have the same aspect ratio!
        },
        conditionalEvents()
      )
    );

    this.oncreate = (vnode) => {

      this.context = vnode.dom.getContext('2d');

      this.c2s = new C2S({
        ctx: this.context,
        width: ctrl.state.width,
        height: ctrl.state.height,
        enableMirroring: false,
        document: document
      });

      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, vnode.dom.width, vnode.dom.height);

      this.force = 1;
      this.tapped  = false;
      this.isDrawn = false;
      this.prevX = null;
      this.prevY = null;

      // TODO: only leak relevant functionality to ctrl
      ctrl.assignCanvas(this);

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

