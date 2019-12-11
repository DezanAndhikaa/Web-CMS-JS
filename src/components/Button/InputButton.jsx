import React from 'react';
import { Button, Modal } from '@material-ui/core'
import './InputButton.scss'
import InputText from '../InputText/InputText'

export default class InputButton extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            isShowModal: false
        }
    }

    isClicked = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    render(){
        return(
            <div className="bottom-row">
            <Button onClick={this.isClicked} className="btn-assign">Input</Button>
                <Modal className="modal-pos" open={this.state.isShowModal} onCancel={this.isClosed} >
                    <div>
                        <InputText 
                            {...this.props}
                            title={"Input Unit Data"} 
                            onClosed={this.isClosed}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}