

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { DelSuccess, Success } from '../../assets/imgs';
import './DeleteSuccess.scss';

export default class DeleteSuccess extends React.PureComponent {
  render() {
    return (
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
            <div className="confirmation-container">
                <p className="confirmation-title">Successful</p>
                <img className="confirmation-image" src={Success} alt="" /> 
                <p className="confirmation-caption">The data was deleted</p>
                <p className="confirmation-caption">successfully.</p>
                <br></br>
                <Button className="btn-ok" onClick={this.props.onClose}>Continue</Button>
            </div>
          </div>
        </DialogContent>
      </Modal>
    );
  }
}
