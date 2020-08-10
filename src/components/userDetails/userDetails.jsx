import React, { Component } from "react";
import './userDetails.css';

export default class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      size: this.props.size,
      color: this.props.color,
    };
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          display: "inline-block",
          height: "100%",
        }}
      >
        <p
          className="hostname"
          style={{
            color: this.state.color || "#000",
            textTransform: this.state.capitalise ? "uppercase" : "capitalize",
            fontSize: this.state.size || "3vh"
          }}
        >
          {this.state.text}
        </p>
      </div>
    );
  }
}
