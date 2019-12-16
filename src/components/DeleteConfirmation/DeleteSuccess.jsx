

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { DelSuccess } from '../../assets/imgs';
import './DeleteSuccess.scss';

export default class DeleteSuccess extends React.PureComponent {
  render() {
    return (
    <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
            <div className="confirmation-modal">
                    <div className="confirmation-container">
                        <img className="confirmation-image" src={DelSuccess} alt="" />
                        <p className="confirmation-caption">Item planning has been delete.</p>
                        <p className="confirmation-caption">You can see the data</p>
                        <p className="confirmation-caption">to the data <b>Data Action</b></p>
                        <br></br>
                        <Button className="btn-ok" onClick={this.props.onClose}>OK</Button>
                    </div>
            </div>
        </DialogContent>
        </Modal>
    );
  }
}
