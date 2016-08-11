import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Alert,Panel,Accordion,Well,Collapse} from "react-bootstrap"

import {Nano} from 'components'
import {removeError} from 'actions'
import s from './Errors.sass'


@connect(({cian}) =>({
  errors : cian.errors,
}), {removeError})
class Errors extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }
  handleAlertDismiss (i){
    this.props.removeError({id:i})
  }
  render () {
    return (
      <div className={s.root}>
        {this.props.errors.map((it,i)=>(
          <Alert className={s.item} key={i} bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this,i)}>
            <div className={s.item_title} onClick={()=> this.setState({ id: this.state.id!==i && i })}>
            <strong>{(it.type||"") + " ERROR"}</strong> {it.msg ||""}
            </div>
            {(it.e && (it.e.message || it.e.stack))? (
              <Collapse in={this.state.id===i}>
                <pre className={s.item_inner}>
                 {`${it.e.stack}`}
                </pre>
              </Collapse>
            ): undefined }
          </Alert>
        ))}
      </div>
    )
  }
}

export default Errors
