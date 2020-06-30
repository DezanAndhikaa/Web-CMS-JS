import React from 'react';
import {
  Checkbox, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  FormLabel,
  Button
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import { 
  SortServiceByCustomer, 
  SortServiceBySite, 
  SortServiceByUnitModel, 
  SortServiceByCompDesc, 
  LifetimeFilterAction, 
  DateFilterAction } 
  from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment from 'moment';
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import roleService from "../../../../../utils/roleService.helper";

const RoleUser = new roleService();
export default class SapServiceOrderList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: false,
      stats: false,
    }

    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidUpdate = (prevState) =>{
    //untuk menghilangkan checkbox
    if (prevState.serviceSapParameter !== this.props.serviceSapParameter || prevState.serviceSearch !== this.props.serviceSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickServiceOrderSap();
  }

  componentWillMount = () =>{
    this.props.updateServiceSapParameter({ 
      ...this.props.serviceSapParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
    });
  }

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.serviceSapParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.serviceSapParameter.dataFilter.PageSize );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedServicePlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedServicePlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
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
              {this.props.displayServiceCheckbox && 
              <Checkbox 
                checked={this.state.checkedValue}
                onChange={this.handleClicks}
                onClick={() => {this.props.serviceOrderListSap.Lists.map((row,id) => 
                this.props.onChoosedService(row,id))}}
                className="checkbox-checked-header"/>}
            </TableCell>
          }
          <PlanningListHeader
            name="WO"
            delay={300}
            onSearch={this.props.onSearchComp}
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

  _showDescription(row){
    return(
      <div className="expand-container">
        <div className="button-container">
          <Button className="button-reason" id="so">WO</Button>
          <Button className="button-reason" id="cust">Customer</Button>
          <Button className="button-reason" id="site">Site</Button>
          <Button className="button-reason" id="unitModel">Unit Model</Button>
          <Button className="button-reason" id="compDesc">Component Description</Button>
          <Button className="button-reason" id="partNumber">Part Number</Button>
          <Button className="button-reason" id="unitCode">Unit Code</Button>
          <Button className="button-reason" id="sn">Serial Number</Button>
          <Button className="button-reason" id="planExec">Plan Execution</Button>
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
            {this.props.displayServiceCheckbox && 
            <Checkbox 
            disabled={this.isCheckboxAvailable(row)} 
            checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
            onClick={() => this.props.onChoosedService(row)} 
            classes={{ checked: 'checkbox-checked' }} />}
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
        <TableCell align="center" className="table-cell"> {row.LifeTimeComponent} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
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

  //LOADING SCENE
  showLoading(){
    switch (this.props.fetchStatusServiceSap) {
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
    if(this.props.serviceOrderListSap.Lists.length === 0 && this.props.fetchStatusServiceSap === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList idEmpty= "SAP" />
      )
    }else{
      return(
        <>
          <Table classes={{ root: 'table' }} className="table">
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.serviceOrderListSap.Lists
              && this.props.serviceOrderListSap.Lists.map((row, id) => (
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