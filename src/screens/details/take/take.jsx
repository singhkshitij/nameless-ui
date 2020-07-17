import React, { Component } from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { FcPortraitMode } from 'react-icons/fc';
import { MdClearAll } from 'react-icons/md';
import './take.css'

export default class Take extends Component {

    constructor(props) {
        super(props);
        this.state = {
          hostName: ""
        };
      }

    render() {
        return (
            <div className="details-action">
                <TextField
                label='Host name'
                helperText={<HelperText>Be original!</HelperText>}
                onTrailingIconSelect={() => this.setState({hostName: ''})}
                leadingIcon={<FcPortraitMode/>}
                trailingIcon={<MdClearAll/>}
                outlined>
                    <Input value={this.state.hostName} onChange={(e) => this.setState({hostName: e.currentTarget.value})} />
                </TextField>
                <Link to="/room">
                      <Button text="Create room"/>
                </Link>
            </div>  
        );
      }
}