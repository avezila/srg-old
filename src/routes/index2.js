// We only need to import the modules necessary for initial render
import CoreLayout from 'containers/CoreLayout'
import Map from 'containers/Map'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Map,
  childRoutes: [
    //CounterRoute(store)
  ]
})

export default createRoutes
