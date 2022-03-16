import React, { useState } from 'react'
import css from './Pubsh.module.css'

import { Route, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import io from 'socket.io-client'
// import Reply from '../DarkQuery/Inbox/Reply/Reply'

const socket = io('http://localhost:3750')

function Publish (props: any) {
    
    // Data [ Publication type, Preferences data ]
  const [ data, setData ]: any = useState([ null, '', {} ])
  
  const input: any = React.createRef()

  const path = window.location.pathname
  
  if (data[0] === null) {

    if (window.location.pathname === '/live/publish/mark')
      setData([ true, data[1] ])

    else if (window.location.pathname === '/live/publish/theme')
      setData([ false, data[1] ])

  }

  return (
    <div className={css.blank}>
      <Route exact path='/live/publish'>
        <Redirect to='/live/publish/mark' />
      </Route>
      <Helmet>
        <title> Publish&ensp;•&ensp;Shomi </title>
      </Helmet>
      <Route path='/live/publish'>
        {
          (path === '/live/publish/theme' || path === '/live/publish/mark') ?
          (
            <>
              <div className={css.header}>
                <div>
                  <span>
                    { 
                      (data[0]) ? 'Mark': 'Theme' 
                    }
                  </span>
                </div>
                <button title='create mark'
                        onClick={ () => {
                          props.history.push(`/live/publish/${ (data[0]) ? 'theme': 'mark' }`)
                          setData([ !data[0], ``, data[2] ])
                        }}> 
                  <span> 
                    { 
                      (data[0]) ? 'theme': 'mark' 
                    } 
                  </span>
                </button>
              </div>
              <div className={css.editor}>
                <textarea ref={input} className={css.input} autoFocus placeholder={`Enter text .. `}
                          value={data[1]} onFocus={ (e) => {
                            e.target.setRangeText(``, data[1].length, data[1].length, "end")
                          }} 
                          onChange={ (e) => {
                            setData([ data[0], e.target.value.slice(0, (data[0]) ? 750: 5000 ), data[2] ])
                          }} />
                <div>
                  <button className={css.editPreferences}
                          onClick={ () => props.history.push('/live/publish/pref') }>
                    <span> Pref </span>
                  </button>
                  <div className={css.letterCount}> 
                    <span>{ data[1].length }</span> 
                    <span> &nbsp;/&nbsp; </span> 
                    <span>
                      {
                        (data[0]) ? 750: 5000
                      }
                    </span>
                  </div>
                </div>
              </div>
            </>
          ): null
        }
        <Route exact path='/live/publish/pref'>
          {
            (data[0]) ?
            (
              <>
                <div>
                  Hello from Output Preferences
                </div>
              </>
            ): 
            (
              <>
                <div>
                  Hello from Mark Preferences
                </div>
              </>
            )
          }
        </Route>
        {
          (
            path === '/live/publish/theme' ||
            path === '/live/publish/mark'  ||
            path === '/live/publish/pref'
          ) ?
          (
            <div className={css.footer}>
              {
                (path === '/live/publish/theme' || path === '/live/publish/mark') ?
                (
                  <>
                    <button className={css.cancel}
                            onClick={ () => props.history.push('/live') }>
                      <span> cancel </span>
                    </button>
                    <button className={`${css.button} ${css['button-publish']}`}
                            onClick={ () => {
                              
                              if (data[1].length > 0 && ((data[0]) ? 255: 750) <= data[1].length) {
                                
                                const dataForPublish: object = {
                                  type: (data[0]) ? 'mark': 'theme',
                                  content: input.current.value
                                }
                                
                                props.history.push('/live/publish/done')

                                socket.emit('publish', dataForPublish, function (reply: any) {
                            
                                })

                              } else {
                                  
                                  if (data[1].length === 0 && data[1].length <= ((data[0]) ? 255: 750))
                                    alert('Empty input')

                                  else if (data[1].length > 0 && data[1].length <= ((data[0]) ? 255: 750))
                                    alert(`Minimum ${(data[0]) ? 'mark': 'theme'} text length ${(data[0]) ? 255: 750} symbols`)

                                  
                              }
                              
                            }}>
                      <span> Publish </span>
                    </button>
                  </>
                ):
                (
                  <button className={`${css.button} ${css['button-set-pref']}`}
                          onClick={ () => {
                            props.history.push(`/live/publish/${ (data[0]) ? 'mark': 'theme'}`)

                            setData([ data[0], 
                              {
                                hide: true
                              } 
                            ])
                          }}>
                    <span> Set pref </span>
                  </button>
                )
              }         
            </div>
          ): null
        }
      </Route>
      <Route exact path='/live/publish/done'>
        {
          (false) ?
          (
            <span> Please wait .. </span>
          ): 
          (false) ? 
          (
            <div>
              <span> Published successfully </span>
              <button onClick={ () => props.history.push('/live') }> close </button>
            </div>
          ):
          (
            <div>
              <span> Published failed </span>
              <div>
                <button onClick={ () => props.history.push('/live/publish') }> cancel </button>
                <button> again </button>
              </div>
            </div>
          )
        }
      </Route>
    </div>
  )
}

export default Publish
