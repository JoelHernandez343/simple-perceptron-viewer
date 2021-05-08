import { render } from '../katex/render.js';
import { createElement, getId, newP } from '../tools/index.js';

const chooseEmoji = (status, unknown) => {
  if (unknown !== null) {
    return unknown
      ? '❓'
      : status === true
      ? '✅'
      : status === false
      ? '❌'
      : '';
  }

  return status === true ? '✅' : status === false ? '❌' : '';
};

const renderStatusList = ({ statusList, index }, unknown) => {
  const list = getId('status_list');
  list.innerHTML = '';

  statusList.forEach((status, i) => {
    const emoji = chooseEmoji(status, index === i ? unknown : null);

    const item = createElement('li');
    item.appendChild(render(`p_{${i}}`));
    item.appendChild(newP(emoji));

    list.appendChild(item);
  });
};

const clearStatusList = () => (getId('status_list').innerHTML = '');

export { renderStatusList, clearStatusList };
