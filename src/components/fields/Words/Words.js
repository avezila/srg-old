import React, { Component, PropTypes } from 'react'
import {FormGroup,FormControl,InputGroup} from "react-bootstrap"

import "./ReactTags.scss"
import s from "./Words.sass"
import { WithContext as ReactTags } from 'react-tag-input';


class Words extends Component {
  handleDelete(i) {
    let tags = this.to(this.props.value.data);
    tags.splice(i, 1);
    this.props.onChange(this.from(tags));
  }
  to (val=[]){
    return val.map((v,i)=>({id:i,text:v}))
  }
  from (val=[]){
    return val.map(v=>v.text)
  }
  handleAddition(tag) {
    let tags = this.to(this.props.value.data);
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.props.onChange(this.from(tags));
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.to(this.props.value.data);

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.props.onChange(this.from(tags));
  }
  render () {
    return (
      <ReactTags
        placeholder=""
        tags={this.to(this.props.value.data)}
        handleDelete={::this.handleDelete}
        handleAddition={::this.handleAddition}
        handleDrag={::this.handleDrag}
        handleInputBlur={::this.handleAddition}
        autofocus={false}
        autocomplete={false}
      />
    )
  }
}

export default Words
