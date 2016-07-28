import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import FilterMap from 'containers/FilterMap'
import FilterTable from 'containers/FilterTable'
import CoreLayout from 'containers/CoreLayout'


export const MainRoute = () => (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={FilterMap}/>
    <Route path="table" component={FilterTable}/>
  </Route>
);


export default MainRoute