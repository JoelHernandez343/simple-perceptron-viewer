import { perceptronStep } from '../perceptron/index.js';
import { mod } from '../tools/index.js';

class StateHistory {
  constructor({ inputs, w, b }) {
    this.states = {};
    this.current = -1;
    this.currentInput = -1;
    this.totalInputs = inputs.length;

    this.inputs = inputs;
    this.initialWeight = w;
    this.initialBias = b;
  }

  createState() {
    const weight =
      this.current === 0
        ? this.initialWeight
        : this.states[this.current - 1].newWeight;

    const bias =
      this.current === 0
        ? this.initialBias
        : this.states[this.current - 1].newBias;

    const input = this.inputs[this.currentInput].input;
    const target = this.inputs[this.currentInput].target;

    const { a, e, w, b } = perceptronStep(input, weight, bias, target);

    const statusList =
      this.currentInput === 0
        ? this.inputs.map(() => null)
        : [...this.states[this.current - 1].statusList];

    statusList[this.currentInput] = e.every(e => e === 0);

    return {
      input,
      target,
      output: a,
      error: e,
      oldWeight: weight,
      oldBias: bias,
      newWeight: w,
      newBias: b,
      statusList,
      index: this.currentInput,
      iteration: this.current,
    };
  }

  nextState() {
    this.increaseState();

    if (!this.states[this.current + 1]) {
      const state = this.createState();
      this.states[this.current] = state;

      return state;
    }

    return this.states[this.current];
  }

  previousState() {
    this.decreaseState();

    return this.states[this.current];
  }

  increaseState() {
    this.current++;
    this.currentInput = mod(this.currentInput + 1, this.totalInputs);
  }

  decreaseState() {
    this.current--;
    this.currentInput =
      this.current === -1 ? -1 : mod(this.currentInput - 1, this.totalInputs);
  }
}

export { StateHistory };
