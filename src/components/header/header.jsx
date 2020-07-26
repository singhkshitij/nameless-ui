import React, { Component } from "react";
import "./header.css";
import { IconContext } from "react-icons";
import { IoMdArrowBack } from "react-icons/io";
import UserDetails from "../../components/userDetails/userDetails";
import { Link } from "react-router-dom";
import Gravatar from '../avatar/avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      chatPage: this.props.chatPage,
      name: this.props.hostName,
    };
  }

  render() {
    return (
      <div className="page-header">
        <Link to="/">
          <IconContext.Provider value={{ color:"#909090",className: "back-button" }}>
            <IoMdArrowBack />
          </IconContext.Provider>
        </Link>
        {this.state.chatPage && (
          <div className="header-details">
            <Gravatar text={this.state.name} size='30px'/>
            <UserDetails text={this.state.name} size="20px" color="#34495e"/>
          </div>
        )}
      </div>
    );
  }
}
