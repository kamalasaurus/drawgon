export default {
  round(draw, {pX, pY, x, y, force, lineWidth}) {
    draw(false, 'beginPath');
    draw(false, 'moveTo', pX, pY);
    draw(false, 'lineTo', x, y);
    draw(true, 'lineWidth', lineWidth * force);
    draw(false, 'stroke');
  },
  square(draw, {pX, pY, x, y, force, lineWidth}) {
    console.log(this.name);
  },
  squareVector(draw, {pX, pY, x, y, force, lineWidth}) {
    console.log(this.name);
  },
  triangleVector(draw, {pX, pY, x, y, force, lineWidth}) {
    console.log(this.name);
  }
};

