import React from 'react';
import Cards from './components/Card';
import SearchInput from '../../../../../components/Searchbar/SearchInput';
import BaseButton from '../../../../../components/Button/BaseButton';
import SalesOrderList from '../PlanningList/SalesOrderList';
import ServiceOrderList from '../PlanningList/ServiceOrderList';
import ApprovedSalesOrderList from '../PlanningList/ApprovedSalesOrderList';
import DeletedSalesOrderList from '../PlanningList/DeletedSalesOrderList';
import SapSalesOrderList from '../PlanningList/SapSalesOrderList'
import SapServiceOrderList from '../PlanningList/SapServiceOrderList'
import ApprovedServiceOrderList from '../PlanningList/ApprovedServiceOrderList';
import DeletedServiceOrderList from '../PlanningList/DeletedServiceOrderList';
import Button from '@material-ui/core/Button';
import './Status.scss';
import { Menu } from '../../../../../constants';
import NotifButton from '../../../../../components/ActionButton/NotifButton/NotifButton';
import FilterbyDataAction  from '../../../../../components/FilterByDataAction/FilterbyDataAction';
import { Spinner } from '../../../../../assets/icons';
import { ApiRequestActionsStatus } from '../../../../../core/RestClientHelpers';
import moment from "moment";
import DropDownList from '../../../../../components/DropdownList/DropDownList';

export default class Status extends React.PureComponent {
	state ={
		whatPageIsChoosed : '',
		approveTotalData : 0,
		notApproveTotalData : 0,
		deleteTotalData : 0,
		sapIssueTotalData : 0,
		searchVal : '',
		isDisabled: true,
		openSuccess: false,
	}

	changeSuccess = () => {
		this.setState({
		  openSuccess : !this.state.openSuccess
		})
	}

	componentDidMount = async() =>{
		if(this.props.location.whichTab === "sales"){
			this.onClickSalesOrder();
			this.onClickSalesOrderApproved();
			this.onClickSalesOrderDeleted();
			this.onClickSalesOrderSap();
			this.setPropsToState();
		}if(this.props.location.whichTab === "service"){
			this.onClickServiceOrder();
			this.onClickServiceOrderApproved();
			this.onClickServiceOrderDeleted();
			this.onClickServiceOrderSap();
			this.setPropsToState();
		}else if(this.props.location.whichTab === undefined){
			this.handleClick(Menu.PLANNING_APPROVAL);
		}
	}

