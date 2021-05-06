import 'katex/dist/katex.css';

import { getClass, newP } from '../tools/index.js';
import { addMatrix, addPoint, addVector, render } from './render.js';

const initialRender = ({ inputs, w, b }) => {
  const c = getClass('card-content');

  c.appendChild(newP('DATOS INICIALES'));

  c.appendChild(newP('Puntos de entrada con sus target:'));
  inputs.forEach((input, i) => c.appendChild(addPoint(input, i)));

  c.appendChild(newP('Vector de pesos:'));
  if (Array.isArray(w[0])) {
    c.appendChild(addMatrix(w, 'w'));
  } else {
    c.appendChild(addVector(w, 'w'));
  }

  c.appendChild(newP('Bias'));
  if (Array.isArray(b)) {
    c.appendChild(addVector(b, 'w'));
  } else {
    c.appendChild(render(`b = ${b}`));
  }
};

export { initialRender };
