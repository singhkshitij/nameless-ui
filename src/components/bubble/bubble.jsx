import React, { Component } from "react";
import "./bubble.css";

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div class="discussion">
        
      </div>
    );
  }
}
