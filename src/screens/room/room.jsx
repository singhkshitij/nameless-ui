import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import Constants from "../../constants";
import axios from "axios";
import TextField, { HelperText, Input } from "@material/react-text-field";
import SubHeading from "../../components/subHeading/subHeading";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../components/button/button";
import { FcPortraitMode, FcKey } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import CryptoJS from "crypto-js";

import "./room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      uid: this.props.match.params.url,
      name: this.props.location.state ? this.props.location.state.name : "",
      data: [],
      error: "",
      redirect: this.props.location.state ? true : false,
    };
  }

  lpStyle = {
    background: 'url("/assets/images/background.svg")',
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundColor: "#ebfbff",
    overflowX: "hidden",
    minWidth: "100vw",
    minHeight: "100vh",
    userSelect: "none",
  };

  ws = null;

  async sendMessage(type, message) {
    const secret = process.env[Constants.decipher];
    const emess = CryptoJS.AES.encrypt(message, secret).toString();
    if (message) {
      let details = {
        url: this.state.uid,
        data: emess,
        owner: this.state.name,
      };

      this.ws.send(JSON.stringify(details));
    }
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

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      //console.log("WS connection established !");
    };

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      this.addMessage(message.type, message.message);
    };

    this.ws.onclose = () => {
      //console.log("disconnected");
      this.establishWsConnection();
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
    if (this.state.name !== "") {
      this.getChatHistory();
    }
  }

  validateName(e) {
    if (e.currentTarget.value) {
      this.setState({
        error: "",
        name: e.currentTarget.value,
      });
    } else {
      this.setState({
        name: e.currentTarget.value,
      });
    }
  }

  checkRoomExists = async () => {
    await this.setState({ loading: true });

    let host = Constants.serverHostKey;
    const url = process.env[host] + "/api/v1/room/" + this.state.uid;
    var self = this;

    await axios
      .get(url)
      .then((res) => {
        if (res.data.data.active) {
          self.setState({ redirect: true, loading: false });
          if (this.state.name !== "") {
            this.getChatHistory();
          }
        } else {
          self.setState({ error: "😕 No such room exists !", loading: false });
        }
      })
      .catch((error) => {
        self.setState({
          error: "😕 Failed to get room info !",
          loading: false,
        });
      });
  };

  getRoomDetails() {
    return [
      <div className="details-title">
        <SubHeading text="Join room" size="1em" color="#909090" />
      </div>,
      <TextField
        label="Room Id"
        helperText={<HelperText></HelperText>}
        leadingIcon={<FcKey />}
        trailingIcon={<MdClearAll />}
        outlined
      >
        <Input
          value={this.state.uid}
          onChange={(e) => this.validateRoomName(e)}
          disabled
        />
      </TextField>,
      <TextField
        label="Name"
        helperText={<HelperText>Try something funny...</HelperText>}
        onTrailingIconSelect={() => this.setState({ name: "" })}
        leadingIcon={<FcPortraitMode />}
        trailingIcon={<MdClearAll />}
        outlined
      >
        <Input value={this.state.name} onChange={(e) => this.validateName(e)} />
      </TextField>,
      this.state.name && (
        <Button text="Enter room" callback={this.checkRoomExists} />
      ),
      <p className="give-error">{this.state.error} </p>,
    ];
  }

  render() {
    return this.state.name !== "" && this.state.redirect ? (
      <div className="room">
        <Header
          chatPage
          hostName={this.state.name}
          pathname={this.props.location.pathname}
          dataForExport={this.state.data}
        />
        <ChatContent data={this.state.data} owner={this.state.name} />
        <div className="floating-chatBox">
          <MessageBox messageHook={this.sendMessage} />
        </div>
      </div>
    ) : (
      <div className="details-page" style={this.lpStyle}>
        <div className="floating-card">
          <div className="details-action">{this.getRoomDetails()}</div>
        </div>
      </div>
    );
  }
}
