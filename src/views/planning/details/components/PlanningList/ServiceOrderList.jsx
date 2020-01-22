import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import { SortServiceByCustomer, SortServiceBySite, SortServiceByUnitModel, SortServiceByCompDesc } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons'

export default class ServiceOrderList extends React.PureComponent {

  componentDidMount = async () => {
    await this.props.onClickServiceOrder();
  }
  
  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedServicePlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  datePlant = (date) => moment.utc(date, ISO_8601).local().format('DD MMMM YYYY')

  showTableHead() {
    return(
      <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow>
            <TableCell padding="checkbox">
              {this.props.displayServiceCheckbox  && <Checkbox className="checkbox-checked-header" />}
            </TableCell>
            <PlanningListHeader
              name="Work Order"
            //   isActive={this.props.sortJobsByState.unitModel.isActive}
              delay={300}
              onSearch={this.props.onSearchCompService}
            //   isAscending={this.props.sortJobsByState.unitModel.isAscending}
            />
            <PlanningListHeader
              name="Customer"
              isActive={this.props.sortServiceByState.Customer.isActive}
              delay={300}
              isAscending={this.props.sortServiceByState.Customer.isAscending}
              onClick={() => this.props.onClickTabHead(SortServiceByCustomer)}
            />
            <PlanningListHeader
              name="Site"
              isActive={this.props.sortServiceByState.Site.isActive}
              delay={300}
              isAscending={this.props.sortServiceByState.Site.isAscending}
              onClick={() => this.props.onClickTabHead(SortServiceBySite)}
            />
            <PlanningListHeader
              name="Unit Model"
              isActive={this.props.sortServiceByState.UnitModel.isActive}
              delay={300}
              isAscending={this.props.sortServiceByState.UnitModel.isAscending}
              onClick={() => this.props.onClickTabHead(SortServiceByUnitModel)}
            />
            <PlanningListHeader
              name="Comp Desc"
              isActive={this.props.sortServiceByState.CompDesc.isActive}
              delay={300}
              isAscending={this.props.sortServiceByState.CompDesc.isAscending}
              onClick={() => this.props.onClickTabHead(SortServiceByCompDesc)}
            />
            <PlanningListHeader
              name="Part Number"
            // //   isActive={this.props.sortJobsByState.backlogOpen.isActive}
              delay={300}
              onSearch={this.props.onSearchCompService}
            // //   isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
            />
            <PlanningListHeader
              name="Unit Code"
            // //   isActive={this.props.sortJobsByState.plantExecution.isActive}
              delay={300}
              onSearch={this.props.onSearchCompService}
            // //   isAscending={this.props.sortJobsByState.plantExecution.isAscending}
            />
            <PlanningListHeader
              name="Serial Number"
            // //   isActive={this.props.sortJobsByState.status.isActive}
              delay={300}
              onSearch={this.props.onSearchCompService}
            // //   isAscending={this.props.sortJobsByState.status.isAscending}            
            />
          <PlanningListHeader
              name="Lifetime"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="Plan"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            {/* <PlanningListHeader
              name="Action"
              align="center"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            /> */}
          </TableRow>
        </TableHead>
    )
  }

  showTableBody(row,index) {
    return(
      <TableRow key={index} classes={{ root: 'table-row' }}>
        <TableCell padding="checkbox">
          {this.props.displayServiceCheckbox && 
          <Checkbox 
            disabled={this.isCheckboxAvailable(row)} 
            checked={this.props.selectedServicePlanList.some((plans) => plans.Wo === row.Wo)} 
            onClick={() => this.props.onChoosedService(row)} 
            classes={{ checked: 'checkbox-checked' }} />}
        </TableCell>
        <TableCell align="left" className="table-cell"> {row.Wo} </TableCell>
        <TableCell align="left" className="table-cell"> {row.Customer} </TableCell>
        <TableCell align="left" className="table-cell"> {row.Site} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.LifeTimeComponent}</TableCell>
        <TableCell align="left" className="table-cell"> {row.PlanExecution} </TableCell>
        {/* <TableCell align="center" className="table-cell"> <EditButton /></TableCell> */}
      </TableRow>
    )
  }

  showTableEmpty(){
    if(this.props.fetchStatusService === ApiRequestActionsStatus.LOADING){
      return(
        <div className="loading-container">
          <img 
            src={Spinner}
            alt="loading-spinner"
            className="loading-icon"
            />
        </div>
      )
    }
  }

  render(){
    if (this.props.serviceOrderListApproved.Lists.length > 0 ){
      return(
        <>
        <Table classes={{ root: 'table' }}>
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.serviceOrderListApproved.Lists
              && this.props.serviceOrderListApproved.Lists.map((row, id) => (
                this.showTableBody(row,id)
            ))}
          </TableBody>
        </Table>
        {this.showTableEmpty()}
        </>
      )
    }else if(this.props.serviceOrderListDeleted.Lists.length > 0 ){
      return(
        <>
        <Table classes={{ root: 'table' }} className="table">
        {this.showTableHead()}
        <TableBody classes={{ root: 'table-body' }}>
          {this.props.serviceOrderListDeleted.Lists
            && this.props.serviceOrderListDeleted.Lists.map((row, id) => (
              this.showTableBody(row,id)
            ))}
          </TableBody>
        </Table>
        {this.showTableEmpty()}
        </>
      )
    }else{
      return(
        <>
        <Table classes={{ root: 'table' }} className="table">
        {this.showTableHead()}
        <TableBody classes={{ root: 'table-body' }}>
          {this.props.serviceOrderList.Lists
            && this.props.serviceOrderList.Lists.map((row, id) => (
              this.showTableBody(row,id)
            ))}
          </TableBody>
        </Table>
        {this.showTableEmpty()}
        </>
       )
    }
  }
}