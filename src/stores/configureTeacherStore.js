import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/teacherApp'


export default function configureStore(_initialData) {
  const store = createStore(
    reducer,
    undefined,
    // Middlewares
    compose(
      applyMiddleware(thunk)
    )
  )

  module.hot.accept('../reducers/teacherApp', () => {
    store.replaceReducer(require('../reducers/teacherApp').default)
  })

  return store
}
