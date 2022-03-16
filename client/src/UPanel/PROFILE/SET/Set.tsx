import React from 'react'
import css from './Set.module.css'

import { Helmet } from 'react-helmet'

import { Switch, Route } from 'react-router-dom'
import Options from './OPTIONS/Opt'

const ChoicePanel = (props: any) => {
  
  function exit () {

    sessionStorage.clear()
    sessionStorage.auth = JSON.stringify({ status: false })

    window.location.href = '/'
  }
  
  const history: any = props.history

  return (
    <div className={css.area}>
      <Helmet>
        <title> SET&ensp;•&ensp;Shomi </title>
      </Helmet>
      <div className={css.head}>
        <div className={css.innerHead}>
          <span className={css.heading}> SET </span>
          <button className={css.close}
                  onClick={ () => history.push('/profile') }>
            <span> &times; </span>
          </button>
        </div>
      </div>
      <div className={css.options}>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => history.push('/profile/set/anonymity') }>
            <span> Anonymity </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => history.push('/profile/set/anonymity') }>
            <span> Confidentiality </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => history.push('/profile/set/security') }>
            <span> Security </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => history.push('/profile/set/kept') }>
            <span> Kept </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => history.push('/profile/set/data') }>
            <span> My data </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => window.open('http://help.shomi.ml', '_blank') }>
            <span> Help </span>
          </button>
        </div>
        <div className={css.shell}>
          <div className={css.icon}></div>
          <button className={css.item}
                  onClick={ () => window.open('http://help.shomi.ml/about', '_blank') }>
            <span> ABOUT </span>
          </button>
        </div>
      </div>
      <div className={css.footer}>
        <button className={css.exit} onClick={exit}>
          <span> Exit </span>
        </button>
        <span className={css.by}> Created by Freely </span>
      </div>
    </div>
  )
}

function Set () {
  
  return (
    <Switch>
      <Route exact path='/profile/set' render={ChoicePanel} />
      <Route path='/profile/set' render={Options} />
    </Switch>
  )
}

export default Set
