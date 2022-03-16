import React, { useEffect, useState } from 'react'
import css from './Find.module.css'

import edit_icon from '../../media/edit.svg'

import { Switch, Route } from 'react-router-dom'

import loader from '../../media/loader200px.svg'

import Preference from './Preference/Pref'
import Choicer from './Choicer/Choice'

import FMenu from '../FMenu/Menu'
import io from 'socket.io-client'
import { Helmet } from 'react-helmet'

const socket: any = io('http://localhost:3650')

function Default (props: any) {
  
  const [ online, setOnline ]: any = useState(null)
  
  const [ data, setData ]: any = useState(null)
  
  const View = () => {
    
    if (data === null) {
      
      const getdata: object = {
        '_id': sessionStorage.ProfileID,
        'key': 'find'
      }

      socket.emit('get', getdata, function (reply: any): void {

        setData(reply)
      })

    }

    const Join = (): JSX.Element => {
      
      return (
        <div className={css.join__area}>
            <div className={css.join__head}>
              <button className={css.join}
                      onClick={ () => props.history.push('/findcollocutor/choicer') }>
                <span className={css.innerJoin}> Join </span>
              </button>
              <span className={css.to}> to&nbsp; online </span>
            </div>
            <div className={css.footer}>
              <div className={css.mark}>
                <span className={css.innerMark}> online </span>
              </div>
              <div className={css.onlNum}>
                {
                  (online !== null && typeof online === 'number') ? 
                  ( <span className={css.onlNumInner}> {online} </span> ): 
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
              </div>
            </div>
        </div>
      )
    }
  
    const TempBan = (): JSX.Element => {
      
      const [ timeLeft, setTimeLeft ]: any = useState({ hours: 2, minutes: 0, seconds: 0 })

      useEffect( function () {

        if (timeLeft.minutes === 0) {
          
          timeLeft.hours--
          timeLeft.minutes = 60
        }

        if (timeLeft.seconds === 0) {
          
          timeLeft.minutes--
          timeLeft.seconds = 60
        }

        timeLeft.seconds--

        setTimeout( () => {

          setTimeLeft({
            hours: timeLeft.hours,
            minutes: timeLeft.minutes,
            seconds: timeLeft.seconds
          })

        }, 1000)

      })

      return (
        <div className={css.tempban}>
          <div className={css.ban_label}> communication &nbsp; delay </div>
          <div className={css.ban_timer}>
            <div className={css.ban_timer_item}>
              <span>
                { 
                  (9 > timeLeft.hours) ? `0${timeLeft.hours}`: timeLeft.hours 
                }
              </span>
            </div>
            <span className={css.ban_timer_separator}> : </span>
            <div className={css.ban_timer_item}>
              <span>
                {
                  (9 > timeLeft.minutes) ? `0${timeLeft.minutes}`: timeLeft.minutes 
                }
              </span>
            </div>
            <span className={css.ban_timer_separator}> : </span>
            <div className={css.ban_timer_item}>
              <span>
                {
                  (9 > timeLeft.seconds) ? `0${timeLeft.seconds}`: timeLeft.seconds 
                }
              </span>
            </div>
          </div>
        </div>
      )
    }

    if (data !== null && (data.ban === null || data.ban === false ))  
      return <Join />

    else if (data !== null && typeof data.ban === 'object')
      return <TempBan />

    else
      return (
        <img className={css.loaderGetData} src={loader} alt='load' />
      )
  }
  

  return (
    <div className={css.area}>
      <Helmet>
        <title> Find&ensp;•&ensp;Shomi </title>
      </Helmet>
      <div className={css.head}>
        <span> BEGIN 	&nbsp; SOCIALIZE </span>
        <Route exact path='/findcollocutor'>
          <button className={css.editFindPref}
                  onClick={ () => props.history.push('/findcollocutor/pref') }>
            <img src={edit_icon} alt="edit find preferences" />
          </button>
        </Route>
      </div>
      <Route exact path='/findcollocutor'>
        <>
          <View />
          <FMenu />
        </>
      </Route>
      <Route exact path='/findcollocutor/choicer' component={Choicer} />
    </div>
  )
}

function FindCollocutor () {

  return (
    <Switch>
      <Route exact path='/findcollocutor' component={Default} />
      <Route exact path='/findcollocutor/choicer' component={Default} />
      <Route exact path='/findcollocutor/pref' render={Preference} />
      <Route exact path='/findcollocutor/session' component={Choicer} />
      <Route exact path='/findcollocutor/end__session' component={Choicer} />
    </Switch>
  )

}

export default FindCollocutor
