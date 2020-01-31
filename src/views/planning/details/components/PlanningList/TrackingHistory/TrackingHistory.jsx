/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../../components/Button/BaseButton';
import SalesOrderList from '../SalesOrderList';
import ApprovedSalesOrderList from '../ApprovedSalesOrderList';
import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import '../../../../details/components/Tab/PlanningDetailsTab.scss';
import '../../../DetailPages.scss';

export default class TrackingHistory extends React.PureComponent {
	state ={
		whatPageIsChoosed : '',
		approveTotalData : 0,
		notApproveTotalData : 0,
		deleteTotalData : 0,
		sapIssueTotalData : 0
	}

	_renderSearchBar(){
		return (
		  <div className="bottom-row">
			<SearchInput
			{...this.props}
			webInfo="Search"
			onSalesSearch={this.props.onSearchSales}
			onServiceSearch={this.props.onSearchService}
		  />
		  </div>
		);
	  }
	_renderDownloadBtn(){
		return(
			<BaseButton titles="Download"
            {...this.props}
            // handleSalesApprovedDownload={this.handleSalesApprovedDownload}
            // selectedDownloadData={this.state.selectedData.So} 
          />
		)
	}
	onClickSalesOrder = () =>{
		this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
	  }
	salesOrderList(){
		return(
		  <div className="plannings-list-containers">
			<SalesOrderList 
			{...this.props}
			displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
			sortSalesByState={this.props.sortSalesBy}
			onClickSalesOrder={this.onClickSalesOrder}
			onChoosedSales={this.updateAssignmentSalesStates}
			selectedSalesPlanList={this.props.selectedSalesPlans}
			/>
		  </div>
		);
	  }


	  approvedSalesOrderList(){
		return(
		  <div className="plannings-list-containers">
			<ApprovedSalesOrderList 
			{...this.props}
			displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
			sortSalesByState={this.props.sortSalesBy}
			onClickSalesOrder={this.onClickSalesOrder}
			onChoosedSales={this.updateAssignmentSalesStates}
			selectedSalesPlanList={this.props.selectedSalesPlans}
			/>
		  </div>
		);
	  }
	//   componentDidUpdate = () => {

	//   }

	  _renderList = (whatPageIsChoosed) =>{
		// const whatPageIsChoosed = '';
		this.setState({
			whatPageIsChoosed : whatPageIsChoosed
		})
		switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				console.log('this is ', whatPageIsChoosed)
				return(
					this.approvedSalesOrderList()
				)
			case 'Not Approve': 
			console.log('this is ', whatPageIsChoosed)
				return (
					this.salesOrderList()
				)
			case 'Delete': 
			console.log('this is ', whatPageIsChoosed)
				// return (
				// 	this.salesOrderList()
				// )
			case 'SAP ISSUE': 
			console.log('this is ', whatPageIsChoosed)
				// return (
				// 	this.salesOrderList()
				// )
			default:
				console.log('this is default', whatPageIsChoosed)
				// return(
				// 	this.approvedSalesOrderList()
				// )
		}
	  }

	  updateAssignmentSalesStates = (plan) => {
		if (this.props.selectedSalesPlans
		  .some((plans) => plans.So === plan.So,
			// console.log('sssss sales', this.state.selectedData.So)
		  )) 
		{ return this.props.unselectSalesPlan(plan); }
		return this.props.selectSalesPlan(plan);
	  };
	componentDidMount = async() =>{
		await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		await this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
		await this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
		await this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
		await this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
		this.setPropsToState();
	}
	setPropsToState(){
		console.log('pantek ke trigger')
		this.setState({
			approveTotalData : this.props.salesOrderListApproved.TotalData,
			notApproveTotalData : this.props.salesOrderList.TotalData,
			deleteTotalData : this.props.salesOrderListDeleted.TotalData,
			sapIssueTotalData : 0
		})
	}

	render(){
		console.log('skui living', this.props);
		console.log('skui living', this.state.approveTotalData)

		return(
			<main className="content" >
				<div className="table-container">
					<div className="filters-container">
						<div className="dropdowns-container">
							<Cards title="Approve" totalData={this.state.approveTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Not Approve" totalData={this.state.notApproveTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Delete" totalData={this.state.deleteTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="SAP ISSUE" totalData={this.state.sapIssueTotalData} renderList={this._renderList} />
						</div>
						 <p1> TRACKING HISTORY - Sales Order </p1> 
						 <br />
						<div className="search-container">							
        					{this._renderSearchBar()}
        				</div>
						<br />
						<div className="base-button-container">
							{this._renderDownloadBtn()}
						</div>
					</div>
				</div>
				<div>
				{this._renderList(this.state.whatPageIsChoosed)}
				</div>
			</main>
			
			
			
		);
	}
}