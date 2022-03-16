import React, { useState } from 'react'
import css from './Feed.module.css'

// import reload from '../../../media/reload_icon.svg'

import { Route, Redirect } from 'react-router-dom'
import Constructor from './Constructor/Template'

import io from 'socket.io-client'

const socket = io('http://localhost:3750')

function PublicFeed (props: any) {

  function Fresh () {

    const [ fresh, setFresh ]: any = useState(null)

    socket.emit('get fresh publications', null, function (publications: object) {

      setFresh(publications)
    })
    
    if (fresh !== null)
      if (fresh.length > 0)
        return fresh.map( (publication: any) => {

          return <Constructor publication={publication} key={publication._id} />
        })
      
      else
        return <NoPublications />
    
    else
      return <PleaseWait />
  }
  
  function Hot () {
    
    const [ hot, setHot]: any = useState(null)

    socket.emit('get hot publications', null, function (publications: object) {

      setHot(publications)
    })

    if (hot !== null)
      if (hot.length > 0)
        return hot.map( (publication: any) => {
        
          return <Constructor publication={publication} key={publication._id} />
        })

      else
        return <NoPublications />
    
    else
      return <PleaseWait />
  }
  
  const PleaseWait = () => {
    
    return (
      <span> Please wait ... </span>
    )
  }

  const NoPublications = () => {

    return <span> No publication </span>
  }

  return (
    <div className={css.area}>
        <Route exact path='/live'>
          <Redirect to='/live/fresh' />
        </Route>
        <div className={css.feed}>
          <Route exact path='/live/fresh' component={Fresh} />
          <Route exact path='/live/hot' component={Hot} />
          <Route exact path='/live/publication/:id'>
            <div className={css.notfound}>
              <span> PUBLICATION NOT FOUND </span>
              <button className={css['button-cancel']}
                      onClick={ () => props.history.push('/live') }>
                <span> cancel </span>
              </button>
              <button className={css['button-again']}>
                <span> again </span>
              </button>
            </div>
          </Route>
        </div>
    </div>
  )
}

export default PublicFeed
