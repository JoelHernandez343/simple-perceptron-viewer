import { getId } from './tools.js';

class App {
  constructor() {
    this.desmos = Desmos.GraphingCalculator(getId('calculator'), {
      expressions: false,
    });

    this.desmos.setExpression({ id: 'graph1', latex: 'y=x^2' });
  }
}

export { App };
