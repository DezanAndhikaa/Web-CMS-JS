import React from 'react';
import { TableSortLabel, Tooltip, TableCell } from '@material-ui/core';
import './PlanningListHeader.scss';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import InputButton from '../../../../../components/Button/InputButton'

export default class PlanningListHeader extends React.PureComponent {
	render() {
		return (
			<TableCell align="left" className="table-cell">
				<Tooltip
					title="Sort"
					placement="bottom-end"
					enterDelay={this.props.delay}
				>
					{
						this.props.name === 'Lifetime' ?
							<InputButton titles="LIFETIME COMP" title="Lifetime Component" onFilter={this.props.onFilter} /> :
							this.props.name === 'Plan' ?
								<InputButton titles="PLAN EXECUTION" title="Plan Execution Date" onFilter={this.props.onFilter} /> :
								this.props.name === 'SO' ?
									<InputButton titles="SO" position={this.props.loc} placeholder="SO" onSearch={this.props.onSearch} sort="SoNumber" /> :
									this.props.name === 'Part Number' ?
										<InputButton titles="Part Number" placeholder="PART NUMBER" onSearch={this.props.onSearch} sort="PartNumber" /> :
										this.props.name === 'Unit Code' ?
											<InputButton titles="Unit Code" placeholder="UNIT CODE" onSearch={this.props.onSearch} sort="UnitCode" /> :
											this.props.name === 'Serial Number' ?
												<InputButton titles="Serial Number" placeholder="SERIAL NUMBER" onSearch={this.props.onSearch} sort="SerialNumber" /> :
												this.props.name === 'Work Order' ?
													<InputButton titles="Work Order" position={this.props.loc} placeholder="WO" onSearch={this.props.onSearch} sort="WoNumber" /> :
													this.props.name === 'SMR' ?
														<InputButton titles='SMR' title="SMR" onFilter={this.props.onFilter} /> :
														this.props.name === 'SMR Date' ?
															<InputButton titles='SMR DATE' title="SMR Date" onFilter={this.props.onFilter} /> :
															this.props.name === 'Lifetime Comp' ?
																<InputButton titles='NF Lifetime' headerName="LIFETIME COMP" /> :
																<TableSortLabel
																	active={true}
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