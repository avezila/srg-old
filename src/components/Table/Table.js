import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {ProgressBar,Table as BTable} from 'react-bootstrap'

import {Nano} from 'components'
import s from './Table.sass'

@connect(({app})=>({
  offers : app.offers,
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