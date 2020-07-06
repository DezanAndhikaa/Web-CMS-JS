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
    isShowModalSapSucced: false,
    isShowModalSapFailed: false
  }

  isSAPIssue = async(data) => {
    await this.props.putSAPIssue({SAPIssues: data }, this.props.token, this.props.whichTabs);
  }

  onKelik =  async( description) => {
    const index = this.props.selectedDataSAP.length
    let arr = []
    if(this.props.whichTabs){
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].SoNumber, Message: description[i]}]
      }
    }else{
      for(let i=0; i<index; i++){
        arr = [...arr,{NumberOrder: this.props.selectedDataSAP[i].WoNumber, Message: description[i]}]
      }
    }
    this.setState({
      SAPIssue: arr
    },
    () => this.isSAPIssue(arr) 
    )
  }

  componentDidUpdate = (prevProps) =>{
    if (prevProps.openModal !== this.props.openModal)
    this.setState({
      isShowModalUnapprove: this.props.openModal
    })
  }

  isTry = () => {
    this.setState({
      isShowModalSap: !this.state.isShowModalSap,
      isShowModalSapSucced: !this.state.isShowModalSapSucced,
      isShowModalSapFailed: !this.state.isShowModalSapFailed
    })
  }

  isClickedCloseBtn = () => {
    this.setState({
      isShowModalSap: !this.state.isShowModalSap,
      isShowModalSapFailed: !this.state.isShowModalSapFailed
    })
  }

  isClickedBackBtn = () => {
    this.setState({
      isShowModalSapFailed: !this.state.isShowModalSapFailed,
      isShowModalUnapprove: !this.state.isShowModalUnapprove
    })
  }

  isTryClosed = () => {
    this.setState({
      isShowModalSapSucced: !this.state.isShowModalSapSucced,
    })
  }

  isClosedFailed = () => {
    this.setState({
      isShowModalSapFailed: !this.state.isShowModalSapFailed,
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

  isReload = () => {
    this.props.fetchSalesOrder({
      ...this.props.salesParameter.dataFilter, 
      Filter : 
        [...this.props.salesParameter.dataFilter.Filter, {
          Field : 'LifeTimeComponent',
          Operator : "neq",
          Value : '-',
          Logic : "AND"
        },{
          Field : 'SAPIssueMessage',
          Operator : 'eq',
          Value : '-',
          Logic : 'AND'
        },{
          Field : 'IsRevised',
          Operator : 'eq',
          Value : 'false',
          Logic : 'AND'
        }]
    }, this.props.token);
  }

  _renderSap(open){
    return(
      <SapIssue 
        {...this.props} 
        isShowModal={open} 
        isClosed={this.isClosedSap} 
        isTry={this.isTry} 
        onKelik={this.onKelik}
        isClose={this.isClickedCloseBtn}
        isBack={this.isClickedCloseBtn}
      />
    )
  }

  _renderSapSucced(){
    return(
      <ConfirmationModal handleReload={this.isReload} isModal={this.state.isShowModalSapSucced} idModal="SAP" isModalClosed={this.isTryClosed} />
    )
  }

  _renderSapFailed(){
    return(
      <>
      <ConfirmationModal 
        {...this.props}
        handleReload={this.isReload} 
        isModal={this.state.isShowModalSapFailed} 
        idModal="SAP-Failed"
        idFailed="CloseBtn" 
        isModalClosed={this.isClosedFailed}
        backToSAP={this.isClickedCloseBtn}
        backToConfirmModal={this.isClickedBackBtn}
      />
      <ConfirmationModal 
        {...this.props}
        handleReload={this.isReload} 
        isModal={this.state.isShowModalSapFailed} 
        idModal="SAP-Failed"
        isModalClosed={this.isClosedFailed}
        backToSAP={this.isClickedCloseBtn}
        backToConfirmModal={this.isClickedBackBtn}
      />
      </>
    )
  }

  _renderSendtoEdit(){
    return(
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-unapprove">
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

	render() {
    if(this.props.idConfirm === "Cancel"){
        return (
          <>
           {this.state.isShowModalUnapprove && (
            <Modal open={this.state.isShowModalUnapprove} onClose={this.props.onClose} className="modal-unapprove">
            <DialogContent className="unapprove-confirmation-content">
              <div className="confirmation-modal-unapprove">
                <CloseNotif onClose={this.props.onClose}/>
                <div className="confirmation-container-unapprove">
                  <p className="confirmation-title-unapprove">Reject</p>
                  <p className="confirmation-title-unapprove">{this.props.whichTabs ? "Sales Order" : "Service Order"}</p>
                  <img className="confirmation-image-unapprove" src={ImgCancelApprove} alt="" />
                  <p className="confirmation-caption-unapprove"><b>{this.props.whichTabs ? "Select one" : "Press SAP Issue button"}</b> to continue reject</p>
                  <div className="btn-row">
                    {this.props.whichTabs ? <Button className="button-edit-lt" onClick={() => this.isClickedSend()}>Edit Lifetime</Button> : null }
                    <Button className={this.props.whichTabs ? "button-sap-issue" : "button-sap-issue-service"} onClick={() => this.isClickedSap()}>SAP Issue</Button>
                  </div>
                  <div className={this.props.whichTabs ? "labelMax" : "labelMax-service" }>
                    <label>* Max 5 Items and, </label><br />
                    <label className="label">Desc must be filled</label>
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
          {this.state.isShowModalSapFailed && (
            this._renderSapFailed()
          )}
        </>
        );
    } else if(this.props.idConfirm === "Send Success"){
      return(
        <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-unapprove">
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