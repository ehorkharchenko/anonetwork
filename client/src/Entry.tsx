import React from 'react'

import Enter from './Enter/Enter'
import UPanel from './UPanel/Panel'

import { BrowserRouter as Router, Route } from 'react-router-dom'

setTimeout( console.log.bind
  (
    console,
    `%cStop !!`, 
    "color: red; font-family: 'Courier New', monospace, monospace; font-size: 32px; font-weight: 600;"
  )
)

setTimeout( console.log.bind 
  (
    console,
    '%cThis browser function intended only developers. Close this urgently',
    "color: #000; font-size: 17.5px; font-weigth: 500;"  
  )
)


function Entry () {
    
    if (sessionStorage.getItem('auth') === null)
      sessionStorage.auth = JSON.stringify({ status: false })

    if (sessionStorage.getItem('current') === null)
      sessionStorage.current = JSON.stringify({})

    return (
      <Router>
        <Route exact path='/' component={Enter} />
        <Route path='/forgot' component={Enter} />
        <Route path='/'>
          <UPanel />
        </Route>
      </Router>
    )

}

export default Entry
