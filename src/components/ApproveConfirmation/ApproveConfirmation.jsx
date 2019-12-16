

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { Confirm } from '../../assets/imgs';
import './ApproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';

export default class ApproveConfirmation extends React.PureComponent {
  render() {
    return (
    <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
            <CloseNotif onClose={this.props.onClose}/>
              <div className="confirmation-container">
                <p className="confirmation-title">Approve Planning</p>
                <p className="confirmation-title">From Service Order</p>
                <img className="confirmation-image" src={Confirm} alt="" />
                <p className="confirmation-caption">Are you sure want to</p>
                <p className="confirmation-caption">approve 3 items?</p>
                <div className="btn-row">
                  <Button className="button-no" onClick={this.props.onClose}>No</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button className="button-yes" onClick={this.props.onClose}>Yes</Button>
                  </div>
              </div>
          </div>
        </DialogContent>
        </Modal>
    );
  }
}
