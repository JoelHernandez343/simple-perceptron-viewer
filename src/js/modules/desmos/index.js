import { drawFrontier, drawPoint, drawVector } from './draw.js';

const searchStyle = (target, styles) =>
  styles.find(({ target: t }) => t.every((value, i) => value === target[i]));

const initialRender = ({ inputs, w, b, styles }, desmos) => {
  desmos.setBlank();

  inputs.forEach(({ input, target }, i) =>
    drawPoint(input, searchStyle(target, styles), `p${i}`, desmos)
  );

  w.forEach((weight, i) => {
    drawVector([0, 0], weight, `w${i}`, 'GREEN', desmos);
    drawFrontier(weight, b[i], 'GREEN', desmos);
  });
};

export { initialRender };
