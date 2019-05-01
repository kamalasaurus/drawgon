import m from '../../../node_modules/mithril/mithril.js';
import Pressure from '../../../node_modules/pressure/dist/pressure.js';
import C2S from '../../../node_modules/canvas2svg/canvas2svg.js';

import Brushes from '../options/Brushes.js';

export default class Canvas {
  constructor(ctrl) {

    // private
    const getGroup = () => {
      return this.c2s.getSvg().getElementsByTagName('g')[0];
    };

    const draw = (assign, method, ...args) => {
      if (assign) {
        this.context[method] = args[0];
        this.c2s[method] = args[0];
      } else {
        this.context[method].apply(this.context, args);
        this.c2s[method].apply(this.c2s, args);
      }
      return this;
    };

    const clearCanvas = () => {
      this.context.clearRect(0, 0, this.canvas.dom.width, this.canvas.dom.height);
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.canvas.dom.width, this.canvas.dom.height);
      return this;
    };

    const clear = () => {
      const g = getGroup();
      const newG = g.cloneNode(false);
      g.parentElement.replaceChild(newG, g);
      draw(false, 'clearRect', 0, 0, this.canvas.dom.width, this.canvas.dom.height);
      //c2s automatically fills in the white rectangle. Kind of obnoxious
      clearCanvas();
      return this;
    };

    const resize = () => {
      const canvas = this.canvas.dom;
      canvas.style.width = null;
      canvas.style.height = null;
      canvas.setAttribute('width', ctrl.state.width);
      canvas.setAttribute('height', ctrl.state.height);
      const svg = this.c2s.getSvg();
      svg.setAttribute('width', ctrl.state.width);
      svg.setAttribute('height', ctrl.state.height);
      clear();
      return this;
    };

    const renderCanvasFromSvg = () => {
      const blob = new Blob(
        [this.c2s.getSerializedSvg()],
        { type: 'image/svg+xml' }
      );
      const img = new Image();
      img.onload = () => {
        clearCanvas();
        this.context.drawImage(img, 0, 0);
      };
      img.src = URL.createObjectURL(blob);
      return this;
    };

    const undo = () => {
      const g = getGroup();
      const lastChild = g.lastChild;
      if (lastChild !== g.firstChild) {
        lastChild.remove();
        this.c2s.__currentElement = g.lastChild; // manually resetting the last point
        renderCanvasFromSvg();
        return lastChild;
      }
    };

    const redo = (historyElement) => {
      if (historyElement) {
        const g = getGroup();
        g.appendChild(historyElement);
        this.c2s.__currentElement = historyElement;
        renderCanvasFromSvg();
      }
      return this;
    };

    const savePNG = () => {
      return this.canvas.dom.toDataURL('image/png');
    };

    const saveSVG = () => {
      const g = getGroup();
      const rect = g.firstChild;
      rect.remove();
      const serializedSvg = this.c2s.getSerializedSvg();
      g.insertBefore(rect, g.firstChild);
      return serializedSvg;
    };

    const down = (e) => {
      // prevent screen drag, enable drawing
      e.preventDefault();
      this.tapped = true;
      ctrl.clearHistory();
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

      const tiltX = e.tiltX || 0;
      const tiltY = e.tiltY || 0;

      // collect relevant data for brushes
      let data = {
        pX,
        pY,
        x,
        y,
        force: this.force, // could just ditch polyfill and use pointerevents?
        lineWidth: ctrl.state.lineWidth,
        tiltX,
        tiltY
      };

      // draw line from previous position to current position
      Brushes[ctrl.state.brush](draw.bind(this), data);

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

      const pointerEvents = {
        onpointerdown: down,
        onpointermove: move,
        onpointerup: up,
        onpointerout: up
      };

      const mouseEvents = {
        onmousedown: down,
        onmousemove: move,
        onmouseup: up,
        onmouseout: up
      };

      const touchEvents = {
        ontouchstart: down,
        ontouchmove: move,
        ontouchend: up,
        ontouchout: up
      };

      return 'PointerEvent' in window ?
        pointerEvents :
        'ontouchstart' in window ?
          touchEvents :
          mouseEvents;
    };

    // public

    this.undo = undo;
    this.redo = redo;
    this.resize = resize;
    this.clear = clear;
    this.savePNG = savePNG;
    this.saveSVG = saveSVG;

    //DON'T CREATE CANVAS UNTIL NEW EVENT IS FIRED FROM CONTROLLER!!

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

    this.oncreate = (vnode) => {

      this.context = vnode.dom.getContext('2d');

      this.c2s = new C2S({
        ctx: this.context,
        width: vnode.dom.width,
        height: vnode.dom.height,
        enableMirroring: true,
        document: document
      });

      resize();

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

