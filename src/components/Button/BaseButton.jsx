import React from 'react';
import { Button, FormLabel } from '@material-ui/core';
import './BaseButton.scss';
import EditButton from '../ActionButton/EditButton/EditButton';
import DeleteButton from '../ActionButton/DeleteButton/DeleteButton';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ApproveConfirmation from '../ApproveConfirmation/ApproveConfirmation';
import UnapproveConfirmation from '../UnapproveConfirmation/UnapproveConfirmation';

class BaseButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowModal: false,
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

    isSendtoEdit(){
        return(
            <>
                {/* {this.isClicked} */}
                <UnapproveConfirmation 
                    // {...this.props}
                    idConfirm = "Send to Edit"
                    // onClose={this.isClosed}
                    // openModal={this.state.isShowModal}
                    // onSendtoEdit = {this.isSendtoEdit()}
                />
            </>
        )
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
                    <Button className="btn-cancel-approve" onClick={this.isClicked}> Cancel Approve</Button>
                    <UnapproveConfirmation 
                        {...this.props}
                        idConfirm = "Cancel"
                        onClose={this.isClosed}
                        openModal={this.state.isShowModal}
                        // data={this.props.data}
                        // onSendtoEdit = {this.isSendtoEdit}
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
        }
    }
}

export default BaseButton;