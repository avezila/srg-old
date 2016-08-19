import React, { Component, PropTypes } from 'react'
import RBPopover from "react-bootstrap/es/Popover"

import {OfferShort,Nano} from "components"
import s from './Popover.sass'


class Popover extends Component {
  render (){
    let title = this.props.offers[0].rawAddress;
    return (
      <RBPopover
        className={s.root}
        placement="top"
        title={title}
        id="popover-basic" >
        <Nano className={s.content}>
          {this.props.offers.map(o=>(
            <OfferShort key={o.id} offer={o} />
          ))}
        </Nano>
      </RBPopover>
    )
  }
}

export default Popover;