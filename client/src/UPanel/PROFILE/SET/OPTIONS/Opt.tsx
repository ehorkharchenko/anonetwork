import React from 'react'
import css from './Opt.module.css'

import { Route } from 'react-router-dom'

import Kept from './POSTPONED/Kept'
import Anonymity from './ANONYMITY/Anonymity'
import Security from './SECURITY/Security'
import Data from './DATA/Data'
import About from './ABOUT/About'

function Options () {

  return (
    <div className={css.area}>
      <Route exact path='/profile/set/anonymity' render={Anonymity} />
      <Route exact path='/profile/SET/security' render={Security} />
      <Route exact path='/profile/SET/kept' render={Kept} />
      <Route exact path='/profile/SET/data' render={Data} />
      <Route exact path='/profile/SET/about' render={About} />
    </div>
  )
}

export default Options
