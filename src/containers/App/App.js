import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router';

import "todc-bootstrap/dist/css/bootstrap.css"
import "todc-bootstrap/dist/css/bootstrap-theme.css"
import "todc-bootstrap/dist/css/todc-bootstrap.css"

import "styles/core"

import * as cian from "const/Cian"
global.cian = cian;


class App extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
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