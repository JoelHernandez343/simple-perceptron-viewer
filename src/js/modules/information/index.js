import * as textRender from '../katex/index.js';
import * as desmosRender from '../desmos/index.js';
import * as statusListRender from '../status-list/index.js';

const infoRender = (data, state, desmos, current) => {
  if (current === 0) {
    textRender.initialRender(data);
    desmosRender.initialRender(data, desmos);
    statusListRender.clearStatusList();
  } else if (current % 2 === 1) {
    textRender.evalIteration(state);
    desmosRender.evalRender(state, data, desmos);
    statusListRender.renderStatusList(state, true);
  } else {
    textRender.checkIteration(state);
    desmosRender.checkRender(state, data, desmos);
    statusListRender.renderStatusList(state, false);
  }
};

export { infoRender };
