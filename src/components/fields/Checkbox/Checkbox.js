import React, { Component, PropTypes } from 'react'
import RBCheckbox from "react-bootstrap/es/Checkbox"

import s from "./Checkbox.sass"

const TimerDT = 200;

class Checkbox extends Component {
  constructor (props){
    super(props)
    this.state = {
      value : props.value.data == true,
    }
  }
  onChange (e){
    this.setState({
      value : e.target.checked == true,
    });
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
    this.props.onChange(this.state.value || undefined)
  }
  componentWillReceiveProps (props){
    this.setState({
      value : props.value.data == true,
    });
  }
  render () {
    return (
      <RBCheckbox 
        checked={this.state.value}
        onChange={::this.onChange}
        className={s.root}>
        <div className={s.title}>{this.props.value.title}</div>
      </RBCheckbox>
    )
  }
}

export default Checkbox
