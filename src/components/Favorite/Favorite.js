import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

import {Nano,OfferShort} from 'components'
import s from './Favorite.sass'



@connect(({cian}) =>({
  favoriteIDs : cian.context.favoriteIDs,
  offers      : cian.offers,
}))
class Favorite extends Component {
  constructor (props){
    super(props)
    this.state = {open : true}
  }
  render () {
    let {offers,favoriteIDs = []} = this.props;

    let rows = favoriteIDs.filter(id=>offers[id]).map(id=>(
      <OfferShort key={id} offer={offers[id]} />
    ))

    return (
      <Nano ref="root" byContent={true} className={s.root}>
        <div className={s.title} onClick={ ()=> this.setState({ open: !this.state.open })}>
          <span className={s.title_text}>Избранное</span>
          { this.state.open ? <Glyphicon className={s.glyph} glyph="menu-down"  />
                            : <Glyphicon className={s.glyph} glyph="menu-right" /> }
        </div>
        <div className={s.content}>
          {this.state.open ? rows : undefined}
        </div>
      </Nano>
    )
  }
}

export default Favorite
