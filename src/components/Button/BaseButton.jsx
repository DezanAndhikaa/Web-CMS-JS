import React from 'react';
import { Button } from '@material-ui/core';
import { ApproveIcon } from '../../assets/icons';
import './BaseButton.scss';

export default class InputButton extends React.Component{
    render(){
        return(
            <div className="button-inline">
                <Button className="btn-approve">Approve</Button>
            </div>
        )
    }
}