import React from 'react';
import Cards from './components/Card';
import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import '../../../../details/components/Tab/PlanningDetailsTab.scss';

export default class ServiceOrderList extends React.PureComponent {

	hendleClick () {
		alert('yeah')
	}

	render(){
		return(
			<main className="content">
				<div className="table-container">
					<div className="filters-container">
						<div className="dropdowns-container">
							<div className="dropdown-container">
								<Cards onClick={this.handleClick}/> 
								<Cards /> 
							</div>					
						</div>
					</div>
				</div>
			</main>
		)
	}
}