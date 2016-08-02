import React from 'react'
//import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import FilterMap from 'containers/FilterMap'
import FilterTable from 'containers/FilterTable'
import CoreLayout from 'containers/CoreLayout'


export const MainRoute = () => (
  <CoreLayout>
    <FilterMap />
  </CoreLayout>
);


export default MainRoute