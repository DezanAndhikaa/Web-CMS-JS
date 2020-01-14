

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { Delete } from '../../assets/imgs';
import './DeleteConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';

export default class DeleteConfirmation extends React.PureComponent {
  render() {
    return (
    <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
            <CloseNotif onClose={this.props.onClose}/>
              <div className="confirmation-container">
                <p className="confirmation-title">Delete Planning</p>
                <img className="confirmation-image" src={Delete} alt="" />
                <p className="confirmation-caption">Are you sure want to</p>
                <p className="confirmation-caption">delete {this.props.totalData} items?</p>
                <div className="btn-row">
                  <Button className="btn-yes" onClick={this.props.onDelete}>Yes</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button className="btn-no" onClick={this.props.onClose}>No</Button>
                  </div>
              </div>
          </div>
        </DialogContent>
        </Modal>
    );
  }
}
