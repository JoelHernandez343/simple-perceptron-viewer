import { getId } from './tools/index.js';

import * as textRender from './katex/index.js';
import * as desmos from './desmos/index.js';

import { StateHistory } from './state-history/index.js';

import { clearStatusList, renderStatusList } from './status-list/index.js';

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

    this.setState(true);
  }

  previousState() {
    this.current--;
    this.setState(false);
  }

  nextState() {
    this.current++;
    this.setState(true);
  }

  setState(forward) {
    if (this.current === 0) {
      this.previousBttn.disabled = true;

      textRender.initialRender(this.data);
      desmos.initialRender(this.data, this.desmos);

      if (!forward) {
        this.history.previousState();
      }

      this.previousMovement = forward;

      clearStatusList();

      return;
    }

    this.previousBttn.disabled = false;

    if (this.current % 2 === 1) {
      if (!this.previousMovement || forward || !this.lock) {
        this.currentState = forward
          ? this.history.nextState()
          : this.history.previousState();
      }

      textRender.evalIteration(this.currentState);
      desmos.evalRender(this.currentState, this.data, this.desmos);
      renderStatusList(this.currentState, true);

      this.lock = false;
    } else {
      this.lock = true;

      textRender.checkIteration(this.currentState);
      desmos.checkRender(this.currentState, this.data, this.desmos);
      renderStatusList(this.currentState, false);
    }

    this.previousMovement = forward;
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
