import React, { Component, PropTypes } from 'react'

import {connect} from 'react-redux'

import s from './Popover.sass'

import RBPopover from "react-bootstrap/es/Popover"


class Popover extends Component {
  row (offer){
    return (
      <div key={offer.id} className={s.row}>
        <strong>{offer.id}</strong>
      </div>
    )
  }
  render (){
    let title = this.props.offers[0].rawAddress;
    return (
      <RBPopover
        className={s.root}
        placement="top"
        title={title}
        id="popover-basic" >
        <div className={s.content}>
          {this.props.offers.map(o=>this.row(o))}
        </div>
      </RBPopover>
    )
  }
}

export default Popover;