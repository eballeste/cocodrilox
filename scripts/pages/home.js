import { initCursor } from '../components/cursor';
import { initTransitions } from '../transitions';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initTransitions();
  });
})();
