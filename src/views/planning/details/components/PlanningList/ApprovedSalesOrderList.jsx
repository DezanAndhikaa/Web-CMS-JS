import React from 'react';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import {
  SortSalesByCustomer,
  SortSalesBySite,
  SortSalesByUnitModel,
  SortSalesByCompDesc,
  LifetimeFilterAction,
  DateFilterAction,
  SmrFilterAction,
} from "../../DetailPages-action";
import { Spinner } from '../../../../../assets/icons';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment from 'moment';
import EmptyList from '../../../../../components/EmptyList/EmptyList';

export default class ApprovedSalesOrderList extends React.PureComponent {
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
    if (prevState.salesApprovedParameter !== this.props.salesApprovedParameter || prevState.salesSearch !== this.props.salesSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
    if (this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.LOADING) {
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickSalesOrderApproved();
  }

    componentWillMount = ()=>{
      this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter,  PageNumber: 1, PageSize: 10, Sort: [], Filter: []})
    }
  

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.salesApprovedParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.salesApprovedParameter.dataFilter.PageSize );
  }

  isFilterSMRDate = async ( value1, value2) => {
    this.props.dateFilter(
      SmrFilterAction,
      value1,
      value2,
      this.props.salesApprovedParameter.dataFilter.PageSize
    );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedSalesPlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  handleClicks = () =>{
    this.setState({
      checkedValue : !this.state.checkedValue
    })
  }

  showTableHead() {
    return (
      <TableHead className="table-head" classes={{ root: "table-head" }}>
        <TableRow classes={{ root: "table-row" }}>
          <TableCell padding="checkbox">
            {this.props.displaySalesCheckbox && (
              <Checkbox
                checked={this.state.checkedValue}
                onChange={this.handleClicks}
                onClick={() => {
                  this.props.salesOrderListApproved.Lists.map((row, id) =>
                    this.props.onChoosedSales(row, id)
                  );
                }}
                className="checkbox-checked-header"
              />
            )}
          </TableCell>
          <TableCell align="left" className="table-cell">SO</TableCell>
          <TableCell align="left" className="table-cell">CUSTOMER</TableCell>
          <TableCell align="left" className="table-cell">SITE</TableCell>
          <TableCell align="left" className="table-cell">UNIT MODEL</TableCell>
          <TableCell align="left" className="table-cell">COMPONENT DESCRIPTION</TableCell>
          <TableCell align="left" className="table-cell">PART NUMBER</TableCell>
          <TableCell align="left" className="table-cell">UNIT CODE</TableCell>
          <TableCell align="left" className="table-cell">SERIAL NUMBER</TableCell>
          <TableCell align="left" className="table-cell">LIFETIME COMP</TableCell>
          <TableCell align="left" className="table-cell">PLAN EXECUTION</TableCell>
          <TableCell align="left" className="table-cell">SMR </TableCell>
          <TableCell align="left" className="table-cell">SMR DATE</TableCell>
          <TableCell align="left" className="table-cell">PLAN TYPE</TableCell>
        </TableRow>
      </TableHead>
    );
  }

    showTableBody(row,id) {
      return (
        <TableRow key={id} classes={{ root: 'table-row' }}>
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
          <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
          <TableCell align="left" className="table-cell"> {row.SMR} </TableCell>
          <TableCell align="left" className="table-cell"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
          <TableCell align="left" className="table-cell"> Fix </TableCell>
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
    }
  }

  render(){
    if(this.props.salesOrderListApproved.Lists.length === 0 && this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList idEmpty= "Approve" />
      )
    }else{
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
}