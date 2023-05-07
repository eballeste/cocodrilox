let mix = require('laravel-mix');

mix
  .js('./scripts/components/bird.js', 'assets')
  .js('./scripts/pages/home.js', 'assets')
  .sass('./styles/coco.scss', 'assets')
  .options({
    processCssUrls: false,
  });


if (!mix.inProduction()) {
  mix.webpackConfig({
    devtool: 'inline-source-map'
  })
}
