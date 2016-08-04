import React, { Component, PropTypes } from 'react'
import s from './Header.sass'

import {Link} from 'react-router'


class Header extends Component {
  render () {
    const links = [
      {pathname : '/', display : 'map'},
      {pathname : '/table', query : {jwt : "asdcv23"}, display : "table"}
    ].map((l,i) =>
      <Link key={i} className={s.link} to={l}>{l.display}</Link>
    )
    return (
      <div className={s.root}>
        <div className={s.text}>Банк Оценщик</div>
        {links}
      </div>
    )
  }
}

export default Header
