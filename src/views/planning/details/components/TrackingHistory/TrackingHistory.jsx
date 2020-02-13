/* eslint-disable react/prop-types */
import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../components/Button/BaseButton';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList';
import ApprovedSalesOrderList from '../PlanningList/ApprovedSalesOrderList';
import DeletedSalesOrderList from '../PlanningList/DeletedSalesOrderList';
import ApprovedServiceOrderList from '../PlanningList/ApprovedServiceOrderList';
import DeletedServiceOrderList from '../PlanningList/DeletedServiceOrderList';
import Button from '@material-ui/core/Button';
import './TrackingHistory.scss'
import { Menu } from '../../../../../constants'
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton'
import FilterbyDataAction  from '../../../../../components/FilterByDataAction/FilterbyDataAction'
import { Spinner } from '../../../../../assets/icons'
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment, { ISO_8601 } from "moment";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropDownList from '../../../../../components/DropdownList/DropDownList';

export default class TrackingHistory extends React.PureComponent {
	state ={
		whatPageIsChoosed : '',
		approveTotalData : 0,
		notApproveTotalData : 0,
		deleteTotalData : 0,
		sapIssueTotalData : 0,
		searchVal : ''
	}

	handleClick = (menu) => {
		this.props.push(menu);
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
			handleSearch={this.handleSearch}
			// onServiceSearch={this.props.onSearchService}
		  />
		  </div>
		);
	}
	handleSearch=(value)=>{
		this.setState({ searchVal : value})
		if (this.props.location.whichTab === "sales") {
			setTimeout(() => {
				this.props.onSearchSales(this.state.searchVal)
			}, 1000);
		}else if (this.props.location.whichTab === "service") {
			setTimeout(() => {
				this.props.onSearchService(this.state.searchVal)
			}, 1000);
		}
	}

	_renderDownloadBtn(){
		if (this.props.location.whichTab === "sales") {
			return(
				<>
					<BaseButton titles="Permanently" />

					<BaseButton titles="Download"
						{...this.props}
						whatTabsIsRendered={true}
						handleSalesApprovedDownload={this.handleSalesApprovedDownload}
					/>
				</>
			)
		}else if (this.props.location.whichTab === "service"){
			return(
				<>
					<BaseButton titles="Permanently" />
					<BaseButton titles="Download"
						{...this.props}
						whatTabsIsRendered={false}
						handleServiceApprovedDownload={this.handleServiceApprovedDownload}
					/>
				</>
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
					console.log('MASOK DELETE')
					return(
						<div className="pagination">
						<div className="paging">
							{/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
							{web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
							{web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
							{currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
							<div className="page-active">{currentPropsSales}</div>
							{currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
							{web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
							{web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
							{/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
						</div>
						</div>
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
			const currentPropsService = data.PageNumber;
			const { TotalPages } = data;
		  switch (this.state.whatPageIsChoosed) {
		  case 'Approve':
				console.log('MASOK APPROVE BAPAKK')
					return(
						<div className="pagination">
						  <div className="paging">
							{/* {prevService && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
							{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
							{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
							{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
							<div className="page-active">{currentPropsService}</div>
							{/* <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService })} className="page-active">{currentPropsService}</div> */}
							{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
							{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
							{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
							{/* {nextService && <div onClick={() => this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
						  </div>
						</div>
				)
			case 'Not Approve': 
			console.log('MASOK NOT APPROVE')
			return(
				<div className="pagination">
				  <div className="paging">
					{/* {prevService && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
					{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
					{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
					{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
					<div className="page-active">{currentPropsService}</div>
					{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
					{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
					{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
					{/* {nextService && <div onClick={() => this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
				  </div>
				</div>
		)
			case 'Delete':
					console.log('MASOK DELETE')
					return(
						<div className="pagination">
						<div className="paging">
							{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
							{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
							{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
							<div className="page-active">{currentPropsService}</div>
							{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateSserviceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
							{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateSserviceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
							{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateSserviceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
							
						</div>
						</div>
					)
			case 'SAP ISSUE' :
				return(
					console.log('MASOK SAP ISSUE')
				)
		  default:

		}
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
					console.log('pantej case sales', this.state.whatPageIsChoosed)
					 return(
						<>
						{this.props.clearSelectedSalesPlans()};
					{this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageSize: value})}
					</>
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
					console.log('pantej case sales del',  this.state.whatPageIsChoosed) 
					return(
						<>
						{this.props.clearSelectedSalesPlans()};
					{this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageSize: value})}
						</>
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
		  switch (this.state.whatPageIsChoosed) {
			case 'Approve':
			   console.log('pantej case service', this.state.whatPageIsChoosed)
				return(
				   <>
				   	   {this.props.clearSelectedServicePlans()};
		  {this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageSize: value})}
			   </>
				)
			case 'Not Approve':
			   console.log('pantej case service not', value)
				return(
					<>
			   {this.props.clearSelectedServicePlans()};
		  {this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})}
				</>
				)
			case 'Delete':
			   console.log('pantej case service del',  this.state.whatPageIsChoosed) 
			   return(
				   <>
				   	{this.props.clearSelectedServicePlans()};
		  			{this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageSize: value})}
				   </>
			   )
			case 'SAP ISSUE':
				return(
				   console.log('pantej case service issue',  this.state.whatPageIsChoosed)
				)
			default:
				console.log('lol')
		}
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

	onClickServiceOrderApproved = async() => {
		await this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
		this.props.clearSelectedServicePlans(this.props.selectedServicePlans)
		this.setPropsToState();

	}

	onClickServiceOrderDeleted = async() => {
		await this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
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

	approvedServiceOrderList(){
		return(
			<div className="plannings-list-containers">
				<ApprovedServiceOrderList 
				{...this.props}
				displayServicesCheckbox={this.props.serviceApprovedParameter.paramsData.assigmentFilter || this.props.serviceApprovedParameter.paramsData.inProgressFilter}
				sortServicesByState={this.props.sortServicesBy}
				onClickServiceOrderApproved={this.onClickServiceOrderApproved}
				onChoosedServices={this.updateAssignmentServicesStates}
				selectedServicesPlanList={this.props.selectedServicesPlans}
				/>
			</div>
		)
	}

	deletedSalesOrderList(){
		return(
			<div className="plannings-list-containers">
				<DeletedSalesOrderList 
				{...this.props}
				displaySalesCheckbox={this.props.salesDeletedParameter.paramsData.assigmentFilter || this.props.salesDeletedParameter.paramsData.inProgressFilter}
				sortSalesByState={this.props.sortSalesBy}
				onClickSalesOrderDeleted={this.onClickSalesOrderDeleted}
				onChoosedSales={this.updateAssignmentSalesStates}
				selectedSalesPlanList={this.props.selectedSalesPlans}
				/>
			</div>
		);
	}

	deletedServiceOrderList(){
		return(
			<div className="plannings-list-containers">
				<DeletedServiceOrderList 
				{...this.props}
				displayServiceCheckbox={this.props.serviceDeletedParameter.paramsData.assigmentFilter || this.props.serviceDeletedParameter.paramsData.inProgressFilter}
				sortServiceByState={this.props.sortServiceBy}
				onClickServiceOrderDeleted={this.onClickServiceOrderDeleted}
				onChoosedService={this.updateAssignmentServiceStates}
				selectedServicePlanList={this.props.selectedServicePlans}
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
		if (prevProps.salesDeletedParameter !== this.props.salesDeletedParameter) {
			this.props.fetchDeletedSales(this.props.salesDeletedParameter.dataFilter);
		}
		if (prevProps.serviceParameter !== this.props.serviceParameter) {
			this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		}
		if (prevProps.serviceApprovedParameter !== this.props.serviceApprovedParameter) {
			this.props.fetchApprovedService(this.props.serviceApprovedParameter.dataFilter);
		}
		if (prevProps.serviceDeletedParameter !== this.props.serviceDeletedParameter) {
			this.props.fetchDeletedService(this.props.serviceDeletedParameter.dataFilter);
		}
		if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadSalesApproved()
		}
		if (this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
		prevProps.approveServiceDownloaded.status === ApiRequestActionsStatus.LOADING) {
		this.onClickDownloadServiceApproved()
		}
		  //ini untuk trigger sales global search
		if (prevProps.salesSearch !== this.props.salesSearch) {
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return this.props.updateSalesApprovedParameter({...prevProps.salesApprovedParameter.dataFilter, Filter : this.props.salesSearch, PageNumber :1});
				case 'Not Approve':
					return this.props.updateSalesParameter({...prevProps.salesParameter.dataFilter, Filter : this.props.salesSearch, PageNumber: 1});
				case 'Delete' :
					return this.props.updateSalesDeletedParameter({...prevProps.salesDeletedParameter.dataFilter, Filter : this.props.salesSearch, PageNumber :1});
				case 'SAP ISSUE':
					// this.props.updateSalesSapIssueParameter({...prevProps.salesSapIssueParameter.dataFilter, Filter : this.props.salesSearch, PageNumber :1});
				default:
					break;
			}
			console.log('masuk search ', this.props.salesSearch)
		}
		if (prevProps.serviceSearch !== this.props.serviceSearch) {
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return this.props.updateServiceApprovedParameter({...prevProps.serviceApprovedParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber :1});
				case 'Not Approve':
					return this.props.updateServiceParameter({...prevProps.serviceParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber: 1});
				case 'Delete' :
					return this.props.updateServiceDeletedParameter({...prevProps.serviceDeletedParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber :1});
				case 'SAP ISSUE':
					return this.props.updateServiceSapIssueParameter({...prevProps.serviceSapIssueParameter.dataFilter, Filter : this.props.serviceSearch, PageNumber :1});
				default:
					break;
			}
			console.log('masuk search ', this.props.serviceSearch)
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
					return(
						<>
							{this.approvedServiceOrderList()}
						<div className="bottom-row">
						{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderListApproved)}
						</div>
						</>
					)
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
				// }else
				}else if(this.props.location.whichTab === 'service'){
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
			if(this.props.location.whichTab === 'sales'){
				return(
					<>
						{this.deletedSalesOrderList()}
					<div className="bottom-row">
					{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderListDeleted)}
					</div>
					</>
				)
			}else if(this.props.location.whichTab === 'service'){
				console.log('delete serpis')
				return(
					<>
						{this.deletedServiceOrderList()}
					<div className="bottom-row">
					{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderListDeleted)}
					</div>
					</>
				)
			}
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
			this.handleClick(Menu.PLANNING_APPROVAL);
		}
	}

	setPropsToState(){
		console.log('pantek ke trigger')
		if (this.props.location.whichTab === "sales") {
			this.setState({
				approveTotalData : this.props.salesOrderListApproved.TotalData,
				notApproveTotalData : this.props.salesOrderList.TotalData,
				deleteTotalData : this.props.salesOrderListDeleted.TotalData,
				sapIssueTotalData : 0
			})
		}else if (this.props.location.whichTab === "service") {
			this.setState({
				approveTotalData : this.props.serviceOrderListApproved.TotalData,
				notApproveTotalData : this.props.serviceOrderList.TotalData,
				deleteTotalData : this.props.serviceOrderListDeleted.TotalData,
				sapIssueTotalData : 0
			})
		}
		
	}

	showLoading(){
		if(this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING){
		  return(
			<div className="loading-tracking-container">
			  <img 
				src={Spinner}
				alt="loading-spinner"
				className="loading-icon"
				/>
			</div>
		  )
		}else if(this.props.fetchStatusSales === ApiRequestActionsStatus.FAILED){
		  return(
			<div className="loading-tracking-container">
			  {/* OOPS THERE WAS AN ERROR :'( */}
			</div>
		  )
		}else if(this.props.salesOrderList.Lists.length === 0){
		  return(
			<div className="loading-tracking-container">
			  {/* DATA NOT FOUND */}
			</div>
		  )
		}
	  }

	render(){
		console.log('pantej location ', this.props.location)
		return(
			<main className="content" >
				{/* {this.showLoading()} */}
				<div className="head-containers">
					<div className="back_button">
						<Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
							Detail
						</Button>
					</div>
					<div className="notif_button">
						<NotifButton/>
						<FilterbyDataAction
							titles = "Tracking History"
						/>
					</div>
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