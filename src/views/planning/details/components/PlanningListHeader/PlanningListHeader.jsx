import React from 'react';
import { TableSortLabel, Tooltip, TableCell } from '@material-ui/core';
import './PlanningListHeader.scss';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

export default class PlanningListHeader extends React.PureComponent {
	render(){
		return(
			<TableCell align="left" className="table-cell">
				<Tooltip
					title="Sort"
					placement="bottom-end"
					enterDelay={this.props.delay}
				>
					<TableSortLabel
						active={this.props.isActive}
						// IconComponent={this.props.isAscending ? KeyboardArrowUp : KeyboardArrowDown}
						// onClick={this.props.onClick}
					>
						{this.props.name}
					</TableSortLabel>
				</Tooltip>
			</TableCell>
		);
	}
}