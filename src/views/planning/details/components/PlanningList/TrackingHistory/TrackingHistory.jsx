/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import PlanningDetailsTab from '../../Tab/PlanningDetailsTab';
import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import '../../../../details/components/Tab/PlanningDetailsTab.scss';
import '../../../DetailPages.scss';

export default class TrackingHistory extends React.PureComponent {
	
	_renderTabs(){
		return(
			<>
				<PlanningDetailsTab 
					{...this.props}
				/>
			</>
		);
	}

	// _renderCards(){
	// 	return(
	// 		<>
	// 			<Cards />
	// 		</>
	// 	);
	// }


	componentDidMount = () =>{
		this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
		this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
		this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
		this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);

	}

	render(){
		console.log('skui living', this.props);
		return(
			<main className="content" >
				<div className="table-container">
					{/* {this._renderTabs()} */}
					{/* {this._renderCards()} &nbsp; {this._renderCards()} &nbsp; {this._renderCards()} &nbsp; {this._renderCards()}
					 */}
					<Cards title="Approve" totalData={this.props.salesOrderListApproved.TotalData} /> &nbsp; 
					<Cards title="Not Approve" totalData={this.props.salesOrderList.TotalData}/> &nbsp; 
					<Cards title="Delete" totalData={this.props.salesOrderListDeleted.TotalData} /> &nbsp; 
					<Cards title="SAP ISSUE" totalData="0" />
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