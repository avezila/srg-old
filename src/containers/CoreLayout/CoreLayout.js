import React from 'react'
import Header from 'components/Header'
import s from './CoreLayout.sass'

export const CoreLayout = ({ children }) => (
  <div className={s.root}>
    <div className={s.header}>
      <Header />
    </div>
    <div className={s.content}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
