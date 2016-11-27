import { combineReducers } from 'redux'
import { List } from 'immutable'

import TeacherActions, {FilterType} from '../actions/teacher'

function textQueue(state = new List(), action) {
  let now = new Date($.now());
  switch (action.type) {
    case TeacherActions.RECEIVE_TEXT:
      return state.filter((text) => text.isExpired(now)).push(action.text);
    default:
      break; // do nothing
  }
  return state.filter((text) => text.isExpired(now));
}

function iconQueue(state = new List(), action) {
  let now = new Date($.now());
  switch (action.type) {
    case TeacherActions.RECEIVE_ICON:
      return state.filter((icon) => icon.inTime(now)).push(action.value);
    default:
      break; // do nothing
  }
  return state.filter((icon) => icon.inTime(now));
}

function enabledFlow(state = true, action) {
  switch (action.type) {
    case TeacherActions.ENABLE_FLOW:
      return action.value;
    default:
      break; //
  }
  return state;
}

function filterType(state = FilterType.ALL, action) {
  switch (action.type) {
    case TeacherActions.FILTER_TYPE:
      return action.filter;
    default:
      break; // do nothing
  }
  return state
}

export default combineReducers({
  textQueue,
  iconQueue,
  enabledFlow,
  filterType,
})
