import React, { Component } from 'react';
import './header.css'
import { IconContext } from "react-icons";
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
          link:this.props.link
        };
      }

    render() {
        return (
            <div className="page-header">
                <Link to="/">
                    <IconContext.Provider value={{  className: "back-button" }}>
                        <div>
                            <IoMdArrowBack />
                        </div>
                    </IconContext.Provider>
                </Link>
            </div>  
        );
      }
}