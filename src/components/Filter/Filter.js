import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {form, FormGroup,FormControl,ControlLabel,HelpBlock} from "react-bootstrap"


import {Nano} from 'components'
import {filterChange} from 'actions'
import s from './Filter.sass'

import _ from "lodash"

import {Multiselect,FromTo,Checkbox,Words} from "components/fields"


@connect(({cian}) =>({
  filter : cian.filter,
}), {filterChange})
class Filter extends Component {
  onChange (field,value){
    let nf = {
      ...this.props.filter,
    }
    _.set(nf,field,value);

    this.props.filterChange(nf)
  }
  SubTitle  (title,key){
    return (
      <div key={"t:"+key} className={s.row}>
        <div  className={s.subtitle}>{title}</div>
      </div>
    )
  }
  Multiselect  (val,key){
    return (
      <div key={"m:"+key} className={s.row}>
        <Multiselect value={val} onChange={this.onChange.bind(this,key)} />
      </div>
    )
  }
  FromTo  (val,key){
    return (
      <div key={"ft:"+key} className={s.row}>
        <FromTo value={val} onChange={this.onChange.bind(this,key)} />
      </div>
    )
  }
  Checkbox (val,key){
    return (
      <div key={"cb:"+key} className={s.row}>
        <Checkbox value={val} onChange={this.onChange.bind(this,key)} />
      </div>
    )
  }
  Words (val,key){
    return (
      <div key={"w:"+key} className={s.row}>
        <Words value={val} onChange={this.onChange.bind(this,key)} />
      </div>
    )
  }
  render () {
    let fields = cian.FilterToFields(this.props.filter)
    let form = [];
    
    for (let key in fields){
      let o = _.get(fields,key)//fields[key];
      if(o.hide)
        continue;
      if(o.title)
        form.push(this.SubTitle(o.title,key));
      if(o.multiselect)
        form.push(this.Multiselect(o.multiselect,key));
      else if (o.fromto)
        form.push(this.FromTo(o.fromto,key));
      else if (o.checkbox)
        form.push(this.Checkbox(o.checkbox,key));
      else if (o.words)
        form.push(this.Words(o.words,key));
    }
    

    return (
      <Nano className={s.root}>
        {form}
      </Nano>
    )
  }
}

export default Filter
