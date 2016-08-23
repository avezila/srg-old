import React, { Component, PropTypes } from 'react'
import RBMultiselect from 'react-bootstrap-multiselect'

import Timeout from 'lib/Timeout'


export default
class Multiselect extends Component {
  static propTypes = {
    value     : PropTypes.object.isRequired,
    onChange  : PropTypes.func.isRequired,
  }
  onChange (){
    Timeout(this.timeout,arguments,50);
  }
  timeout = (option, checked, select)=>{
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
        data={this.props.value.data}
        onChange={::this.onChange}
        ref="select"
        multiple />
    )
  }
}