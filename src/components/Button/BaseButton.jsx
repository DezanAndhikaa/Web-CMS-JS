import React from 'react';
import { Button, FormLabel } from '@material-ui/core';
import './BaseButton.scss';
import DeleteButton from '../ActionButton/DeleteButton/DeleteButton';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ApproveConfirmation from '../ApproveConfirmation/ApproveConfirmation';

class BaseButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowModal: false,
            index:0
        }
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
                await this.props.approveSales({...this.props.selectedData})
                this.isClosed()
                await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
            if (this.props.titles === "Delete") {
                console.log('masuk whatTabsIsRendered',this.props.deleteSalesData)
                await this.props.deleteSales({...this.props.deleteSalesData})
                this.isClosed()
                await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter)
                await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
            }
        }
        if (this.props.whatTabsIsRendered === false) {
            await this.props.approveService({...this.props.selectedServiceData})
            this.isClosed()
            await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter)
            this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
        }
    }

    // isDeleted = async() => {
    //     console.log('masuk isDeleted')
    //     if (this.props.whatTabsIsRendered === true) {

    //     }
    //     if (this.props.whatTabsIsRendered === false) {
    //         await this.props.deleteService({...this.props.deleteServiceData})
    //         this.isClosed()
    //         await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter)
    //         this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
    //     }
    // }

    render(){
        if(this.props.titles === "Total"){
            return(
                <div className="button-inline">
                    <FormLabel className="label-selected-data"> {this.props.totalSelectedItems} items selected.</FormLabel>
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
        } else if(this.props.titles === "Download"){
            return(
                <div className="button-inline">
                    <Button className="btn-download" onClick={this.isClicked}>Download</Button>
                </div>
            )
        } else if(this.props.titles === "Approve"){
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
        }
        // else {
        //     return(
        //         <div className="button-inline">
        //             <DeleteButton 
        //                 {...this.props}
        //                 {...this.state}
        //                 onClick={this.isClicked}
        //             />
        //             <DeleteConfirmation
        //                 {...this.props}
        //                 {...this.state}
        //                 onClose={this.isClosed}
        //                 openModal={this.state.isShowModal}
        //                 onDelete={this.isApproved}
        //             />
        //             <Button className="btn-download" onClick={this.isClicked}>Download</Button>
        //             <Button className="btn-approve" onClick={this.isClicked}>Approve</Button>
        //         </div>
        //     )
        // }
    }
}

export default BaseButton;