import { applyMiddleware, compose, createStore } from 'redux'
//import { routeReducer,syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'


export default (initialState = {}) => { //, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  //let routerMiddleware = syncHistory(history);
  const middleware = [thunk]//, routerMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  /*if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }*/

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  /*if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }*/

  return store
}
