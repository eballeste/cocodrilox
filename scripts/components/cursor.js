import { lerp, getMousePos } from '../utils';

export const initCursor = function() {
  const $cursorPanel = document.querySelector('cursor-panel');
  const $cursor = $cursorPanel.querySelector('coco-cursor');
  const $cursorTriggers = document.querySelectorAll('[cursor-trigger]');

  let bounds = $cursor.getBoundingClientRect();
  let mouse = {x: 0, y: 0};
  let renderedStyles = {
    tx: {previous: 0, current: 0, amt: 0.25},
    ty: {previous: 0, current: 0, amt: 0.25}
  };

  const renderCursor = function() {
    renderedStyles['tx'].current = mouse.x - bounds.width/2;
    renderedStyles['ty'].current = mouse.y - bounds.height/2;

    for (const key in renderedStyles ) {
      renderedStyles[key].previous = lerp(renderedStyles[key].previous, renderedStyles[key].current, renderedStyles[key].amt);
    }

    $cursor.style.transform = `translateX(${(renderedStyles['tx'].previous)}px) translateY(${renderedStyles['ty'].previous}px)`;

    requestAnimationFrame(function() {
      renderCursor();
    });
  };

  const setupCursor = function(e) {
    renderedStyles.tx.previous =  renderedStyles.tx.current = mouse.x - bounds.width/2;
    renderedStyles.ty.previous =  renderedStyles.ty.previous = mouse.y - bounds.height/2;

    $cursor.setAttribute('visible', true);
    requestAnimationFrame(function() {
      renderCursor();
    });
  };

  const onMouseLeaveWindow = function(e) {
    if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
      if ($cursor.hasAttribute('visible')) {
        $cursor.removeAttribute('visible');

        document.addEventListener('mousemove', onMouseLeaveWindow);
      }
    } else {
      if (!$cursor.hasAttribute('visible')) {
        $cursor.setAttribute('visible', true);

        document.removeEventListener('mousemove', onMouseLeaveWindow);
      }
    }
  }

  window.addEventListener('mousemove', function(e) { mouse = getMousePos(e); });
  window.addEventListener('mousemove', setupCursor, { once: true });
  document.addEventListener('mouseleave', onMouseLeaveWindow);

  $cursorTriggers.forEach(function($cursorTrigger) {
    $cursorTrigger.addEventListener('mouseenter', function(e) {
      if(!$cursor.hasAttribute('clickable')) {
        $cursor.setAttribute('clickable', true);
      }
    });

    $cursorTrigger.addEventListener('mouseleave', function(e) {
      if($cursor.hasAttribute('clickable')) {
        $cursor.removeAttribute('clickable');
      }
    });
  });
};
