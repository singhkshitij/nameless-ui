import React, { Component } from "react";
import Bubble from "../../../components/bubble/bubble";
import LoadingIndicator from "../../../components/loadingIndicator/loadingIndicator";
import "./chatContent.css";

export default class ChatContent extends Component {
  render() {
    return (
      <div className="chat-content">
        {this.props.data.length ? (
          <div style={{ marginTop: "10px" }}>
            <LoadingIndicator round/>
          </div>
        ) : (
          <Bubble data={this.props.data} owner={this.props.owner} />
        )}
      </div>
    );
  }
}
