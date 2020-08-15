import React, { Component } from "react";
import GridLoader from "react-spinners/GridLoader";
import PuffLoader from "react-spinners/PuffLoader";
import "./loadingIndicator.css";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div className="loading-indicator">
        {this.props.round ? (
          <PuffLoader size={40} color={"#6f84ef"} loading />
        ) : (
          <GridLoader size={10} color={"#6f84ef"} loading />
        )}
      </div>
    );
  }
}
