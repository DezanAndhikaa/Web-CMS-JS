import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { ImgSendtoEdit, ImgCancelApprove, ImgCancelEditSucc } from '../../assets/imgs';
import './UnapproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';
import SapIssue from '../../views/planning/details/components/SapIssue/SapIssue'

export default class UnapproveConfirmation extends React.PureComponent {

  state={
    isShowModal1: false,
    isShowModal2: false,
    isShowModal3: false,
  }

  componentDidUpdate = (prevProps) =>{
    if (prevProps.openModal != this.props.openModal)
    this.setState({
      isShowModal1: this.props.openModal
    })
  }

  isClickedSap = () => {
    this.setState({
      isShowModal1: !this.state.isShowModal1,
      isShowModal2: !this.state.isShowModal2
    })
  }

  isClickedSend = () => {
    this.setState({
      isShowModal1: !this.state.isShowModal1,
      isShowModal3: !this.state.isShowModal3
    })
  }

  _renderSap(){
    return(
      <SapIssue/>
    )
  }

  _renderSendtoEdit(){
    return(
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
            <CloseNotif onClose={this.props.onClose}/>
            <div className="confirmation-container">
              <p className="confirmation-title">Send to Edit</p>
              <p className="confirmation-title">Lifetime Component</p>
              <img className="confirmation-image" src={ImgSendtoEdit} alt="" />
              <p className="confirmation-caption">Are you sure want to Not Approve <b>{this.props.totalData} items?</b></p>
              <div className="btn-row">
                <Button className="button-yes" onClick={this.props.onClose}>Yes</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="button-no" onClick={this.props.onClose}>No</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Modal>
    )
}

	render() {
    if(this.props.idConfirm === "Cancel"){
        return (
          <>
           {this.state.isShowModal1 && (
            <Modal open={this.state.isShowModal1} onClose={this.props.onClose} className="modal-container">
            <DialogContent className="confirmation-modal-content">
              <div className="confirmation-modal">
                <CloseNotif onClose={this.props.onClose}/>
                <div className="confirmation-container">
                  <p className="confirmation-title">Cancel Approve</p>
                  <p className="confirmation-title">Sales Order</p>
                  <img className="confirmation-image" src={ImgCancelApprove} alt="" />
                  <p className="confirmation-caption"><b>Select one</b> to continue cancel approve</p>
                  <div className="btn-row">
                    <Button className="button-edit-lt" onClick={() => this.isClickedSend()}>Edit Lifetime</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className="button-sap-issue" onClick={() => this.isClickedSap()}>SAP Issue</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Modal>
          )     
          }
          {this.state.isShowModal2 && (
            this._renderSap()
          )} 
          {this.state.isShowModal3 && (this._renderSendtoEdit())}   
        </>
        );
    } else if(this.props.idConfirm === "Cancel Edit Success"){
      return (
        <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
          <DialogContent className="confirmation-modal-content">
            <div className="confirmation-modal">
              {/* <CloseNotif onClose={this.props.onClose}/> */}
              <div className="confirmation-container">
                <p className="title-success">Successful</p>
                <img className="confirmation-success" src={ImgCancelEditSucc} alt="" />
                <p className="confirmation-caption">You have sent data to be repaired again</p>
                <div className="btn-row">
                  <Button className="button-continue" onClick={this.props.onClose}>Continue</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Modal>
      );
    }
	}
}
