import React, { Component, PropTypes } from 'react'
import Filter from 'components/Filter'
import Table from 'components/Table'


class FilterTable extends Component {
  render () {
    return (
      <div>
        <Filter />
        <Table />
      </div>
    )
  }
}

export default FilterTable
