import React from 'react'
import css from './Terms.module.css'

function Terms (props: any) {
  
  return (
    <>
      <button className={css.close}
              onClick={ () => props.history.push('/') }>
        <span> &times; </span>
      </button>
      <div className={css.blank}>
        <h1> terms of use </h1>
        <div className={css.terms}>
          <p> terms are being developed </p>
        </div>
        <button className={css['i-read']}
                onClick={ () => props.history.push('/') }>
          <span> I read </span>
        </button>
      </div>
    </> 
  )
}

export default Terms