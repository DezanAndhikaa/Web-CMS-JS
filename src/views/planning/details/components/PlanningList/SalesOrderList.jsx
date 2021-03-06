import React from 'react';
import {
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip
} from '@material-ui/core';
import './PlanningList.scss';
import PlanningListHeader from 'views/planning/details/components/PlanningListHeader/PlanningListHeader';
import EditButton from 'components/ActionButton/EditButton/EditButton';
import InputButton from 'components/Button/InputButton';
import { 
  SortSalesByCustomer,
  SortSalesBySite,
  SortSalesByUnitModel,
  SortSalesByCompDesc,
  LifetimeFilterAction,
  DateFilterAction,
  SmrFilterAction,
  SortSalesByPlanType,
  SmrDateFilterAction 
} from 'views/planning/details/DetailPages-action';
import { Spinner } from 'assets/icons'
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';
import { Snackbar } from '@material-ui/core';
import moment from 'moment';
import EmptyList from 'components/EmptyList/EmptyList';
import roleService from "utils/roleService.helper";
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const RoleUser = new roleService();
export default class SalesOrderList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: false,
      stats: false,
      putLifetime: {
        SoNumber: '',
        LifeTimeComponent: '',
      }
    }
  }

  componentDidUpdate = (prevState) => {
    if (prevState.salesParameter !== this.props.salesParameter || prevState.salesSearch !== this.props.salesSearch ||
      prevState.searchComp !== this.props.searchComp || prevState.selectedFilters !== this.props.selectedFilters) {
      this.setState({ checkedValue: false })
    } 
    if (this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING) {
      this.setState({ checkedValue: false })
    }
  }
  componentDidMount = async () => {
    await this.props.clearSelectedSalesPlans();
  }

  componentWillMount = () => {
    this.props.updateSalesParameter({
      ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
    });
  }

  putLifetimke = async (data) => {
    await this.props.putLifetimeComp(data, this.props.token);
    await this.props.onClickSalesOrder();
  }

  isPutLifetime = async (key, value) => {
    this.setState({
      putLifetime: {
        SoNumber: key,
        LifeTimeComponent: value
      },
      stats: true
    },
      () => this.putLifetimke(this.state.putLifetime)
    )
  }

  isFilterLifetime = async (value1, value2) => {
    this.props.lifetimeFilter(LifetimeFilterAction, value1, value2, this.props.salesParameter.dataFilter.PageSize);
  }

  isFilterSmr = async (value1, value2) => {
    this.props.smrFilter(SmrFilterAction, value1, value2, this.props.serviceParameter.dataFilter.PageSize);
  }

  isFilterDate = async (value1, value2) => {
    this.props.dateFilter(DateFilterAction, value1, value2, this.props.salesParameter.dataFilter.PageSize);
  }

  isFilterSmrDate = async (value1, value2) => {
    this.props.filterSmrDate(
      SmrDateFilterAction,
      value1,
      value2,
      this.props.serviceParameter.dataFilter.PageSize
    );
  }

  isCheckboxAvailable = (data) => {
    let isAvailable = false;
    if (this.props.selectedSalesPlanList.some((plan) => plan.status === 'Assigned')) {
      isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== data.status);
    } else { isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
    return isAvailable;
  }

  handleClickCheckbox = () => {
    this.setState({
      checkedValue: !this.state.checkedValue
    })
  }

  showTableHead() {
    if (this.props.idTab === "Status"){
      return(
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow classes={{ root: 'table-row' }}>
            {this.props.idSales === "Data Input" || this.props.idSales === "ViewOnly" ? "" :
              <TableCell className="table-cell-checkbox">
                {this.props.displaySalesCheckbox &&
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                    checked={this.state.checkedValue}
                    onChange={this.handleClickCheckbox}
                    onClick={({target: { checked }}) => {
                      if(checked) return this.props.onChooseAllSales(this.props.salesOrderList.Data.Lists);
                      return this.props.onChooseAllSales([]);
                    }}
                  />
                }
              </TableCell>
            }
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
      )
    }
    else {
      return (
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow classes={{ root: 'table-row' }}>
            {this.props.idSales === "Data Input" || this.props.idSales === "ViewOnly" ? "" :
              <TableCell className= "table-cell-checkbox">
                {this.props.displaySalesCheckbox &&
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxIcon style={{color: "#FFD500"}} fontSize="small" />}
                    checked={this.state.checkedValue}
                    onChange={this.handleClickCheckbox}
                    onClick={({target: { checked }}) => {
                      if(checked) return this.props.onChooseAllSales(this.props.salesOrderList.Data.Lists);
                      return this.props.onChooseAllSales([]);
                    }} 
                  />
                }
              </TableCell>
            }
            <PlanningListHeader
              loc={this.props.pageLoc}
              name="SO"
              delay={300}
              onSearch={this.props.onSearchComp}
            />
            <PlanningListHeader
              name="CUSTOMER"
              isActive={this.props.sortSalesByState.Customer.isActive}
              delay={300}
              isAscending={this.props.sortSalesByState.Customer.isAscending}
              onClick={() => this.props.onClickTabHead(SortSalesByCustomer)}
            />
            <PlanningListHeader
              name="SITE"
              isActive={this.props.sortSalesByState.Site.isActive}
              delay={300}
              isAscending={this.props.sortSalesByState.Site.isAscending}
              onClick={() => this.props.onClickTabHead(SortSalesBySite)}
            />
            <PlanningListHeader
              name="UNIT MODEL"
              isActive={this.props.sortSalesByState.UnitModel.isActive}
              delay={300}
              isAscending={this.props.sortSalesByState.UnitModel.isAscending}
              onClick={() => this.props.onClickTabHead(SortSalesByUnitModel)}
            />
            <PlanningListHeader
              name="COMPONENT DESC"
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
            {this.props.idSales === "Data Input" ?
              <PlanningListHeader
                name="Lifetime Comp"
                delay={300}
              /> :
              <PlanningListHeader
                name="Lifetime"
                delay={300}
                onFilter={this.isFilterLifetime}
              />
            }
            <PlanningListHeader
              name="Plan"
              delay={300}
              onFilter={this.isFilterDate}
            />
            <PlanningListHeader
              name="SMR"
              delay={300}
              onFilter={this.isFilterSmr}
            />
            <PlanningListHeader
              name="SMR Date"
              delay={300}
              onFilter={this.isFilterSmrDate}
            />
            <PlanningListHeader
              name="PLAN TYPE"
              delay={300}
              onClick={() => this.props.onClickTabHead(SortSalesByPlanType)}
            />
          </TableRow>
        </TableHead>
      )
    }
  }

  showTableBody(row, id) {
    return (
      <TableRow key={id} classes={{ root: 'table-row' }}>
        {this.props.idSales === "Data Input" || this.props.idSales === "ViewOnly" ? "" :
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
        }
        {(Number(RoleUser.role()) === 1 && localStorage.getItem('subMenu') !== "/webcms/planning/ho") || this.props.idSales === "Data Input" || Number(RoleUser.role()) !== 1 ?
          <TableCell
            align="left"
            className={this.props.pageLoc && this.props.idTab === "Status" ? "table-cell-pk-status"
              : this.props.pageLoc === "Status" && this.props.idSales === "Data Input" ? "table-cell-pk" : "table-cell-smr"}>
            {row.SoNumber}
          </TableCell>
          :
          <TableCell align="left" className="table-cell-smr"> {row.SoNumber} </TableCell>
        }
        <TableCell align="left" className={this.props.idTab === "Status" ? "table-cell-cst" : "table-cell-long"}> {row.CustomerName} </TableCell>
        <TableCell align="left" className="table-cell-short"> {row.SiteCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
        <TableCell align="left" className="table-cell-long"> {row.ComponentDescription} </TableCell>
        <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
        <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
        <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
        <TableCell align="left" className="table-cell">
          {this.props.salesOrderList.Data.Lists[id].LifeTimeComponent === 0 && this.props.idTab === "Input" ?
            <InputButton title="Input Lifetime Component" onStats={this.isPutLifetime} titles="Input" key={row.SoNumber} id={row.SoNumber} field="input" /> :
            this.props.salesOrderList.Data.Lists[id].LifeTimeComponent === 0 && this.props.idTab === "Status" ?
              <InputButton titles="Input Status" key={row.SoNumber} id={row.SoNumber} /> :
              <div className={this.props.salesOrderList.Data.Lists[id].IsRevised === true && this.props.salesOrderList.Data.Lists[id].IsChanged === false ? "table-cell-rev" : ""}>{this.props.salesOrderList.Data.Lists[id].LifeTimeComponent}</div>
          }
        </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.PlanExecutionDate).format('DD-MM-YYYY')} </TableCell>
        <TableCell align="left" className="table-cell-smr"> {row.SMR} </TableCell>
        <TableCell align="left" className="table-cell"> {moment(row.SMRDate).format('DD-MM-YYYY')} </TableCell>
        <Tooltip arrow title={row.PlanType.charAt(0) === "U" ? "UNSCHEDULE" : ""} >
          <TableCell align="left" className="table-cell"> {row.PlanType.substring(0, 3)} </TableCell>
        </Tooltip>
        {this.props.salesOrderList.Data.Lists[id].LifeTimeComponent !== 0 && this.props.idTab === "Approval" ?
          <TableCell align="left" className= "table-cell-icon">
            <EditButton idEdit="Approval" title="Input Lifetime Component" onStats={this.isPutLifetime} values={this.props.salesOrderList.Data.Lists[id].LifeTimeComponent} field="edit" id={row.SoNumber} />
          </TableCell>
        : "" }
      </TableRow>
    )
  }

  handleClick = () => {
    this.setState({
      snak: true
    })
  }

  handleClose = () => {
    this.setState({
      stats: false
    })
  }

  showLoading() {
    if (this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING) {
      return (
        <div className="loading-container">
          <img
            src={Spinner}
            alt="loading-spinner"
            className="loading-icon"
          />
        </div>
      )
    } else if (this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.LOADING) {
      return (
        <div>
          <Snackbar
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            open={this.state.stats}
            onClose={this.handleClose}
            autoHideDuration={3000}
            message="Please Wait. Page will reload automatically"
          />
        </div>
      )
    }
    else if (this.props.fetchStatusSales === ApiRequestActionsStatus.FAILED) {
      return (
        <div className="loading-container">
          OOPS THERE WAS AN ERROR :'(
        </div>
      )
    }
  }

  render() {
    if (this.props.salesOrderList.Data.Lists.length === 0 && this.props.idTab === "Approval"
      && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED) {
      return (
        <EmptyList idEmpty= "Sales" />
      )
    } else if (this.props.salesOrderList.Data.Lists.length === 0 && this.props.idSales === "Data Input"
      && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED) {
      return (
        <EmptyList idEmpty= "Input" />
      )
    } else if (this.props.salesOrderList.Data.Lists.length === 0
      && this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED) {
      return (
        <EmptyList idEmpty= "Sales" />
      )
    } else {
      return (
        <>
          <Table classes={{ root: 'table' }} className="table">
            {this.showTableHead()}
            <TableBody classes={{ root: 'table-body' }}>
              {this.props.salesOrderList.Data.Lists
                && this.props.salesOrderList.Data.Lists.map((row, id) => (
                  this.showTableBody(row, id)
                ))}
            </TableBody>
          </Table>
          {this.showLoading()}
        </>
      )
    }
  }
}