import Sprite from '../utils/sprite';
import { throttle, scrollDirectionTracker } from '../utils/helpers';

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

    //birdSprite.animate('walkright', true, false);
    birdSprite.showNextStep('walkright');

    const scrollDirection = new scrollDirectionTracker();
    window.addEventListener('scroll', throttle(function() {
      if (scrollDirection.isScrollingDown()) {
        birdSprite.showNextStep('walkright');
      } else {
        birdSprite.showPreviousStep('walkleft');
      }
    }, 250));
  });

  globalThis.bird = birdSprite;
})();
