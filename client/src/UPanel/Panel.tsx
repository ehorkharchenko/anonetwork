import React from 'react'

  // components
import FindCollocutor from './FindCollocutor/Find'
import Profile from './PROFILE/Profile'
import MyFriends from './MyFriends/Friends'

import Live from './LIVE/Live'

import { Switch, Route, Redirect } from 'react-router-dom'

function UPanel () {

  if (sessionStorage.getItem('auth') === null)
    sessionStorage.auth = false

  if (JSON.parse(sessionStorage.auth).status === true) {

    return (
      <Switch>
        <Route exact path='/'>
          <Redirect to='/profile' />
        </Route>
        <Route path='/profile' component={Profile} />
        <Route path='/friends' component={MyFriends} />
        <Route path='/findcollocutor' component={FindCollocutor} /> 
        <Route path='/live' component={Live} />
      </Switch>
    )

  } else {

      return <Redirect to='/' />
    }
}

export default UPanel
