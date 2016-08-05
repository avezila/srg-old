import React from 'react'
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

import YMap from 'components/YMap'
import Table from 'components/Table'
import Filter from 'components/Filter'
import CoreLayout from 'containers/CoreLayout'
import Error from 'components/Error'


let Layouts = {
  Filter : ({children})=>(
    <CoreLayout>
      <Filter />
      <YMap />
      {children}
    </CoreLayout>
  ),
  Error403 : ()=>(
    <CoreLayout>
      <Error 
        title="Access Denied"
        content="Sorry, but you do not have permissions to view this page."  />
    </CoreLayout>
  ),
  Error404 : ()=>(
    <CoreLayout>
      <Error 
        title="Page Not Found"
        content="Sorry, but the page you were trying to view does not exist."  />
    </CoreLayout>
  ),
}

export const MainRoute = () => (
  <Route path="/">
    <IndexRedirect to="/map" />
    <Route path="/map" component={Layouts.Filter} />
    <Route path="/table" component={Layouts.Filter}>
      <IndexRoute components={Table} />
    </Route>
    <Route path="/403*" components={Layouts.Error403} />
    <Route path="/404*" title="Page Not Found" components={Layouts.Error404} />
    <Redirect from="*" to="/404/*" />
  </Route>
);


export default MainRoute
