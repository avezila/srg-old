import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Content.sass'

import {Link,Route} from 'react-router'

import Table from './Table'
import {OfferFull} from 'components'
import {changeLayout,tableScroll} from 'actions'

import vars from 'styles/global.var.scss'

const TimerDT = 500;

@connect(({router,cian})=>({
  pathname : router.location.pathname,
  layout : cian.layout,
  scroll : cian.tableScroll
}),{changeLayout,tableScroll})
class Content extends Component {
  update (){
    this.refs.nano.update();
  }
  componentWillUnmount (){
    this.props.changeLayout({center:[0,0]});
  }
  onChange (){
    if(!this.refs.nano)return;
    this.props.changeLayout({center:[0,this.refs.nano.height()]});
  }

  onScroll (){
    if(!this.timer){
      this.time = new Date().getTime();
      this.timer = setTimeout(::this.onTimer,TimerDT);
    }
  }
  onTimer (){
    let time = new Date().getTime();
    let dt = time - this.time;
    if(dt<TimerDT)
      return this.timer = setTimeout(::this.onTimer,TimerDT-dt)
    this.timer = undefined;
    this.props.tableScroll({scroll:this.refs.nano.scrollTop()})
  }
  render () {
    let {left,right} = this.props.layout;
    let style = {
      left  : left[0]+vars.gutter*2,
      right : right[0]+vars.gutter*2,
    }
    return (
      <Nano onScroll={::this.onScroll} onChange={::this.onChange} ref="nano" byContent={true} className={s.root} style={style}>
        <Link className={s.remove} to="/map">×</Link>
        {
          this.props.pathname.match('table')?  (<Table     scroll={this.props.scroll} ref="content" update={::this.update}/>) :
          this.props.pathname.match('offer-')? (<OfferFull ref="content" update={::this.update}/>) : undefined
        }
      </Nano>
    )
  }
}
//<Route path="/table"   component={Table} />

export default Content