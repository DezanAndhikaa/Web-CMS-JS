import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import {
	salesParameterDeletedAction,
	salesParameterSapAction,
	serviceParameterSapAction,
	serviceParameterApprovedAction,
	UpdateServiceApprovedParameterAction,
	serviceParameterDeletedAction,
	UpdateServiceDeletedParameterAction,
	downloadSalesAction,
	downloadServiceAction,
	selectSalesPlansAction,
	selectServicePlansAction,
	fetchApprovedSalesAction,
	fetchApprovedServiceAction,
	fetchDeletedSalesAction,
	fetchDeletedServiceAction,
	searchSalesParameterAction, 
	UpdateSearchSalesAction,
	searchServiceParameterAction,
	UpdateSearchServiceAction,
	searchSalesApprovedAction,
	UpdateSearchSalesApprovedAction,
	searchSalesDeletedAction, 
	UpdateSearchSalesDeletedAction,
	searchSalesSapAction, 
	UpdateSearchSalesSapAction, 
	searchServiceApprovedAction, 
	UpdateSearchServiceApprovedAction,
	searchServiceDeletedAction, 
	UpdateSearchServiceDeletedAction,
	searchServiceSapAction, 
	UpdateSearchServiceSapAction, 
	fetchSapSalesAction,
	fetchSapServiceAction,
	fetchSalesAction,
	fetchServiceAction,
	searchAction,
	salesParameterAction,
	salesParameterApprovedAction,
	serviceParameterAction,
	sortByAction,
	deleteSalesAction,
	deleteServiceAction,
	deletePermanentSalesAction,
	deletePermanentServiceAction,
	ClearSelectedPlans,
	SearchSalesAction,
	SearchServiceAction,
	SelectSalesPlanAction,
	SelectServicePlanAction,
	UnselectServicePlanAction,
	UnselectSalesPlanAction,
	UpdateSalesParameterAction,
	UpdateSalesApprovedParameterAction,
	UpdateSalesDeletedParameterAction,
	UpdateServiceParameterAction,
	UpdateSalesSapParameterAction,
	UpdateServiceSapParameterAction,
	searchCompAction,
	SearchCompAction,SearchCompActionService,searchCompActionService,
	selectFilterAction, dateFilterAction
} from '../../DetailPages-action';
import Status from './Status';

