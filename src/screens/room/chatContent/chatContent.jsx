import React, { Component } from "react";
import Bubble from "../../../components/bubble/bubble";
import "./chatContent.css";

export default class ChatContent extends Component {
  render() {
    return (
      <div className="chat-content">
         <Bubble data={this.props.data}/>
      </div>
    );
  }
}
