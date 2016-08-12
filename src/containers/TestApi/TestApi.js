import React, { Component, PropTypes, Children } from 'react'
import {connect} from 'react-redux'

import {addError} from 'actions'


import * as types from "lib/TypeSystem"
global.t = types;

import * as cian from "const/Cian"
global.cian = cian;

import Api from 'saga/Cian'
global.Api = Api




@connect(({cian}) =>({}), {addError})
class TestApi extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  componentDidMount (){
    this.TestApi().done()
  }
  async TestApi(){
    for(let key in Api){
      let request = {token:"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkc2FkcyIsImV4cCI6OTAwMDAwMTQ3MDgzMjc5N30.nARQ90Cf0nJqZFFp3a-LN9HY9sqb6m2c6cA1KQarUXE"};
      let result = await Api[key](request)
      if(result.error.type){
        this.props.addError({error : result.error})
      }
    }
  }
  render (){
    return Children.only(this.props.children);
  }
}

export default TestApi;
