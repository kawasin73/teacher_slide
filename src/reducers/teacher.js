import { combineReducers } from 'redux'
import { List } from 'immutable'

import TeacherActions, {FilterType} from '../actions/teacher'

function textQueue(state = new List(), action) {
  switch (action.type) {
    case TeacherActions.RECEIVE_TEXT:
      return state.push(action.text);
    default:
      break; // do nothing
  }
  return state;
}

function iconQueue(state = new List(), action) {
  switch (action.type) {
    case TeacherActions.RECEIVE_ICON:
      return state.push(action.value);
    default:
      break; // do nothing
  }
  return state
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
