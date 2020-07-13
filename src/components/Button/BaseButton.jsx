import React from 'react';
import { Button, FormLabel } from '@material-ui/core';
import './BaseButton.scss';
import EditButton from '../ActionButton/EditButton/EditButton';
import DeleteButton from '../ActionButton/DeleteButton/DeleteButton';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ApproveConfirmation from '../ApproveConfirmation/ApproveConfirmation';
import UnapproveConfirmation from '../UnapproveConfirmation/UnapproveConfirmation'
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';

class BaseButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowModal: false,
            isShowApprovedModal: false,
            index:0
        }
    }

    handleClick = (menu, tab) => {
        this.props.push({
          pathname: menu,
          whichTab: tab
        });
    }

    isClicked = () => {
       this.setState({isShowModal: !this.state.isShowModal})
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isApproved = async() => {
        if (this.props.whatTabsIsRendered === true) {
            if (this.props.titles === "Approve") {
                await this.props.handleSalesApprove()
            }
            if (this.props.titles === "Delete") {
                await this.props.handleDeleteSales()
            }
            if (this.props.titles === "Reject"){
                await this.props.handleSendtoEdit()
                this.isClosed()
            }
            if (this.props.titles === "Permanently"){
                await this.props.handleDeletePermanent()
                this.isClosed()
            }
        }
        if (this.props.whatTabsIsRendered === false) {
            if (this.props.titles === "Approve") {
                await this.props.handleServiceApprove();
            }
            if (this.props.titles === "Delete") {
                await this.props.handleDeleteService();
            }
            if (this.props.titles === "Permanently"){
                await this.props.handleDeletePermanent()
                this.isClosed()
            }
        }
    }

    isDownloaded = async() => {
        if (this.props.whatTabsIsRendered === true) {
            await this.props.handleSalesDownload()
        }if (this.props.whatTabsIsRendered === false) {
            await this.props.handleServiceDownload()
        }
    }

    render(){
        if(this.props.titles === "Total"){
            return(
                <div className="button-inline">
                    <FormLabel className="label-selected-data"> {this.props.totalSelectedItems} items selected.</FormLabel>
                </div>
            )
        }else if(this.props.titles === "Approve"){
            return(
                <div className="button-inline">
                    <Button className="btn-approve" onClick={this.isClicked} disabled={this.props.disabledButton}>Approve</Button>
                    <ApproveConfirmation
                        {...this.props}
                        {...this.state}
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        totalData={this.props.totalSelectedItems}
                        onApprove={this.isApproved}
                    />
                </div>
            )
        }else if(this.props.titles === "Reject"){
            return(
                <div className="button-inline">
                    <Button className={this.props.idReject === "Sales" ? "btn-cancel-approve" : "btn-reject-service"} 
                        onClick={this.isClicked} disabled={this.props.disabledButton}>
                        { this.props.idReject === "Sales" ? "Reject" : "SAP Issue" }
                    </Button>
                    <UnapproveConfirmation 
                        {...this.props}
                        idConfirm = "Cancel"
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        totalData={this.props.totalSelectedItems}
                        onSendtoEdit = {this.isApproved}
                    />
                </div>
            )
        }else if(this.props.titles === "Download"){
            return(
                <div className="button-inline">
                    <Button className="btn-download" onClick={this.isDownloaded}>Download </Button>
                </div>
            )
        }else if(this.props.titles === "Edit"){
            return(
                <div className="button-inline">
                    <EditButton idEdit="Approval" />
                </div>
            )
        }else if(this.props.titles === "Delete"){
            return(
                <div className="button-inline">
                    <DeleteButton 
                        {...this.props}
                        {...this.state}
                        onClick={this.isClicked}
                        disabled={this.props.disabledButton}
                    />
                    <DeleteConfirmation
                        {...this.props}
                        {...this.state}
                        idDelete="Delete"
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        totalData={this.props.totalSelectedItems}
                        onDelete={this.isApproved}
                    />
                </div>
            )
        }else if(this.props.titles === "Permanently"){
            return(
                <div className="button-inline">
                    <DeleteButton 
                        {...this.props}
                        {...this.state}
                        onClick={this.isClicked}
                        disabled={this.props.disabledButton}
                    />
                    <DeleteConfirmation
                        {...this.props}
                        {...this.state}
                        idDelete="Permanent"
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        totalData={this.props.totalSelectedItems}
                        onDelete={this.isApproved}
                    />
                </div>
            )
        }else if(this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.SUCCEEDED){
            this._renderApprovedModal()
        } 
    }
}

export default BaseButton;