import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { ImgApproved, DelSuccess, Success } from 'assets/imgs';
import './ConfirmationModal.scss';
import CloseNotif from 'components/CloseNotif/CloseNotif';

export default class ConfirmationModal extends React.PureComponent {
  render() {
    if(this.props.idModal === "Approved"){
      return (
        <Modal open={this.props.openModal} className="modal-container">
            <DialogContent className="confirmation-modal-content">
              <div className="confirmation-modal">
              <CloseNotif onClose={this.props.onClose}/>
                  <div className="confirmation-container">
                    <p className="confirmation-title">Successful</p>
                    <img className="image-approved" src={ImgApproved} alt="" />
                    <p className="confirmation-caption">Please resume your activities</p>
                    <br></br>
                    <Button className="btn-ok" onClick={ () => {this.props.onClose()} }>Continue</Button>
                  </div>
              </div>
            </DialogContent>
            </Modal>
        );
    }else if(this.props.idModal === "SAP"){
      return (
        <Modal open={this.props.isModal} className="modal-container">
            <DialogContent className="confirmation-modal-content">
              <div className="confirmation-modal">
                  <div className="confirmation-container">
                    <p className="confirmation-title">Successful</p>
                    <img className="confirmation-image" src={Success} alt="" />
                    <p className="confirmation-caption">You can see the data SAP Issue</p>
                    <p className="confirmation-caption">to the <b>Status</b></p>
                    <br></br>
                    <Button className="btn-ok" onClick={ () => {this.props.isModalClosed();this.props.handleReload()} }>Continue</Button>
                  </div>
              </div>
            </DialogContent>
            </Modal>
        );
    } else if(this.props.idModal === "SAP-Failed"){
      return (
        <Modal open={this.props.isModal} className="modal-container">
				  <DialogContent className="confirmation-modal-content">
            <div className="confirmation-modal">
              <CloseNotif onClose={this.props.isModalClosed}/>
              <div className="confirmation-container">
                <p className="confirmation-title">You have not completed</p>
                <p className="confirmation-title2">the SAP Issue form</p>
                <img className="confirmation-image" src={DelSuccess} alt="" />
                <p className="confirmation-caption">The system can't save your activities.</p>
                <p className="confirmation-caption">Do you want to continue?</p>
                <div className="btn-container">
                  {this.props.idFailed === "CloseBtn" ? 
                    <Button className="btn-tidak" onClick={ () => {this.props.isModalClosed();this.props.handleReload()} }>No</Button>
                  : 
                    <Button className="btn-tidak" onClick={this.props.backToConfirmModal}>No</Button>
                  }
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-ya" onClick={this.props.backToSAP}>Yes</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Modal>
      );
    } else if(this.props.idModal === "Delete Success"){
      return (
        <Modal open={this.props.openModal} className="modal-container">
          <DialogContent className="confirmation-modal-content">
            <div className="confirmation-modal">
              <div className="confirmation-container">
                  <p className="confirmation-title">Successful</p>
                  <img className="confirmation-image" src={Success} alt="" /> 
                  <p className="confirmation-caption">The data was deleted</p>
                  <p className="confirmation-caption"><b>successfully</b></p>
                  <br></br>
                  <Button className="btn-ok" onClick={ () => {this.props.onClose()} }>Continue</Button>
              </div>
            </div>
          </DialogContent>
        </Modal>
      );
    } else if(this.props.idModal === "Revised"){
      return (
        <Modal open={this.props.openModal} className="modal-container">
          <DialogContent className="confirmation-modal-content">
            <div className="confirmation-modal">
              <div className="confirmation-container">
                  <p className="confirmation-title">Successful</p>
                  <img className="confirmation-image" src={Success} alt="" /> 
                  <p className="confirmation-caption">The data was revised</p>
                  <p className="confirmation-caption"><b>successfully</b></p>
                  <br></br>
                  <Button className="btn-ok" onClick={ () => {this.props.onClose()} }>Continue</Button>
              </div>
            </div>
          </DialogContent>
        </Modal>
      );
    }
  }
}