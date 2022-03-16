import React from 'react'
import css from './Pref.module.css'

function Pref (props: any) {
  //  alert(' This is hide function ')
   
   const ChooseItem = (props: any) => {

     return (
       <div className={css.chooseitem}>
         <input checked={props.checked} name={props.first} type='radio' />
         <span> {props.text} </span>
         <input checked={props.checked} name={props.second} type='radio' />
       </div>
     )
   }

  return (
    <div className={css.area}>
      <div className={css.panel}>
        <div className={css.sex}>
          <div className={css.point}>
            <span> SEX </span>
          </div>
          <div className={css.sex_you_label}>
            <span> You </span>
          </div>
          <div className={css.sex_chooseboxes}>
            <ChooseItem first='you' second='collocutor' text='Male' checked='none' />
            <ChooseItem first='you' second='collocutor' text='Female' checked='none' />
            <ChooseItem first='you' second='collocutor' text='Someone' checked='checked' />
          </div>
          <div className={css.sex_anonym_label}>
            <span> Anonym </span>
          </div>
        </div>
        <div className={css.other}>
          <div className={css.point}>
            <span> Other Preference </span>
          </div>
          <div>
            <span> LANGUAGE </span>
            <select>
              <option> English </option>
              <option> Russian </option>
              <option> Ukranian </option>
            </select>
          </div>
        </div>
        <div className={css.type}>
          <div className={css.point}>
            <span> TYPE </span>
          </div>
          <div className={css.type_text}>
            <input name='type' type='radio' />
            <span> Text </span>
          </div>
          <div className={css.type_voice}>
            <input name='type' type='radio' />
            <span> Voice </span>
          </div>
          <div className={css.type_bot}>
            <input name='type' type='radio' />
            <span> Bot </span>
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <button className={css.cancel}
                onClick={ () => props.history.push('/findcollocutor') }> cancel </button>
        <button className={css.edit}> Set </button>
      </div>
    </div>
  )

}

export default Pref
