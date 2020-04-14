import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import { SortServiceByCustomer, SortServiceBySite, SortServiceByUnitModel, SortServiceByCompDesc, LifetimeFilterAction, DateFilterAction } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons';

export default class ServiceOrderList extends React.PureComponent {
  state = {
    checkedValue : false
  }

  componentDidMount = async () => {
    await this.props.clearSelectedServicePlans();
    // await this.props.onClickServiceOrder();
  }
  componentDidUpdate = (prevState) =>{
    if (prevState.serviceParameter !== this.props.serviceParameter || prevState.serviceSearch !== this.props.serviceSearch || 
      prevState.searchComp !==this.props.searchComp || prevState.selectedFilters !== this.props.selectedFilters) {
      this.setState({checkedValue : false})
    }if (this.props.fetchStatusService === ApiRequestActionsStatus.LOADING) {
      this.setState({checkedValue : false})
    }
  }

  componentWillMount = () =>{
    this.props.updateServiceParameter({
      ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  handleClick = () =>{
    this.setState({
      checkedValue : !this.state.checkedValue
    })
  }

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.serviceParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.serviceParameter.dataFilter.PageSize );
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
              {this.props.idService === "Data Input" ? "" :
                <TableCell padding="checkbox">
                  {this.props.displayServiceCheckbox  && 
                  <Checkbox 
                  checked={this.state.checkedValue}
                  onChange={this.handleClick}
                  onClick={() => {this.props.serviceOrderList.Lists.map((row,id) => 
                  this.props.onChoosedService(row,id))}}
                  className="checkbox-checked-header" />}
                </TableCell>
              }
              <PlanningListHeader
                name="Work Order"
                delay={300}
                onSearch={this.props.onSearchComp}
              />
              <PlanningListHeader
                name="Customer"
                delay={300}
                onClick={() => this.props.onClickTabHead(SortServiceByCustomer)}
              />
              <PlanningListHeader
                name="Site"
                delay={300}
                onClick={() => this.props.onClickTabHead(SortServiceBySite)}
              />
              <PlanningListHeader
                name="Unit Model"
                delay={300}
                onClick={() => this.props.onClickTabHead(SortServiceByUnitModel)}
              />
              <PlanningListHeader
                name="Comp Desc"
                delay={300}
                onClick={() => this.props.onClickTabHead(SortServiceByCompDesc)}
              />
              <PlanningListHeader
                name="Part Number"
                delay={300}
                onSearch={this.props.onSearchComp}
              />
              <PlanningListHeader
                name="Unit Code"
                delay={300}
                onSearch={this.props.onSearchComp}
              />
              <PlanningListHeader
                name="Serial Number"
                delay={300}
                onSearch={this.props.onSearchComp}          
              />
          <PlanningListHeader
              name="Lifetime"
              delay={300}
              onFilter={this.isFilterLifetime}
            />
            <PlanningListHeader
              name="Plan"
              delay={300}
              onFilter={this.isFilterDate}
            />
          </TableRow>
        </TableHead>
    )
  }

  showTableBody(row,index) {
    return(
      <TableRow key={index} classes={{ root: 'table-row' }}>
        {this.props.idService === "Data Input" ? "" :
          <TableCell padding="checkbox">
            {this.props.displayServiceCheckbox && 
            <Checkbox 
              disabled={this.isCheckboxAvailable(row)} 
              checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
              onClick={() => this.props.onChoosedService(row)} 
              classes={{ checked: 'checkbox-checked' }} 
            />}
          </TableCell>
        }
        <TableCell align="left" className="table-cell"> {row.WoNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.LifeTimeComponent}</TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
      </TableRow>
    )
  }

  showLoading(){
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
    }else if(this.props.fetchStatusService === ApiRequestActionsStatus.FAILED){
      return(
        <div className="loading-container">
          OOPS THERE WAS AN ERROR :'(
        </div>
      )
    }else if(this.props.serviceOrderList.Lists.length === 0){
      return(
        <div className="loading-container">
          DATA NOT FOUND
        </div>
      )
    }
  }

  render(){
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
      {this.showLoading()}
      </>
      )
  }
}