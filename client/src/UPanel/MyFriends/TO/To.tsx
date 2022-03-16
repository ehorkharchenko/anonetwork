import React from 'react'
import css from './To.module.css'

import { Link } from 'react-router-dom'

const Meet = () => {

  return (
    <div className={css.area}>
      <div className={css.inner}>
        <div className={css.all__ms}></div>
        <div className={css.panel}>
          <textarea className={css.inp} placeholder='Enter MSG ...' />
          <div className={css.to}>
            <button className={css.submit}>
              <span className={css.innerSubmit}> Submit </span>
            </button>
          </div>
        </div>
      </div>
      <Link to='/profile/friends' className={css.link}>
        <button className={css.exit}>
          <span className={css.exti}> exit </span>
        </button>
      </Link>
    </div>
  )
}

export default Meet
