import React, { Component } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CryptoJS from "crypto-js";
import Constants from "../../constants";
import {MdLock } from "react-icons/md";
import "./bubble.css";

export default class Bubble extends Component {
  getDateTime(dt) {
    var date = new Date(dt);
    var dateNow = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    if (dateNow.toLocaleDateString() === date.toLocaleDateString()) {
      return strTime;
    } else {
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      let formatted_date =
        date.getDate() + "-" + months[date.getMonth()] + " " + strTime;
      return formatted_date;
    }
  }

  getBubbleClassNameBasedOnTypeAndOwner(obj) {
    if (obj.type === "entry") {
      return "entry-bubble";
    } else {
      return obj.owner === this.props.owner ? "right-bubble" : "left-bubble";
    }
  }

  getDecryptedMessage(message, type) {
    if (type !== "entry") {
      const secret = process.env[Constants.decipher];
      let dmsg = CryptoJS.AES.decrypt(message, secret).toString(
        CryptoJS.enc.Utf8
      );
      return dmsg;
    }
    return message;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
          {obj.owner !== this.props.owner && obj.type !== "entry" && (
            <div className="bubble-owner">{obj.owner}</div>
          )}
          <div>{this.getDecryptedMessage(obj.data, obj.type)}</div>
          {obj.type !== "entry" && (
            <div className="bubble-dt">{this.getDateTime(obj.dt)}</div>
          )}
        </div>
      </div>
    ));
    return chatBubbles;
  }

  render() {
    return (
      <div className="discussion">
        <ScrollToBottom scrollViewClassName="scrollarea-content" mode="bottom">
          <div
            className="hidden-div"
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
          {this.getChatBubbles()}
          <div className="encrypted-msg">
            <p>
              <MdLock/> All chats are end to end encrypted. <br/>
              Not even namelss can understand them
            </p>
          </div>
        </ScrollToBottom>
      </div>
    );
  }
}
