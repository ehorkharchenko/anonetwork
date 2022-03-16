import React from 'react'
import css from './Entry.module.css'

import { Route } from 'react-router-dom'
import Marks from './Marks/Marks'

function Entry (props: any) {
  
  const to = (url: string) => {

    props.history.push(url)
  } 

  return (
    <>
      <div className={css.header}>
        <h1> Help </h1>
        <button className={css.terms}
                onClick={to.bind(null, '/terms-of-use')}>
          <span> terms </span>
        </button>
      </div>
      <div className={css.content}>
        <Route exact path='/'>
          <div>
            <h2> Join </h2>
            <ul className={css.list}>
              <li> 
                <span onClick={to.bind(null, '/mark/how-to-join-at-shomi')}> How to join at Shomi ?  </span>
              </li>
              <li>
                <span> About Shomi </span>
              </li>
            </ul>
            <h2> Login </h2> 
            <ul className={css.list}>
              <li>
                <span>
                  How to LOGIN in the Shomi ?
                </span>
              </li>
              <li>
                <span>
                  How to LOGIN with Free choice <br /> 
                  account in the Shomi ? 
                </span>
              </li>
              <li>
                <span> How to recover secure key to Shomi ? </span>
              </li>
            </ul>
            <h2> Profile </h2>
            <ul className={css.list}>
              <li>
                <span> How to change username in Shomi ? </span>
              </li>
              <h3> My friends </h3>
              <ul className={css.sublist}>
                <li>
                  <span> What are "My friends" ? </span>
                </li>
                <li>
                  <span>
                    How to ADD a friend to "My friends" ?
                  </span>
                </li>
                <li>
                  <span>
                    How DELETE a friend from "My Friends" ?
                  </span>
                </li>
              </ul>
              <h3> Set </h3>
              <ul className={css.sublist}>
                <li>
                  <span> Anonymity </span>
                </li>
                <li>
                  <span> Security </span>
                </li>
                <li>
                  <span> Kept </span>
                </li>
                <li>
                  <span> My data </span>
                </li>
              </ul>
            </ul>
            <h2> Socialize </h2>
            <ul className={css.list}>
              <li>
                <span>
                  How to find collocutor ?
                </span>
              </li>
              <li>
                <span>
                  What does the "Share" button do ?
                </span>
              </li>
            </ul>
            <h2> Live </h2>
            <ul className={css.list}>
              <li>
                <span> What is "LIVE" ? </span>
              </li>
              <li>
                <span>
                  What's the difference between "Fresh" and "HOT" ?
                </span>
              </li>
              <li>
                <span>
                  How to publish mark or story ?
                </span>
              </li>
              <li>
                <span>
                  What's the difference between publications <br />
                  type "mark" and "story" ?
                </span>
              </li>
            </ul>
            <div className={css.by}>
              <span> Created by Shomi </span>
            </div>
          </div>
        </Route>
        <Route path='/mark' component={Marks} />
      </div>
    </>
  )
}

export default Entry
