import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import GreenSpaceShowContainer from './GreenSpaceShowContainer'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/greenspaces/:id' component={GreenSpaceShowContainer} />
  </Router>
  )
}

export default App
