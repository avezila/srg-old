import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

import {changeFavorite,addOfferToReport} from "actions"
import s from './OfferShort.sass'

@connect(({cian}) =>({
  favoriteIDs : cian.context.favoriteIDs,
  addedOfferIDs : cian.context.enviroment&&cian.context.enviroment.addedOfferIDs,
}), {changeFavorite,addOfferToReport})
class OfferShort extends Component {
  render (){
    let {offer,favoriteIDs,changeFavorite,addedOfferIDs=[],addOfferToReport} = this.props;

    return (
      <div className={s.root}>
        <Link className={s.background} to={"offer-"+offer.id} />
        <Link to={"offer-"+offer.id}>
          <strong>{offer.id}</strong>
        </Link>
        <Glyphicon 
          className={s.glyph+ ((favoriteIDs.indexOf(offer.id)<0)?"":" "+s.active) }
          onClick={()=> changeFavorite({
            favoriteIDs : {
              [offer.id]: favoriteIDs.indexOf(offer.id)<0,
            }, 
          })}
          glyph="star"  />
        <Glyphicon 
          className={s.glyph+ ((addedOfferIDs.indexOf(offer.id)<0)?"":" "+s.active) }
          onClick={()=> addOfferToReport({
            id : offer.id,
          })}
          glyph="plus"  />
      </div>
    )
  }
}

export default OfferShort;