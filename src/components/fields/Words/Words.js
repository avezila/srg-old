import React, { Component, PropTypes } from 'react'

import "./ReactTags.scss"
import s from "./Words.sass"
import { WithContext as ReactTags } from 'react-tag-input/lib/ReactTags';


const TimerDT = 200;

class Words extends Component {
  constructor (props){
    super(props)
    this.state = {
      value : this.to(props.value.data),
    };
  }
  componentWillReceiveProps (props){
    this.setState({
      value : this.to(props.value.data),
    })
  }
  onChange (tags){
    this.setState({
      value : tags,
    });
    
    this.time = new Date().getTime();
    if(!this.timer)
      this.timer = setTimeout(::this.onTimer,TimerDT);
  }
  onTimer (){
    let time = new Date().getTime();
    let dt = time - this.time;
    if(dt<TimerDT)
      return this.timer = setTimeout(::this.onTimer,TimerDT-dt);
    this.timer = undefined;

    this.props.onChange(this.from(this.state.value));
  }
  handleDelete(i) {
    let tags = this.state.value;
    tags.splice(i, 1);
    this.onChange(tags);
  }
  to (val=[]){
    return val.map((v,i)=>({id:i,text:v}))
  }
  from (val=[]){
    return val.map(v=>v.text)
  }
  handleAddition(tag) {
    let tags = this.state.value;
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.onChange(tags);
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.value;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.onChange(tags);
  }
  render () {
    return (
      <ReactTags
        placeholder=""
        tags={this.state.value}
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
