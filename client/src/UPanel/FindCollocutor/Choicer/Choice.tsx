import React, { useEffect, useState } from 'react'
import css from './Choice.module.css'

import io from 'socket.io-client'
import { Switch, Route } from 'react-router'
import submit__icon from '../../../media/iconenter.svg'
import { setEmitFlags } from 'typescript'

const Time = (props: any) => {
  
  // const [ time, setTime ]: any = useState({ min: 0, sec: 0 })

  // useEffect( function () {
    
  //   time.sec++

  //   if (time.sec === 60) {
      
  //     time.sec = 0
  //     time.min++
  //   }
    
  //   if (time.min === 30) alert('time out')

  //   setTimeout( () => {
      
  //     setTime({ min: time.min, sec: time.sec })
  //   }, 1000)
  
  // })
  
  return (
    <div className={css.time}>
      <span> 00:00 </span>
    </div>
  )

  // return (
  //   <div className={css.time}>
  //     <span>
  //       { (time.min <= 9) ? `0${time.min}`: time.min }:{ (time.sec <= 9) ? `0${time.sec}`: time.sec }
  //     </span>
  //   </div>
  // )

}

const socket = io('http://localhost:7000')

function Choicer (props: any) {

  const [ data, setData ]: any = useState({
    online:    null,
    msg: JSON.parse(sessionStorage.meet).msg,
  })
  
  if (sessionStorage.meet === null)
  sessionStorage.meet = JSON.stringify({
    found: false,
    SesID: '',
    msg: [],
  })
  
  if (JSON.parse(sessionStorage.meet).found === false) {
  socket.emit('find collocutor', {}, function (result: any) {
    console.log(result)
  })
  
  const obj = JSON.parse(sessionStorage.meet)
  obj.found = true
  sessionStorage.meet = JSON.stringify(obj)
  
  }

  socket.on('found', (SesID: any) => {
    props.history.push('/findcollocutor/session')
    
    console.log(SesID)
    const obj = JSON.parse(sessionStorage.meet)
    
    obj.SesID = SesID
    sessionStorage.meet = JSON.stringify(obj)
    
    socket.emit('join to session', SesID)
  })
  
  const input: any = React.createRef()
  
  // Get message from server and add in message list
  socket.on('get', (msg: string) => setData( (dt: any) =>
      ({
        ...dt,
        msg: [ ...dt.msg, { text: msg, cls: 'left' }]
      })
  ))

  function timeout () {
    
    props.history.push('/findcollocutor')
  }

  // End session chunk
  const text = (true) ? 'You finished this session': 'this session finished your collocutor'
  
  return (
    <Switch>
      <Route exact path='/findcollocutor/choicer'>
        <div className={css.choicer}>
          <div className={css['choicer-header']}>
            <div className={css.slc}>
              <span> SELECTION </span>
            </div>
            <Time timeout={timeout} />
          </div>
          <div className={css.loader}>
            <svg width="42" height="14" viewBox="0 0 120 30" fill="#666">
              <circle cx="15" cy="15" r="15">

                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite" />

                <animate attributeName="fillOpacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="15" r="9" fillOpacity="0.6">

                <animate attributeName="r" from="9" to="9"
                         begin="0s" dur="0.8s"
                         values="9;15;9" calcMode="linear"
                         repeatCount="indefinite" />

                <animate attributeName="fillOpacity" from="0.5" to="0.5"
                         begin="0s" dur="0.8s"
                         values=".5;1;.5" calcMode="linear"
                         repeatCount="indefinite" />
              </circle>
              <circle cx="105" cy="15" r="15">

                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite" />

                <animate attributeName="fillOpacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className={css['choicer-footer']}>
            <button className={css['choicer-cancel']}
                    onClick={ () => {
                      socket.disconnect()
                      props.history.push('/findcollocutor') 
                    }}>
              <span> cancel </span>
            </button>
            <div className={css['online-mark']}>
              <div className={css.mark}>
                <span> ONLINE </span>
              </div>
              <div className={css.number}>
                <span>
                  {
                    (data.online !== null && typeof data.online === 'number') ? 
                    ( <span className={css.onlNumInner}> {data.online} </span> ): 
                    (
                      <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 80 30"
                           style={{
                             height: '6px',
                             alignSelf: 'center',
                             justifySelf: 'center'
                           }}>
                        <circle cx="15" cy="15" r="15" fill='#c3a720'>
                          <animate accumulate="none" additive="replace" attributeName="r" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="15" repeatCount="indefinite" restart="always" to="15" values="15;9;15" />
                          <animate accumulate="none" additive="replace" attributeName="fill-opacity" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="1" repeatCount="indefinite" restart="always" to="1" values="1;.5;1" />
                        </circle>
                        <circle cx="60" cy="15" r="9" fill='#c3a720'>
                          <animate accumulate="none" additive="replace" attributeName="r" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="9" repeatCount="indefinite" restart="always" to="9" values="9;15;9" />
                          <animate accumulate="none" additive="replace" attributeName="fill-opacity" begin="0s" calcMode="linear" dur="0.8s" fill="remove" from="0.5" repeatCount="indefinite" restart="always" to="0.5" values=".5;1;.5" />
                        </circle>
                      </svg>
                    )
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </Route>
      <Route exact path='/findcollocutor/session'>
        <div className={css.session}>
          <div className={css.session_header}>
            <div className={css.innerHead}>
              <button className={css.share} title='share user id'>
                <span className={css.shareTxT}> + </span>
              </button>
              <button className={css.end} title='end session'
                      onClick={ () => props.history.push('/findcollocutor/end__session') }>
                <span className={css.endTxT}> end </span>
              </button>
            </div>
          </div>
          <div className={css.allM}>
            {
              data.msg.map( (msg: any) => {

                return (
                  <div className={`${css.msg} ${css[msg.cls]}`}>
                    <span> { msg.text } </span>
                  </div>
                )

              })
            }
          </div>
          <div className={css.session_panel}>
            <textarea ref={input} className={css.inp} placeholder='Enter  MSG    . . .' />
            <button className={css.submit} 
                    onClick={ () => {
                      
                      const vl = input.current.value
                      console.log('pressed')
                      socket.emit('submit', {
                        ses: JSON.parse(sessionStorage.meet).SesID,
                        msg: vl
                      })

                      setData( (dt: any) => 
                        ({
                          ...dt,
                          msg: [...dt.msg, { text: vl, cls: 'right' }]
                        })
                      )

                      const obj = JSON.parse(sessionStorage.meet)

                      obj.msg = data.msg

                      sessionStorage.meet = JSON.stringify(obj)

                      input.current.value = ''

                    }}>
              <img src={submit__icon} alt='submit' />
            </button>
          </div>
        </div>
      </Route>
      <Route exact path='/findcollocutor/end__session'>
        <div className={css['session-end']}>
          <div className={css.endms}>
            <span className={css.ms}> {text} </span>
          </div>
          <div className={css.panel}>
            <button className={css.anew} title='to collocutor choicer'
                    onClick={ () => props.history.push('/findcollocutor/choicer') }>
              <span> anew </span>
            </button>
            <button className={css.warn} 
                    onClick={ () => {
                      
                      socket.emit('warn', { ID: null }, (dt: boolean) => {
                        
                        if (dt) alert(' WARNING ACCEPT ')
                        else alert(' Failed ')
                      })

                    }}>
              <span> ! </span>
            </button>
            <button className={css.exit} title='Exit to profile'
                    onClick={ () => props.history.push('/profile') }>
              <span> &times; </span>
            </button>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default Choicer
