import React from 'react';
import { DialogContent, Button, Modal, CircularProgress } from '@material-ui/core';
import { ImgSendtoEdit, ImgCancelApprove, ImgCancelEditSucc } from '../../assets/imgs';
import './UnapproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';
import SapIssue from '../../views/planning/details/components/SapIssue/SapIssue'
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

export default class UnapproveConfirmation extends React.PureComponent {

  state={
    isShowModalUnapprove: false,
    isShowModalSap: false,
    isShowModalSend: false,
    isShowModalSapSucced: false
  }

  isSAPIssue = async(data) => {
    console.log('kluk  '+ data)
    await this.props.putSAPIssue({SAPIssues: data }, this.props.token);
  }

  onKelik =  async( description) => {
    const index = this.props.selectedDataSAP.length
    let arr = []
    for(let i=0; i<index; i++){
      arr = [...arr,{SoNumber: this.props.selectedDataSAP[i].SoNumber, Message: description[i]}]
    }
    this.setState({
      SAPIssue: arr
    },
    () => this.isSAPIssue(arr) 
    )
  }

  componentDidUpdate = (prevProps) =>{
    if (prevProps.openModal != this.props.openModal)
    this.setState({
      isShowModalUnapprove: this.props.openModal
    })
  }

  isTry = () => {
    this.setState({
      isShowModalSap: !this.state.isShowModalSap,
      isShowModalSapSucced: !this.state.isShowModalSapSucced
    })
  }

  isTryClosed = () => {
      this.setState({
        isShowModalSapSucced: !this.state.isShowModalSapSucced
      })
  }

  isClickedSap = () => {
    this.setState({
      isShowModalUnapprove: !this.state.isShowModalUnapprove,
      isShowModalSap: !this.state.isShowModalSap
    })
  }

  isClickedSend = () => {
    this.setState({
      isShowModalUnapprove: !this.state.isShowModalUnapprove,
      isShowModalSend: !this.state.isShowModalSend
    })
  }

  isClosedSap = () => {
    this.setState({
      isShowModalSap: !this.state.isShowModalSap,
      isShowModalUnapprove: !this.state.isShowModalUnapprove
    })
  }

  isClosedSend = () => {
    this.setState({
      isShowModalSend: !this.state.isShowModalSend,
      isShowModalUnapprove: !this.state.isShowModalUnapprove
    })
  }

  _renderSap(open){
    return(
      <SapIssue {...this.props} isShowModal={open} isClosed={this.isClosedSap} isTry={this.isTry} isSucced={this._renderSapSucced} onKelik={this.onKelik}/>
    )
  }

  _renderSapSucced(){
    return(
      <ConfirmationModal isModal={this.state.isShowModalSapSucced} idModal="SAP" isModalClosed={this.isTryClosed}/>
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
                <Button className="button-yes" onClick={this.props.onSendtoEdit}>Yes</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="button-no" onClick={this.props.onClose}>No</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Modal>
    )
}

  renderCircularProgress() {
      return <CircularProgress size={100} className="circular-progress" />;
  }

  _renderEditSuccess(){
    return (
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
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

	render() {
    console.log("ApiRequestActionsStatus",this.props.fetchStatusPutSAPIssue)
    if(this.props.idConfirm === "Cancel"){
        return (
          <>
           {this.state.isShowModalUnapprove && (
            <Modal open={this.state.isShowModalUnapprove} onClose={this.props.onClose} className="modal-container">
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
                  <div className="labelMax">
                    <label>* Max 5 Items</label>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Modal>
          )     
          }
          {this.state.isShowModalSap && (
            this._renderSap(this.state.isShowModalSap)
          )}
          {this.props.fetchStatusPutSAPIssue === ApiRequestActionsStatus.LOADING &&  (
            this.renderCircularProgress()
          )}
          {this.props.fetchStatusPutSAPIssue === ApiRequestActionsStatus.SUCCEEDED && (
            this._renderSapSucced()
          )} 
          {this.state.isShowModalSend && (
            this._renderSendtoEdit()
          )}
          {this.props.fetchStatusUnapprove === ApiRequestActionsStatus.LOADING &&  (
            this.renderCircularProgress()
          )}   
          {this.props.fetchStatusUnapprove === ApiRequestActionsStatus.SUCCEEDED && (
            this._renderEditSuccess()
          )} 
        </>
        );
    }
	}
}
