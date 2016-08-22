import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Content.sass'

import {Link,Route} from 'react-router'

import Table from './Table'
import {OfferFull} from 'components'
import {changeLayout} from 'actions'

import vars from 'styles/global.var.scss'

@connect(({router,cian})=>({
  pathname : router.location.pathname,
  layout : cian.layout,
}),{changeLayout})
class Content extends Component {
  update (){
    this.refs.nano.update();
  }
  componentWillUnmount (){
    this.props.changeLayout({center:[0,0]});
  }
  onChange (){
    this.props.changeLayout({center:[0,this.refs.nano.height()]});
  }
  render () {
    let {left,right} = this.props.layout;
    let style = {
      left  : left[0]+vars.gutter*2,
      right : right[0]+vars.gutter*2,
    }
    return (
      <Nano onChange={::this.onChange} ref="nano" byContent={true} className={s.root} style={style}>
        {
          this.props.pathname.match('table')?  (<Table      update={::this.update}/>) :
          this.props.pathname.match('offer-')? (<OfferFull  update={::this.update}/>) : undefined
        }
      </Nano>
    )
  }
}
//<Route path="/table"   component={Table} />

export default Content