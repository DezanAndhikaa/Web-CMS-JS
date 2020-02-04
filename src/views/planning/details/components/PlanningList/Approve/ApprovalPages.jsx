import React from 'react';
import SearchInput from '../../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../../components/Button/BaseButton';
import SalesOrderList from '../SalesOrderList';
import ApprovedSalesOrderList from '../ApprovedSalesOrderList';
import './ApprovalPages.scss';
import FilterbyDataAction from '../../../../../../components/FilterByDataAction/FilterbyDataAction';
import NotifButton from '../../../../../../components/ActionButton/NotifButton/NotifButton';
import { AppBar } from '@material-ui/core';

export default class ApprovalPages extends React.PureComponent {
    state ={
		whatPageIsChoosed : '',
		// approveTotalData : 0,
		// notApproveTotalData : 0,
		// deleteTotalData : 0,
		// sapIssueTotalData : 0
	}

	_renderSearchBar(){
		return (
			<div className="footer-container">
				<SearchInput
				{...this.props}
				webInfo="Search"
				onSalesSearch={this.props.onSearchSales}
				onServiceSearch={this.props.onSearchService}
				/>
		  	</div>
		);
	  }

	_renderBaseButton (){
		return(
			<div className="footer-container">
			  {/* <BaseButton titles="Total" totalSelectedItems ={this.props.selectedSalesPlans.length}/> */}
			  <BaseButton titles="Approve"
				{...this.props}
				whatTabsIsRendered={this.state.isPaging}
				// disabledButton = {this.props.selectedSalesPlans.length < 1 }
				totalSelectedItems ={this.props.selectedSalesPlans.length}
				handleSalesApprove={this.handleSalesApprove}
				selectedData={this.state.selectedData}
			  />
			  <BaseButton titles="Cancel Approve"
				// {...this.props}
				// whatTabsIsRendered={this.state.isPaging}
				// disabledButton = {this.props.selectedSalesPlans.length < 1 }
				// totalSelectedItems ={this.props.selectedSalesPlans.length}
				// handleSalesApprove={this.handleSalesApprove}
				// selectedData={this.state.selectedData}
			  />
			  <BaseButton titles="Download"
				{...this.props}
				whatTabsIsRendered={this.state.isPaging}
				handleSalesApprovedDownload={this.handleSalesApprovedDownload}
				// selectedDownloadData={this.state.selectedData.So} 
			  />
			  <BaseButton titles="Edit" />
			  <BaseButton titles="Delete" 
				{...this.props}
				disabledButton = {this.props.selectedSalesPlans.length < 1 }
				totalSelectedItems ={this.props.selectedSalesPlans.length}
				// whatTabsIsRendered={this.state.isPaging}
				handleDeleteSales={this.handleDeleteSales}
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
		// console.log('pantek ke trigger')
		this.setState({
			approveTotalData : this.props.salesOrderListApproved.TotalData,
			notApproveTotalData : this.props.salesOrderList.TotalData,
			deleteTotalData : this.props.salesOrderListDeleted.TotalData,
			sapIssueTotalData : 0
		})
	}

	_renderNotif(){
		return (
		  <NotifButton />
		)
	}

	_renderTrackingHistory(){
		return(
			<>
				<FilterbyDataAction 
					{...this.props}
					titles="Tracking History"
					onClickPlanningApprove={this.onClickApprovedSales}
					onClickPlanningDelete={this.onClickDeletedSales}
					onClickButton={this.handleClickFilterByDataAction}
				/>
				<FilterbyDataAction 
					{... this.props}
					titles="Approve"
				/>
			</>
		)
	}

	render(){
		// return(
		// 	<main className="content" >
		// 		<div className="table-bar">
		// 			<div className="title-content">
		// 				<div className="titles">
		// 					Approval - Sales Order
		// 				</div>
		// 				<div className="search-content">							
		// 					{/* {this._renderSearchBar()} */}
		// 					{this._renderBaseButton()}
		// 				</div>
		// 			</div>
		// 			<div className="filters-content">
						
		// 			</div>
		// 		</div>
		// 	</main>
		// );
		return(
			<main className="content">
				<AppBar>
				<div className="tab-bar">
					{/* {this._renderNotif()}
					{this._renderTrackingHistory()} */}
				</div>
				</AppBar>
				<div className="table-bar">
					  {/* {this._renderTabs()} */}
		 				<div className="approval-search-bar">							
		 					{/* {this._renderSearchBar()} */}
		 					{this._renderBaseButton()}
		 				</div>
				  </div>
				  <div></div>
				  <div className="footer-container">
					  {/* {this._renderShowPerPage()} {this._renderPagination()} */}
				  </div>
			</main>
		  )
	}
}