import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../../components/button/button";
import { Redirect } from "react-router-dom";
import { FcKey, FcPortraitMode } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import axios from "axios";
import Constants from "../../../constants";
import LoadingIndicator from "../../../components/loadingIndicator/loadingIndicator";
import SubHeading from "../../../components/subHeading/subHeading";
import "./give.css";

export default class Give extends Component {
  constructor(props) {
    super(props);
    this.checkRoomExists = this.checkRoomExists.bind(this);
    this.state = {
      roomId: "",
      hostName: "",
      linkEnabled: false,
      redirect: false,
      error: "",
      loading: false,
    };
  }

  validateRoomName(e) {
    if (e.currentTarget.value) {
      this.setState({
        error: "",
        roomId: e.currentTarget.value,
      });
    } else {
      this.setState({
        roomId: e.currentTarget.value,
      });
    }
  }

  validateHostName(e) {
    if (e.currentTarget.value) {
      this.setState({
        error: "",
        hostName: e.currentTarget.value,
      });
    } else {
      this.setState({
        hostName: e.currentTarget.value,
      });
    }
  }

  checkRoomExists = async () => {
    await this.setState({ loading: true });

    let host = Constants.serverHostKey;
    const url = process.env[host] + "/api/v1/room/" + this.state.roomId;
    var self = this;

    await axios
      .get(url)
      .then((res) => {
        if (res.data.data.active) {
          self.setState({ redirect: true, loading: false });
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

  renderContent() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return [
      <div className="details-title">
        <SubHeading text="Join room" size="1.5em" color="#909090" />
      </div>,
      <TextField
        label="Enter room Id"
        helperText={<HelperText></HelperText>}
        onTrailingIconSelect={() => this.setState({ error: "", roomId: "" })}
        leadingIcon={<FcKey />}
        trailingIcon={<MdClearAll />}
        outlined
      >
        <Input
          value={this.state.roomId}
          onChange={(e) => this.validateRoomName(e)}
        />
      </TextField>,
      <TextField
        label="Your name"
        helperText={<HelperText>Try something funny..</HelperText>}
        onTrailingIconSelect={() => this.setState({ hostName: "" })}
        leadingIcon={<FcPortraitMode />}
        trailingIcon={<MdClearAll />}
        outlined
      >
        <Input
          value={this.state.hostName}
          onChange={(e) => this.validateHostName(e)}
        />
      </TextField>,
      this.state.roomId && this.state.hostName && (
        <Button text="Join room" callback={this.checkRoomExists} />
      ),
      this.state.redirect && (
        <Redirect
          to={{
            pathname: "/room/" + this.state.roomId,
            state: {
              name: this.state.hostName,
            },
          }}
        />
      ),
      <p className="give-error">{this.state.error} </p>,
    ];
  }

  render() {
    return <div className="details-action">{this.renderContent()}</div>;
  }
}
