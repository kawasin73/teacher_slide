import Text from '../records/text';
import Icon from '../records/icon';

const Actions = {
  RECEIVE_ICON: 'teacher/recieve_icon',
  RECEIVE_TEXT: 'teacher/recieve_text',
  ENABLE_FLOW: 'teacher/enable_flow',
  FILTER_TYPE: 'teacher/filter_type',
};

export const FilterType = {
  ALL: 'all',
  GOOD: 'good',
  BORING: 'boring',
  UNDERSTAND: 'understand',
  NO_UNDERSTAND: 'no_understand',
  TEXT: 'text',
  NONE: 'none',
};

export default Actions;

export function receiveData(data) {
  switch (data.type) {
    case 0:
      // icon
      return receiveIcon(data.value);
    case 1:
      // text
      return receiveText(data.value);
  }
}

export function enableFlow(enabled) {
  return {
    type: Actions.ENABLE_FLOW,
    value: enabled,
  }
}

export function changeFilterType(filterType) {
  return {
    type: Actions.FILTER_TYPE,
    filter: filterType,
  }
}

function receiveIcon(value) {
  return {
    type: Actions.RECEIVE_ICON,
    value: Icon.fromJS(value),
  }
}

function receiveText(text) {
  return {
    type: Actions.RECEIVE_TEXT,
    text: Text.fromJS(text),
  }
}
