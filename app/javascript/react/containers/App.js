import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import GreenSpaceShowContainer from './GreenSpaceShowContainer'
import GreenSpaceIndexContainer from './GreenSpaceIndexContainer'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/' component={GreenSpaceIndexContainer}/>
    <Route path='/greenspaces' component={GreenSpaceIndexContainer} />
    <Route path='/greenspaces/:id' component={GreenSpaceShowContainer} />
  </Router>

  )
}

export default App
