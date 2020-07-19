import React, { Component } from "react";
import "./bubble.css";

export default class Bubble extends Component {

  getBubbleClassNameBasedOnTypeAndOwner(obj) {
    if (obj.type === "entry") {
      return "entry-bubble";
    } else {
      return obj.owner === "me" ? "right-bubble" : "left-bubble";
    }
  }

  getChatBubbles() {
    const chatBubbles = this.props.data.map((obj, i = 0) => (
      <div
        className={
          "bubble-container " + this.getBubbleClassNameBasedOnTypeAndOwner(obj)
        }
        key={i}
      >
        <div
          key={i++}
          className={
            "bubble " +
            (this.getBubbleClassNameBasedOnTypeAndOwner(obj) + "-aligned")
          }
        >
          <div>{obj.data}</div>
          {obj.type !== "entry" && <div className="bubble-dt">{obj.dt}</div>}
        </div>
      </div>
    ));
    return chatBubbles;
  }

  render() {
    return <div className="discussion">{this.getChatBubbles()}</div>;
  }
}
