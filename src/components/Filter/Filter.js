import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {form, FormGroup,FormControl,ControlLabel,HelpBlock} from "react-bootstrap"

import {Nano} from 'components'
import {filterChange} from 'actions'
import s from './Filter.sass'


@connect(state =>({
  filter : state.app.filter,
}), {filterChange})
class Filter extends Component {
  onChange (e){
    this.props.filterChange({filter:{input:e.target.value}})
  }
  render () {
    return (
      <Nano className={s.root}>
        <FormControl
          autoFocus={true}
          type="text"
          value={this.props.filter.input}
          placeholder="Large text"
          onChange={::this.onChange} />
      </Nano>
    )
  }
}

export default Filter