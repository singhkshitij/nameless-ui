import React, { Component } from "react";

export default class SubHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      iconUrl: this.props.withIcon,
      size: this.props.size,
      color: this.props.color,
      capitalise: this.props.capitalise,
    };
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          display: "inline-block",
        }}
      >
        {this.state.iconUrl && (
          <img
            alt="logo"
            src={this.state.iconUrl}
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <span
          style={{
            fontSize: this.props.size,
            margin: "20px 10px 20px 10px",
            color: this.state.color || "#000",
            textTransform: this.state.capitalise ? "uppercase" : "none",
            fontFamily: "Tahoma, Geneva, sans-serif",
          }}
        >
          {this.state.text}
        </span>
      </div>
    );
  }
}
