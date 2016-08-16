import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Table.sass'

@connect(({cian})=>({
  offers : cian.offers,
}))
class Table extends Component {
  render () {
    return (
      <Nano className={s.root}>
        {this.props.offers.map((it,i)=>(
          <div key={i} className={s.row}>{it}</div>
        ))}
      </Nano>
    )
  }
}

export default Table