import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import teacher from './teacher';

export default combineReducers({
  teacher: teacher,
  routing: routerReducer,
});
