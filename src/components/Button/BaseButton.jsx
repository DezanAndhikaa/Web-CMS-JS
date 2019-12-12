import React from 'react';
import { Button } from '@material-ui/core'
import './BaseButton.scss'

export default class InputButton extends React.Component{
    render(){
        return(
            <div className="bottom-row">
                <Button className="btn-assigns">Input</Button>
            </div>
        )
    }
}