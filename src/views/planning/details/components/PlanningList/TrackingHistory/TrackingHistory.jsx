/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../../components/Button/BaseButton';
import SalesOrderList from '../SalesOrderList';
import ServiceOrderList from '../ServiceOrderList';
import ApprovedSalesOrderList from '../ApprovedSalesOrderList';
import Button from '@material-ui/core/Button';
import './TrackingHistory.scss'
import { Menu } from '../../../../../../constants'

export default class TrackingHistory extends React.PureComponent {
	state ={
		whatPageIsChoosed : '',
		approveTotalData : 0,
		notApproveTotalData : 0,
		deleteTotalData : 0,
		sapIssueTotalData : 0
	}

	handleClick = (menu) => {
		this.props.history.push(menu);
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

	onClickServiceOrder = () => {
		this.props.fetchServiceOrder(this.props.salesParameter.dataFIlter);
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

	serviceOrderList(){
		return(
			<div className="plannings-list-containers">
			  <ServiceOrderList 
			  {...this.props}
			  displayServiceCheckbox={this.props.serviceParameter.paramsData.assigmentFilter || this.props.serviceParameter.paramsData.inProgressFilter}
			  sortServiceByState={this.props.sortServiceBy}
			  onClickServiceOrder={this.onClickServiceOrder}
			  onChoosedService={this.updateAssignmentServiceStates}
			  selectedServicePlanList={this.props.selectedServicePlans}
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
				selectedSalesPlanList={this.props.updateAssignmentServiceStates}
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
				if(this.props.location.whichTab === "sales"){
					return (
						this.salesOrderList()
					)
				}else{
					return (
						this.serviceOrderList()
					)
				}
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

	updateAssignmentServiceStates = (plan) => {
		if (this.props.selectedServicePlans
			.some((plans) => plans.So === plan.So,
			// console.log('sssss sales', this.state.selectedData.So)
			)) 
		{ return this.props.unselectServicePlan(plan); }
		return this.props.selectServicePlan(plan);
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

	render(){
		return(
			<main className="content" >
				<div className="head-containers">
					<Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS) }>
						Detail
					</Button>
				</div>
				<div className="table-containers">
					<div className="title-containers">
						<div className="title">
							{this.props.location.whichTab === 'sales' ? 'Tracking history - Sales Order' : 'Tracking History - Service Order'}
						</div>
						<div className="search-containers">							
							{this._renderSearchBar()}
							{this._renderDownloadBtn()}
						</div>
					</div>
					<div className="filters-containers">
						{this.props.location.whichTab === "sales" ? 
							<div className="dropdowns-containers">
								<Cards title="Approve" totalData={this.props.salesOrderListApproved.TotalData} renderList={this._renderList} />
								<Cards title="Not Approve" totalData={this.props.salesOrderList.TotalData} renderList={this._renderList} />
								<Cards title="Delete" totalData={this.props.salesOrderListDeleted.TotalData} renderList={this._renderList} />
								<Cards title="SAP ISSUE" totalData="0" renderList={this._renderList} />
							</div>
							:
							<div className="dropdowns-containers">
								<Cards title="Approve" totalData={this.props.serviceOrderListApproved.TotalData} renderList={this._renderList} />
								<Cards title="Not Approve" totalData={this.props.serviceOrderList.TotalData} renderList={this._renderList} />
								<Cards title="Delete" totalData={this.props.serviceOrderListDeleted.TotalData} renderList={this._renderList} />
								<Cards title="SAP ISSUE" totalData="0" renderList={this._renderList} />
							</div>
						}
					</div>
					<div>
						{this._renderList(this.state.whatPageIsChoosed)}
					</div>
				</div>
			</main>
		);
	}
}