import React, { Component, PropTypes } from 'react'
import s from './Filter.sass'


class Filter extends Component {
  render () {
    return (
      <div className={s.root}>
        <div className={s.title}>
          <div className={s.title__text}>Фильтр</div>
        </div>
      </div>
    )
  }
}

export default Filter
