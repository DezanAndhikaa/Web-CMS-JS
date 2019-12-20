import React from 'react';
import moment, { ISO_8601 } from 'moment';
import {
  Card, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import './PlanningList.scss';
import { Menu } from '../../../../../constants';
import PlanningListHeader from '../PlanningListHeader/PlanningListHeader';
import SaveButton from '../../../../../components/ActionButton/SaveButton/SaveButton';
import EditButton from '../../../../../components/ActionButton/EditButton/EditButton';
import InputButton from '../../../../../components/Button/InputButton';
import { booleanLiteral } from '@babel/types';
import SalesOrderData from '../../../../../planning-data-dummy.json';

export default class SalesOrderList extends React.PureComponent {

    // openDetail = async (row) => {
    //   await this.props.saveJobData(row);
    //   this.props.storeJobData(row);
    //   return this.props.pushTo(`${Menu.DETAIL_PI}:${row.woNumber || ''}`);
    // }
    componentDidMount = async () => {
      await this.props.onClickSalesOrder();
     }

    isCheckboxAvailable = (data) => {
        let isAvailable = false;
        if (this.props.selectedPlanList.some((plan) => plan.status === 'Assigned')) {
          isAvailable = this.props.selectedPlanList.some((plan) => plan.status !== data.status);
        } else { isAvailable = this.props.selectedPlanList.some((plan) => plan.status !== 'Assigned') && data.status === 'Assigned'; }
        return isAvailable;
      }

      datePlant = (date) => moment.utc(date, ISO_8601).local().format('DD MMMM YYYY')

render(){
    return(
        <Table classes={{ root: 'table' }} className="table">
        <TableHead className="table-head" classes={{ root: 'table-head' }}>
          <TableRow>
            <TableCell padding="checkbox" />
            <PlanningListHeader
              name="SO"
            //   isActive={this.props.sortJobsByState.unitModel.isActive}
              delay={300}
            //   isAscending={this.props.sortJobsByState.unitModel.isAscending}
            />
            <PlanningListHeader
              name="Customer"
            // //   isActive={this.props.sortJobsByState.unitCode.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.unitCode.isAscending}
            />
            <PlanningListHeader
              name="Site"
            // //   isActive={this.props.sortJobsByState.jobType.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.jobType.isAscending}
            />
            <PlanningListHeader
              name="Unit Model"
            // //   isActive={this.props.sortJobsByState.workOrder.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.workOrder.isAscending}
            />
            <PlanningListHeader
              name="Component Description"
            // //   isActive={this.props.sortJobsByState.customer.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.customer.isAscending}
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
            <InputButton
              titles="Lifetime Comp"
              title="Lifetime Component"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="Plan Execution"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name=""
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
            <PlanningListHeader
              name="Action"
            // //   isActive={this.props.sortJobsByState.staging.isActive}
              delay={300}
            // //   isAscending={this.props.sortJobsByState.staging.isAscending}
            />
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: 'table-body' }}>
          {this.props.salesOrderList.SalesOrderTypes
            && this.props.salesOrderList.SalesOrderTypes.map((row, id) => (
              <TableRow key={id} classes={{ root: 'table-row' }}>
                <TableCell padding="checkbox">
                  {this.props.displayCheckbox && <Checkbox disabled={this.isCheckboxAvailable(row)} checked={this.props.selectedPlanList.some((plans) => plans.SerialNumber === row.SerialNumber)} onClick={() => this.props.onChoosed(row)} classes={{ checked: 'checkbox-checked' }} />}
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
                {!this.props.value[id] ? <InputButton title={"Input Lifetime Component"} onStats={this.props.onStats} titles="Input"/> : 
<div>{this.props.value[id]}</div>
                  }
                </TableCell>
                <TableCell align="left" className="table-cell"> {row.PlanExecution} </TableCell>
                <TableCell align="center" className="table-cell"> <EditButton /></TableCell>
                <TableCell align="center" className="table-cell"> <SaveButton /></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
}