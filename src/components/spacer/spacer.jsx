import React, { Component } from "react";

export default class Spacer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: this.props.space,
    };
  }

  render() {
    return <div style={{ height: this.state.space }} />;
  }
}
