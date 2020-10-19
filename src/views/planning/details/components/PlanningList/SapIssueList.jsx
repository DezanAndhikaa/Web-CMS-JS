import React from 'react';
import {
  Checkbox, 
  Table,
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  Button,
  FormLabel
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from 'views/planning/details/components/PlanningListHeader/PlanningListHeader';
import { 
  SortSalesByCustomer, 
  SortSalesBySite, 
  SortSalesByUnitModel, 
  SortSalesByCompDesc, 
  LifetimeFilterAction, 
  DateFilterAction } 
  from 'views/planning/details/DetailPages-action';
import { Spinner } from 'assets/icons';
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';
import moment from 'moment';
import EmptyList from 'components/EmptyList/EmptyList';
import roleService from "utils/roleService.helper";

const RoleUser = new roleService();
export default class SapIssueList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: false,
      stats: false,
    }

    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidUpdate = (prevState) =>{
    if (prevState.salesSapParameter !== this.props.salesSapParameter || prevState.salesSearch !== this.props.salesSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickSalesOrderSap();
  }

  componentWillMount = () =>{
    this.props.updateSalesSapParameter({ 
      ...this.props.salesSapParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
    });
  }  

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.salesSapParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.salesSapParameter.dataFilter.PageSize );
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

  handleExpand (id){
    this.setState({
        [id]: !this.state[id],
    })
  }

  showTableHead() {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
        <TableRow classes={{ root: 'table-row' }}>
          {Number(RoleUser.role()) !== 1 ? "" :
            <TableCell padding="checkbox">
              {this.props.displaySalesCheckbox && 
              <Checkbox 
                checked={this.state.checkedValue}
                onChange={this.handleClicks}
                onClick={() => {this.props.salesOrderListSap.Lists.map((row,id) => 
                this.props.onChoosedSales(row,id))}}
                className="checkbox-checked-header"/>}
            </TableCell>
          }
          <PlanningListHeader
            name="SO"
            delay={300}
            onSearch={this.props.onSearchComp}
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
        </TableRow>
      </TableHead>
    )
  }

  _showDescription(row){
    return(
      <div className="expand-container">
        <div className="button-container">
          <Button className="button-reason" id="so">SO</Button>
          <Button className="button-reason" id="cust">Customer</Button>
          <Button className="button-reason" id="site">Site</Button>
          <Button className="button-reason" id="unitModel">Unit Model</Button>
          <Button className="button-reason" id="compDesc">Component Description</Button>
          <Button className="button-reason" id="partNumber">Part Number</Button>
          <Button className="button-reason" id="unitCode">Unit Code</Button>
          <Button className="button-reason" id="sn">Serial Number</Button>
          <Button className="button-reason" id="planExec">Plan Execution</Button>
          <Button className="button-reason" id="smr">SMR</Button>
          <Button className="button-reason-right" id="smrDate">SMR Date</Button> 
        </div>
        <div className="description">
          <FormLabel className="exp-label">Description: </FormLabel>
          <TextField 
            type="text"
            variant="outlined"
            className="exp-description"
            placeholder="Silahkan perbaiki SAP sekarang !!"
            size="small"
            value={row.SAPIssueMessage}
          />
        </div>
      </div>
    )
  }

  showTableBody(row,id) {
    return (
    <>
      <TableRow key={id} classes={{ root: 'table-row' }} onClick={() => this.handleExpand(id)}>
        { Number(RoleUser.role()) !== 1 ? "" :
          <TableCell padding="checkbox">
            {this.props.displaySalesCheckbox && 
            <Checkbox 
            disabled={this.isCheckboxAvailable(row)} 
            checked={this.props.selectedSalesPlanList.some((plans) => plans.SoNumber === row.SoNumber)} 
            onClick={() => this.props.onChoosedSales(row)} 
            classes={{ checked: 'checkbox-checked' }} />}
          </TableCell>
        }
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
        <TableCell align="left" className="table-cell"> {row.SMRDate} </TableCell>
      </TableRow>
      {this.state[id] ? 
        <TableRow>
          <TableCell colSpan="13">{this._showDescription(row)}</TableCell>
        </TableRow> : null }
    </>  
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
    switch (this.props.fetchStatusSalesSap) {
      case ApiRequestActionsStatus.LOADING:
        return(
          <div className="loading-container">
            <img 
              src={process.env.PUBLIC_URL +`${Spinner}`}
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
    if(this.props.salesOrderListSap.Lists.length === 0 && this.props.fetchStatusSalesSap === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList idEmpty= "SAP" />
      )
    }else{
      return(
        <>
          <Table classes={{ root: 'table' }} className="table">
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.salesOrderListSap.Lists
              && this.props.salesOrderListSap.Lists.map((row, id) => (
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