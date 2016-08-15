import React, { Component, PropTypes, Children } from 'react'
import {connect} from 'react-redux'

import {addError} from 'actions'


import * as types from "lib/TypeSystem"
global.t = types;

import * as cian from "const/Cian"
global.cian = cian;

import Api from 'saga/Cian'
global.Api = Api


let requests = {
  getOffers : {
    offerIDs : ["2","32","334"],
  },
  updateContext : {
    context : cian.Context({
      favoriteIDs : ["2","32","334"],
      enviroment : JSON.stringify({
        page : "/map",
      })
    })
  },
  ymaps : {
    query : "geocode=Тверская+6",
  },
  addOfferToReport : {
    offerID : "32",
  }
}


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
      (async function (key){
        let request = {
          token:"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkc2FkcyIsImV4cCI6OTAwMDAwMTQ3MDgzMjc5N30.nARQ90Cf0nJqZFFp3a-LN9HY9sqb6m2c6cA1KQarUXE",
          ...(requests[key]||{}),
        };
        let result = await Api[key](request)
        console.log(`${key}() `,result);
        if(result.error.type){
          this.props.addError({error : result.error})
        }
      }).bind(this,key)().done()
    }
  }
  render (){
    return Children.only(this.props.children);
  }
}

export default TestApi;
