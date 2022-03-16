import React, { useState } from 'react'
import css from './Friend.module.css'

import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const Friend = (props: any) => {
  
  const [ data, setData ]: any = useState({
    name: null,
    MI: null,
    inbox: [],
  })

  const socket = io('http://localhost:3650')

  const getdata: any = {
    '_id': sessionStorage.ProfileID,
    'MI':  props.data['MI']
  }
  
  if (data.name === null) {

    socket.emit('friends', getdata, function (reply: any) {

      setData(reply)
    })
  }
  
  return (
    <div className={css.friend}>
      <svg viewBox='0 0 120 120' className={css.icon}>
        <rect x='10' y='10' rx='20' ry='20' width='100' height='100'
              fill='rgba(255, 238, 0, 0.9)' />
        <text x="45" y="85" fill='#c3a720'
              style={{
                fontFamily: 'Lemonada',
                fontSize: '60px',
                fontWeight: 600
              }}> ? </text>
      </svg>
      <div className={css.data}>
        <div className={css.name}>
          <Link to='/profile/friends/to'>
            <span> { data.name } </span>
          </Link>
        </div>
        <button className={css.pref}> i </button>
      </div>
      <button className={css.delete}
              onClick={ () => props.onDelete(props.data['MI']) }>
        <span> delete </span>
      </button>
    </div>
  )
}

export default Friend
