import React, { Component, PropTypes } from 'react'
import RBMultiselect from 'react-bootstrap-multiselect'


const TimerDT = 50;

class Multiselect extends Component {
  onChange (...args){
    this.args = args;
    this.time = new Date().getTime();
    if(!this.timer)
      this.timer = setTimeout(::this.onTimer,TimerDT);
  }
  onTimer (){
    let time = new Date().getTime();
    let dt = time - this.time;
    if(dt<TimerDT)
      return this.timer = setTimeout(::this.onTimer,TimerDT-dt)
    this.timer = undefined;
    let [option, checked, select] = this.args;

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
