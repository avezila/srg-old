import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import 'nanoscroller/bin/css/nanoscroller.css'
import $ from 'jquery'
global.$ = $
global.jQuery = $
import 'react-toolbox/lib/commons.scss';
import 'nanoscroller/bin/javascripts/jquery.nanoscroller.js'
import 'styles/core.scss'


class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { history, routes, store } = this.props

    return (
      <Provider store={store}>
        <Router history={history} children={routes} />
      </Provider>
    )
  }
}

export default App
