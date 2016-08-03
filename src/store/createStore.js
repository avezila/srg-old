import { applyMiddleware, compose, createStore } from 'redux'
//import { routeReducer,syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

import { reduxReactRouter } from 'redux-router';
import { createHistory,createHashHistory } from 'history';
import { supportsHistory } from 'history/lib/DOMUtils.js';


export default (initialState = {}) => { //, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  //let routerMiddleware = syncHistory(history);
  const middleware = [thunk]//, routerMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  console.log("supportsHistory",supportsHistory())
  let create_history = (supportsHistory())? createHistory : createHashHistory; 
  const enhancers = [
    reduxReactRouter({
      createHistory: create_history
    }),
  ]
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

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

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
