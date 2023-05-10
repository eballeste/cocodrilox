export const throttle = function(callback, delay) {
  let throttleTimeout = null;
  let storedEvent = null;

  const throttledEventHandler = function(event) {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(function() {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};

export const scrollDirectionTracker = function() {
  let previousScrollPosition = 0;

  const isScrollingDown = () => {
    let goingDown = false;

    let scrollPosition = window.pageYOffset;

    if (scrollPosition > previousScrollPosition) {
      goingDown = true;
    }

    previousScrollPosition = scrollPosition;

    return goingDown;
  };

  return {
    isScrollingDown,
  };
};
