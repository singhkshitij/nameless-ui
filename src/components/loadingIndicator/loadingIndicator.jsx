import React, { Component } from "react";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import PuffLoader from "react-spinners/PuffLoader";
import "./loadingIndicator.css";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div className="loading-indicator">
        {this.props.round ? (
          <PuffLoader css={css} size={40} color={"#6f84ef"} loading />
        ) : (
          <GridLoader css={css} size={10} color={"#6f84ef"} loading />
        )}
      </div>
    );
  }
}
