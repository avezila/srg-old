import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {FormControl} from "react-bootstrap"


class Mask extends Component {
  constructor (props){
    super(props)
    this.state = {
      value : this.blurReplace(this.editReplace(this.toText(props.value))),
    };
  }
  editReplace (text){
    var c;
    switch (this.props.type){
      case "meter" :
        text = text.replace(/,/g,".")
        text = text.replace(/\s/g,'')
        text = text.replace(/[^\d\.]/g,"")
        let [a,b] = text.split(".").slice(0,2)
        if(!a && !b)
          return "";
        if(!a) a = "0";
        do {
          c = a;
          a = c.replace(/(\d)(\d\d\d(?:\s|$))/g,"$1 $2")
        }while(a != c);
        if(b) b = b.substr(0,2);
        text = [a]
        if(b!==undefined)
          text.push(b)
        return text.join(".");
      case "int" :
        text = text.replace(/\D/g,"")
        do {
          c = text;
          text = c.replace(/(\d)(\d\d\d(?:\s|$))/g,"$1 $2")
        }while(text != c);
        return text;
    }
    return text;
  }
  blurReplace (text){
    switch (this.props.type){
      case "meter" :
        if(text=="") return text;
        let [a,b] = text.split(".")
        if(b == "" || b == undefined) b = "00";
        else if (b.length == 1) b = b+"0";
        return [a,b].join(".");
    }
    return text;
  }
  toText  (val){
    if(val==undefined) return "";
    return ""+val
  }
  fromText (text){
    if (text == "") return undefined;
    switch (this.props.type){
      case "meter":
      case "int":
        text = text.replace(/\s/g,"");
        break;
    }
    return +text;
  }  
  onInput (e){
    let input = e.target;
    let ereplace = this.editReplace(input.value);
    let breplace = this.blurReplace(ereplace);
    let value  = this.fromText(breplace);
    if(value != this.props.value){
      this.edit = true;
      this.props.onChange(value);
      return;
    }else if (this.state.value != ereplace)
      this.setState({value:ereplace});  
    else input.value = ereplace;
    this.edit = true;
  }
  onBlur(){
    let input = ReactDOM.findDOMNode(this.refs.input);
    let ereplace = this.editReplace(input.value);
    let breplace = this.blurReplace(ereplace);
    let value  = this.fromText(breplace);
    if(value != this.props.value){
      this.props.onChange(value);
      return;
    }
    this.setState({value:breplace});
  }
  componentWillReceiveProps (props){
    if(this.edit){
      this.setState({value:this.editReplace(this.toText(props.value))});
    }else {
      this.setState({value:this.blurReplace(this.editReplace(this.toText(props.value)))});
    }
    this.edit = false;
  }
  onChange2 (field,e){
    let text = e.target.value;
    if(text === ""){
      text = undefined;
    }else switch (this.props.value.pattern){
      case "int":
        text = (text.replace(/[,\.].*$/g,"").replace(/\D/g,""))
        break;
      case "meter":
        text = (text.replace(/,/g,".").replace(/[^\d\.]/g,""))
        break;
    }
    this.presave = {};
    if(text===e.target.value){
      this.presave[field] = text;
    }
    if(text !== undefined)
      switch (this.props.value.pattern){
        case "int":
        case "meter":
          text = +text;
          break;
      }
    if(text === "")
      text = undefined;
    let v = {...this.props.value.data,[field]: text }
    this.props.onChange(v)
  }
 
  render () {
    return (
      <input
        className="form-control"
        ref="input"
        value={this.state.value}
        type="text"
        onInput={::this.onInput}
        onBlur={::this.onBlur}
         />
    )
  }
}

export default Mask
