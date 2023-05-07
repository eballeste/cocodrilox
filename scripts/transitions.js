import barba from '@barba/core';
import barbaCss from '@barba/css';
barba.use(barbaCss);

barba.hooks.before(function(data) {
  console.log(data.current.container);
});

export const initTransitions = function() {
  barba.init({
    transitions: [
      {
        name: 'coco-load',
        onceBefore(){},
        once(){ /*this hook does not execute the callback */},
        onceAfter(){},
      },
      {
        name: 'coco-fade',
        to: {
          namespace: ['about'],
        },
        leave(){},
        enter(){},
      },
      {
        name: 'coco-clip',
        to: {
          namespace: ['home'],
        },
        sync: true,
        leave(){},
        enter(){},
        beforeEnter(){},
      },
    ],
  });
};
