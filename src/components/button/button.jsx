import React, { Component } from "react";
import "./button.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  style = {
    minHeight: "6vh",
    minWidth: "10vw",
    margin: "10px 10px 10px 10px",
  };

  render() {
    return (
      this.props.callback ?
      <button
        className="pure-material-button-contained"
        style={this.style}
        onClick={() => this.props.callback()}>
        {this.state.text}
      </button>
      :
      <button
        className="pure-material-button-contained"
        style={this.style}>
        {this.state.text}
      </button>
    );
  }
}
