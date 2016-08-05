import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router';

import "bootswatch"
import 'react-toolbox/lib/commons.scss'
import "styles/core"


class App extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }
  render () {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          {this.props.routes}
        </ReduxRouter>
      </Provider>
    )
  }
}

export default App
