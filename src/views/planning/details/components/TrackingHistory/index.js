import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';

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
	UpdateServiceParameterAction,
	sortByAction
} from '../../DetailPages-action';
import TrackingHistory from './TrackingHistory';

const mapStateToProps = (state) => ({
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
	serviceParameter: state.plansPageState.serviceParameter,
	salesSearch: state.plansPageState.salesSearch,
	serviceSearch: state.plansPageState.serviceSearch,
	selectedSalesPlans: state.plansPageState.selectedSalesPlans,
	selectedServicePlans: state.plansPageState.selectedServicePlans,
	fetchStatusSales: state.plansPageState.salesOrderList.status,
	fetchStatusService: state.plansPageState.serviceOrderList.status,
	sortSalesBy: state.plansPageState.sortSalesBy,
});

const mapDispatchToProps = (dispatch) => ({
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
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload))
});

const trackingHistory = connect(mapStateToProps, mapDispatchToProps)(TrackingHistory);
export { trackingHistory as TrackingHistory, PlansReducers };