import React from 'react';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import InputButton from '../../../../../components/Button/InputButton';
import { SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, SortSalesByCompDesc, LifetimeFilterAction, DateFilterAction } from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons'
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import {Snackbar} from '@material-ui/core';
import moment from 'moment';

export default class SalesOrderList extends React.PureComponent {
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
    if (prevState.salesParameter !== this.props.salesParameter || prevState.salesSearch !== this.props.salesSearch || 
      prevState.searchComp !==this.props.searchComp || prevState.selectedFilters !== this.props.selectedFilters) {
      this.setState({checkedValue : false})
    }if (this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING) {
      this.setState({checkedValue : false})
    }
  }
  componentDidMount = async() =>{    
    await this.props.clearSelectedSalesPlans();
    // this.props.onClickSalesOrder();
  }

  componentWillMount = () =>{
    this.props.updateSalesParameter({
      ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  putLifetimke = async(data) => {
    await this.props.putLifetimeComp(data, this.props.token);
    await this.props.onClickSalesOrder();
  }
  
  isPutLifetime =  async(key, value) => {
      this.setState({
        putLifetime: {
          SoNumber : key,
          LifeTimeComponent: value
        },
        stats: true
      }, 
      () => this.putLifetimke(this.state.putLifetime) 
      )
  }

  isFilterLifetime = async( value1, value2 ) => {
    this.props.lifetimeFilter( LifetimeFilterAction, value1, value2, this.props.salesParameter.dataFilter.PageSize );
  }

  isFilterDate = async ( value1, value2) => {
    this.props.dateFilter( DateFilterAction, value1, value2, this.props.salesParameter.dataFilter.PageSize );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedSalesPlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  handleClickCheckbox = () =>{
    this.setState({
      checkedValue : !this.state.checkedValue
    })
  }

  showTableHead() {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
        <TableRow classes={{ root: 'table-row' }}>
          { this.props.idSales === "Data Input" ? "" :
            <TableCell padding="checkbox">
              {this.props.displaySalesCheckbox && 
              <Checkbox 
                checked={this.state.checkedValue}
                onChange={this.handleClickCheckbox}
                onClick={() => {this.props.salesOrderList.Lists.map((row,id) => 
                this.props.onChoosedSales(row,id))}}
                className="checkbox-checked-header"/>}
            </TableCell>
          }
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
            onFilter={this.isFilterDate}
          />
        </TableRow>
      </TableHead>
    )
  }


  showTableBody(row,id) {
    return (
      <TableRow key={id} classes={{ root: 'table-row' }}>
        { this.props.idSales === "Data Input" ? "" :
          <TableCell padding="checkbox">
            {this.props.displaySalesCheckbox && 
            <Checkbox 
            // checked={true}
            disabled={this.isCheckboxAvailable(row)} 
            checked={this.props.selectedSalesPlanList.some((plans) => plans.SoNumber === row.SoNumber)} 
            onClick={() => this.props.onChoosedSales(row)} 
            classes={{ checked: 'checkbox-checked' }} 
            />}
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
        <TableCell align="center" className="table-cell"> 
        {this.props.salesOrderList.Lists[id].LifeTimeComponent === "-" ? 
          <InputButton title="Input Lifetime Component" onStats={this.isPutLifetime} titles="Input" key={row.SoNumber} id={row.SoNumber} field="input"/> : 
          <div className={this.props.salesOrderList.Lists[id].IsRevised === true && this.props.salesOrderList.Lists[id].IsChanged === false ? "table-cell-rev" : ""}>{this.props.salesOrderList.Lists[id].LifeTimeComponent}</div>
        }
        </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SMR} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="center" className="table-cell">
        {this.props.salesOrderList.Lists[id].LifeTimeComponent !== "-" ? <EditButton idEdit="Approval" title="Input Lifetime Component" onStats={this.isPutLifetime} values={this.props.salesOrderList.Lists[id].LifeTimeComponent} field="edit" id={row.SoNumber} /> : ""}
        </TableCell>
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
    }else if(this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.LOADING){
      return(
            <div>
            <Snackbar
              anchorOrigin={{ vertical: 'center',horizontal: 'center'}}
              bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
              open={this.state.stats}
              onClose={this.handleClose}
              autoHideDuration={3000}
              message="Please Wait. Page will reload automatically"
            />
          </div>
          )
    }
    else if(this.props.fetchStatusSales === ApiRequestActionsStatus.FAILED){
      return(
        <div className="loading-container">
          OOPS THERE WAS AN ERROR :'(
        </div>
      )
    }else if(this.props.salesOrderList.Lists.length === 0){
      return(
        <div className="loading-container">
          DATA NOT FOUND
        </div>
      )
    }
  }

  render(){
    if(this.props.idSales === "Data Input"){
      return(
        <>
          <Table classes={{ root: 'table' }} className="table">
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.salesOrderList.Lists
              && this.props.salesOrderList.Lists.map((row, id) => (
                this.showTableBody(row,id)
              ))}
            </TableBody>
          </Table>
          {this.showLoading()}
        </>
      )
    } else{
      return(
        <>
          <Table classes={{ root: 'table' }} className="table">
          {this.showTableHead()}
          <TableBody classes={{ root: 'table-body' }}>
            {this.props.salesOrderList.Lists
              && this.props.salesOrderList.Lists.map((row, id) => (
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