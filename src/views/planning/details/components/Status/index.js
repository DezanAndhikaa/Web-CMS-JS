import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import {
	salesParameterDeletedAction,
	salesParameterSapAction,
	serviceParameterApprovedAction,
	UpdateServiceApprovedParameterAction,
	serviceParameterDeletedAction,
	UpdateServiceDeletedParameterAction,
	approveSalesDownloadAction,
	approveServiceDownloadAction,
	selectSalesPlansAction,
	selectServicePlansAction,
	fetchApprovedSalesAction,
	fetchApprovedServiceAction,
	fetchDeletedSalesAction,
	fetchDeletedServiceAction,
	fetchSapSalesAction,
	fetchSalesAction,
	fetchServiceAction,
	searchAction,
	salesParameterAction,
	salesParameterApprovedAction,
	serviceParameterAction,
	sortByAction,
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
	UpdateSalesSapParameterAction
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
	salesParameter: state.plansPageState.salesParameter,
	salesApprovedParameter: state.plansPageState.salesApprovedParameter,
	salesDeletedParameter: state.plansPageState.salesDeletedParameter,
	salesSapParameter: state.plansPageState.salesSapParameter,
	serviceParameter: state.plansPageState.serviceParameter,
	//
	serviceApprovedParameter : state.plansPageState.serviceApprovedParameter,
	serviceDeletedParameter : state.plansPageState.serviceDeletedParameter,
	//
	salesSearch: state.plansPageState.salesSearch,
	serviceSearch: state.plansPageState.serviceSearch,
	selectedSalesPlans: state.plansPageState.selectedSalesPlans,
	selectedServicePlans: state.plansPageState.selectedServicePlans,
	fetchStatusSales: state.plansPageState.salesOrderList.status,
	fetchStatusSalesApproved: state.plansPageState.salesOrderListApproved.status,
	fetchStatusSalesDeleted: state.plansPageState.salesOrderListDeleted.status,
	fetchStatusSalesSap: state.plansPageState.salesOrderListSap.status,
	fetchStatusService: state.plansPageState.serviceOrderList.status,
	fetchStatusServiceApproved: state.plansPageState.serviceOrderListApproved.status,
	fetchStatusServiceDeleted: state.plansPageState.serviceOrderListDeleted.status,
	sortSalesBy: state.plansPageState.sortSalesBy,
	sortServiceBy: state.plansPageState.sortServiceBy,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
	downloadSalesApproved : (soId, token) => dispatch(approveSalesDownloadAction(soId, token)),
	downloadServiceApproved : (soId, token) => dispatch(approveServiceDownloadAction(soId, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	fetchApprovedSales: (payload, token) => dispatch(fetchApprovedSalesAction(payload, token)),
	fetchApprovedService: (payload, token) => dispatch(fetchApprovedServiceAction(payload, token)),
	fetchDeletedSales: (payload, token) => dispatch(fetchDeletedSalesAction(payload, token)),
	fetchDeletedService: (payload, token) => dispatch(fetchDeletedServiceAction(payload, token)),
	fetchSalesOrder: (payload, token) => dispatch(fetchSalesAction(payload, token)),
	fetchServiceOrder: (payload, token) => dispatch(fetchServiceAction(payload, token)),
	fetchSapSales: (payload,token) => dispatch(fetchSapSalesAction(payload, token)),
	onSearchSales: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchService: (keyword) => dispatch(searchAction(SearchServiceAction, keyword)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	updateSalesParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	updateSalesApprovedParameter: (payload) => dispatch(salesParameterApprovedAction(UpdateSalesApprovedParameterAction, payload)),
	updateSalesDeletedParameter: (payload) => dispatch(salesParameterDeletedAction(UpdateSalesDeletedParameterAction, payload)),
	updateSalesSapParameter: (payload) => dispatch(salesParameterSapAction(UpdateSalesSapParameterAction, payload)),
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	updateServiceApprovedParameter: (payload) => dispatch(serviceParameterApprovedAction(UpdateServiceApprovedParameterAction, payload)),
	updateServiceDeletedParameter: (payload) => dispatch(serviceParameterDeletedAction(UpdateServiceDeletedParameterAction, payload)),
	deletePermanentSales: (payload, token) => dispatch(deletePermanentSalesAction(payload, token)),
	deletePermanentService: (payload, token) => dispatch(deletePermanentServiceAction(payload, token)),
	
});

const status = connect(mapStateToProps, mapDispatchToProps)(Status);
export { status as Status, PlansReducers };