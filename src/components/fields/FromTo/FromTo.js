import React, { Component, PropTypes } from 'react'
import {FormGroup,FormControl,InputGroup} from "react-bootstrap"

import s from "./FromTo.sass"

let Addon = InputGroup.Addon

class FromTo extends Component {
  onChange (select){
    this.props.onChange(select)
  }
  render () {
    return (
      <FormGroup className={s.form_group}>
        <InputGroup className={s.input_group}>
          <Addon>от</Addon>
          <FormControl type="text" />
        </InputGroup>
        <InputGroup className={s.input_group}>
          <Addon>до</Addon>
          <FormControl type="text" />
        </InputGroup>
      </FormGroup>
    )
  }
}

export default FromTo
