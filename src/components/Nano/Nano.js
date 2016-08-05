import React, { Component, PropTypes } from 'react'
import 'nanoscroller/bin/css/nanoscroller.css'
import 'nanoscroller/bin/javascripts/jquery.nanoscroller.js'
import s from './Nano.sass'

class Nano extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  async nano (flush){
    await Promise.delay(0)
    $(this.refs.nano).nanoScroller();
  }
  componentDidMount (){
    this.nano()
  }
  componentDidUpdate (){
    this.nano()
  }
  componentWillUnmount (){
    $(this.refs.nano).nanoScroller({destroy:true});
  }
  render () {
    return (
      <div ref="nano" className={s.nano+" nano"}>
        <div className={s.content+" nano-content"}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nano
