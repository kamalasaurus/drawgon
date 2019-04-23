export default {
  round(draw, {pX, pY, x, y, force, lineWidth}) {
    draw(false, 'beginPath');
    draw(false, 'moveTo', pX, pY);
    draw(false, 'lineTo', x, y);
    draw(true, 'lineWidth', lineWidth * force);
    draw(false, 'stroke');
  },
  square(draw, {pX, pY, x, y, force, lineWidth}) {
    draw(false, 'rect', pX, pY, Math.abs(x-pX), Math.abs(y-pY));
    draw(true, 'lineWidth', lineWidth);
    draw(false, 'stroke');
  },
  squareVector(draw, {pX, pY, x, y, force, lineWidth}) {
    const maxSize = force * 60;
    const centerDiff = maxSize / 2;
    draw(false, 'rect', x - centerDiff, y - centerDiff, maxSize, maxSize);
    draw(true, 'lineWidth', lineWidth);
    draw(false, 'stroke');
  },
  triangleVector(draw, {pX, pY, x, y, force, lineWidth}) {
    const width = (5*(1 - force) + 0.1) * (x - pX);
    const height = (5*(1 - force) + 0.1) * (y - pY);
    draw(false, 'beginPath');
    draw(false, 'moveTo', pX, pY);
    draw(false, 'lineTo', pX + width, pY);
    draw(false, 'lineTo', (pX + (width / 2)), pY + height);
    draw(false, 'closePath');
    draw(true, 'lineWidth', lineWidth);
    draw(false, 'stroke');
  }
};

