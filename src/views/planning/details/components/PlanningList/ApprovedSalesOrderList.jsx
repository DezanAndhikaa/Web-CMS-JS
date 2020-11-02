import React from 'react';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip
} from '@material-ui/core';
import './PlanningList.scss';
import { Spinner } from 'assets/icons';
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';
import moment from 'moment';
import EmptyList from 'components/EmptyList/EmptyList';
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { SmrFilterAction } from 'views/planning/details/DetailPages-action';

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
        <TableRow>
          <TableCell className= "table-cell-checkbox">
            {this.props.displaySalesCheckbox && (
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                checked={this.state.checkedValue}
                onChange={this.handleClicks}
                onClick={({target: { checked }}) => {
                  if(checked) return this.props.onChooseAllSales(this.props.salesOrderListApproved.Lists);
                  return this.props.onChooseAllSales([]);
                }}
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
        <TableCell className="table-cell-checkbox">
          {this.props.displaySalesCheckbox && 
            <Checkbox 
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
              disabled={this.isCheckboxAvailable(row)} 
              checked={this.props.selectedSalesPlanList.some((plans) => plans.SoNumber === row.SoNumber)} 
              onClick={() => this.props.onChoosedSales(row, id, 'body')}
            />
          }
        </TableCell>
        <TableCell align="left" className="table-cell-smr"> {row.SoNumber} </TableCell>
        <TableCell align="left" className="table-cell-cst"> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell-short"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell-long"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.LifeTimeComponent} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="left" className="table-cell-smr"> {row.SMR} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
        <Tooltip arrow title={row.PlanType.charAt(0) === "U" ? "UNSCHEDULE" : ""} >
          <TableCell align="left" className="table-cell"> {row.PlanType.substring(0, 3)} </TableCell>
        </Tooltip>
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