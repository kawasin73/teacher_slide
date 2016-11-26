import { combineReducers } from 'redux'
import { List } from 'immutable'

import TeacherActions from '../actions/teacher'

function textQueue(state = new List(), action) {
  switch (action.type) {
    case TeacherActions.RECEIVE_TEXT:
      return state.push(action.text);
    default:
      break // do nothing
  }
  return state;
}

function iconQueue(state = new List(), action) {
  switch (action.type) {
    case TeacherActions.RECEIVE_ICON:
      return state.push(action.value);
    default:
      break // do nothing
  }
  return state
}

export default combineReducers({
  textQueue,
  iconQueue,
})
