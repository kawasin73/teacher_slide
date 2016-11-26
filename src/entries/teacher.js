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
import { receiveData, enableFlow } from '../actions/teacher';

import TeacherContainer from '../containers/TeacherContainer'
import configureStore from '../stores/configureTeacherStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

startReceive((data) => {
  store.dispatch(receiveData(data))
});

let KEY1 = 49;
let KEY2 = 50;

$(document).ready(() => {
  $('body').keypress((e) => {
    switch (e.which) {
      case KEY1:
        store.dispatch(enableFlow(true));
        return;
      case KEY2:
        store.dispatch(enableFlow(false));
        return;
      default:
        break; // do nothing
    }
  })
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={TeacherContainer}/>
    </Router>
  </Provider>,
  document.getElementById('content')
)
