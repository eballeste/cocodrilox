let mix = require('laravel-mix');

mix
  .js('./scripts/pages/home.js', 'assets')
  .sass('./styles/coco.scss', 'assets')
  .options({
    processCssUrls: false,
  });
