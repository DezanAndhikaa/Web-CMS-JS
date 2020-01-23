import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import { SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, SortSalesByCompDesc } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons'

export default class ApprovedSalesOrderList extends React.PureComponent {
  state = {
    checkedValue : false
  }

  componentDidMount = async () => {
    this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
  }
  componentDidUpdate = (prevState) =>{
    if (prevState.salesParameter !== this.props.salesParameter || prevState.salesSearch !== this.props.salesSearch || 
      prevState.searchComp !==this.props.searchComp || prevState.selectedFilters !== this.props.selectedFilters) {
      this.setState({checkedValue : false})
    }
  }

  handleClick = () =>{
    this.setState({
      checkedValue : !this.state.checkedValue
    })
  }
  
  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.salesOrderListApproved.Lists.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.salesOrderListApproved.Lists.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.salesOrderListApproved.Lists.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  datePlant = (date) => moment.utc(date, ISO_8601).local().format('DD MMMM YYYY')

    showTableHead() {
      return(
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
            <TableRow>
              <TableCell padding="checkbox">
                {this.props.displaySalesCheckbox  && 
                <Checkbox 
                checked={this.state.checkedValue}
                onChange={this.handleClick}
                onClick={() => {this.props.salesOrderListApproved.Lists.map((row,id) => 
                this.props.onChoosedSales(row,id))}}
                className="checkbox-checked-header" />}
              </TableCell>
              <PlanningListHeader
                name="SO"
              //   isActive={this.props.sortJobsByState.unitModel.isActive}
                delay={300}
                onSearch={this.props.onSearchComp}
              //   isAscending={this.props.sortJobsByState.unitModel.isAscending}
              />
              <PlanningListHeader
                name="Customer"
                isActive={this.props.sortSalesByState.Customer.isActive}
                delay={300}
                isAscending={this.props.sortSalesByState.Customer.isAscending}
                onClick={() => this.props.onClickTabHead(SortSalesByCustomer)}
              />
              <PlanningListHeader
                name="Site"
                isActive={this.props.sortSalesByState.Site.isActive}
                delay={300}
                isAscending={this.props.sortSalesByState.Site.isAscending}
                onClick={() => this.props.onClickTabHead(SortSalesBySite)}
              />
              <PlanningListHeader
                name="Unit Model"
                isActive={this.props.sortSalesByState.UnitModel.isActive}
                delay={300}
                isAscending={this.props.sortSalesByState.UnitModel.isAscending}
                onClick={() => this.props.onClickTabHead(SortSalesByUnitModel)}
              />
              <PlanningListHeader
                name="Comp Desc"
                isActive={this.props.sortSalesByState.CompDesc.isActive}
                delay={300}
                isAscending={this.props.sortSalesByState.CompDesc.isAscending}
                onClick={() => this.props.onClickTabHead(SortSalesByCompDesc)}
              />
              <PlanningListHeader
                name="Part Number"
              // //   isActive={this.props.sortJobsByState.backlogOpen.isActive}
                delay={300}
              // //   isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
              />
              <PlanningListHeader
                name="Unit Code"
              // //   isActive={this.props.sortJobsByState.plantExecution.isActive}
                delay={300}
              // //   isAscending={this.props.sortJobsByState.plantExecution.isAscending}
              />
              <PlanningListHeader
                name="Serial Number"
              // //   isActive={this.props.sortJobsByState.status.isActive}
                delay={300}
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
            <Typography
                name="Action" style={{marginTop: "10px"}}
              // //   isActive={this.props.sortJobsByState.staging.isActive}
              // //   isAscending={this.props.sortJobsByState.staging.isAscending}
              >Action</Typography>
          </TableRow>
        </TableHead>
    )
  }

  showTableBody(row,index) {
    return(
      <TableRow key={index} classes={{ root: 'table-row' }}>
        <TableCell padding="checkbox">
          {this.props.displaySalesCheckbox && 
          <Checkbox 
            disabled={this.isCheckboxAvailable(row)} 
            checked={this.props.salesOrderListApproved.Lists.some((plans) => plans.So === row.So)} 
            onClick={() => this.props.onChoosedSales(row)} 
            classes={{ checked: 'checkbox-checked' }} />}
        </TableCell>
        <TableCell align="left" className="table-cell"> {row.So} </TableCell>
        <TableCell align="left" className="table-cell"> {row.Customer} </TableCell>
        <TableCell align="left" className="table-cell"> {row.Site} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.LifeTimeComponent}</TableCell>
        <TableCell align="left" className="table-cell"> {row.PlanExecution} </TableCell>
        <TableCell align="center" className="table-cell"> <EditButton title="Input Lifetime Component" onStats={this.isPutLifetime} values={this.props.salesOrderListApproved.Lists[index].LifeTimeComponent} field="edit" id={row.So} /></TableCell>
        {/* <TableCell align="center" className="table-cell"> <EditButton /></TableCell> */}
      </TableRow>
    )
  }

  showTableEmpty(){
    if(this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING){
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
    if (this.props.salesOrderListApproved.Lists.length > 0 ){
      return(
        <>
        <Table classes={{ root: 'table' }}>
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.salesOrderListApproved.Lists
              && this.props.salesOrderListApproved.Lists.map((row, id) => (
                this.showTableBody(row,id)
            ))}
          </TableBody>
        </Table>
        {this.showTableEmpty()}
        </>
      )
    }else if(this.props.salesOrderListDeleted.Lists.length > 0 ){
      return(
        <>
        <Table classes={{ root: 'table' }} className="table">
        {this.showTableHead()}
        <TableBody classes={{ root: 'table-body' }}>
          {this.props.salesOrderListDeleted.Lists
            && this.props.salesOrderListDeleted.Lists.map((row, id) => (
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
          <h1>DATA TIDAK ADA</h1>
          {this.showTableEmpty()}
        </TableBody>
        </Table>
        </>
       )
    }
  }
}