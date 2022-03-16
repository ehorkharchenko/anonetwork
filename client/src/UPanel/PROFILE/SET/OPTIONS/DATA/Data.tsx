import React from 'react'
import css from './Data.module.css'

import icon__copy from '../../../../../media/copyicon.png'

function Data () {

  return (
    <div className={css.area}>
      <div className={css.name__id}>
        <div className={css.name}>
          <span> NAME </span>
          <input type='text' placeholder='name' />
        </div>
        <div className={css.id}>
          <span> ID </span>
          <input type='text' placeholder='000' />
        </div>
      </div>
      <div className={css.item}>
        <span> enique id </span>
        <input type='text' placeholder='' />
        <button>
          <img className={css.copy} src={icon__copy} alt='copy' />
        </button>
      </div>
      <div className={css.item}>
        <span> author id </span>
        <input type='text' placeholder='' />
        <button>
          <img className={css.copy} src={icon__copy} alt='copy' />
        </button>
      </div>
      <div className={css.item}>
        <span> friend id </span>
        <input type='text' placeholder='' />
        <button>
          <img className={css.copy} src={icon__copy} alt='copy' />
        </button>
      </div>
    </div>
  )
}

export default Data
