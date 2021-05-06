const createVector = (name, vector, direction = 'column') => {
  let latex = `${name} = \\begin{pmatrix} `;

  const separator = direction === 'column' ? '\\\\' : '';

  vector.forEach(
    (v, i) =>
      (latex += `${v} ${i + 1 < vector.length ? separator : '\\end{pmatrix}'}`)
  );

  return latex;
};

const createMatrix = (name, matrix) => {
  let latex = `${name} = \\begin{pmatrix} `;

  matrix.forEach((row, i) => {
    row.forEach(v => (latex += `${v}`));

    latex += i + 1 < matrix.length ? '\\\\' : '\\end{pmatrix}';
  });

  return latex;
};

export { createVector, createMatrix };
