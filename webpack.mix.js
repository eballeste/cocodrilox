let mix = require('laravel-mix');

mix.sass('./styles/coco.scss', 'assets')
  .options({
    processCssUrls: false,
  });
