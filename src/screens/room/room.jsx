import React, { Component } from "react";
import Header from "../../components/header/header";
import ChatContent from "./chatContent/chatContent";
import MessageBox from "./messageBox/messageBox";
import Constants from "../../constants";
import Urls from "../../urls";
import axios from "axios";
import TextField, { HelperText, Input } from "@material/react-text-field";
import SubHeading from "../../components/subHeading/subHeading";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../components/button/button";
import { FcPortraitMode, FcKey } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import CryptoJS from "crypto-js";
import Tour from "reactour";
import ReactGA from "react-ga";

import "./room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.closeTour = this.closeTour.bind(this);
    this.updateRoomStatus = this.updateRoomStatus.bind(this);
    this.state = {
      uid: this.props.match.params.url,
      name: this.props.location.state ? this.props.location.state.name : "",
      data: [],
      error: "",
      isHost: this.props.location.state
        ? this.props.location.state.isHost
        : false,
      redirect: this.props.location.state ? true : false,
      roomTourTaken: false,
      isRoomOpen: true,
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
    const url = Urls.getWSconnection(this.state.uid, this.state.name);

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      //console.log("WS connection established !");
    };

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      this.addMessage(message.type, message.message);
    };

    this.ws.onclose = () => {
      this.establishWsConnection();
    };
  }

  getChatHistory = async () => {
    const url = Urls.getChatHistory(this.state.uid);

    await axios
      .get(url)
      .then((res) => {
        if (res.data.data) {
          this.setState({
            data: res.data.data.chats,
            isRoomOpen: res.data.data.isOpen,
          });
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

    const url = Urls.checkIfRoomExists(this.state.uid);
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
          self.setState({
            error: "😕 " + res.data.data.message,
            loading: false,
          });
        }
      })
      .catch((error) => {
        self.setState({
          error: "😕 Failed to get room info !",
          loading: false,
        });
      });
  };

  updateRoomStatus(status) {
    this.setState({ isRoomOpen: status });
  }

  getRoomDetails() {
    return [
      <div className="details-title" key="detailsTitle">
        <SubHeading text="Join room" size="1em" color="#909090" />
      </div>,
      <TextField
        label="Room Id"
        helperText={<HelperText></HelperText>}
        leadingIcon={<FcKey />}
        trailingIcon={<MdClearAll />}
        outlined
        key="detailsroomId"
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
        key="details-textfiled"
      >
        <Input value={this.state.name} onChange={(e) => this.validateName(e)} />
      </TextField>,
      <Button
        text="Enter room"
        callback={this.checkRoomExists}
        disabled={this.state.name ? false : true}
        key="details-button"
      />,
      <p className="give-error" key="detailserror">
        {this.state.error}{" "}
      </p>,
    ];
  }

  getTourSteps() {
    return [
      {
        selector: "room",
        content: "Congrats on creating room. Lets take a quick tour...",
      },
      {
        selector: ".invite-button",
        content:
          "Invite more people by copying the invite link and sharing with them",
      },
      {
        selector: ".entry-bubble-aligned",
        content: "You will be notified when someone joins the room",
      },
      {
        selector: ".MuiButtonBase-root",
        content: () => (
          <div>
            <p>Explore other options such as :</p>
            <ul>
              <li>Export chats as CSV anytime </li>
              <li>Close room entry for new participants</li>
            </ul>
          </div>
        ),
      },
      {
        selector: ".message-box",
        content: "Voila, You can start sending those rocking messages now.",
      },
    ];
  }

  showRoomTour() {
    return !localStorage.getItem("roomTourTaken") && !this.state.roomTourTaken;
  }

  closeTour() {
    this.setState({
      roomTourTaken: !this.state.roomTourTaken,
    });
    localStorage.setItem("roomTourTaken", true);
  }

  render() {
    ReactGA.initialize("UA-114302632-5");
    ReactGA.pageview(window.location.pathname + window.location.search);
    return this.state.name !== "" && this.state.redirect ? (
      <div className="room">
        <Header
          chatPage
          hostName={this.state.name}
          pathname={this.props.location.pathname}
          dataForExport={this.state.data}
          isHost={this.state.isHost}
          updateRoomStatus={this.updateRoomStatus}
          isRoomOpen={this.state.isRoomOpen}
          uid={this.state.uid}
        />
        <ChatContent data={this.state.data} owner={this.state.name} />
        <div className="floating-chatBox">
          <MessageBox messageHook={this.sendMessage} />
        </div>
        <Tour
          steps={this.getTourSteps()}
          isOpen={this.showRoomTour()}
          onRequestClose={this.closeTour}
        />
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
