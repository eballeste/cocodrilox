import Sprite from '../utils/sprite';

(function() {
  const $birdContainer = document.querySelector('bird-box');
  if (!$birdContainer) { return; }

  const birdPath = $birdContainer.dataset.bird;
  const birdSprite = new Sprite({
    $container: $birdContainer,
    spriteSheetPath: birdPath,
    nRows: 2,
    nCols: 3,
    spriteWidth: 13,
    spriteHeight: 14,
    borderWidth: 1,
    spacingWidth: 1,
  });

  birdSprite.onReady(function() {
    birdSprite.addAnimation({
      name: 'walkright',
      frameIndices: [0,1,2,1]
    });

    birdSprite.addAnimation({
      name: 'walkleft',
      frameIndices: [3,4,5,4]
    });

    birdSprite.animate('walkright', true);
  });

  globalThis.bird = birdSprite;
})();
