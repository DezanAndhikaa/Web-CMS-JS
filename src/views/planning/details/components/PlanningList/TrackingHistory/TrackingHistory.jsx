/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../../components/Button/BaseButton';
import SalesOrderList from '../SalesOrderList';
import ApprovedSalesOrderList from '../ApprovedSalesOrderList';
// import '../../../../../../components/FilterByTitle/DropdownFilter.scss';
import './TrackingHistory.scss'

export default class TrackingHistory extends React.PureComponent {
	state ={
		whatPageIsChoosed : ''
	}

	_renderSearchBar(){
		return (
		  <div className="bottom-rows">
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
	_renderSalesOrderList(){
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


	  _renderApprovedSalesOrderList(){
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
	// 	this.refresh()
	//   }
	  refresh(){
		window.location.reload(false);
	  }

	  _renderList = (whatPageIsChoosed) =>{
		// const whatPageIsChoosed = '';
		this.setState({
			whatPageIsChoosed : whatPageIsChoosed
		})
		switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				console.log('this is approved', whatPageIsChoosed)
				return(
					this._renderApprovedSalesOrderList()
				)
			case 'Not Approve': 
			console.log('this is not approved', whatPageIsChoosed)
				return (
					this._renderSalesOrderList()
				)
			default:
				console.log('this is default', whatPageIsChoosed)
				return(
					this._renderApprovedSalesOrderList()
				)
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
				<div className="table-containers">
					<div className="title-containers">
						<div className="title">
							Tracking history - Sales Order
						</div>
						<div className="search-containers">							
							{this._renderSearchBar()}
							{this._renderDownloadBtn()}
						</div>
					</div>
					{/* <div className="base-button-containers">
						
					</div> */}
					<div className="filters-containers">
						<div className="dropdowns-containers">
							<Cards title="Approve" totalData={this.props.salesOrderListApproved.TotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Not Approve" totalData={this.props.salesOrderList.TotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Delete" totalData={this.props.salesOrderListDeleted.TotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="SAP ISSUE" totalData="0" renderList={this._renderList} />
						</div>
						 {/* <p1> TRACKING HISTORY - Sales Order </p1> 
						 <br /> */}
					</div>
					<div>
						{this._renderList(this.state.whatPageIsChoosed)}
					</div>
				</div>
			</main>
		);
	}
}