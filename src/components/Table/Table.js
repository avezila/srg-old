import React, { Component, PropTypes } from 'react'
import {ProgressBar} from 'react-bootstrap'

import s from './Table.sass'


class Table extends Component {
  constructor () {
    super()
    this.state = {progress : this.getProgress()};
  }
  getProgress (){
    return Math.sin((new Date().getTime())*2/1000)*100/2+50;
  }
  componentWillUnmount (){
    clearInterval(this.timer)
  }
  componentWillMount (){
    this.timer = setInterval((()=>{
      this.setState({progress:this.getProgress()});
    }).bind(this),50)
  }
  render () {
    return (
      <div className={s.root}>
        <div className={s.content}>
          Table
          <ProgressBar active now={this.state.progress} />
         </div>
      </div>
    )
  }
}

export default Table
