const createVector = (vector, name = '', direction = 'column') => {
  let latex = `${name === '' ? '' : `${name} = `}\\begin{pmatrix} `;

  const separator = direction === 'column' ? '\\\\' : '\\quad';

  vector.forEach(
    (v, i) =>
      (latex += `${v} ${i + 1 < vector.length ? separator : '\\end{pmatrix}'}`)
  );

  return latex;
};

const createMatrix = (matrix, name = '') => {
  let latex = `${name === '' ? '' : `${name} = `}\\begin{pmatrix} `;

  matrix.forEach((row, i) => {
    row.forEach(
      (v, i) => (latex += `${v} ${i + 1 < row.length ? '\\quad' : ''}`)
    );

    latex += i + 1 < matrix.length ? '\\\\' : '\\end{pmatrix}';
  });

  return latex;
};

export { createVector, createMatrix };
