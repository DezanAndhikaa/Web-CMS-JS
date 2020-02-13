import React from 'react';
// import moment, { ISO_8601 } from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import InputButton from '../../../../../components/Button/InputButton';
import { SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, SortSalesByCompDesc, LifetimeFilterAction, DateFilterAction } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons'
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
// import { NotificationManager } from 'react-notifications';
import {Snackbar, Button} from '@material-ui/core';

export default class ApprovedSalesOrderList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: false,
      stats: false,
      putLifetime: {
        So : '',
        LifeTimeComponent : '',
      }
    }
  }

  componentDidUpdate = (prevState) =>{
    //untuk menghilangkan checkbox
    if (prevState.salesApprovedParameter !== this.props.salesApprovedParameter || prevState.salesSearch !== this.props.salesSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
    if (this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.LOADING) {
      // console.log('ke trigger')
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickSalesOrderApproved();
  }
  

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.salesApprovedParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.salesApprovedParameter.dataFilter.PageSize );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedSalesPlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
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
          <TableCell padding="checkbox">
            {this.props.displaySalesCheckbox && 
            <Checkbox 
              checked={this.state.checkedValue}
              onChange={this.handleClicks}
              onClick={() => {this.props.salesOrderListApproved.Lists.map((row,id) => 
              this.props.onChoosedSales(row,id))}}
              className="checkbox-checked-header"/>}
          </TableCell>
          <PlanningListHeader
            name="SO"
            // isActive={this.props.sortJobsByState.unitModel.isActive}
            delay={300}
            onSearch={this.props.onSearchComp}
            // isAscending={this.props.sortJobsByState.unitModel.isAscending}
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
          <PlanningListHeader
            name="SMR"
            delay={300}
            onSearch={this.props.onSearchComp}
          />
          <PlanningListHeader
            name="SMR Date"
            delay={300}
            onSearch={this.props.onSearchComp}
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
          {this.props.displaySalesCheckbox && 
          <Checkbox 
          disabled={this.isCheckboxAvailable(row)} 
          checked={this.props.selectedSalesPlanList.some((plans) => plans.SoNumber === row.SoNumber)} 
          onClick={() => this.props.onChoosedSales(row)} 
          classes={{ checked: 'checkbox-checked' }} />}
        </TableCell>
        <TableCell align="left" className="table-cell"> {row.SoNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="center" className="table-cell"> {row.LifeTimeComponent} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PlanExecution} </TableCell>
        <TableCell align="left" className="table-cell"> Unknown </TableCell>
        <TableCell align="left" className="table-cell"> Unknowns </TableCell>
        {/* Ini tampilan HO, site gaada action */}
        {/* <TableCell align="center" className="table-cell"> <EditButton title="Input Lifetime Component" onStats={this.isPutLifetime} values={this.props.salesOrderList.Lists[id].LifeTimeComponent} field="edit" id={row.SoNumber} /></TableCell> */}
      </TableRow>
    )
  }

  handleClick = () =>{
    this.setState({
      snak: true
    })
  }

  handleClose = () => {
    this.setState({
      stats: false
    })
  }

  //LOADING SCENE
  showLoading(){
    switch (this.props.fetchStatusSalesApproved) {
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
        console.log('STATUS oioi', this.props.fetchStatusSalesApproved)
    }
    // if(this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING){
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
    // else if(this.props.fetchStatusSales === ApiRequestActionsStatus.FAILED){
    //   return(
    //     <div className="loading-container">
    //       OOPS THERE WAS AN ERROR :'(
    //     </div>
    //   )
    // }else if(this.props.salesOrderListApproved.Lists.length === 0){
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
              {this.props.salesOrderListApproved.Lists
                && this.props.salesOrderListApproved.Lists.map((row, id) => (
                  this.showTableBody(row,id)
                ))}
              </TableBody>
            </Table>
            {this.showLoading()}
          </>
        )
      }
  }