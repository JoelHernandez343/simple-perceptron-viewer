const hardlim = n => (n >= 0 ? 1 : 0);

const hardlimv = n => n.map(value => hardlim(value));

const vectorMultVector = (a, b) => {
  const x = a.length;
  const y = b.length;

  const vector = Array.from({ length: x }, () => 0);

  for (let i = 0; i < x; ++i) {
    for (let j = 0; j < y; ++j) {
      vector[i] += a[i][j] * b[j];
    }
  }

  return vector;
};

const sumVectors = (a, b) => a.map((e, i) => e + b[i]);

const subVectors = (a, b) => a.map((e, i) => e - b[i]);

const scalarVectorMult = (scalar, v) => v.map(e => e * scalar);

const perceptron = (p, w, b) => hardlimv(sumVectors(vectorMultVector(w, p), b));

const error = (target, a) => subVectors(target, a);

const newWeigth = (w, e, p) =>
  w.map((weigth, i) => sumVectors(weigth, scalarVectorMult(e[i], p)));

const newBias = (b, e) => sumVectors(b, e);

const perceptronStep = (p, w, b, target) => {
  const a = perceptron(p, w, b);
  const e = error(target, a);

  w = newWeigth(w, e, p);
  b = newBias(b, e);

  return { a, e, w, b };
};

export { perceptronStep };
