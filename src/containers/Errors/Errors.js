import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Alert,Panel,Accordion,Well,Collapse} from "react-bootstrap"

import {Nano} from 'components'
import {removeError} from 'actions'
import s from './Errors.sass'
import StackTrace from "stacktrace-js"



@connect(({cian}) =>({
  errors : cian.errors,
}), {removeError})
class Errors extends Component {
  constructor(...args) {
    super(...args);
    this.stack = {};
    this.state = {};
  }
  handleAlertDismiss (i){
    this.props.removeError({id:i})
  }

  render () {
    let errs = [];
    for(let i = 0; i < this.props.errors.length;i++){
      let it = this.props.errors[i];
      let stack = "";
      if (it&&it.e&&it.e.stack){
        stack = ""+it.e.stack;
        if(this.stack[stack])
          stack = this.stack[stack];
        else if(this.stack[stack]!==false){
          this.stack[stack] = false;
          setTimeout(function(it,stack){
            StackTrace.fromError(it.e).then(function(key,e,stackframes){
              this.stack[key] = stackframes.map(function(sf) {
                return sf.toString();
              }).join('\n');
              this.forceUpdate();
            }.bind(this,stack,it.e));
          }.bind(this,it,stack),100);
        }
        stack = it.e.message+"\n\n"+stack; 
      }
      errs.push(
        <Alert className={s.item} key={i} bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this,i)}>
          <div className={s.item_title} onClick={()=> this.setState({ id: this.state.id!==i && i })}>
          <strong>{(it.type||"") + " ERROR"}</strong> {it.msg ||""}
          </div>
          {(it.e && (it.e.message || it.e.stack))? (
            <Collapse in={this.state.id===i}>
              <pre className={s.item_inner}>
              {stack}
              </pre>
            </Collapse>
          ): undefined }
        </Alert>
      );
    }

    return (
      <div className={s.root}>
        {errs}
      </div>
    )
  }
}

export default Errors
