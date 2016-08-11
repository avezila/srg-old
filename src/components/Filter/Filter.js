import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {form, FormGroup,FormControl,ControlLabel,HelpBlock} from "react-bootstrap"


import {Nano} from 'components'
import {filterChange} from 'actions'
import s from './Filter.sass'


import {Multiselect,FromTo,Checkbox,Words} from "components/fields"


@connect(({cian}) =>({
  filter : cian.filter,
}), {filterChange})
class Filter extends Component {
  onChange (filter){
    console.log(filter)
    //this.props.filterChange({filter:{input:e.target.value}})
  }
  onSelect (...args){
    console.log(...args)
  }
  SubTitle  (title,key){
    return (
      <div key={"t:"+key} className={s.row}>
        <div  className={s.subtitle}>{title}</div>
      </div>
    )
  }
  Multiselect  (m,key){
    return (
      <div key={"m:"+key} className={s.row}>
        <Multiselect def={m} onChange={::this.onChange.bind(key)} />
      </div>
    )
  }
  FromTo  (ft,key){
    return (
      <div key={"ft:"+key} className={s.row}>
        <FromTo {...ft} onChange={::this.onChange.bind(key)} />
      </div>
    )
  }
  Checkbox (cb,key){
    return (
      <div key={"cb:"+key} className={s.row}>
        <Checkbox {...cb} onChange={::this.onChange.bind(key)} />
      </div>
    )
  }
  Words (w,key){
    return (
      <div key={"w:"+key} className={s.row}>
        <Words {...w} onChange={::this.onChange.bind(key)} />
      </div>
    )
  }
  render () {
    let fields = cian.FilterToFields({type:["FLAT","COMMERCIAL"]})
    let form = [];
    console.log(fields)
    for (let key in fields){
      let o = fields[key];
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
    console.log(form)

    return (
      <Nano className={s.root}>
        <FormControl
          autoFocus={true}
          type="text"
          value={this.props.filter.input}
          onChange={::this.onChange} />
        {form}
      </Nano>
    )
  }
}

export default Filter
