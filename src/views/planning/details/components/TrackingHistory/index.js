import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import {
	approveSalesDownloadAction,
	approveServiceDownloadAction,
	selectSalesPlansAction,
	selectServicePlansAction,
	fetchApprovedSalesAction,
	fetchApprovedServiceAction,
	fetchDeletedSalesAction,
	fetchDeletedServiceAction,
	fetchSalesAction,
	fetchServiceAction,
	searchAction,
	salesParameterAction,
	salesParameterApprovedAction,
	serviceParameterAction,
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
	sortByAction
} from '../../DetailPages-action';
import TrackingHistory from './TrackingHistory';

const mapStateToProps = (state) => ({
	location : state.router.location,
	displayMode: state.displayMode,
	approveSalesDownloaded : state.plansPageState.approveSalesDownloaded,
	approveServiceDownloaded : state.plansPageState.approveServiceDownloaded,
	salesOrderList: state.plansPageState.salesOrderList.data,
	salesOrderListApproved: state.plansPageState.salesOrderListApproved.data,
	salesOrderListDeleted: state.plansPageState.salesOrderListDeleted.data,
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	serviceOrderListApproved: state.plansPageState.serviceOrderListApproved.data,
	serviceOrderListDeleted: state.plansPageState.serviceOrderListDeleted.data,
	salesParameter: state.plansPageState.salesParameter,
	salesApprovedParameter: state.plansPageState.salesApprovedParameter,
	salesDeletedParameter: state.plansPageState.salesDeletedParameter,
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
	fetchStatusService: state.plansPageState.serviceOrderList.status,
	fetchStatusServiceApproved: state.plansPageState.serviceOrderListApproved.status,
	fetchStatusServiceDeleted: state.plansPageState.serviceOrderListDeleted.status,
	sortSalesBy: state.plansPageState.sortSalesBy,
	sortServiceBy: state.plansPageState.sortServiceBy,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
	downloadSalesApproved : (soId) => dispatch(approveSalesDownloadAction(soId)),
	downloadServiceApproved : (soId) => dispatch(approveServiceDownloadAction(soId)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	fetchApprovedSales: (payload) => dispatch(fetchApprovedSalesAction(payload)),
	fetchApprovedService: (payload) => dispatch(fetchApprovedServiceAction(payload)),
	fetchDeletedSales: (payload) => dispatch(fetchDeletedSalesAction(payload)),
	fetchDeletedService: (payload) => dispatch(fetchDeletedServiceAction(payload)),
	fetchSalesOrder: (payload) => dispatch(fetchSalesAction(payload)),
	fetchServiceOrder: (payload) => dispatch(fetchServiceAction(payload)),
	onSearchSales: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchService: (keyword) => dispatch(searchAction(SearchServiceAction, keyword)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	updateSalesParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	updateSalesApprovedParameter: (payload) => dispatch(salesParameterApprovedAction(UpdateSalesApprovedParameterAction, payload)),
	updateSalesDeletedParameter: (payload) => dispatch(salesParameterApprovedAction(UpdateSalesDeletedParameterAction, payload)),
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	updateServiceApprovedParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	updateServiceDeletedParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	
});

const trackingHistory = connect(mapStateToProps, mapDispatchToProps)(TrackingHistory);
export { trackingHistory as TrackingHistory, PlansReducers };