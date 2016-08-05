import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import 'nanoscroller/bin/css/nanoscroller.css'
import 'react-toolbox/lib/commons.scss';
import 'nanoscroller/bin/javascripts/jquery.nanoscroller.js'
import 'styles/core.scss'
import "bootswatch/paper/bootstrap.css";


import { ReduxRouter } from 'redux-router';

class App extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { store, routes } = this.props

    return (
      <Provider store={store}>
        <ReduxRouter>
          {routes}
        </ReduxRouter>
      </Provider>
    )
  }
}

export default App
