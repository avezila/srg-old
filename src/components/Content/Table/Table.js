import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Table.sass'

import {Link} from 'react-router'
import {OfferWide} from 'components'
import RBTable from 'react-bootstrap/es/Table'
import vars from 'styles/global.var.scss'

@connect(({cian})=>({
  offers : cian.offers,
  offerIDs : cian.offerIDs,
}),null,null,{withRef:true})
class Table extends Component {
  componentDidUpdate (){
    this.props.update()
  }
  render () {
    let {offers,offerIDs=[]} = this.props;
    let start = Math.floor((this.props.scroll-500)/vars.tableRowHeight);
    let end   = Math.floor((this.props.scroll+2500)/vars.tableRowHeight);
    let rows = [];
    offerIDs.filter(id=>offers[id]).map((id,i)=>{
      if(i<start || i > end)return;
      rows.push(<OfferWide key={id} offer={offers[id]} style={{top:vars.tableRowHeight*i}}/>);
    })

    return (
      <div className={s.root} style={{height:vars.tableRowHeight*rows.length}}>
        {(rows.length)? rows : ""}
      </div>
    )
  }
}

export default Table