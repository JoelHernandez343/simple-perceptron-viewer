import { getId } from './tools/index.js';
import { StateHistory } from './state-history/index.js';
import { infoRender } from './information/index.js';

class App {
  constructor() {
    bindingEvents(this);
    this.current = -1;
    this.previousMovement = true;

    this.desmos = Desmos.GraphingCalculator(getId('calculator'), {
      expressionsCollapsed: true,
    });
  }

  setData(data) {
    this.data = data;
    this.history = new StateHistory(data);
  }

  begin() {
    if (this.data === undefined) {
      return;
    }

    this.nextBttn.disabled = false;

    this.current = 0;

    this.setState();
  }

  previousState() {
    this.current--;
    this.setState();
  }

  nextState() {
    this.current++;
    this.setState();
  }

  setState() {
    this.previousBttn.disabled = false;
    const current = ((this.current - 1) / 2) | 0;

    if (this.current === 0) {
      this.previousBttn.disabled = true;
    } else if (this.current % 2 === 1) {
      this.currentState =
        current > this.history.current
          ? this.history.nextState()
          : this.currentState;
    } else {
      this.currentState =
        current < this.history.current
          ? this.history.previousState()
          : this.currentState;
    }

    infoRender(this.data, this.currentState, this.desmos, this.current);
  }
}

const bindingEvents = app => {
  getId('json_file').addEventListener('change', e => readFile(e, app));

  getId('bttn_begin').addEventListener('click', () => app.begin());

  app.nextBttn = getId('bttn_next');
  app.nextBttn.addEventListener('click', () => app.nextState());

  app.previousBttn = getId('bttn_previous');
  app.previousBttn.addEventListener('click', () => app.previousState());
};

const readFile = async (e, app) => {
  const file = e.target.files[0];

  if (file.type !== 'application/json') {
    throw 'JSON file needed.';
  }

  app.setData(JSON.parse(await file.text()));
};

export { App };
