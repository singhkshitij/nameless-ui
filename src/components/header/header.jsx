import React, { Component } from "react";
import "./header.css";
import { IconContext } from "react-icons";
import { IoMdArrowBack, IoMdDownload, IoLogoGithub } from "react-icons/io";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import UserDetails from "../../components/userDetails/userDetails";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconMenu from "@bit/take2.components.icon-menu";
import SubHeading from "../../components/subHeading/subHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import exportFromJSON from "export-from-json";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import Constants from "../../constants";
import Gravatar from "../avatar/avatar";
import Urls from "../../urls";
import axios from "axios";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      chatPage: this.props.chatPage,
      name: this.props.hostName,
      detailsPage: this.props.detailsPage,
      title: this.props.title || "",
      invite:
        "Hey there, i am waiting for you in namelss room. ⌛ \nPlease join here :\n\n" +
          window.location.origin +
          this.props.pathname || window.location.origin,
    };
  }

  getDecryptedMessage(message, type) {
    if (type !== "entry") {
      const secret = process.env[Constants.decipher];
      let dmsg = CryptoJS.AES.decrypt(message, secret).toString(
        CryptoJS.enc.Utf8
      );
      return dmsg;
    }
    return message;
  }

  exportData() {
    const exportData = this.props.dataForExport.map((item) => {
      return {
        Message: this.getDecryptedMessage(item.data, item.type),
        "Sent by": item.owner,
        "Sent at": new Date(item.dt).toLocaleString(),
      };
    });
    exportFromJSON({
      data: exportData,
      fileName: "export",
      exportType: exportFromJSON.types.csv,
    });
  }

  toggleRoomVisibilty = async () => {
    const url = Urls.toggleRoomVisibility(this.props.uid);
    await axios
      .put(url)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.updateRoomStatus(res.data.data.status);
          res.data.data.status
            ? toast.info("Room has been opened up")
            : toast.dark("Room has been closed");
        }
      })
  };

  getMenuItems() {
    const fixedItems = [
      {
        icon: <MdFeedback />,
        label: "Report issue",
        onClick: () => {
          window.open("https://github.com/singhkshitij/nameless-ui/issues/new");
        },
      },
    ];

    const downLoadDataItems = {
      icon: <IoMdDownload />,
      label: "Export as csv",
      onClick: () => {
        this.exportData();
      },
    };

    const roomCloseItem = {
      icon: <FaDoorClosed />,
      label: "Close room",
      onClick: () => {
        this.toggleRoomVisibilty();
      },
    };

    const roomOpenItem = {
      icon: <FaDoorOpen />,
      label: "Open room",
      onClick: () => {
        this.toggleRoomVisibilty();
      },
    };

    if (this.props.isHost && this.props.isRoomOpen) {
      fixedItems.push(downLoadDataItems, roomCloseItem);
    } else if (this.props.isHost && !this.props.isRoomOpen) {
      fixedItems.push(downLoadDataItems, roomOpenItem);
    }
    return fixedItems.reverse();
  }

  render() {
    const notify = () => toast.success("Invite link has been copied !");

    return (
      <div className="page-header">
        <Link to="/">
          <IconContext.Provider
            value={{ color: "#909090", className: "back-button" }}
          >
            <IoMdArrowBack />
          </IconContext.Provider>
        </Link>
        {this.state.detailsPage && (
          <div className="header-details">
            <SubHeading
              text={this.state.title}
              size="1em"
              color="#34495e"
              capitalise
            />
          </div>
        )}
        {this.state.chatPage && [
          <div className="header-details" key="headerDetails">
            <Gravatar text={this.state.name} size="30px" />
            <UserDetails text={this.state.name} size="20px" color="#34495e" />
          </div>,
          <div className="header-actions" key="headerAction">
            <IoLogoGithub
              className="github-icon"
              onClick={() =>
                window.open("https://github.com/singhkshitij/nameless-ui")
              }
            />
            <CopyToClipboard text={this.state.invite} onCopy={notify}>
              <button className="invite-button">Invite</button>
            </CopyToClipboard>
            <IconMenu items={this.getMenuItems()} />
          </div>,
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            key="toastContainer"
          />,
        ]}
      </div>
    );
  }
}
