import React from 'react'
import css from './NotFound.module.css'

function NotFound ({ history }) {

  // setTimeout( () => {
  //
  //   history.push('/profile')
  //
  // }, 6000)

  return (
    <div className={css.area}>
      <div className={css.label}>
        <span className={css.number}> 4 </span>
        <span className={css.sign}> ? </span>
        <span className={css.number}> 4 </span>
      </div>
      <span className={css.not__found}> Not Found </span>
    </div>
  )
}

export default NotFound
