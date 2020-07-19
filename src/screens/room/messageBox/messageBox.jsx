import React, { Component } from "react";
import { IconContext } from 'react-icons';
import { MdSend } from 'react-icons/md';
import "./messageBox.css"

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageHook: this.props.messageHook
    };
  }

  sendMessage(){
    this.props.messageHook('message',this.state.message)
    this.setState({message: ''})
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.sendMessage();
    }
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
                onKeyDown={this.onEnterPress}
                />
            </div>
            <div className="chat-action">
                <IconContext.Provider value={{ color: "#7f8c8d", className: "action-buttons" }}>
                    
                    <div className="action-button">
                        <MdSend onClick={()=> this.sendMessage()}/>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    );
  }
}
