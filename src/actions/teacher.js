import Text from '../records/text';

const Actions = {
  RECEIVE_ICON: 'teacher/recieve_icon',
  RECEIVE_TEXT: 'teacher/recieve_text',
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

function receiveIcon(value) {
  return {
    type: Actions.RECEIVE_ICON,
    value: value,
  }
}

function receiveText(text) {
  return {
    type: Actions.RECEIVE_TEXT,
    text: Text.fromJS(text),
  }
}
