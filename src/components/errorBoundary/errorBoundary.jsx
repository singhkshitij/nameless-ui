import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {        
        this.setState({ hasError: true });           
    }
    render() {
      if (this.state.hasError) {          
         return <Redirect to="/"/>;    
        }    
        return this.props.children;
    }
  }

