import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {FormGroup,FormControl,InputGroup} from "react-bootstrap"

import {Mask} from "components/fields"
import s from "./FromTo.sass"
import DateTimeField from 'react-bootstrap-datetimepicker'

import "react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" 

let Addon = InputGroup.Addon


let to2 = s=> (""+s).length==1? "0"+s:s


class FromTo extends Component {
  onChange (field,text){
    if(this.props.value.type=="date")
      if(!text.match(/\d\d\d\d-\d\d-\d\d/))
        text = undefined

    let v = {...this.props.value.data,[field]: text }
    this.props.onChange(v)
  }
  getInput (field,pref){
    switch (this.props.value.type){
      case "input":
        return (
          <InputGroup className={s.input_group}>
            <Addon>{pref}</Addon>
            <Mask 
              type={this.props.value.pattern}
              value={this.props.value.data[field]}
              onChange={this.onChange.bind(this,field)} />
          </InputGroup>
        );
      case "date":
        let d = new Date();
        return (
          <InputGroup className={s.input_group_date}>
            <Addon>{pref}</Addon>
            <DateTimeField
              mode="date"
              dateTime={`${d.getFullYear()}-${to2(d.getMonth())}-${to2(d.getDate())}`} 
              format="YYYY-MM-DD"
              ref={"date"+field}
              viewMode="date"
              defaultText={this.props.value.data[field]||""}
              inputFormat="YYYY-MM-DD"
              onChange={this.onChange.bind(this,field)}
              inputProps={{
                onBlur : ((field,e)=> this.onChange(field,e.target.value)).bind(this,field),
                onFocus : (()=> this.refs["date"+field].onClick()).bind(this),
              }}
            />
          </InputGroup>
        )
    }
  }
            //{this.props.value.data[field] || ""}
  render () {
    return (
      <FormGroup className={s.form_group}>       
        {this.getInput("from","от")}
        {this.getInput("to","до")}
      </FormGroup>
    )
  }
}

export default FromTo
