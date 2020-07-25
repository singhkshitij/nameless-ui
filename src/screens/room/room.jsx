import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import Constants from "../../constants";
import './room.css'

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.state = {
      uid : this.props.match.params.url || "abc",
      name : this.props.location.state.name,
      data : []
    };
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

  async addMessage(type,message){

    let details = {
      "type": type,
      "data": message,
      "owner":"me",
      "dt": this.formatAMPM()
    }

    let messages = [details, ...this.state.data]
    await this.setState({
      data: messages
    })
  }

  componentDidMount() {
      let host = Constants.wsHost;
      const url = process.env[host] + "/" + this.state.uid +"?" + this.state.name;
      const ws = new WebSocket(url)
      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('Connection established !');
      }

      ws.onmessage = evt => {
          // listen to data sent from the websocket server
          const message = JSON.parse(evt.data)
          this.addMessage(message.type,message.message)
      }

      ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

      }
  }

  render() {
    return (
      <div className="room">
        <Header chatPage hostName={this.state.name}/>
        <ChatContent data={this.state.data}/>
        <MessageBox messageHook={this.addMessage}/>
      </div>
    );
  }
}
