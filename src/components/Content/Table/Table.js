import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Table.sass'

import {Link} from 'react-router'
import {OfferWide} from 'components'
import RBTable from 'react-bootstrap/es/Table'

@connect(({cian})=>({
  offers : cian.offers,
  offerIDs : cian.offerIDs,
}))
class Table extends Component {
  constructor (props){
    super(props)
  }
  componentDidUpdate (){
    this.props.update()
  }
  render () {
    let {offers,offerIDs=[]} = this.props;
    let rows = offerIDs.filter(id=>offers[id]).map((id)=>(
      <OfferWide key={id} offer={offers[id]} />
    ))

    return (
      <div className={s.root}>
        <Link className={s.remove} to="/map">×</Link>
        <RBTable 
          //striped 
          bordered 
          //condensed 
          hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Адрес</th>
              <th>Тип</th>
              <th>Под тип</th>
              <th>цена</th>
            </tr>
          </thead>
          <tbody>
            {(rows.length)? rows : ""}
          </tbody>
        </RBTable>
      </div>
    )
  }
}

export default Table