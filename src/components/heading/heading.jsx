import React, { Component } from 'react';


export default class Heading extends Component {

    constructor(props) {
        super(props);
        this.state = {
          text: this.props.text,
          iconUrl: this.props.withIcon
        };
      }

    render() {
        return (
            <div style={{ textAlign: 'center',verticalAlign: 'middle',display:'inline-block'}}>
                {this.state.iconUrl && <img src={this.state.iconUrl} style={{width:'100px',height:'100px'}}/>}
                <span style={{fontSize:'3.5em',fontWeight:'bold', margin: '20px 10px 20px 10px', color: '#6f84ef', fontFamily:'"Trebuchet MS", Helvetica, sans-serif'}}>{this.state.text}</span>
            </div>
          
        );
      }
}