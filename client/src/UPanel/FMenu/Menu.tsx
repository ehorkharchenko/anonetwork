import React from 'react'
import css from './Menu.module.css'

import { Link } from 'react-router-dom'

import iconNewCollocutor from '../../media/search.svg'

const FMenu = ({ history }: any) => {

  return (
    <div className={css.area}>
      <div className={css.menu}>
        <Link to='/findcollocutor' className={css.item}>
          <button className={css.join}>
            <img src={iconNewCollocutor} className={css.icon} alt='Search' />
          </button>
        </Link>
        <Link to='/profile' className={css.item}>
          <button className={css.profile}>
            <span className={css.innerProfile}> PROFILE </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default FMenu
