import React from 'react';
import Cards from './components/Card';
import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import '../../../../details/components/Tab/PlanningDetailsTab.scss';

export default class ServiceOrderList extends React.PureComponent {
	render(){
		return(
			<div className="filters-container">
				<div className="dropdowns-container">
					<div className="dropdown-container">
						<Cards /> &nbsp; <Cards /> &nbsp; <Cards /> &nbsp; <Cards />
					</div>					
				</div>
			</div>
			
			
		);
	}
}