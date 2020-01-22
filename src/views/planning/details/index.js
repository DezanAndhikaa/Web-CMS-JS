import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { PlansReducers } from './DetailPages-reducer';
import { storeDataAction } from '../../../core/StorageHelper';
import { PLAN_DATA, StorageKey } from '../../../constants';
import {
	putLifetimeCompAction,
	approveSalesAction, //APPROVE SALES
	unapproveSalesAction, 
	approveServiceAction, //APPROVE SERVICE
	deleteSalesAction,
	deleteServiceAction,
	fetchApprovedSalesAction,
	fetchApprovedServiceAction,
	fetchDeletedSalesAction,
	fetchDeletedServiceAction,
	fetchSalesAction, salesParameterAction, fetchServiceAction,
	ClearSelectedPlans, UpdateServiceParameterAction,
	UpdateSalesParameterAction, 
	searchAction,
	SearchSalesAction, SearchServiceAction,searchCompAction,
	SearchCompAction,SearchCompActionService,searchCompActionService,
	selectFilterAction,selectFilterAction2,indexFilterAction, UnselectSalesPlanAction, planParameterAction, UpdatePlansParameterAction, serviceParameterAction,
	UnselectServicePlanAction, selectSalesPlansAction, selectServicePlansAction, selectLeaderAction, SelectSalesPlanAction,
	SelectServicePlanAction, FetchSalesAction,
	selectMechanicAction, sortByAction, 
	storePlanDataAction,
	// getSearchValueAction, 
	// getSelesOrderAction, 
} from './DetailPages-action';
import DetailPages from './DetailPages';

const mapStateToProps = (state) => ({
	// assignPlansResponse: state.plansPageState.assignPlansStatus.response,
	// requestApproveSales: state.plansPageState.assignPlansStatus.status,
	displayMode: state.displayMode,
	// plansData: state.plansPageState.PlansAssignmentSummary.data,
	// mechanicList: state.plansPageState.mechanicList.data,
	salesOrderList: state.plansPageState.salesOrderList.data,
	salesOrderListApproved: state.plansPageState.salesOrderListApproved.data,
	salesOrderListDeleted: state.plansPageState.salesOrderListDeleted.data,
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	serviceOrderListApproved: state.plansPageState.serviceOrderListApproved.data,
	serviceOrderListDeleted: state.plansPageState.serviceOrderListDeleted.data,
	salesParameter: state.plansPageState.salesParameter,
	filterParameter: state.plansPageState.filterParameter,
	indexFilterParameter: state.plansPageState.indexFilterParameter,
	serviceParameter: state.plansPageState.serviceParameter,
	salesSearch: state.plansPageState.salesSearch,
	serviceSearch: state.plansPageState.serviceSearch,
	searchComp: state.plansPageState.searchComp,
	// requestPlans: state.plansPageState.PlansAssignmentSummary.status,
	// requestMechanics: state.plansPageState.mechanicList.status,
	// requestUnapproveSales: state.plansPageState.unassignPlansStatus.status,
	// unapproveSalesResponse: state.plansPageState.unassignPlansStatus.response,
	selectedFilters: state.plansPageState.selectedFilters,
	// selectedPlans: state.plansPageState.selectedPlans,
	selectedSalesPlans: state.plansPageState.selectedSalesPlans,
	selectedServicePlans: state.plansPageState.selectedServicePlans,
	selectedLeader: state.plansPageState.selectedLeader,
	selectedMechanics: state.plansPageState.selectedMechanics,
	sortSalesBy: state.plansPageState.sortSalesBy,
	sortServiceBy: state.plansPageState.sortServiceBy,
	token: state.userData.tokenResponse.accessToken,
	fetchStatusSales: state.plansPageState.salesOrderList.status,
	fetchStatusService: state.plansPageState.serviceOrderList.status
});

const mapDispatchToProps = (dispatch) => ({
	unapproveSales: (payload, token) => dispatch(unapproveSalesAction(payload, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	putLifetimeComp : (payload) => dispatch(putLifetimeCompAction(payload)),
	approveSales: (payload) => dispatch(approveSalesAction(payload)),
	approveService: (payload) => dispatch(approveServiceAction(payload)),
	deleteSales: (payload) => dispatch(deleteSalesAction(payload)),
	deleteService: (payload) => dispatch(deleteServiceAction(payload)),
	fetchApprovedSales: (payload) => dispatch(fetchApprovedSalesAction(payload)),
	fetchApprovedService: (payload) => dispatch(fetchApprovedServiceAction(payload)),
	fetchDeletedSales: (payload) => dispatch(fetchDeletedSalesAction(payload)),
	fetchDeletedService: (payload) => dispatch(fetchDeletedServiceAction(payload)),
	fetchSalesOrder: (payload) => dispatch(fetchSalesAction(payload)),
	fetchServiceOrder: (payload) => dispatch(fetchServiceAction(payload)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	onSearchSales: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchService: (keyword) => dispatch(searchAction(SearchServiceAction, keyword)),
	onSearchComp: (keyword,sort) => dispatch(searchCompAction(SearchCompAction, keyword, sort)),
	onSearchCompService: (keyword, sort) => dispatch(searchCompActionService(SearchCompActionService, keyword, sort)),
	pushTo: (url) => dispatch(push(url)),
	savePlanData: (data) => dispatch(storeDataAction(PLAN_DATA, StorageKey.PLAN_DATA, data)),
	selectFilter: (type, payload) => dispatch(selectFilterAction(type, payload)),
	selectFilter2: (type, payload, head, page) => dispatch(selectFilterAction2(type, payload, head, page)),
	indexFilter: (type, payload) => dispatch(indexFilterAction(type, payload)),
	selectLeader: (type, payload) => dispatch(selectLeaderAction(type, payload)),
	selectMechanic: (type, payload) => dispatch(selectMechanicAction(type, payload)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	updateSalesParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
});

const detailPages = connect(mapStateToProps, mapDispatchToProps)(DetailPages);

export { detailPages as DetailPages, PlansReducers };