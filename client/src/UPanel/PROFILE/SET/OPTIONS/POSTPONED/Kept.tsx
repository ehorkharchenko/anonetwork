import React from 'react'
import css from './Kept.module.css'

function Kept () {

  // const stories = null

  const stories: any =
  [
    { __SId: 0, short: '..', history: '.. ...' },
    { __SId: 1, short: '..', history: '.. ...' }
  ]

  const Stories = () => {

    if (stories === null) {

      return (
        <div className={css.anystories}>
          <span> You haven't postponed any stories </span>
        </div>
      )

    } else {

        return stories.map( (story: any) => {

          return (
            <div className={css.story}>
              <div className={css.shortstory}> {stories.short} </div>
              <button> Read more </button>
            </div>
          )

        })

      }
  }

  return (
    <div className={css.area}>
      <Stories />
    </div>
  )
}

export default Kept
