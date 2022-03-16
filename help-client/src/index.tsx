import React from 'react'
import ReactDOM from 'react-dom'

import Entry from './Entry'
import Terms from './TermsOfUse/Terms'
import './idx.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Route exact path='/terms-of-use' component={Terms} />
    <Route exact path='/' component={Entry} />
    <Route path='/point' component={Entry} />
  </Router>,
  document.getElementById('root')
)
