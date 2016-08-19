import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

import {changeFavorite,addOfferToReport} from "actions"
import s from './OfferWide.sass'
import * as Cian from "const/Cian"


@connect(({cian,router}) =>({
  favoriteIDs : cian.context.favoriteIDs,
  addedOfferIDs : cian.context.enviroment&&cian.context.enviroment.addedOfferIDs,
}), {changeFavorite,addOfferToReport})
class OfferWide extends Component {
  render (){
    let {offers,offer,favoriteIDs,changeFavorite,addedOfferIDs=[],addOfferToReport} = this.props;

    return (
      <tr>
        <td>
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
          <strong className={s.id}>{"#"+offer.id}</strong>
        </td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>

    )
  }
}

      // <div className={s.root}>
      //   <div className={s.title}>
      //     <div className={s.hash}>
      //       <Glyphicon 
      //         className={s.glyph+ ((favoriteIDs.indexOf(offer.id)<0)?"":" "+s.active) }
      //         onClick={()=> changeFavorite({
      //           favoriteIDs : {
      //             [offer.id]: favoriteIDs.indexOf(offer.id)<0,
      //           }, 
      //         })}
      //         glyph="star"  />
      //       <Glyphicon 
      //         className={s.glyph+" "+s.glyph_plus+ ((addedOfferIDs.indexOf(offer.id)<0)?"":" "+s.active) }
      //         onClick={()=> addOfferToReport({
      //           id : offer.id,
      //         })}
      //         glyph="plus"  />
      //       <strong className={s.small+" "+s.id}>{"#"+offer.id}</strong>
      //     </div>
      //     <div className={s.big}>{offer.rawAddress}</div>
      //     <div className={s.small}>{Cian.OfferType.map(offer.type)}</div>
      //     <div className={s.small}>{Cian.RealtyType.map(offer.realtyType)}</div>
      //   </div>
      // </div>
export default OfferWide;