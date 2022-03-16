import React from 'react'
import css from './Query.module.css'

import { Route, Redirect } from 'react-router-dom'

import Inbox from './Inbox/Inbox'
import Create from './Create/Create'
import { Helmet } from 'react-helmet'

function DarkQuery (props: any) {

  return (
    <div className={css.area}>
      <Helmet>
        <title> Dark query&ensp;•&ensp;Shomi </title>
      </Helmet>
      <Route exact path='/live/query'>
        <Redirect to='/live/query/inbox' />
      </Route>
      <Route path='/live/query/inbox' component={Inbox} />
      <Route path='/live/query/create' component={Create} />
      <div className={css.panel}>
        <div className={css.to}>
          <button onClick={ () => props.history.push('/profile') }>
            <span> &lt; </span>
          </button>
        </div>
        <div className={css.choice}>
          <button className={`${css.item} ${css.inbox}`}
                  onClick={ () => props.history.push('/live/query/inbox') }>
            <span className={css.symbol}> &lt; </span>
          </button>
          <button className={`${css.item} ${css.create}`}
                  onClick={ () => props.history.push('/live/query/create') }>
            <span className={css.symbol}> &lt; </span>
          </button>
        </div>
      </div>
    </div>
  )

}

export default DarkQuery
