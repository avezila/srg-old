
import React from 'react'
import s from './Error.sass'


export default Error = (props)=> (
  <div className={s.root}>
    <div className={s.content}>
      <h1 className={s.h1}>{props.title}</h1>
      <p className={s.p}>{props.content}</p>
      {props.message}
    </div>
  </div>
)

