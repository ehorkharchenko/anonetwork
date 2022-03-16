import React, { useState } from 'react'
import css from './Enter.module.css'

import { Redirect, Route } from 'react-router-dom'
import io from 'socket.io-client'
import ForgotSecureKey from './Forgot/Forgot'

const socket = io('http://localhost:3650')

type ref = any

function Enter (props: any) {
  
  const [ data, setData ]: any = useState({
    secure: true,
    wait:  false,
    warn: [],
    anonym: undefined
  })
  
  const inputAnonymName: ref = React.createRef()
  const inputSecureKey:  ref = React.createRef()
  
  const get = () => {
    
    const value: string = inputAnonymName.current.value.trim()

    let [ name, id ]: [ string | undefined, string | undefined ] =
    (value.indexOf('#') > -1) ? 
    [ 
      value.substr(0, value.indexOf('#')).trim(), 
      value.substr(value.indexOf('#'), value.length).trim().substr(1, value.length)
    ]:
    [ value, '001']

    if (name.indexOf(' ') > -1)
      warnpush('anonym name cannot contain space')
    
    if (id.indexOf(' ') > -1)
      warnpush('anonym id cannot contain space')

    return {
      'anonym name': name,
      'anonym id':   id,
    }
  }

  const warnpush = (text: string) => {
    
    setData( (dt: any) => ({
      ...dt,
      warn: [ ...dt.warn, text ]
    }))

  }

  const warnhide = () => {
    
    setTimeout( () => {
      
      data.warn.shift()
      setData( (dt: any) => ({
        ...dt,
        warn: dt.warn
      }))

    }, 3000)
  }
  
  if (JSON.parse(sessionStorage.auth).status === false) {
    
    const Forgot = () => <ForgotSecureKey getdata={data.anonym} />
    
    const enter = () => {    
  
      if (8 <= inputSecureKey.current.value.length ) {
  
        setData( (dt: any) => ({
          ...dt,
          wait: true
        }))
        
        const getdata = {
          ...get(),
          'secure key': inputSecureKey.current.value
        }
  
        socket.emit('enter', getdata, function (data: any) {
          
          console.log(data)

          if (data.auth === true) {
  
            sessionStorage.auth = JSON.stringify({
              ...JSON.parse(sessionStorage.auth),
              status: true,
              _id: data['_id']
            })
            
            window.location.pathname = '/profile'
  
          } else if (data.auth === false)            
              warnpush('anonym not found or secure key is invalid')
  
            else
              warnpush('auth failed')
          
          setData( (dt: any) => ({
            ...dt,
            wait: false
          }))
  
          localStorage.setItem('data', JSON.stringify(data) )
           
          return 0
        })
  
      } else {
  
          warnpush('invalid data')
  
          inputAnonymName.current.value = ''
          inputSecureKey.current.value  = ''
  
          return 0
        }
  
  
    }

    return (
      <>
        <Route exact path='/'>
        <>
       <div className={css.blank}>
        <form onSubmit={e  =>  e.preventDefault() }>
          <div className={css.inputs}>
            <input ref={inputAnonymName} className={css.name}
                   type='text' placeholder='anonym name  #000' />
            <div>
              <input ref={inputSecureKey}
                     type={ data.secure ? 'password': 'text' }  placeholder='secure key' />
              <button type='button'
                      onClick={setData.bind(null, (dt: any) => ({ ...dt, secure: !dt.secure }) )}>
                <span>{ data.secure ? 'show': 'hide' }</span>
              </button>
            </div>
          </div>
          <div className={css.buttons}>
            {
              (!data.wait) ?
              (
                <>
                  <button type='button' className={css.join}
                          onClick={ () => window.open('http://join.shomi.fun', '_blank') }>
                    <span> Join </span>
                  </button>
                  <button type='submit' className={css.LOGIN} onClick={enter}>
                    <span> Enter </span>
                  </button>
                </>
              ):
              <div className={css.authwait}>
                <span> wait </span>
                <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 80 30"
                     style={{
                       height: '6px',
                       alignSelf: 'center',
                       justifySelf: 'center'
                     }}>
                  <circle cx="15" cy="15" r="15" fill='#999'>
                    <animate accumulate="none" additive="replace" attributeName="r" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="15" repeatCount="indefinite" restart="always" to="15" values="15;9;15" />
                    <animate accumulate="none" additive="replace" attributeName="fill-opacity" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="1" repeatCount="indefinite" restart="always" to="1" values="1;.5;1" />
                  </circle>
                  <circle cx="60" cy="15" r="9" fill='#999'>
                    <animate accumulate="none" additive="replace" attributeName="r" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="9" repeatCount="indefinite" restart="always" to="9" values="9;15;9" />
                    <animate accumulate="none" additive="replace" attributeName="fill-opacity" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="0.5" repeatCount="indefinite" restart="always" to="0.5" values=".5;1;.5" />
                  </circle>
                </svg>
              </div>
            }
          </div>
          {
            (!data.wait) ?
            (
              <button className={css.forgot} type='button'
                      onClick={ () => {
                        
                        if (data.anonym !== undefined)
                          props.history.push('/forgot/file-upload')
                        
                        else
                          if (inputAnonymName.current.value.length > 0) {
                            setData( (dt: any) => ({
                              ...dt,
                              anonym: get()
                            }))
                            
                            props.history.push('/forgot/file-upload')
                            
                          } else
                              warnpush(' Empty input ')
                      }}> 
                <span> forgot ? </span>
              </button>
            ): null
          }
        </form>
      </div>
      {
        (data.warn.length !== 0) ?
          data.warn.map( (text: string) => {

            return (
              <div className={css.warn} { ...warnhide()}>
                <span>{ text }</span>
                <button onClick={ () => {
                  
                  data.warn.shift()
                  setData( (dt: any) => ({
                    ...dt,
                    warn: dt.warn 
                  }) )

                }}> &times; </button>
              </div>
            )

          }): null
      }
      </>
        </Route>
        <Route path='/forgot' component={Forgot} />
      </>
    )

  } else
      return <Redirect to='/profile' />

}

export default Enter