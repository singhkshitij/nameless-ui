import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import './room.css'

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      uid : this.props.match.params.url || "abc",
      name : "Kshitij",
      data : [{
        "type":"message",
        "data":"Hello from Kshitij",
        "owner":"me",
        "dt":"12:33 PM"
      },{
        "type":"message",
        "data":"Hello from Rahul",
        "owner":"Rahul",
        "dt":"12:33 PM"
      },{
        "type":"entry",
        "data":"Kshitij joined the chat",
        "owner":"me",
        "dt":"12:33 PM"
      },{
        "type":"entry",
        "data":"Rahul joined the chat",
        "owner":"Rahul",
        "dt":"12:33 PM"
      }]
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

  formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  

  async sendMessage(message){

    let details = {
      "type":"message",
      "data": message,
      "owner":"me",
      "dt": this.formatAMPM()
    }
    let messages = [details, ...this.state.data]

    await this.setState({
      data: messages
    })
    
    console.log(this.state.data);
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
        <MessageBox messageHook={this.sendMessage}/>
      </div>
    );
  }
}
