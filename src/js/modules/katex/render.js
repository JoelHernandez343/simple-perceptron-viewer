import katex from 'katex';

import { createElement } from '../tools/index.js';
import { createVector, createMatrix } from './latex.js';

const render = latex => {
  const container = createElement('div');
  katex.render(latex, container);
  return container;
};

const addPoint = ({ input, target }, index) => {
  let latex = createVector(input, `p_{${index}}`);

  latex += createVector(target, `\\quad t_{${index}}`);

  return render(latex);
};

const addVector = (vector, name, direction = 'column') => {
  const latex = createVector(vector, name, direction);

  return render(latex);
};

const addMatrix = (matrix, name) => {
  const latex = createMatrix(matrix, name);

  return render(latex);
};

const addHardlim = (p, w, b, a) => {
  const latex = `a = hardlim( ${
    w.length === 1 ? createVector(w[0], '', 'row') : createMatrix(w)
  } ${createVector(p)} + ${createVector(b)}) = ${createVector(a)}`;

  return render(latex);
};

const addError = (e, t, a) => {
  const latex = `e = ${createVector(t)} - ${createVector(a)} = ${createVector(
    e
  )}`;

  return render(latex);
};

const addNewWeight = (w, e, p, newW) => {
  const latex = `w = ${createMatrix(w)} + ${createVector(e)} * ${createVector(
    p,
    '',
    w.length === 1 ? 'column' : 'row'
  )} = ${createMatrix(newW)}`;

  return render(latex);
};

const addNewBias = (b, e, newBias) => {
  const latex = `b = ${createVector(b)} + ${createVector(e)} = ${createVector(
    newBias
  )}`;

  return render(latex);
};

export {
  render,
  addPoint,
  addError,
  addMatrix,
  addVector,
  addNewBias,
  addHardlim,
  addNewWeight,
};
