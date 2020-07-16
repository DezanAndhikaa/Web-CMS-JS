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
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import roleService from "../../../../../utils/roleService.helper";

const RoleUser = new roleService();
export default class DeletedServiceOrderList extends React.PureComponent {
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
    if (prevState.serviceDeletedParameter !== this.props.serviceDeletedParameter || prevState.serviceSearch !== this.props.serviceSearch || 
      prevState.searchComp !==this.props.searchComp) {
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = () =>{
    this.props.onClickServiceOrderDeleted();
  }

  componentWillMount = () =>{
    this.props.updateServiceDeletedParameter({ 
      ...this.props.serviceDeletedParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }
  

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.serviceDeletedParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.serviceDeletedParameter.dataFilter.PageSize );
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

  showTableHead() {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
        <TableRow classes={{ root: 'table-row' }}>
          {Number(RoleUser.role()) !== 1 ? "" :
            <TableCell padding="checkbox">
              {this.props.displayServiceCheckbox && 
                <Checkbox 
                  className="checkbox-checked-header"
                  checked={this.state.checkedValue}
                  onChange={this.handleClicks}
                  onClick={({target: { checked }}) => {
                    if(checked) return this.props.onChooseAllService(this.props.serviceOrderListDeleted.Lists);
                    return this.props.onChooseAllService([]);
                  }}
                />
              }
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
            name="Component Description"
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

  showTableBody(row,id) {
    return (
      <TableRow key={id} classes={{ root: 'table-row' }}>
        <TableCell padding="checkbox">
          {this.props.displayServiceCheckbox && 
            <Checkbox 
              disabled={this.isCheckboxAvailable(row)} 
              checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
              onClick={() => this.props.onChoosedService(row, id, 'body')}
              classes={{ checked: 'checkbox-checked' }} 
            />
          }
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
    switch (this.props.fetchStatusServiceDeleted) {
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
    if(this.props.serviceOrderListDeleted.Lists.length === 0 && this.props.fetchStatusServiceDeleted === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList idEmpty= "Delete" />
      )
    }else{
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
          {this.showLoading()}
        </>
      )
    }
  }
}