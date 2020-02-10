/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../components/Button/BaseButton';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList';
import ApprovedSalesOrderList from '../PlanningList/ApprovedSalesOrderList';
import DeletedSalesOrderList from '../PlanningList/DeletedSalesOrderList';
import Button from '@material-ui/core/Button';
import './TrackingHistory.scss';
import { Menu } from '../../../../../constants';
import { ApiRequestActionsStatus } from "../../../../../core/RestClientHelpers";
import moment, { ISO_8601 } from "moment";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropDownList from '../../../../../components/DropdownList/DropDownList';

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

	onClickDownloadSalesApproved = () => {
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style = "display: none";
		const todayDate = moment(new Date()).format('DD-MM-YYYY');
		// const salesOrder  = this.state.selectedData.So;
		let fileName = "Sales-Order-Planning-"+todayDate+".csv";
		let blob = new Blob([this.props.approveSalesDownloaded.data]),
		  url = window.URL.createObjectURL(blob);
		link.href = url;
		link.download = fileName;
		link.click();
		window.URL.revokeObjectURL(url);
	}

	onClickDownloadServiceApproved = () => {
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style = "display: none";
		const todayDate = moment(new Date()).format('DD-MM-YYYY');
		// const serviceOrder  = this.state.selectedServiceData.Wo;
		let fileName = "Service-Order-Planning-"+todayDate+".csv";
		let blob = new Blob([this.props.approveServiceDownloaded.data]),
		  url = window.URL.createObjectURL(blob);
		link.href = url;
		link.download = fileName;
		link.click();
		window.URL.revokeObjectURL(url);
	  }

	handleSalesApprovedDownload = async() => {
		let arr = []
		const index = this.props.selectedSalesPlans.length
		if (this.props.selectedSalesPlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedSalesPlans[i].So]
			console.log('pantek');
		  }
		}await this.props.downloadSalesApproved(arr);
		if (
		  this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.FAILED
		) {
		  this.setState({ showError: true });
		}
	}

	handleServiceApprovedDownload = async() => {
		let arr = []
		const index = this.props.selectedServicePlans.length
		if (this.props.selectedServicePlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedServicePlans[i].Wo]
		  }
		}
		await this.props.downloadServiceApproved(arr);
		if (
		  this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.FAILED
		) {
		  this.setState({ showError: true });
		}
	};

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
		if (this.props.location.whichTab === "sales") {
			return(
				<BaseButton titles="Download"
				{...this.props}
				whatTabsIsRendered={true}
				handleSalesApprovedDownload={this.handleSalesApprovedDownload}
			  />
			)
		}else{
			return(
				<BaseButton titles="Download"
				{...this.props}
				whatTabsIsRendered={false}
				handleServiceApprovedDownload={this.handleServiceApprovedDownload}
			  />
			)
		}
		
	}

	_renderPagination= (data) =>  {
		console.log('pantej', data)
		if (this.props.location.whichTab === "sales") {
		  const web = this.props.displayMode === 'web';
		  const currentPropsSales = data.PageNumber;
		  const { TotalPages } = data;
		  switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				console.log('MASOK APPROVE BAPAKK')
				return(
					<div className="pagination">
					<div className="paging">
						{/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
						{web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
						{web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
						{currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
						<div className="page-active">{currentPropsSales}</div>
						{currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
						{web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
						{web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
						{/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
					</div>
					</div>
				)
			case 'Not Approve': 
			console.log('MASOK NOT APPROVE')
				return(
					<div className="pagination">
					<div className="paging">
						{/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
						{web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
						{web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
						{currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
						<div className="page-active">{currentPropsSales}</div>
						{currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
						{web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
						{web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
						{/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
					</div>
					</div>
				)
			case 'Delete':
				return(
					console.log('MASOK DELETE')
				)
			case 'SAP ISSUE' :
				return(
					console.log('MASOK SAP ISSUE')
				)
		  default:
				return(
					console.log('lol')
				) 
		  }
		}else if(this.props.location.whichTab === "service"){
		  const web = this.props.displayMode === 'web';
		  const nextSales = this.props.serviceOrderList.NextPage;
		  const prevSales = this.props.serviceOrderList.PrevPage;
		  const currentPropsService = this.props.serviceOrderList.PageNumber;
		  const { TotalPages } = this.props.serviceOrderList;
		  
		  return(
			<div className="pagination">
			  <div className="paging">
				{prevSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
				{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
				{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
				{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
				<div className="page-active">{currentPropsService}</div>
				{/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
				{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
				{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
				{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
				{nextSales && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
			  </div>
			</div>
		  )
		}
	  }


	_renderShowPerPage(){
		return(
			<DropDownList 
			{...this.props}
			handleClickShowPerPage={this.handleClickShowPerPage}
			/>
		)
	}

	handleClickShowPerPage = (value) =>{
		if (this.props.location.whichTab === 'sales') {
			console.log('pantej masuk sales')
			 switch (this.state.whatPageIsChoosed) {
				 case 'Approve':
					 return(
						console.log('pantej case sales', this.state.whatPageIsChoosed)
					 )
				 case 'Not Approve':
					console.log('pantej case sales not', value)
					 return(
						 <>
					{this.props.clearSelectedSalesPlans()};
					{this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})}
					 </>
					 )
				 case 'Delete': 
					return(
						console.log('pantej case sales del',  this.state.whatPageIsChoosed)
					)
				 case 'SAP ISSUE':
					 return(
						console.log('pantej case sales issue',  this.state.whatPageIsChoosed)
					 )
				 default:
					 console.log('lol')
			 }
		}else if (this.props.location.whichTab === 'service') {
		  console.log('pantej masuk service', value)
		  this.props.clearSelectedServicePlans();
		  this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})
		}
	}

	onClickSalesOrder = async() =>{
		await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
		this.setPropsToState();
	}
	onClickSalesOrderApproved = async() =>{
		await this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
		await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
		this.setPropsToState();
	}

	onClickSalesOrderDeleted = async() =>{
		await this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
		await this.props.clearSelectedSalesPlans(this.props.selectedSalesPlans)
		this.setPropsToState();
	}

	onClickServiceOrder = async() => {
		await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
		this.setPropsToState();
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
				displaySalesCheckbox={this.props.salesApprovedParameter.paramsData.assigmentFilter || this.props.salesApprovedParameter.paramsData.inProgressFilter}
				sortSalesByState={this.props.sortSalesBy}
				onClickSalesOrderApproved={this.onClickSalesOrderApproved}
				onChoosedSales={this.updateAssignmentSalesStates}
				selectedSalesPlanList={this.props.selectedSalesPlans}
				/>
			</div>
		);
	}

	deletedSalesOrderList(){
		return(
			<div className="plannings-list-containers">
				<DeletedSalesOrderList 
				{...this.props}
				displaySalesCheckbox={this.props.salesApprovedParameter.paramsData.assigmentFilter || this.props.salesApprovedParameter.paramsData.inProgressFilter}
				sortSalesByState={this.props.sortSalesBy}
				onClickSalesOrderDeleted={this.onClickSalesOrderDeleted}
				onChoosedSales={this.updateAssignmentSalesStates}
				selectedSalesPlanList={this.props.selectedSalesPlans}
				/>
			</div>
		);
	}

	componentWillUnmount = () => {
		this.props.updateSalesParameter({
		  ...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
		});
		this.props.updateServiceParameter({
		  ...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 2, Sort: [], Filter: [],
		});
	  }

	componentDidUpdate = (prevProps) => {
		if (prevProps.salesParameter !== this.props.salesParameter) {
			this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		}
		if (prevProps.salesApprovedParameter !== this.props.salesApprovedParameter) {
			this.props.fetchApprovedSales(this.props.salesApprovedParameter.dataFilter);
		}
		if (prevProps.serviceParameter !== this.props.serviceParameter) {
			this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		}
		if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadSalesApproved()
		  }
		  if (this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveServiceDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadServiceApproved()
		  }
		
	}

	_renderList = (whatPageIsChoosed) =>{
	// const whatPageIsChoosed = '';
	this.setState({
		whatPageIsChoosed : whatPageIsChoosed
	})
		switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				console.log('this is ', whatPageIsChoosed)
				if(this.props.location.whichTab === 'sales'){
				return(
					<>
						{this.approvedSalesOrderList()}
					<div className="bottom-row">
					{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderListApproved)}
					</div>
					</>
				)
				}else{
					console.log('ini serpis order approved')
				}
			case 'Not Approve': 
			console.log('this is ', whatPageIsChoosed)
				if(this.props.location.whichTab === 'sales'){
					return (
						<>
							{this.salesOrderList()}
						<div className="bottom-row">
						{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderList)}
						</div>
						</>
					)
				}else
				// else if(this.props.location.whichTab === 'service')
				{
					return (
						<>
							{this.serviceOrderList()}
						<div className="bottom-row">
						{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderList)}
						</div>
						</>
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
			.some((plans) => plans.Wo === plan.Wo,
			// console.log('sssss sales', this.state.selectedData.So)
			)) 
		{ return this.props.unselectServicePlan(plan); }
		return this.props.selectServicePlan(plan);
	};

	componentDidMount = async() =>{
		if(this.props.location.whichTab === "sales"){
			await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
			await this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
			await this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
			this.setPropsToState();
		}if(this.props.location.whichTab === "service"){
			await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
			await this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
			await this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
			this.setPropsToState();
		}else if(this.props.location.whichTab === undefined){
			this.handleClick(Menu.PLANNING_DETAILS);
		}
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
		console.log('pantej', this.props.location.whichTab)
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
								<Cards title="Approve" totalData={this.state.approveTotalData} renderList={this._renderList} />
								<Cards title="Not Approve" totalData={this.state.notApproveTotalData} renderList={this._renderList} />
								<Cards title="Delete" totalData={this.state.deleteTotalData} renderList={this._renderList} />
								<Cards title="SAP ISSUE" totalData={this.state.sapIssueTotalData} renderList={this._renderList} />
							</div>
							:
							<div className="dropdowns-containers">
								<Cards title="Approve" totalData={this.state.approveTotalData} renderList={this._renderList} />
								<Cards title="Not Approve" totalData={this.state.notApproveTotalData} renderList={this._renderList} />
								<Cards title="Delete" totalData={this.state.deleteTotalData} renderList={this._renderList} />
								<Cards title="SAP ISSUE" totalData={this.state.sapIssueTotalData} renderList={this._renderList} />
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