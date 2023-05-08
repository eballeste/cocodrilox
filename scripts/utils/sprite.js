const Sprite = function(options) {
  if (!options.$container) { return; }

  options = Object.assign({
    $container: false,
    spriteSheetPath: false,
    spriteWidth: 0,
    spriteHeight: 0,
    nRows: 1,
    nCols: 1,
    borderWidth: 1,
    spacingWidth: 1,
    x: 0,
    y: 0,
  }, options);

  let {
    $container,
    spriteWidth,
    spriteHeight,
    nRows,
    nCols,
    borderWidth,
    spacingWidth,
  } = options;

  let $spriteCanvas;
  let $spriteContext;
  let spriteSheetImage;
  let frames = [];
  let animations = {};
  let activeFrame;
  let activeAnimation;
  let activeAnimationID;
  let activeAnimationStep = 0;

  const ready = function () {
    if (typeof ready === 'function') {
      onReady();
    }
  };

  let onReady = function(handler) {
    onReady = handler;
  };

  const spritePositionToImagePosition = function (row, col) {
    return {
      x: (
        borderWidth +
        col * (spacingWidth + spriteWidth)
      ),
      y: (
        borderWidth +
        row * (spacingWidth + spriteHeight)
      ),
    }
  };

  const clearCanvas = function() {
    $spriteContext.clearRect(
      0,
      0,
      $spriteCanvas.width,
      $spriteCanvas.height
    );
  };

  const drawSpriteOnCanvas = function() {
    $spriteContext.drawImage(
      spriteSheetImage,
      activeFrame.x,
      activeFrame.y,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight,
    );
  };

  const addAnimation = function (options) {
    options = Object.assign({
      name: 'anim',
      frameIndices: [0],
      timePerFrame: 250,
      onEnd: 'repeat'
    }, options);

    animations[options.name] = {
      frameIndices: options.frameIndices,
      timePerFrame: options.timePerFrame,
      onEnd: options.onEnd
    };
  };

  const animate = function (animationName, smoothStep) {
    const animation = animations[animationName];
    if (animation === undefined) { return; }

    activeAnimation = animation;
    activeAnimationStep = ( smoothStep && activeAnimationStep < activeAnimation.frameIndices.length) ? activeAnimationStep : 0;

    clearAnimation();
    renderForward();
    activeAnimationID = setInterval(renderForward, animation.timePerFrame);
  };

  const render = function () {
    clearCanvas();
    drawSpriteOnCanvas();
  };

  const renderForward = function () {
    if (activeAnimationStep >= activeAnimation.frameIndices.length) {
      if (activeAnimation.onEnd === 'repeat') {
        activeAnimationStep = 0;
      } else {
        clearAnimation();
      }
    }

    const frameIndex = activeAnimation.frameIndices[activeAnimationStep];
    activeFrame = frames[frameIndex];

    render();
    activeAnimationStep += 1;
  };

  const clearAnimation = function () {
    clearInterval(activeAnimationID);
    activeAnimationID = -1;
  };

  /* Setup */
  const setup = function() {
    $spriteCanvas = document.createElement('canvas');
    $spriteCanvas.width = $container.offsetWidth;
    $spriteCanvas.height = $container.offsetHeight;
    let spriteScale = Math.floor($container.offsetWidth / spriteWidth);

    $spriteContext = $spriteCanvas.getContext('2d', { willReadFrequently: true });
    $spriteContext.imageSmoothingEnabled = false;
    $spriteContext.scale(spriteScale, spriteScale);

    $container.appendChild($spriteCanvas);

    spriteSheetImage = new Image();
    spriteSheetImage.src = options.spriteSheetPath;
    spriteSheetImage.addEventListener('load', function() {
      for (var row = 0; row < nRows; row++) {
        for (var col = 0; col < nCols; col++) {
          const sourceImagePosition = spritePositionToImagePosition(row, col);
          frames.push(sourceImagePosition);
        }
      }

      activeFrame = frames[0];
      ready();
    });

    window.addEventListener('resize', function(e) {
      $spriteCanvas.width = $container.offsetWidth;
      $spriteCanvas.height = $container.offsetHeight;
      spriteScale = Math.floor($container.offsetWidth / spriteWidth);

      $spriteContext.resetTransform();
      $spriteContext.imageSmoothingEnabled = false;
      $spriteContext.scale(spriteScale, spriteScale);

      render();
    });
  }();

  return {
    onReady,
    addAnimation,
    animate,
  };
};

export default Sprite;
