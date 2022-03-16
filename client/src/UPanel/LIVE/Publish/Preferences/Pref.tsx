import React from 'react'
import css from './Pref.module.css'

import { Redirect } from 'react-router-dom'

function Preferences (props: any) {
  
  if (props.publicationType === 'history' || 'mark' === props.publicationType) {
    
    if (props.publicationType === 'history') {
      
      return (
        <div className={css.prefHistory}>

        </div>
      )
      
    } else
      return (
        <div className={css.prefMark}>

        </div>
      )

  }
  
}

export default Preferences