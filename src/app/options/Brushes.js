// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

export default {
  round(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
    draw('beginPath');
    draw('moveTo', pX, pY);
    draw('lineTo', x, y);
    draw('closePath');
    draw('lineWidth', lineWidth * force);
    draw('stroke');
  },
  square(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
    draw('beginPath');
    draw('rect', pX, pY, Math.abs(x-pX), Math.abs(y-pY));
    draw('closePath');
    draw('lineWidth', lineWidth);
    draw('stroke');
  },
  squareVector(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
    const maxSize = (5*(1 -force) + 0.1) * 60;
    const centerDiff = maxSize / 2;
    draw('beginPath');
    draw('rect', x - centerDiff, y - centerDiff, maxSize, maxSize);
    draw('closePath');
    draw('lineWidth', lineWidth);
    draw('stroke');
  },
  triangleVector(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
    const width = (5*(1 - force) + 0.1) * (x - pX);
    const height = (5*(1 - force) + 0.1) * (y - pY);
    draw('beginPath');
    draw('moveTo', pX, pY);
    draw('lineTo', pX + width, pY);
    draw('lineTo', (pX + (width / 2)), pY + height);
    draw('closePath');
    draw('lineWidth', lineWidth);
    draw('stroke');
  }
};

