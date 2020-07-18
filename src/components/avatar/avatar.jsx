import React, { Component } from "react";
import Avatar from 'react-avatar';

export default class Gravatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      size: this.props.size
    };
  }

  render() {
    return (
    <Avatar name={this.state.text} alt={this.state.text}  size={this.state.size} textSizeRatio={1.75} round/>
    );
  }
}
