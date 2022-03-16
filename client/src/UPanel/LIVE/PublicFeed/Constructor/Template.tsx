import React from 'react'
import css from './Template.module.css'

function Template ({ publication }: any) {

  if (publication.type === 'theme')
        
    return (
            <div className={css.theme}>
              <div className={css.theme_header}>
                <div className={css.theme_author}>
                  <svg viewBox='0 0 120 120' className={css.theme_icon}>
                    <rect x='10' y='10' rx='20' ry='20' width='100' height='100'
                          fill='rgba(255, 238, 0, 0.9)' />
                    <text x="45" y="85" fill='#c3a720'
                          style={{
                            fontFamily: 'Lemonada',
                            fontWeight: 600,
                            fontSize: '60px' 
                          }}> ? </text>
                  </svg>
                  <div className={css.theme_authorName}> 
                    <span className={css.theme_label_author}> author: &nbsp; </span> 
                    <span> NAMEI </span>
                  </div>
                </div>
                <button className={css.theme_kept}>
                  <span> Kept </span>
                </button>
              </div>
              <div className={css.theme_content}> {publication.text} </div>
              <div className={css.theme_footer}>
              <button className={css.theme_like}>
                <span> + </span>
              </button>
              <div>
                <button> To Yet </button>
              </div>
            </div>
            </div>
          )
  
        else if (publication.type === 'mark')
          return (
            <>
              <div className={css.mark}>
                <div className={css.mark_header}>
                  <svg viewBox='0 0 120 120' className={css.mark_icon}>
                    <rect x='10' y='10' rx='20' ry='20' width='100' height='100'
                          fill='rgba(255, 167, 0, 0.8)' />
                    <text x="45" y="85" fill='#fceac7'
                          style={{
                            fontFamily: 'Lemonada',
                            fontWeight: 600,
                            fontSize: '60px' 
                          }}> ! </text>
                  </svg>
                </div>
                <div className={css.mark_content}> {publication.text} </div>
                <div className={css.mark_footer}>
                  <div>
                    <button className={css.mark_like}></button>
                    <span> 663 </span>
                  </div>
                  <button className={css.mark_reply}>
                    <span> reply </span>
                  </button>
                </div>
              </div>
            </>
          )
                          
        else
          return null
}

export default Template