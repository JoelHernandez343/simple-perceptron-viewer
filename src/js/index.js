import '../css/style.css';

import { getId } from './modules/tools.js';

window.addEventListener('load', () => {
  const container = getId('calculator');
  const calculator = Desmos.GraphingCalculator(container, {
    expressions: false,
  });

  calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
});
