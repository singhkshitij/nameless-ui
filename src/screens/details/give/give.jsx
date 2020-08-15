import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../../components/button/button";
import { Redirect } from "react-router-dom";
import { FcKey, FcPortraitMode } from "react-icons/fc";
import { FiHelpCircle } from "react-icons/fi";
import { MdClearAll } from "react-icons/md";
import axios from "axios";
import Constants from "../../../constants";
import LoadingIndicator from "../../../components/loadingIndicator/loadingIndicator";
import ReactTooltip from "react-tooltip";
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
      <p data-tip data-for="giveHelp" className="help-icon" key="giveHelp">
        <FiHelpCircle />
      </p>,
      <TextField
        label="Enter room Id"
        helperText={<HelperText></HelperText>}
        onTrailingIconSelect={() => this.setState({ error: "", roomId: "" })}
        leadingIcon={<FcKey />}
        trailingIcon={<MdClearAll />}
        outlined
        key="roomtextId"
      >
        <Input
          value={this.state.roomId}
          onChange={(e) => this.validateRoomName(e)}
        />
      </TextField>,
      <TextField
        label="Name"
        helperText={<HelperText>Try something funny..</HelperText>}
        onTrailingIconSelect={() => this.setState({ hostName: "" })}
        leadingIcon={<FcPortraitMode />}
        trailingIcon={<MdClearAll />}
        outlined
        key="nameId"
      >
        <Input
          value={this.state.hostName}
          onChange={(e) => this.validateHostName(e)}
        />
      </TextField>,
      <Button
        disabled={this.state.roomId && this.state.hostName ? false : true}
        text="Join room"
        callback={this.checkRoomExists}
        key="giveButton"
      />,
      this.state.redirect && (
        <Redirect
          key="giveredirect"
          to={{
            pathname: "/room/" + this.state.roomId,
            state: {
              name: this.state.hostName,
            },
          }}
        />
      ),
      <p className="give-error" key="giveError">
        {this.state.error}{" "}
      </p>,
      <ReactTooltip
        id="giveHelp"
        place="top"
        effect="solid"
        aria-haspopup="true"
        key="giveHelpTooltip"
      >
        <ul>
          <li>Enter joining room id</li>
          <li>Enter some random name, maybe a superhero</li>
        </ul>
      </ReactTooltip>,
    ];
  }

  render() {
    return <div className="details-action">{this.renderContent()}</div>;
  }
}
