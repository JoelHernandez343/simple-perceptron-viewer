import 'katex/dist/katex.css';

import { getClass, newP } from '../tools/index.js';
import {
  addError,
  addHardlim,
  addMatrix,
  addNewBias,
  addNewWeight,
  addPoint,
  addVector,
  render,
} from './render.js';

const message = (container, text) => container.appendChild(newP(text));

const initialRender = ({ inputs, w, b }) => {
  const c = getClass('card-content-left');
  c.innerHTML = '';

  message(c, 'DATOS INICIALES');

  message(c, 'Puntos de entrada con sus target:');
  inputs.forEach((input, i) => c.appendChild(addPoint(input, i)));

  message(c, 'Vector de pesos:');
  c.appendChild(addMatrix(w, 'w'));

  message(c, 'Bias');
  c.appendChild(addVector(b, 'b'));
};

const evalIteration = ({
  input,
  target,
  index,
  oldWeight,
  oldBias,
  output,
  iteration,
}) => {
  const c = getClass('card-content-left');
  c.innerHTML = '';

  message(c, `ITERACIÓN NO. ${iteration + 1}`);

  message(c, `Evaluaremos la entrada ${index}`);
  c.appendChild(addPoint({ input, target }, index));

  message(c, 'Calculamos la salida con el vector de pesos y el bias:');
  message(c, 'Vector de pesos:');
  c.appendChild(addMatrix(oldWeight, 'w'));

  message(c, 'Bias');
  c.appendChild(addVector(oldBias, 'b'));

  message(c, 'Salida:');
  c.appendChild(addHardlim(input, oldWeight, oldBias, output));
};

const checkIteration = ({
  input,
  iteration,
  error,
  target,
  output,
  newWeight,
  oldWeight,
  oldBias,
  newBias,
}) => {
  const c = getClass('card-content-left');
  c.innerHTML = '';

  message(c, `ITERACIÓN NO. ${iteration + 1}`);

  message(c, `Calculamos el error:`);
  c.appendChild(addError(error, target, output));

  message(c, `Calculamos la nueva matriz de pesos:`);
  c.appendChild(addNewWeight(oldWeight, error, input, newWeight));

  message(c, `Calculamos el nuevo bias:`);
  c.appendChild(addNewBias(oldBias, error, newBias));
};

export { initialRender, evalIteration, checkIteration };
