import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../../components/button/button";
import { Redirect } from "react-router-dom";
import { FcPortraitMode } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import { nanoid } from "nanoid";
import axios from "axios";
import Constants from "../../../constants";
import "./take.css";

export default class Take extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: "",
      linkEnabled: false,
      redirect: false,
      error: "",
      roomId: "",
    };
  }

  validateRoomName(e) {
    if (e.currentTarget.value) {
      this.setState({
        hostName: e.currentTarget.value,
        linkEnabled: true,
      });
    } else {
      this.setState({
        hostName: e.currentTarget.value,
        linkEnabled: false,
      });
    }
  }

   createRoom() {
    const uid = nanoid(10);
    //Move logic to create room here and pass as state object
    //Send room info to server to store data
    //remove redis functionality from service
    let host = Constants.serverHostKey;
    const url = process.env[host] + "/api/v1/room/" + uid;

    axios
      .post(url, { host : this.state.hostName })
      .then((res) => {
        if (res.data.status === "success") {
          this.setState({ roomId: uid, redirect: true });
        } else {
          this.setState({ error: "😕 Room creation failed, please retry !" });
        }
      })
      .catch((error) => {
        this.setState({
          error: "😕 Room creation failed, please retry !"
        });
      });
  }

  getRoomID() {
    return this.state.roomId;
  }

  render() {
    return (
      <div className="details-action">
        <TextField
          label="Host name"
          helperText={<HelperText>Be original!</HelperText>}
          onTrailingIconSelect={() => this.setState({ hostName: "" })}
          leadingIcon={<FcPortraitMode />}
          trailingIcon={<MdClearAll />}
          outlined
        >
          <Input
            value={this.state.hostName}
            onChange={(e) => this.validateRoomName(e)}
          />
        </TextField>
        {this.state.linkEnabled && (
          <Button text="Create room" callback={this.createRoom} />
        )}
        {this.state.redirect && (
          <Redirect
            to={{
              pathname: "/room/" + this.getRoomID(),
              state: {
                name: this.state.hostName,
              },
            }}
          />
        )}
        <p className="give-error">{this.state.error} </p>
      </div>
    );
  }
}
