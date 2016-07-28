import React, { Component, PropTypes } from 'react'
import Filter from 'components/Filter'
import YMap from 'components/YMap'
import s from './FilterMap.sass'

class FilterMap extends Component {
  render () {
    return (
      <div className={s.root}>
        <Filter />
        <YMap />
      </div>
    )
  }
}

export default FilterMap