	componentWillUnmount = () => {
		this.props.updateSalesParameter({
			...this.props.salesParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
		});
		this.props.updateServiceParameter({
			...this.props.serviceParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: [],
		});
		this.props.updateSalesApprovedParameter({
			...this.props.salesApprovedParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
		this.props.updateServiceApprovedParameter({
			...this.props.serviceApprovedParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
		this.props.updateSalesDeletedParameter({
			...this.props.salesDeletedParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
		this.props.updateServiceDeletedParameter({
			...this.props.serviceDeletedParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
		this.props.updateSalesSapParameter({
			...this.props.salesSapParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
		this.props.updateServiceSapParameter({
			...this.props.serviceSapParameter.dataFilter, PageNumber: 1, PageSize: 10, Sort: [], Filter: []
		})
	  }

	componentDidUpdate = (prevProps) => {
		if (prevProps.salesParameter !== this.props.salesParameter) {
			this.onClickSalesOrder();
		}
		if (prevProps.salesApprovedParameter !== this.props.salesApprovedParameter) {
			this.onClickSalesOrderApproved();
		}
		if (prevProps.salesDeletedParameter !== this.props.salesDeletedParameter) {
			this.onClickSalesOrderDeleted();
		}
		if (prevProps.salesSapParameter !== this.props.salesSapParameter ){
			this.onClickSalesOrderSap();
		}
		if (prevProps.serviceParameter !== this.props.serviceParameter) {
			this.onClickServiceOrder();
		}
		if (prevProps.serviceApprovedParameter !== this.props.serviceApprovedParameter) {
			this.onClickServiceOrderApproved();
		}
		if (prevProps.serviceDeletedParameter !== this.props.serviceDeletedParameter) {
			this.onClickServiceOrderDeleted();
		}
		if (prevProps.serviceSapParameter !== this.props.serviceSapParameter) {
			this.onClickServiceOrderSap();
		}
		if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadSalesApproved()
		}
		if (this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveServiceDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadServiceApproved()
		}
		if(prevProps.searchSalesApprovedParam !== this.props.searchSalesApprovedParam){
			this.fetchSearchSalesApproved();
		}
		if(prevProps.searchSalesParameter !== this.props.searchSalesParameter){
			this.fetchSearchSales();
		}
		if(prevProps.searchSalesDeletedParam !== this.props.searchSalesDeletedParam){
			this.fetchSearchSalesDeleted();
		}
		if(prevProps.searchSalesSapParam !== this.props.searchSalesSapParam){
			this.fetchSearchSalesSap();
		}
		if(prevProps.searchServiceApprovedParam !== this.props.searchServiceApprovedParam){
			this.fetchSearchServiceApproved();
		}
		if(prevProps.searchServiceParameter !== this.props.searchServiceParameter){
			this.fetchSearchService();
		}
		if(prevProps.searchServiceDeletedParam !== this.props.searchServiceDeletedParam){
			this.fetchSearchServiceDeleted();
		}
		if(prevProps.searchServiceSapParam !== this.props.searchServiceSapParam){
			this.fetchSearchServiceSap();
		}

		//ini untuk trigger sales global search
		if (prevProps.salesSearch !== this.props.salesSearch) {
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return this.props.updateSearchSalesApproved(
						{...prevProps.searchSalesApprovedParam, Category: 'SA', Keyword: this.props.salesSearch});
				case 'Not Approve':
					return this.props.updateSearchSales(
						{...prevProps.searchSalesParameter, Category: 'SN', Keyword: this.props.salesSearch});
				case 'Delete' :
					return this.props.updateSearchSalesDeleted(
						{...prevProps.searchSalesDeletedParam, Category: 'SD', Keyword: this.props.salesSearch});
				case 'SAP ISSUE':
					return this.props.updateSearchSalesSap(
						{...prevProps.searchSalesSapParam, Category: 'SSAP', Keyword: this.props.salesSearch});
				default:
					break;
			}
		}
		  
		//ini untuk trigger service global search
		if(prevProps.serviceSearch !== this.props.serviceSearch){
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return this.props.updateServiceApprovedParameter(
						{...prevProps.searchServiceApprovedParam, Category: 'SA', Keyword: this.props.serviceSearch});
				case 'Not Approve':
					return this.props.updateServiceParameter(
						{...prevProps.searchServiceParameter, Category: 'SN', Keyword: this.props.serviceSearch});
				case 'Delete' :
					return this.props.updateServiceDeletedParameter(
						{...prevProps.searchSerrviceDeletedParam, Category: 'SD', Keyword: this.props.serviceSearch});
				case 'SAP ISSUE':
					return this.props.updateServiceSapParameter(
						{...prevProps.searchServiceSapParam, Category: 'SSAP', Keyword: this.props.serviceSearch});
				default:
					break;
			}
		}

		//search per component
		if(prevProps.searchComp !== this.props.searchComp){
			if (this.props.location.whichTab === "sales") {
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						if(this.props.searchComp[0].Value === ""){
							this.props.updateSalesApprovedParameter({
							...prevProps.salesApprovedParameter.dataFilter, Filter: this.props.searchComp.Value = "",
							});  
						}else{
							this.props.updateSalesApprovedParameter({
							...prevProps.salesApprovedParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'Not Approve':
						if(this.props.searchComp[0].Value === ""){
							this.props.updateSalesParameter({
							...prevProps.salesParameter.dataFilter, Filter: this.props.searchComp.Value = "",
							});  
						}else{
							this.props.updateSalesParameter({
							...prevProps.salesParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'Delete':
						if(this.props.searchComp[0].Value === ""){
							this.props.updateSalesDeletedParameter({
							...prevProps.salesDeletedParameter.dataFilter, Filter: this.props.searchComp.Value = "",
							});  
						}else{
							this.props.updateSalesDeletedParameter({
							...prevProps.salesDeletedParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'SAP ISSUE':
						if(this.props.searchComp[0].Value === ""){
							this.props.updateSalesSapParameter({
							...prevProps.salesSapParameter.dataFilter, Filter: this.props.searchComp.Value = "",
							});  
						}else{
							this.props.updateSalesSapParameter({
							...prevProps.salesSapParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					default:
						break;
				}
			}else{
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						if(prevProps.searchComp !== this.props.searchComp){
							this.props.updateServiceApprovedParameter({
								...prevProps.serviceApprovedParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'Not Approve':
						if(prevProps.searchComp !== this.props.searchComp){
							this.props.updateServiceParameter({
								...prevProps.serviceParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'Delete':
						if(prevProps.searchComp !== this.props.searchComp){
							this.props.updateServiceDeletedParameter({
								...prevProps.serviceDeletedParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					case 'SAP ISSUE':
						if(prevProps.searchComp !== this.props.searchComp){
							this.props.updateServiceSapParameter({
								...prevProps.serviceSapParameter.dataFilter, Filter : this.props.searchComp, PageNumber: 1,
							});
						}
						break;
					default:
						break;
				}
			}
		}

		//FILTER RANGE LIFETIME
		if(prevProps.filterLifetime !== this.props.filterLifetime){
			if (this.props.location.whichTab === "sales") {
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						return this.props.updateSalesApprovedParameter({
							...prevProps.salesApprovedParameter.dataFilter, Filter : this.props.filterLifetime, PageNumber: 1,
						});
					case 'Not Approve':
						return this.props.updateSalesParameter({
							...prevProps.salesParameter.dataFilter, Filter : this.props.filterLifetime, PageNumber: 1,
						});
					case 'Delete':
						return this.props.updateSalesDeletedParameter({
							...prevProps.salesDeletedParameter.dataFilter, Filter : this.props.filterLifetime, PageNumber: 1,
						});
					case 'SAP ISSUE':
						return this.props.updateSalesSapParameter({
							...prevProps.salesSapParameter.dataFilter, Filter : this.props.filterLifetime, PageNumber: 1,
						});
					default:
						break;
				}
			}
		}
		
		//FILTER RANGE DATE
		if(prevProps.filterDate !== this.props.filterDate){
			if (this.props.location.whichTab === "sales") {
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						return this.props.fetchApprovedSales(this.props.filterDate, this.props.token);
					case 'Not Approve':
						return this.props.fetchSalesOrder(this.props.filterDate,this.props.token);
					case 'Delete':
						return this.props.fetchDeletedSales(this.props.filterDate, this.props.token);
					case 'SAP ISSUE':
						return this.props.fetchSapSales(this.props.filterDate, this.props.token);
					default:
						break;
				}
			}else{
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						return this.props.fetchApprovedService(this.props.filterDate, this.props.token);
					case 'Not Approve':
						return this.props.fetchServiceOrder(this.props.filterDate,this.props.token);
					case 'Delete':
						return this.props.fetchDeletedService(this.props.filterDate, this.props.token);
					case 'SAP ISSUE':
						return this.props.fetchSapService(this.props.filterDate, this.props.token);
					default:
						break;
				}
			}
		}

		//sorting sales order
		if (prevProps.sortSalesBy !== this.props.sortSalesBy) {
			const { sortSalesBy } = this.props;
			let isDescending = false;
			if (this.props.location.whichTab === "sales") {
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						if (sortSalesBy.Customer.isActive) {
							isDescending = !sortSalesBy.Customer.isAscending;
							this.props.updateSalesApprovedParameter({
								...this.props.salesApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}],      
							});
							if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
								isDescending = !sortSalesBy.Customer.isAscending;
								this.props.updateSalesApprovedParameter({
									...this.props.salesApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}],      
								});
							}
						}
						if (sortSalesBy.Site.isActive){
							isDescending = !sortSalesBy.Site.isAscending;
							this.props.updateSalesApprovedParameter({
								...this.props.salesApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
								isDescending = !sortSalesBy.Site.isAscending;
								this.props.updateSalesApprovedParameter({
									...this.props.salesApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}],
								});
							}
						} 
						if (sortSalesBy.UnitModel.isActive) {
							isDescending = !sortSalesBy.UnitModel.isAscending;
							this.props.updateSalesApprovedParameter({
								...this.props.salesApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
								isDescending = !sortSalesBy.UnitModel.isAscending;
								this.props.updateSalesApprovedParameter({
									...this.props.salesApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}],
								});
							}
						};
						if (sortSalesBy.CompDesc.isActive) {
							isDescending = !sortSalesBy.CompDesc.isAscending;
							this.props.updateSalesApprovedParameter({
								...this.props.salesApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
								isDescending = !sortSalesBy.CompDesc.isAscending;
								this.props.updateSalesApprovedParameter({
									...this.props.salesApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}]
								});
							}
						};
						break;
					case 'Not Approve':
						if (sortSalesBy.Customer.isActive) {
							isDescending = !sortSalesBy.Customer.isAscending;
							this.props.updateSalesParameter({
								...this.props.salesParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}],      
							});
							if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
								isDescending = !sortSalesBy.Customer.isAscending;
								this.props.updateSalesParameter({
									...this.props.salesParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}],      
								});
							}
						}
						if (sortSalesBy.Site.isActive){
							isDescending = !sortSalesBy.Site.isAscending;
							this.props.updateSalesParameter({
								...this.props.salesParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
								isDescending = !sortSalesBy.Site.isAscending;
								this.props.updateSalesParameter({
									...this.props.salesParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}],
								});
							}
						} 
						if (sortSalesBy.UnitModel.isActive) {
							isDescending = !sortSalesBy.UnitModel.isAscending;
							this.props.updateSalesParameter({
								...this.props.salesParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
								isDescending = !sortSalesBy.UnitModel.isAscending;
								this.props.updateSalesParameter({
									...this.props.salesParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}],
								});
							}
						};
						if (sortSalesBy.CompDesc.isActive) {
							isDescending = !sortSalesBy.CompDesc.isAscending;
							this.props.updateSalesParameter({
								...this.props.salesParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
								isDescending = !sortSalesBy.CompDesc.isAscending;
								this.props.updateSalesParameter({
									...this.props.salesParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}]
								});
							}
						};
						break;
					case 'Deleted':
						if (sortSalesBy.Customer.isActive) {
							isDescending = !sortSalesBy.Customer.isAscending;
							this.props.updateSalesDeletedParameter({
								...this.props.salesDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}],      
							});
							if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
								isDescending = !sortSalesBy.Customer.isAscending;
								this.props.updateSalesDeletedParameter({
									...this.props.salesDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}],      
								});
							}
						}
						if (sortSalesBy.Site.isActive){
							isDescending = !sortSalesBy.Site.isAscending;
							this.props.updateSalesDeletedParameter({
								...this.props.salesDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
								isDescending = !sortSalesBy.Site.isAscending;
								this.props.updateSalesDeletedParameter({
									...this.props.salesDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}],
								});
							}
						} 
						if (sortSalesBy.UnitModel.isActive) {
							isDescending = !sortSalesBy.UnitModel.isAscending;
							this.props.updateSalesDeletedParameter({
								...this.props.salesDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
								isDescending = !sortSalesBy.UnitModel.isAscending;
								this.props.updateSalesDeletedParameter({
									...this.props.salesDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}],
								});
							}
						};
						if (sortSalesBy.CompDesc.isActive) {
							isDescending = !sortSalesBy.CompDesc.isAscending;
							this.props.updateSalesDeletedParameter({
								...this.props.salesDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
								isDescending = !sortSalesBy.CompDesc.isAscending;
								this.props.updateSalesDeletedParameter({
									...this.props.salesDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}]
								});
							}
						};
						break;
					case 'SAP ISSUE':
						if (sortSalesBy.Customer.isActive) {
							isDescending = !sortSalesBy.Customer.isAscending;
							this.props.updateSalesSapParameter({
								...this.props.salesSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}],      
							});
							if (sortSalesBy.Customer.isAscending === !sortSalesBy.Customer.isActive) {
								isDescending = !sortSalesBy.Customer.isAscending;
								this.props.updateSalesSapParameter({
									...this.props.salesSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}],      
								});
							}
						}
						if (sortSalesBy.Site.isActive){
							isDescending = !sortSalesBy.Site.isAscending;
							this.props.updateSalesSapParameter({
								...this.props.salesSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.Site.isAscending === !sortSalesBy.Site.isActive) {
								isDescending = !sortSalesBy.Site.isAscending;
								this.props.updateSalesSapParameter({
									...this.props.salesSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}],
								});
							}
						} 
						if (sortSalesBy.UnitModel.isActive) {
							isDescending = !sortSalesBy.UnitModel.isAscending;
							this.props.updateSalesSapParameter({
								...this.props.salesSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.UnitModel.isAscending === !sortSalesBy.UnitModel.isActive) {
								isDescending = !sortSalesBy.UnitModel.isAscending;
								this.props.updateSalesSapParameter({
									...this.props.salesSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}],
								});
							}
						};
						if (sortSalesBy.CompDesc.isActive) {
							isDescending = !sortSalesBy.CompDesc.isAscending;
							this.props.updateSalesSapParameter({
								...this.props.salesSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}],
							});
							if (sortSalesBy.CompDesc.isAscending === !sortSalesBy.CompDesc.isActive) {
								isDescending = !sortSalesBy.CompDesc.isAscending;
								this.props.updateSalesSapParameter({
									...this.props.salesSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}]
								});
							}
						};
						break;
					default:
						break;
				}
			}
		}

		//sorting service
		if (prevProps.sortServiceBy !== this.props.sortServiceBy) {
			const { sortServiceBy } = this.props;
			let isDescending = false;
			if (this.props.location.whichTab === "service") {
				switch (this.state.whatPageIsChoosed) {
					case 'Approve':
						if (sortServiceBy.Customer.isActive) {
							isDescending = !sortServiceBy.Customer.isAscending;
							this.props.updateServiceApprovedParameter({
								...this.props.serviceApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}]   
							});
							if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
								isDescending = !sortServiceBy.Customer.isAscending;
								this.props.updateServiceApprovedParameter({
									...this.props.serviceApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}]   
								});
							}
						}
						if (sortServiceBy.Site.isActive){
							isDescending = !sortServiceBy.Site.isAscending;
							this.props.updateServiceApprovedParameter({
								...this.props.serviceApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
								isDescending = !sortServiceBy.Site.isAscending;
								this.props.updateServiceApprovedParameter({
									...this.props.serviceApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}] 
								});
							}
						} 
						if (sortServiceBy.UnitModel.isActive) {
							isDescending = !sortServiceBy.UnitModel.isAscending;
							this.props.updateServiceApprovedParameter({
								...this.props.serviceApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
								isDescending = !sortServiceBy.UnitModel.isAscending;
								this.props.updateServiceApprovedParameter({
									...this.props.serviceApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}] 
								});
							}
						};
						if (sortServiceBy.CompDesc.isActive) {
							isDescending = !sortServiceBy.CompDesc.isAscending;
							this.props.updateServiceApprovedParameter({
								...this.props.serviceApprovedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
								isDescending = !sortServiceBy.CompDesc.isAscending;
								this.props.updateServiceApprovedParameter({
									...this.props.serviceApprovedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}] 
								});
							}
						};
						break;
					case 'Not Approve':
						if (sortServiceBy.Customer.isActive) {
							isDescending = !sortServiceBy.Customer.isAscending;
							this.props.updateServiceParameter({
								...this.props.serviceParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}]   
							});
							if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
								isDescending = !sortServiceBy.Customer.isAscending;
								this.props.updateServiceParameter({
									...this.props.serviceParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}]   
								});
							}
						}
						if (sortServiceBy.Site.isActive){
							isDescending = !sortServiceBy.Site.isAscending;
							this.props.updateServiceParameter({
								...this.props.serviceParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
								isDescending = !sortServiceBy.Site.isAscending;
								this.props.updateServiceParameter({
									...this.props.serviceParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}] 
								});
							}
						} 
						if (sortServiceBy.UnitModel.isActive) {
							isDescending = !sortServiceBy.UnitModel.isAscending;
							this.props.updateServiceParameter({
								...this.props.serviceParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
								isDescending = !sortServiceBy.UnitModel.isAscending;
								this.props.updateServiceParameter({
									...this.props.serviceParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}] 
								});
							}
						};
						if (sortServiceBy.CompDesc.isActive) {
							isDescending = !sortServiceBy.CompDesc.isAscending;
							this.props.updateServiceParameter({
								...this.props.serviceParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
								isDescending = !sortServiceBy.CompDesc.isAscending;
								this.props.updateServiceParameter({
									...this.props.serviceParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}] 
								});
							}
						};
						break;
					case 'Delete':
						if (sortServiceBy.Customer.isActive) {
							isDescending = !sortServiceBy.Customer.isAscending;
							this.props.updateServiceDeletedParameter({
								...this.props.serviceDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}]   
							});
							if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
								isDescending = !sortServiceBy.Customer.isAscending;
								this.props.updateServiceDeletedParameter({
									...this.props.serviceDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}]   
								});
							}
						}
						if (sortServiceBy.Site.isActive){
							isDescending = !sortServiceBy.Site.isAscending;
							this.props.updateServiceDeletedParameter({
								...this.props.serviceDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
								isDescending = !sortServiceBy.Site.isAscending;
								this.props.updateServiceDeletedParameter({
									...this.props.serviceDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}] 
								});
							}
						} 
						if (sortServiceBy.UnitModel.isActive) {
							isDescending = !sortServiceBy.UnitModel.isAscending;
							this.props.updateServiceDeletedParameter({
								...this.props.serviceDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
								isDescending = !sortServiceBy.UnitModel.isAscending;
								this.props.updateServiceDeletedParameter({
									...this.props.serviceDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}] 
								});
							}
						};
						if (sortServiceBy.CompDesc.isActive) {
							isDescending = !sortServiceBy.CompDesc.isAscending;
							this.props.updateServiceDeletedParameter({
								...this.props.serviceDeletedParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
								isDescending = !sortServiceBy.CompDesc.isAscending;
								this.props.updateServiceDeletedParameter({
									...this.props.serviceDeletedParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}] 
								});
							}
						};
						break;
					case 'SAP ISSUE':
						if (sortServiceBy.Customer.isActive) {
							isDescending = !sortServiceBy.Customer.isAscending;
							this.props.updateServiceSapParameter({
								...this.props.serviceSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'CustomerName',
									Direction : 'desc'
								}]   
							});
							if (sortServiceBy.Customer.isAscending === !sortServiceBy.Customer.isActive) {
								isDescending = !sortServiceBy.Customer.isAscending;
								this.props.updateServiceSapParameter({
									...this.props.serviceSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'CustomerName',
										Direction : 'asc'
									}]   
								});
							}
						}
						if (sortServiceBy.Site.isActive){
							isDescending = !sortServiceBy.Site.isAscending;
							this.props.updateServiceSapParameter({
								...this.props.serviceSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'SiteCode',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.Site.isAscending === !sortServiceBy.Site.isActive) {
								isDescending = !sortServiceBy.Site.isAscending;
								this.props.updateServiceSapParameter({
									...this.props.serviceSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'SiteCode',
										Direction : 'asc'
									}] 
								});
							}
						} 
						if (sortServiceBy.UnitModel.isActive) {
							isDescending = !sortServiceBy.UnitModel.isAscending;
							this.props.updateServiceSapParameter({
								...this.props.serviceSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'UnitModel',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.UnitModel.isAscending === !sortServiceBy.UnitModel.isActive) {
								isDescending = !sortServiceBy.UnitModel.isAscending;
								this.props.updateServiceSapParameter({
									...this.props.serviceSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'UnitModel',
										Direction : 'asc'
									}] 
								});
							}
						};
						if (sortServiceBy.CompDesc.isActive) {
							isDescending = !sortServiceBy.CompDesc.isAscending;
							this.props.updateServiceSapParameter({
								...this.props.serviceSapParameter.dataFilter,
								PageNumber: 1,
								Sort: [{
									Field : 'ComponentDescription',
									Direction : 'desc'
								}] 
							});
							if (sortServiceBy.CompDesc.isAscending === !sortServiceBy.CompDesc.isActive) {
								isDescending = !sortServiceBy.CompDesc.isAscending;
								this.props.updateServiceSapParameter({
									...this.props.serviceSapParameter.dataFilter,
									PageNumber: 1,
									Sort: [{
										Field : 'ComponentDescription',
										Direction : 'asc'
									}] 
								});
							}
						};
						break;
					default:
						break;
				}
			}		
		}
	}

	handleClick = (menu) => {
		this.props.push(menu);
	}

	fetchSearchSales = async() => {
		await this.props.fetchSalesOrder(this.props.searchSalesParameter, this.props.token);
	} 
	fetchSearchSalesApproved = async() => {
		await this.props.fetchApprovedSales(this.props.searchSalesApprovedParam, this.props.token);
	}
	fetchSearchSalesDeleted = async() => {
		await this.props.fetchDeletedSales(this.props.searchSalesDeletedParam, this.props.token);
	}
	fetchSearchSalesSap = async() => {
		await this.props.fetchSapSales(this.props.searchSalesSapParam, this.props.token);
	}

	fetchSearchService = async() => {
		await this.props.fetchServiceOrder(this.props.searchServiceParameter, this.props.token);
	} 
	fetchSearchServiceApproved = async() => {
		await this.props.fetchApprovedService(this.props.searchSerrviceApprovedParam, this.props.token);
	}
	fetchSearchServiceDeleted = async() => {
		await this.props.fetchDeletedService(this.props.searchSerrviceDeletedParam, this.props.token);
	}
	fetchSearchServiceSap = async() => {
		await this.props.fetchSapService(this.props.searchSerrviceSapParam, this.props.token);
	}

	onClickDownloadSalesApproved = () => {
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style = "display: none";
		const todayDate = moment(new Date()).format('DD-MM-YYYY');
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
		let fileName = "Service-Order-Planning-"+todayDate+".csv";
		let blob = new Blob([this.props.approveServiceDownloaded.data]),
		  url = window.URL.createObjectURL(blob);
		link.href = url;
		link.download = fileName;
		link.click();
		window.URL.revokeObjectURL(url);
	}

	handleSalesApprove = async() => {
		let arr = []
		const index = this.props.selectedSalesPlans.length
		if (this.props.selectedSalesPlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
		  }
		  await this.props.approveSales({SoNumbers : arr, IsApprove: true}, this.props.token)
		  this.onClickSalesOrder();
		  await this.props.clearSelectedSalesPlans();
		 }
	}

	handleSalesDownload = async() => {
		let arr = []
		const index = this.props.selectedSalesPlans.length
		if (this.props.selectedSalesPlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
		  }
		}await this.props.downloadSales({SoNumbers: arr}, this.props.token);
		if (
		  this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.FAILED
		) {
		  this.setState({ showError: true });
		}
	}

	handleServiceDownload = async() => {
		let arr = []
		const index = this.props.selectedServicePlans.length
		if (this.props.selectedServicePlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
		  }
		}
		await this.props.downloadService({WoNumbers: arr}, this.props.token);
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
		  />
		  </div>
		);
	}

	handleSearch=(value)=>{
		this.setState({ searchVal : value})
		if (this.props.location.whichTab === "sales") {
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return(
						setTimeout(() => {
							this.props.onSearchSales(this.state.searchVal)
						}, 1000)
					)
				case 'Not Approve': 
					return(
						setTimeout(() => {
							this.props.onSearchSales(this.state.searchVal)
						}, 1000)
					)
				case 'Delete': 
					return(
						setTimeout(() => {
							this.props.onSearchSales(this.state.searchVal)
						}, 1000)
					)
				case 'SAP ISSUE' :
					return(
						setTimeout(() => {
							this.props.onSearchSales(this.state.searchVal)
						}, 1000)
					)
				default:
			}
		}else if (this.props.location.whichTab === "service") {
			switch (this.state.whatPageIsChoosed) {
				case 'Approve':
					return(
						setTimeout(() => {
							this.props.onSearchService(this.state.searchVal)
						}, 1000)
					)
				case 'Not Approve': 
					return(
						setTimeout(() => {
							this.props.onSearchService(this.state.searchVal)
						}, 1000)
					)
				case 'Delete': 
					return(
						setTimeout(() => {
							this.props.onSearchService(this.state.searchVal)
						}, 1000)
					)
				case 'SAP ISSUE' :
					return(
						setTimeout(() => {
							this.props.onSearchService(this.state.searchVal)
						}, 1000)
					)
				default:
			}
		}
	}

	handleDeletePermanent = async() =>{
		if (this.props.location.whichTab === "sales") {
			let arr = []
			const index = this.props.selectedSalesPlans.length
			if (this.props.selectedSalesPlans.length > 0) {
		  		for (let i = 0; i < index; i++) {
					arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
		  		}
			}
			await this.props.deletePermanentSales({SoNumbers : arr}, this.props.token);
		}
		if (this.props.location.whichTab === "service") {
			let arr = []
			const index = this.props.selectedServicePlans.length
			if (this.props.selectedServicePlans.length > 0) {
		  		for (let i = 0; i < index; i++) {
					arr = [...arr, this.props.selectedServicePlans[i].WoNumber]
		  		}
			}
			await this.props.deletePermanentService({WoNumbers : arr}, this.props.token);
		}
	}

	handleDeleteSales = async() => {
		let arr = []
		const index = this.props.selectedSalesPlans.length;
		if (this.props.selectedSalesPlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedSalesPlans[i].SoNumber]
		  }
		  await this.props.deleteSales({SoNumbers : arr, IsDelete: true}, this.props.token);
		  this.onClickSalesOrderApproved();
		  await this.props.clearSelectedSalesPlans();
		}
	}

	handleDeleteService = async() => {
		let arr = []
		const index = this.props.selectedServicePlans.length;
		if (this.props.selectedServicePlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedServicePlans[i].WoNumber];
		  }
		  await this.props.deleteService({WoNumbers : arr, IsDelete: true}, this.props.token);
		  this.onClickServiceOrderApproved();
		  await this.props.clearSelectedServicePlans();
		}
	}

	_renderDownloadBtn(){
		if (this.props.location.whichTab === "sales") {
			if(this.state.whatPageIsChoosed === "Approve"){
				return(
					<>
						<BaseButton titles="Download"
							{...this.props}
							whatTabsIsRendered={true}
							handleSalesDownload={this.handleSalesDownload}
						/>
						<BaseButton titles="Delete" 
							{...this.props}
							whatTabsIsRendered={true}
							isDisabled={this.state.isDisabled}
							disabledButton = {this.props.selectedSalesPlans.length < 1 }
							totalSelectedItems ={this.props.selectedSalesPlans.length}
							handleDeleteSales={this.handleDeleteSales}
							renderSakses = {this.changeSuccess}
						/>
					</>
				)
			}else if(this.state.whatPageIsChoosed === "Delete"){
				return(
					<>
						<BaseButton titles="Download"
							{...this.props}
							whatTabsIsRendered={true}
							handleSalesApprovedDownload={this.handleSalesApprovedDownload}
						/>
						<BaseButton titles="Permanently" 
							{...this.props}
							whatTabsIsRendered={true}
							handleDeletePermanent={this.handleDeletePermanent}
							isDisabled={this.state.isDisabled}
						/>
					</>
				)
			}else{
				return(
					<BaseButton titles="Download"
						{...this.props}
						whatTabsIsRendered={true}
						handleSalesApprovedDownload={this.handleSalesApprovedDownload}
					/>
				)
			}			
		}else if (this.props.location.whichTab === "service"){
			if(this.state.whatPageIsChoosed === "Approve"){
				return(
					<>
						<BaseButton titles="Download"
							{...this.props}
							whatTabsIsRendered={false}
							handleServiceDownload={this.handleServiceDownload}
						/>
						<BaseButton titles="Delete" 
							{...this.props}
							whatTabsIsRendered={false}
							isDisabled={this.state.isDisabled}
							disabledButton = {this.props.selectedServicePlans.length < 1 }
							totalSelectedItems ={this.props.selectedServicePlans.length}
							handleDeleteService={this.handleDeleteService}
							renderSakses = {this.changeSuccess}
						/>
					</>
				)
			}else if(this.state.whatPageIsChoosed === "Delete"){
				return(
					<>
						<BaseButton titles="Download"
							{...this.props}
							whatTabsIsRendered={false}
							handleServiceApprovedDownload={this.handleServiceApprovedDownload}
						/>
						<BaseButton titles="Permanently" 
							{...this.props}
							whatTabsIsRendered={false}
							handleDeletePermanent={this.handleDeletePermanent}
							isDisabled={this.state.isDisabled}
						/>
					</>
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
		
	}

	_renderPagination= (data) =>  {
		if (this.props.location.whichTab === "sales") {
		  const web = this.props.displayMode === 'web';
		  const currentPropsSales = data.PageNumber;
		  const { TotalPages } = data;
		  switch (this.state.whatPageIsChoosed) {
			case 'Approve':
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
					<div className="pagination">
						<div className="paging">
							{/* {prevSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>} */}
							{web && currentPropsSales - 3 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 3 })} className="page-inactive">{currentPropsSales - 3}</div>}
							{web && currentPropsSales - 2 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 2 })} className="page-inactive">{currentPropsSales - 2}</div>}
							{currentPropsSales - 1 > 0 && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales - 1 })} className="page-inactive">{currentPropsSales - 1}</div>}
							<div className="page-active">{currentPropsSales}</div>
							{currentPropsSales + 1 <= TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="page-inactive">{currentPropsSales + 1}</div>}
							{web && currentPropsSales + 2 < TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 2 })} className="page-inactive">{currentPropsSales + 2}</div>}
							{web && currentPropsSales + 3 < TotalPages && <div onClick={() => this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageNumber: currentPropsSales + 3 })} className="page-inactive">{currentPropsSales + 3}</div>}
							{/* {nextSales && <div onClick={() => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageNumber: currentPropsSales + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>} */}
						</div>
						</div>
				)
		  default:
		  }
		}else if(this.props.location.whichTab === "service"){
			const web = this.props.displayMode === 'web';
			const currentPropsService = data.PageNumber;
			const { TotalPages } = data;
		  switch (this.state.whatPageIsChoosed) {
		  case 'Approve':
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
				return(
					<div className="pagination">
						<div className="paging">
							{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
							{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
							{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
							<div className="page-active">{currentPropsService}</div>
							{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
							{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
							{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
						</div>
					</div>
				)
			case 'SAP ISSUE' :
				return(
					<div className="pagination">
						<div className="paging">
							{web && currentPropsService - 3 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 3 })} className="page-inactive">{currentPropsService - 3}</div>}
							{web && currentPropsService - 2 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 2 })} className="page-inactive">{currentPropsService - 2}</div>}
							{currentPropsService - 1 > 0 && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService - 1 })} className="page-inactive">{currentPropsService - 1}</div>}
							<div className="page-active">{currentPropsService}</div>
							{currentPropsService + 1 <= TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 1 })} className="page-inactive">{currentPropsService + 1}</div>}
							{web && currentPropsService + 2 < TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 2 })} className="page-inactive">{currentPropsService + 2}</div>}
							{web && currentPropsService + 3 < TotalPages && <div onClick={() => this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageNumber: currentPropsService + 3 })} className="page-inactive">{currentPropsService + 3}</div>}
						</div>
					</div>
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
			 switch (this.state.whatPageIsChoosed) {
				 case 'Approve':
					 return(
						<>
							{this.props.clearSelectedSalesPlans()};
							{this.props.updateSalesApprovedParameter({ ...this.props.salesApprovedParameter.dataFilter, PageSize: value})}
						</>
					 )
				 case 'Not Approve':
					 return(
						 <>
							{this.props.clearSelectedSalesPlans()};
							{this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: value})}
					 	</>
					 )
				 case 'Delete':
					return(
						<>
							{this.props.clearSelectedSalesPlans()};
							{this.props.updateSalesDeletedParameter({ ...this.props.salesDeletedParameter.dataFilter, PageSize: value})}
						</>
					)
				 case 'SAP ISSUE':
					 return(
						<>
							{this.props.clearSelectedSalesPlans()};
							{this.props.updateSalesSapParameter({ ...this.props.salesSapParameter.dataFilter, PageSize: value })}
						</>
					 )
				 default:
			 }
		}else if (this.props.location.whichTab === 'service') {
		  switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				return(
				   	<>
						{this.props.clearSelectedServicePlans()};
						{this.props.updateServiceApprovedParameter({ ...this.props.serviceApprovedParameter.dataFilter, PageSize: value})}
			   		</>
				)
			case 'Not Approve':
				return(
					<>
						{this.props.clearSelectedServicePlans()};
						{this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: value})}
					</>
				)
			case 'Delete':
			   return(
				   <>
						{this.props.clearSelectedServicePlans()};
						{this.props.updateServiceDeletedParameter({ ...this.props.serviceDeletedParameter.dataFilter, PageSize: value})}
				   </>
			   )
			case 'SAP ISSUE':
				return(
					<>
						{this.props.clearSelectedServicePlans()};
						{this.props.updateServiceSapParameter({ ...this.props.serviceSapParameter.dataFilter, PageSize: value})}
					</>
				)
			default:
		}
		}
	}

	onClickSalesOrder = async() =>{
		await this.props.fetchSalesOrder({
			...this.props.salesParameter.dataFilter, 
			Filter : 
			  [...this.props.salesParameter.dataFilter.Filter, {
				Field : 'IsApproved',
				Operator : "eq",
				Value : false,
				Logic : "AND"
			  },{
				Field : 'SAPIssueMessage',
				Operator : 'eq',
				Value : '-',
				Logic : 'AND'
			  }]
		  }, this.props.token);
		await this.props.clearSelectedSalesPlans()
		this.setPropsToState();
	}
	
	onClickRevisedSales = async() => {
		await this.props.fetchRevisedSales({
		  ...this.props.salesRevisedParam.dataFilter,
		  Filter : 
			[...this.props.salesRevisedParam.dataFilter.Filter, 
			{
			  Field 	 : 'IsRevised',
			  Operator : 'eq',
			  Value 	 : 'true',
			  Logic 	 : 'AND'
			},{
			  Field    : 'IsChanged',
			  Operator : 'eq',
			  Value    : 'false',
			  Logic    : "AND"
			}]
		},this.props.token);
	}

	onClickSalesOrderApproved = async() =>{
		await this.props.fetchApprovedSales(this.props.salesApprovedParameter.dataFilter, this.props.token);
		await this.props.clearSelectedSalesPlans()
		this.setPropsToState();
	}

	onClickSalesOrderDeleted = async() =>{
		await this.props.fetchDeletedSales(this.props.salesDeletedParameter.dataFilter, this.props.token);
		await this.props.clearSelectedSalesPlans()
		this.setPropsToState();
	}

	onClickSalesOrderSap = async() => {
		await this.props.fetchSapSales({
			...this.props.salesSapParameter.dataFilter,
			Filter : 
				[...this.props.salesSapParameter.dataFilter.Filter, {
					Field 	 : 'SAPIssueMessage',
					Operator : 'neq',
					Value 	 : '-',
					Logic 	 : 'and'
				}]
		},this.props.token);
		await this.props.clearSelectedSalesPlans()
		this.setPropsToState();
	}

	onClickServiceOrder = async() => {
		await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter, this.props.token);
		this.props.clearSelectedServicePlans()
		this.setPropsToState();
	}

	onClickServiceOrderApproved = async() => {
		await this.props.fetchApprovedService(this.props.serviceApprovedParameter.dataFilter, this.props.token);
		this.props.clearSelectedServicePlans()
		this.setPropsToState();

	}

	onClickServiceOrderDeleted = async() => {
		await this.props.fetchDeletedService(this.props.serviceDeletedParameter.dataFilter, this.props.token);
		this.props.clearSelectedServicePlans()
		this.setPropsToState();
	}

	onClickServiceOrderSap = async() => {
		await this.props.fetchSapService({
			...this.props.serviceSapParameter.dataFilter,
			Filter : 
				[...this.props.serviceSapParameter.dataFilter.Filter, {
					Field 	 : 'SAPIssueMessage',
					Operator : 'neq',
					Value 	 : '-',
					Logic 	 : 'and'
				}]
		},this.props.token);
		await this.props.clearSelectedSalesPlans()
		this.setPropsToState();
	}

	salesOrderList(){
		return(
			<div className={this.props.salesOrderList.Lists.length === 0 
				&& this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<SalesOrderList 
					{...this.props}
					idTab = "Status"
					onClickTabHead={this.props.onClickSortBy}
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
			<div className={this.props.serviceOrderList.Lists.length === 0 
				&& this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<ServiceOrderList 
					{...this.props}
					idTab="Status"
					onClickTabHead={this.props.onClickSortBy}
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
			<div className={this.props.salesOrderListApproved.Lists.length === 0 
				&& this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<ApprovedSalesOrderList 
				{...this.props}
					onClickTabHead={this.props.onClickSortBy}
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
			<div className={this.props.serviceOrderListApproved.Lists.length === 0 
				&& this.props.fetchStatusServiceApproved === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<ApprovedServiceOrderList 
					{...this.props}
					onClickTabHead={this.props.onClickSortBy}
					displayServiceCheckbox={this.props.serviceApprovedParameter.paramsData.assigmentFilter || this.props.serviceApprovedParameter.paramsData.inProgressFilter}
					sortServicesByState={this.props.sortServicesBy}
					onClickServiceOrderApproved={this.onClickServiceOrderApproved}
					onChoosedService={this.updateAssignmentServiceStates}
					selectedServicePlanList={this.props.selectedServicePlans}
				/>
			</div>
		)
	}

	deletedSalesOrderList(){
		return(
			<div className={this.props.salesOrderListDeleted.Lists.length === 0 
				&& this.props.fetchStatusSalesDeleted === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<DeletedSalesOrderList 
					{...this.props}
					onClickTabHead={this.props.onClickSortBy}
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
			<div className={this.props.serviceOrderListDeleted.Lists.length === 0 
				&& this.props.fetchStatusSalesDeleted === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<DeletedServiceOrderList 
					{...this.props}
					onClickTabHead={this.props.onClickSortBy}
					displayServiceCheckbox={this.props.serviceDeletedParameter.paramsData.assigmentFilter || this.props.serviceDeletedParameter.paramsData.inProgressFilter}
					sortServiceByState={this.props.sortServiceBy}
					onClickServiceOrderDeleted={this.onClickServiceOrderDeleted}
					onChoosedService={this.updateAssignmentServiceStates}
					selectedServicePlanList={this.props.selectedServicePlans}
				/>
			</div>
		);
	}

	sapSalesOrderList(){
		return(
			<div className={this.props.salesOrderListSap.Lists.length === 0 
				&& this.props.fetchStatusSalesSap === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<SapSalesOrderList 
					{...this.props}
					onClickTabHead={this.props.onClickSortBy}
					displaySalesCheckbox={this.props.salesSapParameter.paramsData.assigmentFilter || this.props.salesSapParameter.paramsData.inProgressFilter}
					sortSalesByState={this.props.sortSalesBy}
					onClickSalesOrderSap={this.onClickSalesOrderSap}
					onChoosedSales={this.updateAssignmentSalesStates}
					selectedSalesPlanList={this.props.selectedSalesPlans}
				/>
			</div>
		);
	}

	sapServiceOrderList(){
		return(
			<div className={this.props.serviceOrderListSap.Lists.length === 0 
				&& this.props.fetchStatusServiceSap === ApiRequestActionsStatus.SUCCEEDED ? 
				"list-status-empty" : "plannings-list-containers"}>
				<SapServiceOrderList 
					{...this.props}
					onClickTabHead={this.props.onClickSortBy}
					displayServiceCheckbox={this.props.serviceSapParameter.paramsData.assigmentFilter || this.props.serviceSapParameter.paramsData.inProgressFilter}
					sortServiceByState={this.props.sortServiceBy}
					onClickServiceOrderSap={this.onClickServiceOrderSap}
					onChoosedService={this.updateAssignmentserviceStates}
					selectedServicePlanList={this.props.selectedServicePlans}
					/>
			</div>
		);
	}

	_renderList = (whatPageIsChoosed) =>{
		this.setState({
			whatPageIsChoosed : whatPageIsChoosed
		})
		switch (this.state.whatPageIsChoosed) {
			case 'Approve':
				this.setState({ isDisabled : true})
				if(this.props.location.whichTab === 'sales'){
					return(
						<>
							{this.approvedSalesOrderList()}
							{this.props.salesOrderListApproved.Lists.length === 0 
								&& this.props.fetchStatusSalesApproved === ApiRequestActionsStatus.SUCCEEDED ? "" :
								<div className="bottom-row">
									{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderListApproved)}
								</div>
							}
						</>
					)
				}else{
					return(
						<>
							{this.approvedServiceOrderList()}
							{this.props.serviceOrderListApproved.Lists.length === 0 
								&& this.props.fetchStatusServiceApproved === ApiRequestActionsStatus.SUCCEEDED ? "" :
								<div className="bottom-row">
									{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderListApproved)}
								</div>
							}
						</>
					)
				}
			case 'Not Approve': 
			this.setState({ isDisabled : true})
				if(this.props.location.whichTab === 'sales'){
					return (
						<>
							{this.salesOrderList()}
							{this.props.salesOrderList.Lists.length === 0  
								&& this.props.fetchStatusSales === ApiRequestActionsStatus.SUCCEEDED ? "" :
								<div className="bottom-row">
									{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderList)}
								</div>
							}
						</>
					)
				}else if(this.props.location.whichTab === 'service'){
					return (
						<>
							{this.serviceOrderList()}
							{this.props.serviceOrderList.Lists.length === 0 
								&& this.props.fetchStatusService === ApiRequestActionsStatus.SUCCEEDED ? "" :
								<div className="bottom-row">
									{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderList)}
								</div>
							}
						</>
					)
				}
				break;
			case 'Delete': 
			this.setState({ isDisabled : false})
			if(this.props.location.whichTab === 'sales'){
				return(
					<>
						{this.deletedSalesOrderList()}
						{this.props.salesOrderListDeleted.Lists.length === 0 
							&& this.props.fetchStatusSalesDeleted === ApiRequestActionsStatus.SUCCEEDED ? "" :
							<div className="bottom-row">
								{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderListDeleted)}
							</div>
						}
					</>
				)
			}else if(this.props.location.whichTab === 'service'){
				return(
					<>
						{this.deletedServiceOrderList()}
						{this.props.serviceOrderListDeleted.Lists.length === 0 
							&& this.props.fetchStatusServiceDeleted === ApiRequestActionsStatus.SUCCEEDED ? "" :
							<div className="bottom-row">
								{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderListDeleted)}
							</div>
						}
					</>
				)
			}
			break;
			case 'SAP ISSUE': 
			this.setState({ isDisabled : true})
			if(this.props.location.whichTab === 'sales'){
				return(
					<>
						{this.sapSalesOrderList()}
						{this.props.salesOrderListSap.Lists.length === 0 
							&& this.props.fetchStatusSalesSap === ApiRequestActionsStatus.SUCCEEDED ? "" :
							<div className="bottom-row">
								{this._renderShowPerPage()} {this._renderPagination(this.props.salesOrderListSap)}
							</div>
						}
					</>
				)
			}else if(this.props.location.whichTab === 'service'){
				return(
					<>
						{this.sapServiceOrderList()}
						{this.props.serviceOrderListSap.Lists.length === 0 
							&& this.props.fetchStatusServiceSap=== ApiRequestActionsStatus.SUCCEEDED ? "" :
							<div className="bottom-row">
								{this._renderShowPerPage()} {this._renderPagination(this.props.serviceOrderListSap)}
							</div>
						}
					</>
				)
			}
			break;			
			default:
		}
	}

	updateAssignmentSalesStates = (plan) => {
	if (this.props.selectedSalesPlans
		.some((plans) => plans.SoNumber === plan.SoNumber,
		)) 
	{ return this.props.unselectSalesPlan(plan); }
	return this.props.selectSalesPlan(plan);
	};

	updateAssignmentServiceStates = (plan) => {
		if (this.props.selectedServicePlans
			.some((plans) => plans.WoNumber === plan.WoNumber,
			)) 
		{ return this.props.unselectServicePlan(plan); }
		return this.props.selectServicePlan(plan);
	};

	setPropsToState(){
		if (this.props.location.whichTab === "sales") {
			this.setState({
				approveTotalData : this.props.salesOrderListApproved.TotalData,
				notApproveTotalData : this.props.salesOrderList.TotalData,
				deleteTotalData : this.props.salesOrderListDeleted.TotalData,
				sapIssueTotalData : this.props.salesOrderListSap.TotalData
			})
		}else if (this.props.location.whichTab === "service") {
			this.setState({
				approveTotalData : this.props.serviceOrderListApproved.TotalData,
				notApproveTotalData : this.props.serviceOrderList.TotalData,
				deleteTotalData : this.props.serviceOrderListDeleted.TotalData,
				sapIssueTotalData : this.props.serviceOrderListSap.TotalData
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
		return(
			<main className="content" >
				<div className="head-containers">
					<Button className="back_button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL) }>
						Approval
					</Button>
					<div className="notif_button">
						<NotifButton
							{...this.props}
							idNotif = "Status"
						/>
						<FilterbyDataAction
							{...this.props}
							titles = "Tracking History"
						/>
					</div>
				</div>
				<div className="table-containers">
					<div className="title-containers">
						<div className="title">
							{this.props.location.whichTab === 'sales' ? 'Status - Sales Order' : 'Status - Service Order'}
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