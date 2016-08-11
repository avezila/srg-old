import React, { Component, PropTypes } from 'react'
import RBMultiselect from 'react-bootstrap-multiselect'



class Multiselect extends Component {
  onChange (select){
    this.props.onChange(select)
  }
  render () {
    return (
      <RBMultiselect
        nonSelectedText="Не важно"
        nonSelectedText="Не важно"
        nSelectedText=" выбрано"
        allSelectedText="Все"
        numberDisplayed={2}
        {...this.props}
        data={this.props.def.data}
        onChange={::this.onChange}
        ref="select"
        multiple />
    )
  }
}

export default Multiselect
