import React, { Component } from "react";
import SubHeading from "../../components/subHeading/subHeading";
import Spacer from "../../components/spacer/spacer";
import Header from "../../components/header/header";
import Take from "../../screens/details/take/take";
import Give from "../../screens/details/give/give";
import "./details.css";

export default class Details extends Component {
  constructor(props) {
    super(props);
    console.log("porps", props);
    this.state = {
      takeFeedback: this.props.location.state.takeFeedback,
    };
  }

  lpStyle = {
    background: 'url("/assets/images/bg.png")',
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#ecf0f1",
    overflowX: "hidden",
    minWidth: "100vw",
    minHeight: "100vh",
  };

  render() {
    return (
      <div className="details-page" style={this.lpStyle}>
        <Header />
        <div className="details-container">
          <div className="floating-card">
            <div className="details-title">
              <Spacer space="20px" />
              {this.state.takeFeedback ?
              <SubHeading
                text="Create a room"
                size="1.8em"
                color="#909090"
                capitalise
              />:
              <SubHeading
                text="Join room"
                size="1.8em"
                color="#909090"
                capitalise
              />}
            </div>
            {this.state.takeFeedback ? <Take /> : <Give />}
          </div>
        </div>
      </div>
    );
  }
}
