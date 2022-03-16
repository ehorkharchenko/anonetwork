import React, { useState } from 'react'
import css from './Inbox.module.css'

import watch__icon from '../../../../media/watch_icon.svg'
// import Reply from './Reply/Reply'

import { Route } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io('http://localhost:750')

function Inbox () {
  
  const [ queries, setQueries ]: any = useState([
    { AI: '', query: 'Lorem ipsum dolor sit amet.' },
    { AI: '', query: 'Lorem ipsum dolor sit amet.' }
  ])

  socket.emit('queries', null, function (reply: object) {

    setQueries(reply)
  })

  return (
    <div className={css.area}>
      <Route exact path='/live/query/inbox'>
        <div className={css.queries}>
          {
            queries.map( (item: any) => {
              
              return (
                <div className={css.item}>
                  <div className={css.query}> { queries.query } </div>
                  <div className={css.choose}>
                    <button className={css.watch}>
                      <img src={watch__icon} alt='watch' />
                    </button>
                    <button className={css.reply}>
                      <span> reply </span>
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Route>
      <Route exact path='/live/query/inbox/reply'
             render={ () => <span> reply </span> } />
    </div>
  )
}

export default Inbox
