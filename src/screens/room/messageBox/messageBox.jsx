import React, { Component } from "react";
import { IconContext } from 'react-icons';
import { FaRegSmileWink } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import "./messageBox.css"

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  render() {
    return (
        <div className="message-box">
            <div className="chat-box">
                <textarea
                placeholder="Start typing here.."
                value={this.state.message}
                onChange={(event) => this.setState({message: event.target.value})}
                rows={2}
                className="msg-textarea"
                />
            </div>
            <div className="chat-action">
                <IconContext.Provider value={{ color: "#7f8c8d", className: "action-buttons" }}>
                    <div  className="action-button">
                        <FaRegSmileWink />
                    </div>
                    <div className="action-button">
                        <MdSend />
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    );
  }
}
