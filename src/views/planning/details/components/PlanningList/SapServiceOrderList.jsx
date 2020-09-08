import React from 'react';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, 
} from '@material-ui/core';
import './PlanningList.scss';
import '../SapIssue/SapIssue.scss';
import { 
  LifetimeFilterAction, 
  DateFilterAction} 
  from '../../DetailPages-action';
import { Spinner } from '../../../../../assets/icons';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment from 'moment';
import EmptyList from '../../../../../components/EmptyList/EmptyList';
import roleService from "../../../../../utils/roleService.helper";
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
          <TableCell className= "table-cell-checkbox">
            {this.props.displayServiceCheckbox  && 
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                checked={this.state.checkedValue}
                onChange={this.handleClicks}
                onClick={({target: { checked }}) => {
                  if(checked) return this.props.onChooseAllService(this.props.serviceOrderListSap.Lists);
                  return this.props.onChooseAllService([]);
                }}
              />
            }
          </TableCell>          
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
  }

  showTableBody(row,id) {
    return (
    <>
      <TableRow key={id} classes={{ root: 'table-row' }} onClick={() => this.handleExpand(id)}>
        <TableCell className= "table-cell-checkbox">
          {this.props.displayServiceCheckbox && 
            <Checkbox 
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
              disabled={this.isCheckboxAvailable(row)} 
              checked={this.props.selectedServicePlanList.some((plans) => plans.WoNumber === row.WoNumber)} 
              onClick={() => this.props.onChoosedService(row, id, 'body')}
            />
          }
        </TableCell>
        {Number(RoleUser.role()) === 1 ?
          <TableCell align="left" className="table-cell"> {row.WoNumber} </TableCell> :
          <TableCell 
            align="left" 
            className={this.props.pageLoc === "Status" ? "table-cell-pk-status" : "table-cell-smr"}> 
            {row.WoNumber} 
          </TableCell>
        }
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
        <TableCell align="left" className="table-cell"> {moment(row.SMRLastUpdate).format('DD-MM-YYYY')} </TableCell>
        <Tooltip arrow title={row.PlanType.charAt(0) === "U" ? "UNSCHEDULE" : ""} >
          <TableCell align="left" className="table-cell"> {row.PlanType.substring(0, 3)} </TableCell>
        </Tooltip>
      </TableRow>
      {this.state[id] ? 
        <TableRow className="table-row-bottom-issue">
          <TableCell ><label></label></TableCell>
          <TableCell className="txt-style-bold" align="left"><label>Description:</label></TableCell>
          <TableCell colSpan="12" className="txt-style-normal" align="left">{row.SAPIssueMessage}</TableCell>
        </TableRow> : null 
      }
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
    if (this.props.serviceOrderListSap.Lists.length === 0 && this.props.fetchStatusServiceSap === ApiRequestActionsStatus.SUCCEEDED) {
      return (
        <EmptyList idEmpty= "SAP" />
      )
    }else {
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