import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Table.sass'

@connect(({cian})=>({
  offers : cian.offers,
  offerIDs : cian.offerIDs,
}))
class Table extends Component {
  render () {
    return (
      <Nano className={s.root}>
        {this.props.offerIDs.filter(id=>this.props.offers[id]).map((id,i)=>(
          <div key={id} className={s.row}>
            <div className={s.id}>{id}</div>
            <div className={s.address}>{this.props.offers[id].rawAddress}</div>
          </div>
        ))}
      </Nano>
    )
  }
}

export default Table