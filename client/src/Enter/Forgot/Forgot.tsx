import React, { useState } from 'react'
import css from './Forgot.module.css'

import { Switch, Route } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:3650')

const UploadFile = ({ history, get }: any) => {
  
  const [ uploadData, setUploadData ]: any = useState({ wait: false, file: null })

  function submitFile () {
    
    console.log(get)
    const data = {
      ...get,
      'arr': [ 'emergency key', uploadData.file.trim() ]
    }

    console.log(uploadData.file.length)

    socket.emit('compare', data, function (data: boolean) {
          
      if (data) history.push('/forgot/confirm')
    })
  }

  return (
    <div className={css.area}>
      <label htmlFor='fileUpload' className={css.label}>
        <span className={css['select-file']}> SELECT FILE </span>
      </label>
      {
        (!uploadData.wait) ? 
        <input id='fileUpload' type="file" 
               onChange={ (e: any) => {
                 
                 setUploadData( (dt: any) => ({ ...dt, wait: true }) )
                 const reader = new FileReader()
                
                 reader.readAsText(e.target.files[0])
                 reader.onload = function () {
                   
                   const result = reader.result

                   setUploadData({
                     wait: false,
                     file: result
                   })

                 }

               }} />: null
      }
      <button className={css.upload}
              onClick={submitFile.bind(null)}>
         <span className={css.uploadInner}> upload </span>
       </button>
    </div>
  )
}

function ForgotSecureKey ({ getdata }: any) {
  
  const [ data, setData ] = useState({
    current: 1,
    warn: [],
    anonym: undefined
  })

  // const pathname = window.location.pathname

  return (
    <Switch>
      <Route exact path='/forgot/file-upload'> <UploadFile get={getdata} /> </Route>
      <Route path='/forgot/confirm'>
        <div className={css['form-for-recovery']}>
          <Route exact path='/forgot/confirm' render={ props => (
            <>
              <div className={css.inputs}>
                <input className={css.inp} placeholder='enter key' />
                <input className={css.inp} placeholder='confirm key' />
              </div>
              <button   className={css.submit}
                        onClick={ () => {

                          socket.emit('get', )
                        }}>
                <span> confirm </span>        
              </button>
            </>
          )} />
          <Route exact path='/forgot/done' render={ props => (
            <>
              <div></div>
              <button onClick={ () => props.history.push('/') }>
                <span> okey </span>
              </button>
            </>
          )} />
        </div>
      </Route>
    </Switch>
  )
}

export default ForgotSecureKey
