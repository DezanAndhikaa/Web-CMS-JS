import React from 'react';
import { DialogContent, Button, Modal, CircularProgress } from '@material-ui/core';
import { ImgSendtoEdit, ImgCancelApprove, ImgCancelEditSucc } from '../../assets/imgs';
import './UnapproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';
// import SapIssue from '../../views/planning/details/components/SapIssue/SapIssue';
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { Menu } from '../../constants';

export default class UnapproveConfirmation extends React.PureComponent {

  state={
    isShowModalUnapprove: false,
    isShowModalSend: false,
  }

  componentDidUpdate = (prevProps) =>{
    if (prevProps.openModal !== this.props.openModal)
    this.setState({
      isShowModalUnapprove: this.props.openModal
    })
  }

  isClickedSend = () => {
    this.setState({
      isShowModalUnapprove: !this.state.isShowModalUnapprove,
      isShowModalSend: !this.state.isShowModalSend
    })
  }

  isClosedSend = () => {
    this.setState({
      isShowModalSend: !this.state.isShowModalSend,
      isShowModalUnapprove: !this.state.isShowModalUnapprove
    })
  }

  _renderSendtoEdit(){
    return(
      <Modal open={this.props.openModal} className="modal-unapprove">
        <DialogContent className="unapprove-confirmation-content">
          <div className="confirmation-modal-unapprove">
            <CloseNotif onClose={this.props.onClose}/>
            <div className="confirmation-container-unapprove">
              <p className="confirmation-title-unapprove">Send to Edit</p>
              <p className="confirmation-title-unapprove">Lifetime Component</p>
              <img className="confirmation-image-unapprove" src={ImgSendtoEdit} alt="" />
              <p className="confirmation-caption-unapprove">Are you sure want to Not Approve <b>{this.props.totalData} items?</b></p>
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

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

	render() {
    if(this.props.idConfirm === "Cancel"){
        return (
          <>
           {this.state.isShowModalUnapprove && (
            <Modal open={this.state.isShowModalUnapprove} className="modal-unapprove">
            <DialogContent className="unapprove-confirmation-content">
              <div className="confirmation-modal-unapprove">
                <CloseNotif onClose={this.props.onClose}/>
                <div className="confirmation-container-unapprove">
                  <p className="confirmation-title-unapprove">Cancel Approve</p>
                  {this.props.idCancel === "Sales" ? <p className="confirmation-title-unapprove">Sales Order</p> :
                  <p className="confirmation-title-unapprove">Service Order</p>}
                  <img className="confirmation-image-unapprove" src={ImgCancelApprove} alt="" />
                  <p className="confirmation-caption-unapprove"><b>Select one</b> to continue cancel approve</p>
                  <div className="btn-row">
                    {this.props.whichTabs ? <Button className="button-edit-lt" onClick={() => this.isClickedSend()}>Edit Lifetime</Button> : null }
                    <Button className={this.props.whichTabs ? "button-sap-issue" : "button-sap-issue-service"} onClick={this.props.whichTabs? () => this.handleClick(Menu.PLANNING_SAP, 'sales') : this.handleClick(Menu.PLANNING_SAP, 'service')}>SAP Issue</Button>
                  </div>
                  <div className={this.props.whichTabs ? "labelMax" : "labelMax-service" }>
                    <label>* Max 5 Items</label>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Modal>
          )     
          }
          {this.props.fetchStatusPutSAPIssue === ApiRequestActionsStatus.LOADING &&  (
            this.renderCircularProgress()
          )}
          {this.state.isShowModalSend && (
            this._renderSendtoEdit()
          )}
        </>
        );
    } else if(this.props.idConfirm === "Send Success"){
      return(
        <Modal open={this.props.openModal} className="modal-unapprove">
        <DialogContent className="unapprove-confirmation-content">
          <div className="confirmation-modal-unapprove">
            <div className="confirmation-container-unapprove">
              <p className="title-success-unapprove">Successful</p>
              <img className="confirmation-success-unapprove" src={ImgCancelEditSucc} alt="" />
              <p className="confirmation-caption-unapprove">You have sent data to be repaired again</p>
              <div className="btn-row">
                <Button className="button-continue" onClick={ () => {this.props.onClose()} }>Continue</Button>
              </div>
            </div>
          </div>
        </DialogContent> 
      </Modal>
      )
    }
	}
}