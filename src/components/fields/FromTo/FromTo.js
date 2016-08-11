import React, { Component, PropTypes } from 'react'
import {FormGroup,FormControl,InputGroup} from "react-bootstrap"

import s from "./FromTo.sass"


class FromTo extends Component {
  onChange (select){
    this.props.onChange(select)
  }
  render () {
    return (
      <FormGroup className={s.form_group}>
        <InputGroup className={s.input_group}>
          <InputGroup.Addon>от</InputGroup.Addon>
          <FormControl type="text" />
        </InputGroup>
        <InputGroup className={s.input_group}>
          <InputGroup.Addon>до</InputGroup.Addon>
          <FormControl type="text" />
        </InputGroup>
      </FormGroup>
    )
  }
}

export default FromTo
