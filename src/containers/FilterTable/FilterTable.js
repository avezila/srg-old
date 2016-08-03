import React, { Component, PropTypes } from 'react'
import Filter from 'components/Filter'
import Table from 'components/Table'
import s from './FilterTable.sass'

class FilterTable extends Component {
  render () {
    return (
      <div className={s.root}>
        <Filter />
        <Table />
      </div>
    )
  }
}

export default FilterTable
