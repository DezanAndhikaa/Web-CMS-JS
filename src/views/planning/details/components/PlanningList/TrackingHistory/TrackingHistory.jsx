/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import PlanningDetailsTab from '../../Tab/PlanningDetailsTab';
import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import '../../../../details/components/Tab/PlanningDetailsTab.scss';
import '../../../DetailPages.scss';

export default class ServiceOrderList extends React.PureComponent {
	
	_renderTabs(){
		return(
			<>
				<PlanningDetailsTab 
					{...this.props}
				/>
			</>
		);
	}

	componentDidMount(){
		this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);

	}

	render(){
		console.log('skui living', this.props);
		return(
			<main className="content" >
				<div className="table-container">
					{this._renderTabs()}
				</div>
			</main>
			// <div className="filters-container">
			// 	<div className="dropdowns-container">
			// 		<div className="dropdown-container">
			// 			<Cards /> &nbsp; <Cards /> &nbsp; <Cards /> &nbsp; <Cards />
			// 		</div>					
			// 	</div>
			// </div>
			
			
			
		);
	}
}