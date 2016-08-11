import React, { Component, PropTypes } from 'react'
import {FormGroup,FormControl,InputGroup} from "react-bootstrap"

import "./ReactTags.scss"
import s from "./Words.sass"
import { WithContext as ReactTags } from 'react-tag-input';


class Words extends Component {
  onChange (select){
    this.props.onChange(select)
  }
	constructor (props) {
    super(props)
    this.state = {
      tags: [],
      suggestions: [],
    }
  }
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }
  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({tags: tags});
  }
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }
  render () {
    return (
      <ReactTags
        placeholder=""
        tags={this.state.tags}
        suggestions={this.state.suggestions}
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
