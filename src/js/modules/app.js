import { getId } from './tools';

class App {
  constructor() {
    this.desmos = Desmos.GraphingCalculator(getId('calculator'), {
      expressions: false,
    });

    this.desmos.setExpression({ id: 'graph1', latex: 'y=x^2' });
  }
}

export { App };
