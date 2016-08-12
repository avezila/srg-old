import React, { Component, PropTypes } from 'react'
import {Checkbox as RBCheckbox} from "react-bootstrap"

import s from "./Checkbox.sass"


class Checkbox extends Component {
  onChange (e){
    this.props.onChange(e.target.checked || undefined)
  }
  render () {
    return (
      <RBCheckbox 
        checked={this.props.value.data == true}
        onChange={::this.onChange}
        className={s.root}>
        <div className={s.title}>{this.props.value.title}</div>
      </RBCheckbox>
    )
  }
}

export default Checkbox
