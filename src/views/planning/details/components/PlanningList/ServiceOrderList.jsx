import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import { 
  SortServiceByCustomer, 
  SortServiceBySite, 
  SortServiceByUnitModel, 
  SortServiceByCompDesc, 
  SortServiceByPlanType,
  LifetimeFilterAction, 
  DateFilterAction, 
  SmrFilterAction} from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons';
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import roleService from "../../../../../utils/roleService.helper";
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const RoleUser = new roleService();
export default class ServiceOrderList extends React.PureComponent {
  state = {
    checkedValue : false
  }

  componentDidMount = async () => {
    await this.props.clearSelectedServicePlans();
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

  isFilterSmr = async( value1, value2 ) => {
    this.props.smrFilter( SmrFilterAction, value1, value2, this.props.serviceParameter.dataFilter.PageSize );
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
    if(this.props.idTab === "Status"){
      return(
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow>
            {this.props.idService === "Data Input" || Number(RoleUser.role()) !== 1 ? "" :
              <TableCell className="table-cell-checkbox">
                {this.props.displayServiceCheckbox  && 
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                    checked={this.state.checkedValue}
                    onChange={this.handleClick}
                    onClick={({target: { checked }}) => {
                      if(checked) return this.props.onChooseAllService(this.props.serviceOrderList.Lists);
                      return this.props.onChooseAllService([]);
                    }}
                  />
                }
              </TableCell>
            }
            <TableCell align="left" className="table-cell">WO</TableCell>
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
      )
    }else{
      return(
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow>
            {this.props.idService === "Data Input" || Number(RoleUser.role()) !== 1 ? "" :
              <TableCell className= "table-cell-checkbox">
                {this.props.displayServiceCheckbox  && 
                  <Checkbox 
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                    checked={this.state.checkedValue}
                    onChange={this.handleClick}
                    onClick={({target: { checked }}) => {
                      if(checked) return this.props.onChooseAllService(this.props.serviceOrderList.Lists);
                      return this.props.onChooseAllService([]);
                    }}
                  />
                }
              </TableCell>
            }
            <PlanningListHeader
              name="Work Order"
              loc= {this.props.pageLoc}
              delay={300}
              onSearch={this.props.onSearchComp}
            />
            <PlanningListHeader
              name="CUSTOMER"
              delay={300}
              onClick={() => this.props.onClickTabHead(SortServiceByCustomer)}
            />
            <PlanningListHeader
              name="SITE"
              delay={300}
              onClick={() => this.props.onClickTabHead(SortServiceBySite)}
            />
            <PlanningListHeader
              name="UNIT MODEL"
              delay={300}
              onClick={() => this.props.onClickTabHead(SortServiceByUnitModel)}
            />
            <PlanningListHeader
              name="COMPONENT DESCRIPTION"
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
            <PlanningListHeader
              name="SMR"
              delay={300}
              onFilter= {this.isFilterSmr}
            />
            <PlanningListHeader
              name="SMR Date"
              delay={300}
              onSearch={this.isFilterDate}
            />
            <PlanningListHeader
              name="PLAN TYPE"
              delay={300}
              onClick={() => this.props.onClickTabHead(SortServiceByPlanType)}
            />
          </TableRow>
        </TableHead>
      )
    }
  }

  showTableBody(row,id) {
    return(
      <TableRow key={id} classes={{ root: 'table-row' }}>
        {this.props.idService === "Data Input" || Number(RoleUser.role()) !== 1 ? "" :
          <TableCell className="table-cell-checkbox">
            {this.props.displayServiceCheckbox && 
            <Checkbox 
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
              disabled={this.isCheckboxAvailable(row)} 
              checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
              onClick={() => this.props.onChoosedService(row, id, 'body')}
            />}
          </TableCell>
        }
        {(Number(RoleUser.role()) === 1 && localStorage.getItem('subMenu') !== "/webcms/planning/ho") || Number(RoleUser.role()) !== 1 ?
          <TableCell 
            align="left" 
            className={this.props.pageLoc && this.props.idTab === "Status" ? "table-cell-pk-status"
            : this.props.pageLoc === "Status" && this.props.idService === "Data Input" ? "table-cell-pk" : "table-cell-smr"}> 
            {row.WoNumber} 
          </TableCell>
          :
          <TableCell align="left" className="table-cell"> {row.WoNumber} </TableCell>
        }
        <TableCell align="left" className={this.props.idTab === "Status" ? "table-cell-cst" : "table-cell-long"}> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell-short"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell-long"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.LifeTimeComponent}</TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SMR} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.SMRLastUpdate).format('DD-MM-YYYY')} </TableCell>
        <Tooltip arrow title={row.PlanType.charAt(0) === "U" ? "UNSCHEDULE" : ""} >
          <TableCell align="left" className="table-cell"> {row.PlanType.substring(0, 3)} </TableCell>
        </Tooltip>
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
    }
  }

  render(){
    if(this.props.serviceOrderList.Lists.length === 0 && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList />
      )
    }else if(this.props.serviceOrderList.Lists.length === 0 && this.props.idService === "Data Input" 
      && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList />
      )
    }else if(this.props.serviceOrderList.Lists.length === 0 && this.props.idTab === "Status"
      && this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED){
      return(
        <EmptyList idEmpty= "NA" />
      )
    }else{
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
}