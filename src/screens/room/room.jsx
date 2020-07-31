import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import Constants from "../../constants";
import axios from "axios";
import "./room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      uid: this.props.match.params.url || "abc",
      name: this.props.location.state.name,
      data: [],
      error: "",
    };
  }

  ws = null;

  async sendMessage(type, message) {
    let details = {
      url: this.state.uid,
      data: message,
      owner: this.state.name,
    };

    this.ws.send(JSON.stringify(details));
  }

  async addMessage(type, message) {
    let details = {
      type: type,
      data: message.data,
      owner: message.owner,
      dt: message.dt,
    };

    let messages = [details, ...this.state.data];
    await this.setState({
      data: messages,
    });
  }

  establishWsConnection() {
    let host = Constants.wsHost;
    const url =
      process.env[host] + "/" + this.state.uid + "?" + this.state.name;

    console.log("Host ", process.env[host], url)  
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WS connection established !");
    };

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      this.addMessage(message.type, message.message);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  }

  getChatHistory = async () => {
    let host = Constants.serverHostKey;
    const url = process.env[host] + "/api/v1/chats/" + this.state.uid;

    await axios
      .get(url)
      .then((res) => {
        if (res.data.data) {
          this.setState({ data: res.data.data });
          this.establishWsConnection();
        } else {
          this.setState({ error: "😕 Failed to get chat history !" });
        }
      })
      .catch((error) => {
        this.setState({ error: "😕 Failed to get chat history !" });
      });
  };

  componentDidMount() {
    this.getChatHistory();
  }

  render() {
    return (
      <div className="room">
        <Header chatPage hostName={this.state.name} />
        <ChatContent data={this.state.data} owner={this.state.name} />
        <MessageBox messageHook={this.sendMessage} />
      </div>
    );
  }
}
