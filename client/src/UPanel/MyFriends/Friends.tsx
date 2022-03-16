import React, { useState } from 'react'
import css from './Friends.module.css'

import { Helmet } from 'react-helmet'
import { Redirect, Route } from 'react-router-dom'

import loader from '../../media/loaderForFriends.svg'

import Friend from './Friend/Friend'
import To from './TO/To'

import io from 'socket.io-client'

const socket = io('http://localhost:3650')

const Feed = (props: any) => {

  const data = props.data
  
  console.log(data)

  function del (id: string) {
    
    const deldata = {
      '_id': localStorage.ProfileID,
      'MI': id
    }

    socket.emit('friend delete', deldata)

    window.location.reload()
  }

  if (data !== null && data.length > 0) {
    
    return (
      <div className={css.friendsfeed}>
        {
          data.map( (friend: any) => {
              
              return (
                <>
                  <Friend data={friend} onDelete={ (v: string) => del(v) } key={friend['MI']} />
                  {
                    (true) ? <hr />: null 
                  }
                </>
              )
          })
        }
      </div>
    )

  } else if (data !== null && data.length === 0) {
    
    return (
      <span className={css.findfriends}>
        Maybe we'll
        <span className={css.find}
              onClick={ () => props.history.push('/findcollocutor/choicer') }> find </span>
        <span className={css.a}> a </span> friend ?
      </span>
    )

  } else 
    return (
      <img className={css.loader} src={loader} alt='load' />
    )

}

function MyFriends (props: any) {
  
  const [data, setData]: any = useState({
    find: {
      status: true,
      mode: true
    }
  })

  const [ friends, setFriends ]: any = useState(null)

  const getdata = {
    _id: sessionStorage.ProfileID
  }
  
  if (friends === null)  
    socket.emit('get friends', getdata, function (data: any) {
       
       console.log(data)
       setFriends(data)
    })
  
  const input: any = React.useRef()
  
  const pushfriend = (mi: string) => {
    
    input.current.value = ''
   
    const data: any = {
      _id: localStorage.ProfileID,
      friend: { MI: mi, inbox: [] }
    }

    socket.emit('friend push', data)

    window.location.reload()
    
  }

  return (
    <>
      <Helmet>
        <title> My Friends&ensp;•&ensp;Shomi </title>
      </Helmet>
      <Route exact path='/friends' render={ () => <Redirect to='/friends/m' /> } />
      <Route exact path='/friends/m'>
        <div className={css.area}>
          <div className={css.searchFriend}>
            {
              (data.find.status) ?
              (
                <div className={css.itemSearchFriend}>
                  <input ref={input} className={css.inp} 
                         type='text' 
                         placeholder={ (data.find.mode) ? 'Friend ID  ? e2Yo32': 'Channel ID ? e2Yo32' } />
                  <button className={css.add}
                          onClick={ () => (data.find.mode) ? pushfriend(input.current.value): alert('channel add') }>
                    <span className={css.innerAdd}> ADD </span>
                  </button>
                </div>
              ):
              (
                <>
                  <button onClick={ () => setData( (dt: any) =>
                              ({
                                ...dt,
                                find: {
                                  ...dt.find,
                                  status: true,
                                  mode: false
                                }
                              })
                          )}>
                    <span> join channel </span>
                  </button>
                  <button>
                    <span> create channel </span>
                  </button>
                </>
              )
            }
          </div>
          <div className={css.friends}>
            <Feed data={friends} />
            <div className={css.footer}>
              <button className={css.toprofile} 
                      onClick={ () => props.history.push('/profile') }>
                <span> &lt; </span>
              </button>
                {
                  (data.find.status) ?
                  ( 
                    <button className={css.newchannel}
                      onClick={ () => {

                        return (data.find.mode) ?
                          setData( (dt: any) => 
                            ({
                              ...dt,
                              find: {
                                ...dt.find,
                                status: false
                              }
                            })
                          ):
                          setData( (dt: any) => 
                            ({
                              ...dt,
                              find: {
                                ...dt.find,
                                status: true,
                                mode: true
                              }
                            })
                          )
                      }}>
                    <span> new&ensp;{ (data.find.mode) ? 'channel': 'friend' } </span>
                    </button>
                  ):
                  (
                    <button className={css.cancel}
                            onClick={ () => 
                              
                              setData( (dt: any) => 
                                ({
                                  ...dt,
                                  find: {
                                    ...dt.find,
                                    status: true
                                  }
                                })
                            )}>
                      <span> cancel </span>
                    </button>
                  )
                }
            </div>
          </div>
        </div>
      </Route>
      <Route path='/friends/id/' component={To} />
    </>
  )
}

export default MyFriends
