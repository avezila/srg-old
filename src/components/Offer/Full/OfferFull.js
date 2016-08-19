import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Glyphicon from 'react-bootstrap/es/Glyphicon'
import {goBack} from 'redux-router'

import {changeFavorite,addOfferToReport} from "actions"
import s from './OfferFull.sass'
import * as Cian from "const/Cian"


@connect(({cian,router}) =>({
  favoriteIDs : cian.context.favoriteIDs,
  addedOfferIDs : cian.context.enviroment&&cian.context.enviroment.addedOfferIDs,
  id     : router.params.splat,
  offers : cian.offers,
}), {changeFavorite,addOfferToReport,goBack})
class OfferFull extends Component {
  componentDidUpdate (){
    this.props.update()
  }
  render (){
    let {offers,id,favoriteIDs,changeFavorite,addedOfferIDs=[],addOfferToReport} = this.props;
    let offer =  offers[id];
    if(!offer)
      return <div className={s.root} />;
    return (
      <div className={s.root}>
        <div className={s.title}>
          <div className={s.hash}>
            <Glyphicon 
              className={s.glyph+ ((favoriteIDs.indexOf(offer.id)<0)?"":" "+s.active) }
              onClick={()=> changeFavorite({
                favoriteIDs : {
                  [offer.id]: favoriteIDs.indexOf(offer.id)<0,
                }, 
              })}
              glyph="star"  />
            <Glyphicon 
              className={s.glyph+" "+s.glyph_plus+ ((addedOfferIDs.indexOf(offer.id)<0)?"":" "+s.active) }
              onClick={()=> addOfferToReport({
                id : offer.id,
              })}
              glyph="plus"  />
            <strong className={s.small+" "+s.id}>{"#"+offer.id}</strong>
          </div>
          <div className={s.big}>{offer.rawAddress}</div>
        </div>
        <div className={s.row}>
          <div className={s.small}>{Cian.OfferType.map(offer.type)}</div>
          <div className={s.small}>{Cian.RealtyType.map(offer.realtyType)}</div>
        </div>
        <div className={s.remove} onClick={::this.props.goBack}>×</div>
      </div>
    )
  }
}

export default OfferFull;