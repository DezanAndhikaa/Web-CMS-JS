import React from 'react';
import moment from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import { SortServiceByCustomer, SortServiceBySite, SortServiceByUnitModel, SortServiceByCompDesc, LifetimeFilterAction, DateFilterAction } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons'
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';

export default class ApprovedServiceOrderList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: false,
      stats: false,
      putLifetime: {
        SoNumber : '',
        LifeTimeComponent : '',
      }
    }
  }

  componentDidUpdate = (prevState) =>{
    //untuk menghilangkan checkbox
    if (prevState.serviceApprovedParameter !== this.props.serviceApprovedParameter || prevState.serviceSearch !== this.props.serviceSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
    if (this.props.fetchStatusServiceApproved === ApiRequestActionsStatus.LOADING) {
      // console.log('ke trigger')
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickServiceOrderApproved();
  }
  
  componentWillMount = ()=>{
    this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter,  PageNumber: 1, PageSize: 10, Sort: [], Filter: []})
  }

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.serviceApprovedParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.serviceApprovedParameter.dataFilter.PageSize );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedServicePlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  // isChangeStat = (value,key) =>{
  //   this.setState({
  //     stats: 1,
  //     lifetime: this.state.lifetime.map(el => (el.SoNumber === key ? {...el, LifeTimeComp : value} : el))
  //   });
  // }

  handleClicks = () =>{
    this.setState({
      checkedValue : !this.state.checkedValue
    })
  }

  showTableHead() {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
        <TableRow classes={{ root: 'table-row' }}>
        {/* <TableRow> */}
          <TableCell padding="checkbox">
            {this.props.displayServiceCheckbox && 
            <Checkbox 
              checked={this.state.checkedValue}
              onChange={this.handleClicks}
              onClick={() => {this.props.serviceOrderListApproved.Lists.map((row,id) => 
              this.props.onChoosedService(row,id))}}
              className="checkbox-checked-header"/>}
          </TableCell>
          <PlanningListHeader
            name="Work Order"
            // isActive={this.props.sortJobsByState.unitModel.isActive}
            delay={300}
            onSearch={this.props.onSearchComp}
            // isAscending={this.props.sortJobsByState.unitModel.isAscending}
          />
          <PlanningListHeader
            name="Customer"
            // isActive={this.props.sortServiceByState.Customer.isActive}
            delay={300}
            // isAscending={this.props.sortServiceByState.Customer.isAscending}
            onClick={() => this.props.onClickTabHead(SortServiceByCustomer)}
          />
          <PlanningListHeader
            name="Site"
            // isActive={this.props.sortServiceByState.Site.isActive}
            delay={300}
            // isAscending={this.props.sortServiceByState.Site.isAscending}
            onClick={() => this.props.onClickTabHead(SortServiceBySite)}
          />
          <PlanningListHeader
            name="Unit Model"
            // isActive={this.props.sortServiceByState.UnitModel.isActive}
            delay={300}
            // isAscending={this.props.sortServiceByState.UnitModel.isAscending}
            onClick={() => this.props.onClickTabHead(SortServiceByUnitModel)}
          />
          <PlanningListHeader
            name="Comp Desc"
            // isActive={this.props.sortServiceByState.CompDesc.isActive}
            delay={300}
            // isAscending={this.props.sortServiceByState.CompDesc.isAscending}
            onClick={() => this.props.onClickTabHead(SortServiceByCompDesc)}
          />
          <PlanningListHeader
            name="Part Number"
          // //   isActive={this.props.sortJobsByState.backlogOpen.isActive}
            delay={300}
            onSearch={this.props.onSearchComp}
          // //   isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
          />
          <PlanningListHeader
            name="Unit Code"
          // //   isActive={this.props.sortJobsByState.plantExecution.isActive}
            delay={300}
            onSearch={this.props.onSearchComp}
          // //   isAscending={this.props.sortJobsByState.plantExecution.isAscending}
          />
          <PlanningListHeader
            name="Serial Number"
          // //   isActive={this.props.sortJobsByState.status.isActive}
            delay={300}
            onSearch={this.props.onSearchComp}
          // //   isAscending={this.props.sortJobsByState.status.isAscending}            
          />
          <PlanningListHeader
            name="Lifetime"
          // //   isActive={this.props.sortJobsByState.staging.isActive}
            delay={300}
            onFilter={this.isFilterLifetime}
          // //   isAscending={this.props.sortJobsByState.staging.isAscending}
          />
          <PlanningListHeader
            name="Plan"
          // //   isActive={this.props.sortJobsByState.staging.isActive}
            delay={300}
            onFilter={this.isFilterDate}
          // //   isAscending={this.props.sortJobsByState.staging.isAscending}
          />
          {/* <Typography
            name="Action" style={{marginTop: "10px"}}
          // //   isActive={this.props.sortJobsByState.staging.isActive}
          // //   isAscending={this.props.sortJobsByState.staging.isAscending}
          >Action</Typography> */}
        </TableRow>
      </TableHead>
    )
  }


  showTableBody(row,id) {
    return (
      <TableRow key={id} classes={{ root: 'table-row' }}>
        {/* Nanti ada if user ho atau site
              Ini tampilan HO */}
        <TableCell padding="checkbox">
          {this.props.displayServiceCheckbox && 
          <Checkbox 
          disabled={this.isCheckboxAvailable(row)} 
          checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
          onClick={() => this.props.onChoosedService(row)} 
          classes={{ checked: 'checkbox-checked' }} />}
        </TableCell>
        <TableCell align="left" className="table-cell"> {row.WoNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="center" className="table-cell"> {row.LifeTimeComponent} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        {/* Ini tampilan HO, site gaada action */}
        {/* <TableCell align="center" className="table-cell"> <EditButton title="Input Lifetime Component" onStats={this.isPutLifetime} values={this.props.serviceOrderList.Lists[id].LifeTimeComponent} field="edit" id={row.SoNumber} /></TableCell> */}
      </TableRow>
    )
  }

  handleClick = () =>{
    this.setState({
      snak: true
    })
  }

  //LOADING SCENE
  showLoading(){
    switch (this.props.fetchStatusServiceApproved) {
      case ApiRequestActionsStatus.LOADING:
        return(
          <div className="loading-container">
            <img 
              src={Spinner}
              alt="loading-spinner"
              className="loading-icon"
              />
          </div>
        )
        case ApiRequestActionsStatus.FAILED:
          return(
            <div className="loading-container">
              OOPS THERE WAS AN ERROR :'(
            </div>
      )
      default:
        console.log('STATUS oioi', this.props.fetchStatusServiceApproved)
    }
    // if(this.props.fetchStatusService === ApiRequestActionsStatus.LOADING){
    //   return(
    //     <div className="loading-container">
    //       <img 
    //         src={Spinner}
    //         alt="loading-spinner"
    //         className="loading-icon"
    //         />
    //     </div>
    //   )
    // }else if(this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.LOADING){
    //   return(
    //         <div>
    //         <Snackbar
    //           anchorOrigin={{ vertical: 'center',horizontal: 'right'}}
    //           bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
    //           open={this.state.stats}
    //           onClose={this.handleClose}
    //           autoHideDuration={3000}
    //           message="Please Wait. Page will reload automatically"
    //         />
    //       </div>
    //       )
    // }
    // else if(this.props.fetchStatusService === ApiRequestActionsStatus.FAILED){
    //   return(
    //     <div className="loading-container">
    //       OOPS THERE WAS AN ERROR :'(
    //     </div>
    //   )
    // }else if(this.props.serviceOrderListApproved.Lists.length === 0){
    //   return(
    //     <div className="loading-container">
    //       DATA NOT FOUND
    //     </div>
    //   )
    // }
  }

render(){
        return(
          <>
            <Table classes={{ root: 'table' }} className="table">
            {this.showTableHead()}
            <TableBody classes={{ root: 'table-body' }}>
              {this.props.serviceOrderListApproved.Lists
                && this.props.serviceOrderListApproved.Lists.map((row, id) => (
                  this.showTableBody(row,id)
                ))}
              </TableBody>
            </Table>
            {this.showLoading()}
          </>
        )
      }
  }