import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {Nano} from 'components'
import s from './Content.sass'

import {Link,Route} from 'react-router'

import Table from './Table'
import {OfferFull} from 'components'


@connect(({router})=>({
  pathname : router.location.pathname,
}))
class Content extends Component {
  update (){
    this.refs.nano.update();
  }
  render () {
    return (
      <Nano ref="nano" byContent={true} className={s.root}>
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