import React, { Component, PropTypes } from 'react'
import s from './Header.sass'


export const Header = () => (
  <div className={s.root}>
    <div className={s.text}>Банк Оценщик</div>
  </div>
)

export default Header
