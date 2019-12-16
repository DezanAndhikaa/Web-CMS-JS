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

export default class PlanningList extends React.PureComponent {

    openDetail = async (row) => {
      await this.props.saveJobData(row);
      this.props.storeJobData(row);
      return this.props.pushTo(`${Menu.DETAIL_PI}:${row.woNumber || ''}`);
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
        <Table classes={{ root: 'table' }}>
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
              name="Costumer"
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
          {this.props.planningList
            && this.props.planningList.map((row, index) => (
              <TableRow key={index} classes={{ root: 'table-row' }}>
                <TableCell padding="checkbox">
                  {this.props.displayCheckbox && <Checkbox disabled={this.isCheckboxAvailable(row)} checked={this.props.selectedPlanList.some((plans) => plans.woNumber === row.woNumber)} onClick={() => this.props.onChoosed(row)} classes={{ checked: 'checkbox-checked' }} />}
                </TableCell>
                <TableCell align="left" className="table-cell"> {row.so} </TableCell>
                <TableCell align="left" className="table-cell"> {row.costumer} </TableCell>
                <TableCell align="left" className="table-cell"> {row.site} </TableCell>
                <TableCell align="left" className="table-cell"> {row.unitModel} </TableCell>
                <TableCell align="left" className="table-cell"> {row.compDesc} </TableCell>
                <TableCell align="left" className="table-cell"> {row.partNumber} </TableCell>
                <TableCell align="left" className="table-cell"> {row.unitCode} </TableCell>
                <TableCell align="left" className="table-cell"> {row.serialNumber} </TableCell>
                <TableCell align="left" className="table-cell"> 
                  {this.props.stats ? <InputButton title={"Input Lifetime Component"} titles={"Input"} onStats={this.props.onStats}/> : 
                    <button>klik me!</button>
                  }
                </TableCell>
                <TableCell align="left" className="table-cell"> {row.planExecution} </TableCell>
                <TableCell align="center" className="table-cell"> <EditButton /></TableCell>
                <TableCell align="center" className="table-cell"> <SaveButton /></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
)
}
}