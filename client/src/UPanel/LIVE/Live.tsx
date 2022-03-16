import React from 'react'
import css from './Live.module.css'

import { Helmet } from 'react-helmet'
 
import { Switch, Route } from 'react-router-dom'

import hot_label from '../../media/hot_label.svg'

import PublicFeed from './PublicFeed/Feed'
import Publish from './Publish/Pubsh'

import DarkQuery from './DarkQuery/Query'

function Live (props: any) {
  
  return (
    <Switch>
      <Route path='/live/publish' component={Publish} />
      <Route path='/live/darkquery' component={DarkQuery} />
      <Route path='/live'>
        <>
          <Helmet>
            <title> L I V E&ensp;•&ensp;Shomi </title>
          </Helmet>
          <div className={css.area}>
            <div className={css.choice}>
              <div className={css.toProfile}>
                <button className={css.to}
                       onClick={ () => props.history.push('/profile') }>
                  <span> &lt; </span>
                </button>
              </div>
              <div className={css.mode}>
                <button className={css.fresh}
                        onClick={ () => props.history.push('/live/fresh') }>
                  <span className={css.full_fresh_label}> Fresh </span>
                  <span className={css.short_fresh_label}> F+ </span>
                </button>
                <button className={css.hot}
                        onClick={ () => props.history.push('/live/hot') }>
                  <span className={css.full_hot_label}> HOT </span>
                  <img className={css.short_hot_label} src={hot_label} alt='hot' />
                </button>
              </div>
            </div>
            <PublicFeed />
          </div>
          <button className={css.add}
                  onClick={ () => props.history.push('/live/publish') }>
            <span> + </span>
          </button>
        </>
      </Route>
    </Switch>
  )
}

export default Live
