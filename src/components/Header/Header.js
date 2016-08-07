import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'

import s from './Header.sass'


class Header extends Component {
  render () {
    const links = [
      {pathname : '/map', display : "Карта"},
      {pathname : '/table', display : "Таблица"},
      {pathname : '/403', display : "403"},
      {pathname : '/404', display : "404"},
    ].map((l,i) =>
      <Link key={i} className={s.link} to={l} activeClassName={s.active}>{l.display}</Link>
    )
    return (
      <div className={s.root}>
        <Link className={s.logo} to="/">Банк Оценщик</Link>
        {links}
      </div>
    )
  }
}

export default Header