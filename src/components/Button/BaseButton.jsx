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
            isSuccess: false,
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

    isShowModalInfo = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
            isSuccess: !this.state.isSuccess
        })
    }

    showModalInfo(){
        console.log('cek masuk gak: ', this.props.fetchStatusSales)
        if(this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED){
          return(
            <UnapproveConfirmation
                {...this.props}
                idConfirm= "Successfull"
                onClose={this.isClosed}
                openModal={this.state.isShowModal}
            />
          )
        }
    }

    isApproved = async() => {
        console.log('masuk isAPprove')
        if (this.props.whatTabsIsRendered === true) {
            if (this.props.titles === "Approve") {
                console.log('masuk whatTabsIsRendered',this.props.selectedData)
                await this.props.handleSalesApprove()
                this.isClosed()
                await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
            if (this.props.titles === "Delete") {
                console.log('masuk whatTabsIsRendered',this.props.deleteSalesData)
                await this.props.handleDeleteSales()
                this.isClosed()
                await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
            if (this.props.titles === "Cancel Approve"){
                await this.props.handleSendtoEdit()
                this.showModalInfo()
                this.isClosed()
                await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
        }
        if (this.props.whatTabsIsRendered === false) {
            if (this.props.titles === "Approve") {
                await this.props.handleServiceApprove();
                this.isClosed()
                await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter)
                this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
            }
            if (this.props.titles === "Delete") {
                await this.props.handleDeleteService();
                
                this.isClosed()
                await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter)
                this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
            }
        }
    }

    isDownloaded = async() => {
        if (this.props.whatTabsIsRendered === true) {
            console.log('kkkkkk sales')
            await this.props.handleSalesApprovedDownload()
        }if (this.props.whatTabsIsRendered === false) {
            console.log('kkkkkk')
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
                    {/* <ApproveConfirmation
                        {...this.props}
                        {...this.state}
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        totalData={this.props.totalSelectedItems}
                        onApprove={this.isApproved}
                    /> */}
                    <ConfirmationModal 
                        {...this.props}
                        idModal = "SAP"
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
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
                    <div className="button-inline">
                        <Button className="btn-permanently"> Delete Permanently </Button>
                    </div>
                </div>
            )
        } 
    }
}

export default BaseButton;