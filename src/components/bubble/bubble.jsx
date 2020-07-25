import React, { Component } from "react";
import "./bubble.css";

export default class Bubble extends Component {

  getDateTime(dt){
    var date = new Date(dt);
    return date.toLocaleString();
  }

  getBubbleClassNameBasedOnTypeAndOwner(obj) {
    if (obj.type === "entry") {
      return "entry-bubble";
    } else {
      return obj.owner === this.props.owner ? "right-bubble" : "left-bubble";
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
          {obj.owner !== this.props.owner && obj.type !== "entry" && <div className="bubble-owner">{obj.owner}</div>}
          <div>{obj.data}</div>
          {obj.type !== "entry" && <div className="bubble-dt">{this.getDateTime(obj.dt)}</div>}
        </div>
      </div>
    ));
    return chatBubbles;
  }

  render() {
    return <div className="discussion">{this.getChatBubbles()}</div>;
  }
}
