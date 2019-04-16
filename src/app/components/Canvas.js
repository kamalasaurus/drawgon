import m from '../../../node_modules/mithril/mithril.js';
import Pressure from '../../../node_modules/pressure/dist/pressure.js';
import C2S from '../../../node_modules/canvas2svg/canvas2svg.js';

export default class Canvas {
  constructor(ctrl) {

    const conditionalEvents = () => {
      const mouseEvents = {
        onmousedown: this.down.bind(this),
        onmousemove: this.move.bind(this),
        onmouseup: this.up.bind(this)
      };

      const touchEvents = {
        ontouchstart: this.down.bind(this),
        ontouchmove: this.move.bind(this),
        ontouchend: this.up.bind(this)
      };

      return 'ontouchstart' in window ?
        touchEvents :
        mouseEvents;
    }

    this.canvas = m(
      'canvas',
      Object.assign(
        {
          id: 'surface',
          class: 'surface',
          width: ctrl.state.width,
          height: ctrl.state.height,
          style: '--aspect-ratio: 1.414/1;'
        },
        conditionalEvents()
      )
    );

    ctrl.assignCanvas(this);
  }

  draw(assign, method, ...args) {
    console.log(this);
    if (assign) {
      this.context[method] = args[0];
      this.c2s[method] = args[0];
    } else {
      this.context[method].apply(this.context, args);
      this.c2s[method].apply(this.c2s, args);
    }
    return this;
  }

  resize() {
    // resize canvas and c2s :/
  }

  clear() {
    //TODO: might need to manually clear svg children

    this.draw.call(this, true, 'fillStyle', 'white');
    this.draw.call(this, false, 'clearRect', 0, 0, this.canvas.dom.width, this.canvas.dom.height);
    this.draw.call(this, false, 'fillRect', 0, 0, this.canvas.dom.width, this.canvas.dom.height);
    return this;
  }

  save() {
    return this.canvas.dom.toDataURL('image/png');
  }

  saveSVG() {
    return this.c2s.getSerializedSvg();
  }

  down(e) {
    // prevent screen drag, enable drawing
    e.preventDefault();
    this.tapped = true;
    return this;
  }

  move(e) {
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
    this.draw.call(this, false, 'beginPath');
    this.draw.call(this, false, 'moveTo', pX, pY);
    this.draw.call(this, false, 'lineTo', x, y);
    this.draw.call(this, true, 'lineWidth', ctrl.state.lineWidth * this.force);
    this.draw.call(this, false, 'stroke');

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
  }

  up(e) {
    // disable drawing, clear conditions, write signature as image data in prop
    e.preventDefault();
    this.tapped = false;
    this.prevX = null;
    this.prevY = null;
    return this;
  }

  //DON'T CREATE CANVAS UNTIL NEW EVENT IS FIRED FROM CONTROLLER!!

  oncreate(vnode) {

    this.context = vnode.dom.getContext('2d');

    this.c2s = new C2S({
      ctx: this.context,
      width: vnode.dom.width,
      height: vnode.dom.height,
      enableMirroring: false,
      document: document
    });

    this.clear();

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
  }

  view(vnode) {
    return this.canvas;
  }
}

