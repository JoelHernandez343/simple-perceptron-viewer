const getId = id => document.getElementById(id);

const getClass = cssClass => document.querySelector(`.${cssClass}`);

const createElement = tag => document.createElement(tag);

const newP = content => {
  const p = createElement('p');
  p.innerHTML = content;

  return p;
};

const mod = (a, n) => ((a % n) + n) % n;

export { getId, createElement, getClass, newP, mod };
