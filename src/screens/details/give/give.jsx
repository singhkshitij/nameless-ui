import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import Button from "../../../components/button/button";
import { Redirect } from "react-router-dom";
import { FcKey } from "react-icons/fc";
import { MdClearAll } from "react-icons/md";
import axios from "axios";
import Constants from "../../../constants";
import "./give.css";

export default class Give extends Component {
  constructor(props) {
    super(props);
    this.checkRoomExists = this.checkRoomExists.bind(this);
    this.state = {
      roomId: "",
      hostName: "Jayat",
      linkEnabled: false,
      redirect: false,
      error: "",
    };
  }

  validateRoomName(e) {
    if (e.currentTarget.value) {
      this.setState({
        error: "",
        roomId: e.currentTarget.value,
        linkEnabled: true,
      });
    } else {
      this.setState({
        roomId: e.currentTarget.value,
        linkEnabled: false,
      });
    }
  }

  checkRoomExists = async () => {
    let host = Constants.serverHostKey;
    const url = process.env[host] + "/api/v1/room/" + this.state.roomId;
   
    await axios
      .get( url)
      .then((res) => {
        if (res.data.data.active) {
          this.setState({ redirect: true });
        } else {
          this.setState({ error: "😕 No such room exists !" });
        }
      })
      .catch(error => {
        this.setState({ error: "😕 Failed to get room info !"});
    });;
  }

  render() {
    return (
      <div className="details-action">
        <TextField
          label="Enter room Id"
          helperText={<HelperText>Fun Begins!</HelperText>}
          onTrailingIconSelect={() => this.setState({ error: "", roomId: "" })}
          leadingIcon={<FcKey />}
          trailingIcon={<MdClearAll />}
          outlined
        >
          <Input
            value={this.state.roomId}
            onChange={(e) => this.validateRoomName(e)}
          />
        </TextField>
        {this.state.linkEnabled && (
          <Button text="Join room" callback={this.checkRoomExists} />
        )}
        {this.state.redirect && (
          <Redirect
            to={{
              pathname: "/room/" + this.state.roomId,
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
