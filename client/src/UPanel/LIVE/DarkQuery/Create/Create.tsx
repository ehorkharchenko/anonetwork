import React from 'react'
import css from './Create.module.css'

import { Switch, Route, Redirect } from 'react-router-dom'

const Id = (props: any) => {
  
  const next = (): void => {
    
    props.history.push('/live/query/create/_submit')
  }

  return (
    <div className={css.area__id}>
      <div className={css.input}>
        <span className={css.label__id}> id </span>
        <input className={css.input__id} type='text' placeholder='Y0oO96  . .' />
      </div>
      <button className={css.next}
              onClick={next}>
        <span> next </span>
      </button>
    </div>
  )
}

const Form = () => {

  return (
    <div className={css.area__form}>
      <textarea className={css.input__form} placeholder='Enter ...' />
      <button className={css.submit}> Submit </button>
    </div>
  )
}

function Create () {

  return (
    <Switch>
      <Route exact path='/live/query/create'>
        <Redirect to='/live/query/create/_id' />
      </Route>
      <Route exact path='/live/query/create/_id' render={Id} />
      <Route exact path='/live/query/create/_submit' render={Form} />
    </Switch>
  )
}

export default Create
