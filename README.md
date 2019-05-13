![drawgon logo](android-chrome-192x192.png)

# drawgon

Draw polygons with drawgon!  A easy to use web-hosted vector/raster
drawing program.  The goal is to create fun procedural SVGs that can
be easily exported to the Axidraw, to pair with physical art production.

Checkout the hosted version here:

[kamalasaurus.github.io/drawgon](https://kamalasaurus.github.io/drawgon)

### Creating Brushes

The fun part of drawgon is the ability to create your own procedural
brushes!  Simply click the `+` button and create your own brush
function. Example:\

```
newBrush(draw, {pX, pY, x, y, force, lineWidth, tiltX, tiltY}) {
  draw('beginPath');
  draw('moveTo', pX, pY);
  draw('lineTo', x, y);
  draw('closePath');
  draw('lineWidth', lineWidth * force);
  draw('stroke');
}

```

`newBrush` is the brush name - replace it with a more descriptive one.
Name collisions with the default brushes will result in your brush not
being created.  Renaming a previous brush will result in the brush being
overwritten.

`draw` mirrors the canvas api.  So you can `lineTo`, `arc` `rect` or any
other standard canvas method.  The difference is the method name is
accepted as the first argument instead of `canvas[methodName]`.  For
assignment operators, like `canvas.color = '#fff'`, the translation is
`draw('color', '#fff')`.  Of course, if your goal is to write with
axidraw, color might not be the most useful attribute.

Make sure you call `draw('beginPath')` and `draw('closePath')` in every
brush you make for predictable outcomes!

Happy drawing!  🌈✨✨⭐️

### Troubleshooting

It's a Progressive Web App, so if things get too wonky, clear your
caches and get refresh the page!

### Credits

drawgon logo by [holistudio](https://github.com/holistudio)\
drawgon logo color inspiration by [ltejedor](https://github.com/ltejedor)

### Contributing

To build, just `git clone`, `rm -rf node_modules`, `npm install`.
`node_modules` are included because the app is hosted on github pages
and doesn't perform a separate deployment.  Check out a new branch from
master and then open a PR requesting to merge!\

Help wanted:  The pattern I'm using with mithril isn't great.  It's
making me have to do manual DOM manipulation to keep things dynamic.  If
someone can make suggestions on how to change it, it would be much
appreciated!

### License

Open Software License ("OSL") v 3.0\
Copyright (c) 2019 kamalasaurus

