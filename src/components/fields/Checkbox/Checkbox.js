import React, { Component, PropTypes } from 'react'
import {Checkbox as RBCheckbox} from "react-bootstrap"

import s from "./Checkbox.sass"


class Checkbox extends Component {
  onChange (select){
    this.props.onChange(select)
  }
  render () {
    return (
      <RBCheckbox className={s.root}><div className={s.title}>{this.props.title}</div></RBCheckbox>
    )
  }
}

export default Checkbox
