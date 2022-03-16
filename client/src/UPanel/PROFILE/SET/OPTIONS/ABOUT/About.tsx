import React from 'react'
import css from './About.module.css'

function About () {

  return (
    <div className={css.area}>
      <div className={css.head}>
        <span> About Shomi </span>
      </div>
      <div className={css.about}></div>
      <div className={css.v}>
        <span> 0.0.1 &nbsp; ALPHA </span>
      </div>
    </div>
  )
}

export default About
