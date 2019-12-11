import React from 'react'
import './InputText.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import DropDownList from '../DropdownList/DropDownList'
import { Button } from '@material-ui/core'

class InputText extends React.Component{
    render(){
        return(
            <div className="assign-mechanic-modal">
                <div className="top-row">
                    <div className="ut-underline"/>
                    <p className="select-input-title">{this.props.title}</p>
                    <CloseButton onClose={this.props.onClosed}/>
                </div>
                <div className="top-middle">
                    <DropDownList/>
                </div>
                <div className="bottom-row">
                    <Button className="btn-cancel" onClick={this.props.onClosed}>Cancel</Button>
                    <Button className="btn-input">Input</Button>
                </div>
            </div>
        )
    }
}

export default InputText