import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Card, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography
} from '@material-ui/core';
import './PlanningList.scss';
import { Menu } from '../../../../../constants';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import SaveButton from '../../../../../components/ActionButton/SaveButton/SaveButton';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import InputButton from '../../../../../components/Button/InputButton';
import { booleanLiteral } from '@babel/types';
import SalesOrderData from '../../../../../planning-data-dummy.json';
import { SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, SortSalesByCompDesc } from '../../DetailPages-action';

export default class SalesOrderList extends React.PureComponent {

    // openDetail = async (row) => {
    //   await this.props.saveJobData(row);
    //   this.props.storeJobData(row);
    //   return this.props.pushTo(`${Menu.DETAIL_PI}:${row.woNumber || ''}`);
    // }
    componentDidMount = async() =>{
      await this.props.onClickSalesOrder();
    }

    isCheckboxAvailable = (data) => {
        let isAvailable = false;
        if (this.props.selectedSalesPlanList.some((plan) => plan.status === 'Assigned')) {
          isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== data.status);
        } else { isAvailable = this.props.selectedSalesPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
        return isAvailable;
      }

      datePlant = (date) => moment.utc(date, ISO_8601).local().format('DD MMMM YYYY')

render(){
    return(
        <Table classes={{ root: 'table' }} className="table">
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow classes={{ root: 'table-row' }}>
            <TableCell padding="checkbox">
              {this.props.displayCheckbox && <Checkbox className="checkbox-checked-header"/>}
            </TableCell>
            <PlanningListHeader
              name="SO"
              // isActive={this.props.sortJobsByState.unitModel.isActive}
              delay={300}
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
            // //   isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
            />
            <PlanningListHeader
              name="Unit Code"
            // //   isActive={this.props.sortJobsByState.plantExecution.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.plantExecution.isAscending}
            />
            <PlanningListHeader
              name="Serial Number"
            // //   isActive={this.props.sortJobsByState.status.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.status.isAscending}            
            />
            <PlanningListHeader
              name="Lifetime"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="Plan"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <Typography
              name="Action" style={{marginTop: "10px"}}
            // //   isActive={this.props.sortJobsByState.staging.isActive}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            >Action</Typography>
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: 'table-body' }}>
          {this.props.salesOrderList.Lists
            && this.props.salesOrderList.Lists.map((row, id) => (
              // {/* {SalesOrderData.salesData && SalesOrderData.salesData.map((row, id) => ( */}
              <TableRow key={id} classes={{ root: 'table-row' }}>
                <TableCell padding="checkbox">
                  {this.props.displayCheckbox && <Checkbox disabled={this.isCheckboxAvailable(row)} checked={this.props.selectedSalesPlanList.some((plans) => plans.SO === row.SO)} onClick={() => this.props.onChoosedSales(row)} classes={{ checked: 'checkbox-checked' }} />}
                </TableCell>
                <TableCell align="left" className="table-cell"> {row.SO} </TableCell>
                <TableCell align="left" className="table-cell"> {row.Customer} </TableCell>
                <TableCell align="left" className="table-cell"> {row.Site} </TableCell>
                <TableCell align="left" className="table-cell"> {row.UnitModel} </TableCell>
                <TableCell align="left" className="table-cell"> {row.ComponentDescription} </TableCell>
                <TableCell align="left" className="table-cell"> {row.PartNumber} </TableCell>
                <TableCell align="left" className="table-cell"> {row.UnitCode} </TableCell>
                <TableCell align="left" className="table-cell"> {row.SerialNumber} </TableCell>
                <TableCell align="center" className="table-cell"> 
                {!this.props.salesOrderList.Lists[id].LifeTimeComp ? <InputButton title="Input Lifetime Component" onStats={this.props.onStats} titles="Input" key={row.SO} id={row.SO}/> : 
                  <div>{this.props.salesOrderList.Lists[id].LifeTimeComp}</div>
                }
                </TableCell>
                <TableCell align="left" className="table-cell"> {row.PlanExecution} </TableCell>
                <TableCell align="center" className="table-cell"> <EditButton /></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
}