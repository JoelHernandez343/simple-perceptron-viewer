import { getId } from './tools/index.js';

import * as textRender from './katex/index.js';
import * as desmos from './desmos/index.js';

import { StateHistory } from './state-history/index.js';

import data from './../../../input.json';

class App {
  constructor() {
    bindingEvents(this);
    this.current = -1;
    this.previousMovement = true;

    this.desmos = Desmos.GraphingCalculator(getId('calculator'), {
      expressionsCollapsed: true,
    });

    _tmp(this);
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
    console.log(this.current);

    if (this.current === 0) {
      this.previousBttn.disabled = true;
      textRender.initialRender(this.data);
      desmos.initialRender(this.data, this.desmos);

      if (!forward) {
        this.history.previousState();
      }

      this.previousMovement = forward;

      return;
    }

    this.previousBttn.disabled = false;

    if (this.current % 2 === 1) {
      if (!this.previousMovement || forward || !this.lock) {
        this.currentState = forward
          ? this.history.nextState()
          : this.history.previousState();
      }

      console.log(this.currentState);
      textRender.evalIteration(this.currentState);

      this.lock = false;
    } else {
      this.lock = true;

      console.log(this.currentState);
      textRender.checkIteration(this.currentState);
    }

    this.previousMovement = forward;
  }
}

const _tmp = app => {
  app.setData(data);
  app.begin();
};

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
  console.log(file);

  if (file.type !== 'application/json') {
    throw 'JSON file needed.';
  }

  app.data = JSON.parse(await file.text());
};

export { App };
