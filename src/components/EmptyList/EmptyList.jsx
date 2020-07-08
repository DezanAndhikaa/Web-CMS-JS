import React from 'react';
import { Empty } from '../../assets/imgs';
import './EmptyList.scss';

export default class EmptyList extends React.PureComponent {
    render() {
        return(
            <div className="paper-empty-list">
                <img className="empty-image" src={Empty} alt="" />
                <div className="caption-image">
                    <p className="header-caption">
                        {this.props.idEmpty === "Sales" ? "Sales Order List" :
                        this.props.idEmpty === "Rev" ? "Revision List" :
                        this.props.idEmpty === "Input" ? "Lifetime Component List" :
                        this.props.idEmpty === "Approve" ? "Approved List" :
                        this.props.idEmpty === "NA" ? "Not Approved List" :
                        this.props.idEmpty === "Delete" ? "Deleted List" :
                        this.props.idEmpty === "SAP" ? "SAP Issue List" : "Service Order List"}
                    </p>
                    <p className="caption1">You still don't have the 
                        {this.props.idEmpty === "Sales" ? " sales order list" :
                        this.props.idEmpty === "Rev" ? " revision" :
                        this.props.idEmpty === "Input" ? " lifetime component list" :
                        this.props.idEmpty === "Approve" ? " approved list" :
                        this.props.idEmpty === "NA" ? " not approved list" :
                        this.props.idEmpty === "Delete" ? " deleted list" :
                        this.props.idEmpty === "SAP" ? " SAP Issue" : " service order list"} record,
                    </p>
                    <p className="caption2">Let's keep it</p>
                </div>
            </div>
        )
    }
}