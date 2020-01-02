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
					{
						this.props.name === 'Lifetime' ?
							<InputButton titles="Lifetime Comp" title="Lifetime Component"/> : 
							this.props.name === 'Plan' ?
								<InputButton titles="Plan Execution" title="Plan Execution Date"/> : 
								this.props.name === 'SO' ?
									<InputButton titles="SO" placeholder="SO" /> :
									this.props.name === 'Part Number' ?
										<InputButton titles="Part Number" placeholder="Part Number" /> :
										this.props.name === 'Unit Code' ?
											<InputButton titles="Unit Code" placeholder="Unit Code" /> :
											this.props.name === 'Serial Number' ?
												<InputButton titles="Serial Number" placeholder="Serial Number" /> :
												this.props.name === 'Work Order' ?
													<InputButton titles="Work Order" placeholder="WO" /> :
													<TableSortLabel
														active={this.props.isActive}
														IconComponent={this.props.isAscending ? KeyboardArrowUp : KeyboardArrowDown}
														onClick={this.props.onClick} 
													>
														{this.props.name}
													</TableSortLabel>
					}
				</Tooltip>
			</TableCell>
		);
	}
}