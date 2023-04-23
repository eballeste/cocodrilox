import barba from 'https://esm.sh/@barba/core';
import barbaCss from 'https://esm.sh/@barba/css';

barba.hooks.before(function(data) {
  console.log(data.current.container);
});

export const initTransitions = function() {
  barba.use(barbaCss);
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
