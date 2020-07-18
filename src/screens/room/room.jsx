import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import './room.css'

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid : this.props.match.params.url || "abc",
      name : "Kshitij",
      data : []
    };
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:8080/' + this.state.uid +"/" + this.state.name)
    ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
    }

    ws.onmessage = evt => {
    // listen to data sent from the websocket server
    const message = JSON.parse(evt.data)
    console.log(this.state.data)
    this.setState({data: this.state.data.concat(message)})
    console.log(this.state.data)
    }

    ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

    }
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
        <ChatContent data={this.state.data}/>
        <MessageBox/>
      </div>
    );
  }
}
