import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'babel-polyfill'

import { startReceive } from '../lib/peer';
import { receiveData } from '../actions/teacher';

import TeacherContainer from '../containers/TeacherContainer'
import configureStore from '../stores/configureTeacherStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

startReceive((data) => {
  store.dispatch(receiveData(data))
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={TeacherContainer}/>
    </Router>
  </Provider>,
  document.getElementById('content')
)
