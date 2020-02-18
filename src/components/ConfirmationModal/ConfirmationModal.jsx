

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { Success } from '../../assets/imgs';
import './ConfirmationModal.scss';

export default class ConfirmationModal extends React.PureComponent {
  render() {
    if(this.props.idModal === "Approved"){
      return (
        <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
            <DialogContent className="confirmation-modal-content">
              <div className="confirmation-modal">
                  <div className="confirmation-container">
                    <p className="confirmation-title">Successful</p>
                    <img className="confirmation-image" src={Success} alt="" />
                    <p className="confirmation-caption">You can see the data approve</p>
                    <p className="confirmation-caption">to the <b>Data Action</b></p>
                    <br></br>
                    <Button className="btn-ok" onClick={this.props.onClose}>Continue</Button>
                  </div>
              </div>
            </DialogContent>
            </Modal>
        );
    }
    if(this.props.idModal === "SAP"){
      console.log('uhuy sap 3')
      return (
        <Modal open={this.props.isShowModal} onClose={this.props.onClose} className="modal-container">
            <DialogContent className="confirmation-modal-content">
              <div className="confirmation-modal">
                  <div className="confirmation-container">
                    <p className="confirmation-title">Successful</p>
                    <img className="confirmation-image" src={Success} alt="" />
                    <p className="confirmation-caption">You can see the data SAP Issue</p>
                    <p className="confirmation-caption">to the <b>Status</b></p>
                    <br></br>
                    <Button className="btn-ok" onClick={this.props.onClose}>Continue</Button>
                  </div>
              </div>
            </DialogContent>
            </Modal>
        );
    }
  }
}
