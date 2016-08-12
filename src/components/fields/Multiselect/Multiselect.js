import React, { Component, PropTypes } from 'react'
import RBMultiselect from 'react-bootstrap-multiselect'



class Multiselect extends Component {
  onChange (option, checked, select){
    let fields = {};
    for (let obj of this.props.value.data)
      if(obj.selected)
        fields[obj.value] = true;
    if(checked)
      fields[option.val()] = true
    else
      delete fields[option.val()]
    fields = Object.keys(fields)
    this.props.onChange(fields)
  }
  render () {
    return (
      <RBMultiselect
        nonSelectedText="Не важно"
        nonSelectedText="Не важно"
        nSelectedText=" выбрано"
        allSelectedText="Все"
        numberDisplayed={2}
        //{...this.props}
        data={this.props.value.data}
        onChange={::this.onChange}
        ref="select"
        multiple />
    )
  }
}

export default Multiselect
