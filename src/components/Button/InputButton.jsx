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
        console.log("berhasil klik cuy : "+ this.state.isShowModal)
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    render(){
        return(
            <div className="bottom-row">
            <Button onClick={this.isClicked} className="btn-assign">Input</Button>
                <Modal
                    open={this.state.isShowModal}
                    onClose={this.isClosed}
                    >
                    <div>
                        <InputText/>
                        {/* <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p> */}
                    </div>
                </Modal>
            </div>
        )
    }
}