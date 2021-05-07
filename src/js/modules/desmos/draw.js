const drawPoint = (point, style, label, desmos) => {
  desmos.setExpression({
    latex: `(${point[0]}, ${point[1]})`,
    color: Desmos.Colors[style.color],
    pointStyle: Desmos.Styles[style.style],
    label,
    showLabel: true,
  });
};

const drawVector = (origin, dest, name, color, desmos) => {
  desmos.setExpression({
    latex: `(${dest[0]}, ${dest[1]})`,
    color: Desmos.Colors[color],
    label: name,
    showLabel: true,
  });

  const my = dest[1] - origin[1];
  const mx = dest[0] - origin[0];
  const latex = `(y-${origin[1]})*${mx} = (x-${origin[0]})*${my}`;

  desmos.setExpression({
    latex: `${latex}\\{${origin[0]} <= x <= ${dest[0]}\\}\\{${origin[1]} >= y >= ${dest[1]}\\}`,
    color: Desmos.Colors[color],
    lineStyle: Desmos.Styles.DASHED,
  });

  desmos.setExpression({
    latex: `${latex}\\{${origin[0]} <= x <= ${dest[0]}\\}\\{${origin[1]} >= y >= ${dest[1]}\\}`,
    color: Desmos.Colors[color],
    lineStyle: Desmos.Styles.DASHED,
  });

  desmos.setExpression({
    latex: `${latex}\\{${origin[0]} >= x >= ${dest[0]}\\}\\{${origin[1]} <= y <= ${dest[1]}\\}`,
    color: Desmos.Colors[color],
    lineStyle: Desmos.Styles.DASHED,
  });

  desmos.setExpression({
    latex: `${latex}\\{${origin[0]} >= x >= ${dest[0]}\\}\\{${origin[1]} >= y >= ${dest[1]}\\}`,
    color: Desmos.Colors[color],
    lineStyle: Desmos.Styles.DASHED,
  });
};

const drawFrontier = (w, b, color, desmos) => {
  desmos.setExpression({
    latex: `${w[1]}*y >= -(${w[0]}*x + ${b})`,
    color: Desmos.Colors[color],
    fillOpacity: 0.1,
  });
};

export { drawPoint, drawVector, drawFrontier };
