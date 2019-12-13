

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { Success } from '../../assets/imgs';
import './ConfirmationModal.scss';

export default class ConfirmationModal extends React.PureComponent {
  render() {
    return (
    <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
              <div className="confirmation-container">
                <p className="confirmation-title">Successful</p>
                <img className="confirmation-image" src={Success} alt="" />
                <p className="confirmation-caption">You can see the data approve</p>
                <p className="confirmation-caption">to the Data Action</p>
                <br></br>
                <Button className="btn-ok" onClick={this.props.onClose}>OK</Button>
              </div>
          </div>
        </DialogContent>
        </Modal>
    );
  }
}
