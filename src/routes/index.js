import React from 'react'
import FilterMap from 'containers/FilterMap'
import FilterTable from 'containers/FilterTable'
import CoreLayout from 'containers/CoreLayout'

import { Route, IndexRoute } from 'react-router';

export const MainRoute = () => (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={FilterMap} />
    <Route path="/table" component={FilterTable} />
  </Route>
);


export default MainRoute
