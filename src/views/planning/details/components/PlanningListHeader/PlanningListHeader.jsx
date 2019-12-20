import React from 'react';
import { TableSortLabel, Tooltip, TableCell } from '@material-ui/core';
import './PlanningListHeader.scss';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import InputButton from '../../../../../components/Button/InputButton'

export default class PlanningListHeader extends React.PureComponent {
	render(){
		return(
			<TableCell align="left" className="table-cell">
				<Tooltip
					title="Sort"
					placement="bottom-end"
					enterDelay={this.props.delay}
				>
				{this.props.name === "Lifetime" ? 
					<InputButton titles="Lifetime Comp" title="Lifetime Component"/> : 
					this.props.name === "Plan" ?
					<InputButton titles="Plan Execution" title="Plan Execution Date"/> : 
					<TableSortLabel
						active={this.props.isActive}
					>
						{this.props.name}
					</TableSortLabel>
				}
					
				</Tooltip>
			</TableCell>
		);
	}
}