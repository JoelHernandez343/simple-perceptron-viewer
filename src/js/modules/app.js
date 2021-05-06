import { getId } from './tools/index.js';

import { initialRender } from './katex/index.js';
import data from './../../../input.json';

class App {
  constructor() {
    bindingEvents(this);

    this.desmos = Desmos.GraphingCalculator(getId('calculator'), {
      expressions: false,
    });

    this.desmos.setExpression({ id: 'graph1', latex: 'y=x^2' });

    _tmp(this);
  }

  begin() {
    if (this.data === undefined) {
      return;
    }

    this.nextBttn.disabled = false;
    initialRender(this.data);
  }

  previousState() {
    console.log('Previous');
  }

  nextState() {
    console.log('Next');
  }
}

const _tmp = async app => {
  app.data = data;
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
