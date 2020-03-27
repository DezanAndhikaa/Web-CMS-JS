

import React from 'react';
import './SelectedPlans.scss';

export default class SelectedPlansComponent extends React.PureComponent {
	render() {
		return (
			<div className="selected-plans">
				<div className="selected-plans-title">Selected Item</div>
				<div className="selected-plans-list">
					{
						this.props.selectedPlans.map((item, index) => (
							<div key={index} className="selected-plans-detail-container">
								<div className="selected-plans-detail">
									<div className="selected-plans-label">Unit Model</div>
									<div className="selected-plans-info">{item.unitModel}</div>
								</div>
								<div className="selected-plans-detail">
									<div className="selected-plans-label">Unit Code</div>
									<div className="selected-plans-info">{item.unitCode}</div>
								</div>
								<div className="selected-plans-detail">
									<div className="selected-plans-label">Tipe Pekerjaan</div>
									<div className="selected-plans-info">{item.planType}</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	}
}
