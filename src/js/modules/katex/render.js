import katex from 'katex';

import { createElement } from '../tools/index.js';
import { createVector, createMatrix } from './latex.js';

const render = latex => {
  const container = createElement('div');
  katex.render(latex, container);
  return container;
};

const addPoint = ({ input, target }, index) => {
  let latex = createVector(`p_{${index}}`, input);

  if (Array.isArray(target)) {
    latex += createVector(`\\quad t_{${index}}`, target);
  } else {
    latex += `\\quad t_{${index}} = ${target}`;
  }

  return render(latex);
};

const addVector = (vector, name, direction = 'column') => {
  const latex = createVector(name, vector, direction);

  return render(latex);
};

const addMatrix = (matrix, name) => {
  const latex = createMatrix(name, matrix);

  return render(latex);
};

export { addPoint, addMatrix, addVector, render };
