import React from 'react'
import { Switch, Route } from 'react-router-dom'

function Marks () {
  
  return (
    <Switch>
      <Route exact path='/mark' component={ () => <span> sd </span> } />
    </Switch>
  )
}

export default Marks