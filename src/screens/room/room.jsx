import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import './room.css'

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  lpStyle = {
    background: 'url("/assets/images/bg.png")',
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#ecf0f1",
    overflowX: "hidden",
    minWidth: "100vw",
    minHeight: "100vh",
  };

  render() {
    return (
      <div className="room" style={this.lpStyle}>
        <Header chatPage hostName="kshitij"/>
        <ChatContent/>
        <MessageBox/>
      </div>
    );
  }
}