const mapStateToProps = (state) => ({
	token: state.userData.tokenResponse.accessToken,
	location : state.router.location,
	displayMode: state.displayMode,
	approveSalesDownloaded : state.plansPageState.approveSalesDownloaded,
	approveServiceDownloaded : state.plansPageState.approveServiceDownloaded,
	salesOrderList: state.plansPageState.salesOrderList.data,
	salesOrderListApproved: state.plansPageState.salesOrderListApproved.data,
	salesOrderListDeleted: state.plansPageState.salesOrderListDeleted.data,
	salesOrderListSap: state.plansPageState.salesOrderListSap.data,
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	serviceOrderListApproved: state.plansPageState.serviceOrderListApproved.data,
	serviceOrderListDeleted: state.plansPageState.serviceOrderListDeleted.data,
	serviceOrderListSap: state.plansPageState.serviceOrderListSap.data,
	salesParameter: state.plansPageState.salesParameter,
	salesApprovedParameter: state.plansPageState.salesApprovedParameter,
	salesDeletedParameter: state.plansPageState.salesDeletedParameter,
	salesSapParameter: state.plansPageState.salesSapParameter,
	serviceParameter: state.plansPageState.serviceParameter,
	serviceApprovedParameter : state.plansPageState.serviceApprovedParameter,
	serviceDeletedParameter : state.plansPageState.serviceDeletedParameter,
	serviceSapParameter: state.plansPageState.serviceSapParameter,
	searchSalesParameter: state.plansPageState.searchSalesParameter,
	searchSalesApprovedParam: state.plansPageState.searchSalesApprovedParam,
	searchSalesDeletedParam: state.plansPageState.searchSalesDeletedParam,
	searchSalesSapParam: state.plansPageState.searchSalesSapParam,
	searchServiceParameter: state.plansPageState.searchServiceParameter,
	searchServiceApprovedParam: state.plansPageState.searchServiceApprovedParam,
	searchServiceDeletedParam: state.plansPageState.searchServiceDeletedParam,
	searchServiceSapParam: state.plansPageState.searchServiceSapParam,
	searchComp: state.plansPageState.searchComp,
	salesSearch: state.plansPageState.salesSearch,
	serviceSearch: state.plansPageState.serviceSearch,
	selectedSalesPlans: state.plansPageState.selectedSalesPlans,
	selectedServicePlans: state.plansPageState.selectedServicePlans,
	filterLifetime: state.plansPageState.filterLifetime,
	filterDate: state.plansPageState.filterDate,
	fetchStatusSales: state.plansPageState.salesOrderList.status,
	fetchStatusSalesApproved: state.plansPageState.salesOrderListApproved.status,
	fetchStatusSalesDeleted: state.plansPageState.salesOrderListDeleted.status,
	fetchStatusSalesSap: state.plansPageState.salesOrderListSap.status,
	fetchStatusService: state.plansPageState.serviceOrderList.status,
	fetchStatusServiceApproved: state.plansPageState.serviceOrderListApproved.status,
	fetchStatusServiceDeleted: state.plansPageState.serviceOrderListDeleted.status,
	fetchStatusServiceSap: state.plansPageState.serviceOrderListSap.status,
	sortSalesBy: state.plansPageState.sortSalesBy,
	sortServiceBy: state.plansPageState.sortServiceBy,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
	downloadSales : (soId, token) => dispatch(downloadSalesAction(soId, token)),
	downloadService : (soId, token) => dispatch(downloadServiceAction(soId, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	fetchApprovedSales: (payload, token) => dispatch(fetchApprovedSalesAction(payload, token)),
	fetchApprovedService: (payload, token) => dispatch(fetchApprovedServiceAction(payload, token)),
	fetchDeletedSales: (payload, token) => dispatch(fetchDeletedSalesAction(payload, token)),
	fetchDeletedService: (payload, token) => dispatch(fetchDeletedServiceAction(payload, token)),
	fetchSalesOrder: (payload, token) => dispatch(fetchSalesAction(payload, token)),
	fetchServiceOrder: (payload, token) => dispatch(fetchServiceAction(payload, token)),
	fetchSapSales: (payload,token) => dispatch(fetchSapSalesAction(payload, token)),
	fetchSapService: (payload,token) => dispatch(fetchSapServiceAction(payload, token)),
	onSearchSales: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchService: (keyword) => dispatch(searchAction(SearchServiceAction, keyword)),
	onSearchComp: (keyword,sort) => dispatch(searchCompAction(SearchCompAction, keyword, sort)),
	onSearchCompService: (keyword, sort) => dispatch(searchCompActionService(SearchCompActionService, keyword, sort)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	lifetimeFilter: (type, payload, payload2, page) => dispatch(selectFilterAction(type, payload, payload2, page)),
	dateFilter: (type, payload, payload2, page) => dispatch(dateFilterAction(type, payload, payload2, page)),
	updateSalesParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	updateSalesApprovedParameter: (payload) => dispatch(salesParameterApprovedAction(UpdateSalesApprovedParameterAction, payload)),
	updateSalesDeletedParameter: (payload) => dispatch(salesParameterDeletedAction(UpdateSalesDeletedParameterAction, payload)),
	updateSalesSapParameter: (payload) => dispatch(salesParameterSapAction(UpdateSalesSapParameterAction, payload)),
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	updateServiceApprovedParameter: (payload) => dispatch(serviceParameterApprovedAction(UpdateServiceApprovedParameterAction, payload)),
	updateServiceDeletedParameter: (payload) => dispatch(serviceParameterDeletedAction(UpdateServiceDeletedParameterAction, payload)),
	updateServiceSapParameter: (payload) => dispatch(serviceParameterSapAction(UpdateServiceSapParameterAction, payload)),	
	deleteSales: (payload, token) => dispatch(deleteSalesAction(payload, token)),
	deleteService: (payload, token) => dispatch(deleteServiceAction(payload, token)),
	deletePermanentSales: (payload, token) => dispatch(deletePermanentSalesAction(payload, token)),
	deletePermanentService: (payload, token) => dispatch(deletePermanentServiceAction(payload, token)),
	updateSearchSales: (payload) => dispatch(searchSalesParameterAction(UpdateSearchSalesAction, payload)),
	updateSearchSalesApproved: (payload) => dispatch(searchSalesApprovedAction(UpdateSearchSalesApprovedAction, payload)),
	updateSearchSalesDeleted: (payload) => dispatch(searchSalesDeletedAction(UpdateSearchSalesDeletedAction, payload)),	
	updateSearchSalesSap: (payload) => dispatch(searchSalesSapAction(UpdateSearchSalesSapAction, payload)),  
	updateSearchService: (payload) => dispatch(searchServiceParameterAction(UpdateSearchServiceAction, payload)),
	updateSearchServiceApproved: (payload) => dispatch(searchServiceApprovedAction(UpdateSearchServiceApprovedAction, payload)),
	updateSearchServiceDeleted: (payload) => dispatch(searchServiceDeletedAction(UpdateSearchServiceDeletedAction, payload)),
	updateSearchServiceSap: (payload) => dispatch(searchServiceSapAction(UpdateSearchServiceSapAction, payload)),
});

const status = connect(mapStateToProps, mapDispatchToProps)(Status);
export { status as Status, PlansReducers };