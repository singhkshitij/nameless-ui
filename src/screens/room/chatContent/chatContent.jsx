import React, { Component } from "react";
import Bubble from "../../../components/bubble/bubble";
import "./chatContent.css";

export default class ChatContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div className="chat-content">
         <Bubble data={this.state.data}/>
      </div>
    );
  }
}
