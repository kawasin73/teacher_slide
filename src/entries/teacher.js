import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'babel-polyfill'

import $ from '../lib/shims/jquery';

import { startReceive } from '../lib/peer';
import { receiveData, enableFlow, changeFilterType, FilterType } from '../actions/teacher';

import TeacherContainer from '../containers/TeacherContainer'
import configureStore from '../stores/configureTeacherStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

startReceive((data) => {
  store.dispatch(receiveData(data))
});

let KEY1 = 49;
let KEY2 = 50;
let KEY3 = 51;
let KEY4 = 52;
let KEY5 = 53;
let KEY6 = 54;
let KEY0 = 48;

$(document).ready(() => {
  $('body').keypress((e) => {
    switch (e.which) {
      case KEY1:
        store.dispatch(changeFilterType(FilterType.ALL));
        return;
      case KEY2:
        store.dispatch(changeFilterType(FilterType.TEXT));
        return;
      case KEY3:
        store.dispatch(changeFilterType(FilterType.GOOD));
        return;
      case KEY4:
        store.dispatch(changeFilterType(FilterType.BORING));
        return;
      case KEY5:
        store.dispatch(changeFilterType(FilterType.UNDERSTAND));
        return;
      case KEY6:
        store.dispatch(changeFilterType(FilterType.NO_UNDERSTAND));
        return;
      case KEY0:
        store.dispatch(changeFilterType(FilterType.NONE));
        return;
      default:
        break; // do nothing
    }
  })
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="*" component={TeacherContainer}/>
    </Router>
  </Provider>,
  document.getElementById('content')
)
