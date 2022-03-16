import React, { useState } from 'react'
import css from './Profile.module.css'

import { Helmet } from 'react-helmet'

import myFriends from '../../media/myfriends_entry.svg'
import loader from '../../media/loader200px.svg'

import iconSET from '../../media/SET.svg'

import io from 'socket.io-client'
import { Switch, Route } from 'react-router-dom'

import Set from './SET/Set'

import FMenu from '../FMenu/Menu'
const socket = io('http://localhost:3650')

const Default = (props: any) => {

  const [ storage, setStorage ]: any = useState(null)

  const getdata: any = {
    _id:  sessionStorage.ProfileID,
    keys: [ 'anonym name', 'anonym id' ]
  }
  
  if (storage === null)
    socket.emit('get', getdata, (data: any) => {

      setStorage({
        name: data['anonym name'],
        id:   data['anonym id']
      })
    })
  
  const inputAnonymName: React.RefObject<HTMLInputElement> | any  =  React.createRef()
  const inputAnonymID:   React.RefObject<HTMLInputElement> | any  =  React.createRef()

  const apply = (): number => {

    const [ name, id ] = 
    [ 
      inputAnonymName.current.value.trim(), 
      inputAnonymID.current.value.trim()
    ]

    inputAnonymName.current.value = name
    inputAnonymID.current.value   = id

    if (name.indexOf(' ') > -1 || id.indexOf(' ') > -1) {
      alert('anonym name and id cannot contain space')

      return -1;
    }

    const editdata = {
      _id: sessionStorage.ProfileID,
      keys: [
        ['anonym name', name],
        ['anonym id',   id]
      ]
    }

    socket.emit('edit', editdata, function (reply: boolean | number) {
      
        if (reply) 
          props.history.push('/profile')

        else {
          inputAnonymName.current.value = ''
          inputAnonymID.current.value   = '' 
        }

        setStorage(null)
    })

    return 0;
  }

  return (
    <div className={css.area}>
      <Helmet>
        <title> Profile&ensp;•&ensp;Shomi </title>
      </Helmet>
      <div className={css.friends}>
        <button className={css.tofriends}
                onClick={ () => props.history.push('/friends') }>
          <img src={myFriends} alt='My friends' />
        </button>
      </div>
      <div className={css.blank}>
        { 
          (storage !== null) ?
          (
            <>
              <div className={css.user}>
                <svg className={css.icon} viewBox="0 0 320 320" width='125' height='125'>
                  <rect x='10' y='10' 
                        rx='65' ry='65'
                        width='300' height="300"
                          fill="rgba(255, 238, 0, 0.9)" style={{
                            boxShadow: '0 0 15px rgba(255, 238, 0, 0.9)'
                          }}/>
 
                  <text x="123" y="225" fill='#c3a720'
                        style={{
                            fontFamily: 'Lemonada',
                            fontWeight: 600,
                            fontSize: '150px'
                        }}> ? </text>

                </svg>
              <div className={css.userInfo}>
                <div className={css.username}>
                  {
                    (window.location.pathname === '/profile/edit') ?
                    (
                      <>
                        <input ref={inputAnonymName} type="text" placeholder={storage.name} />
                        <span>#</span>
                        <input ref={inputAnonymID} type="text" placeholder={storage.id} />
                      </>                      
                    ):

                    <span> { storage.name }<span>#{ storage.id }</span> </span>    
                  }
                </div>
                <div className={css.profileTo}>
                  {
                    (window.location.pathname !== '/profile/edit') ?
                    (
                      <>
                        <button className={css.edit}
                                onClick={ () => props.history.push('/profile/edit') }>
                          <span> Edit </span>
                        </button>
                        <button className={css.set}
                                onClick={ () => props.history.push('/profile/set') }>
                          <img src={iconSET} alt='SET' width='25' />
                        </button>
                      </>
                    ):

                    (
                      <>
                        <button className={css.cancel}
                                onClick={ () => props.history.push('/profile') }>
                          <span> cancel </span>
                        </button>
                        <button className={css.apply} onClick={apply}>
                          <span> apply </span>
                        </button>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
            <button className={css.live}
                    onClick={ () => props.history.push('/live') }>
              <span> LIVE </span>
            </button>
          </>
          ):
          (
            <img className={css.loaderGetData} src={loader} alt='load' />
          )
        }
        <FMenu />
      </div>
    </div>
  )
}


function Profile () {
  
  sessionStorage.current = JSON.stringify({
    ...JSON.parse(sessionStorage.current),
    path: window.location.pathname,
    data: {
      
    }
  })

  return (
    <Switch>
      <Route exact path='/profile' component={Default} />
      <Route exact path='/profile/edit' component={Default} />
      <Route path='/profile/set' component={Set} />
    </Switch>
  )

}

export default Profile
