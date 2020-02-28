import React from 'react';
import { Button, FormLabel } from '@material-ui/core';
import './BaseButton.scss';
import EditButton from '../ActionButton/EditButton/EditButton';
import DeleteButton from '../ActionButton/DeleteButton/DeleteButton';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ApproveConfirmation from '../ApproveConfirmation/ApproveConfirmation';
import UnapproveConfirmation from '../UnapproveConfirmation/UnapproveConfirmation'
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class BaseButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowModal: false,
            isShowApprovedModal: false,
            index:0
        }
    }

    componentDidMount(){
        // console.log('sel sel sel masok 2',  this.props.selectedDataSAP)
    }

     isClicked = () => {
       this.setState({isShowModal: !this.state.isShowModal})
    }

    isClosed = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isApproved = async() => {
        console.log('masuk isAPprove')
        if (this.props.whatTabsIsRendered === true) {
            if (this.props.titles === "Approve") {
                // this.isOpened()
                await this.props.handleSalesApprove()
            }
            if (this.props.titles === "Delete") {
                await this.props.handleDeleteSales()
                this.isClosed()
                // await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                // await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
            if (this.props.titles === "Cancel Approve"){
                await this.props.handleSendtoEdit()
                // this.showModalInfo()
                this.isClosed()
            }
            if (this.props.titles === "Permanently"){
                this.isClosed()
            }
        }
        if (this.props.whatTabsIsRendered === false) {
            if (this.props.titles === "Approve") {
                await this.props.handleServiceApprove();
                this.isClosed()
            }
            if (this.props.titles === "Delete") {
                await this.props.handleDeleteService();
                this.isClosed()
            }
        }
    }

    isDownloaded = async() => {
        if (this.props.whatTabsIsRendered === true) {
            await this.props.handleSalesApprovedDownload()
        }if (this.props.whatTabsIsRendered === false) {
            await this.props.handleServiceApprovedDownload()
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
        }else if(this.props.titles === "Cancel Approve"){
            return(
                <div className="button-inline">
                    <Button className="btn-cancel-approve" onClick={this.isClicked} disabled={this.props.disabledButton}> Cancel Approve</Button>
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
                    <EditButton />
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