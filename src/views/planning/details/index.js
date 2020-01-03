import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { PlansReducers } from './DetailPages-reducer';
import { storeDataAction } from '../../../core/StorageHelper';
import { PLAN_DATA, StorageKey } from '../../../constants';
import {
	approveSalesAction,
	unapproveSalesAction,
	putPlanningApprovedAction,
	getServiceOrderAction, fetchSalesAction, salesParameterAction, fetchServiceAction,
	ClearSelectedPlans, UpdateServiceParameterAction,
	// fetchJobsAssignment,
	// FetchPlansAction,
	// fetchPlansAssignment,
	// getMechanicsAction,
	// plansParameterAction,
	UpdateSalesParameterAction, 
	searchAction,
	SearchSalesAction, 
	searchSo,
	SearchSoAction,
	selectFilterAction, UnselectSalesPlanAction, planParameterAction, UpdatePlansParameterAction, serviceParameterAction,
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
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	salesParameter: state.plansPageState.salesParameter,
	Search: state.plansPageState.Search,
	// requestPlans: state.plansPageState.PlansAssignmentSummary.status,
	// requestMechanics: state.plansPageState.mechanicList.status,
	// requestUnapproveSales: state.plansPageState.unassignPlansStatus.status,
	// unapproveSalesResponse: state.plansPageState.unassignPlansStatus.response,
	selectedFilters: state.plansPageState.selectedFilters,
	// selectedPlans: state.plansPageState.selectedPlans,
	selectedSalesPlans: state.plansPageState.selectedPlans,
	selectedServicePlans: state.plansPageState.selectedPlans,
	selectedLeader: state.plansPageState.selectedLeader,
	selectedMechanics: state.plansPageState.selectedMechanics,
	sortBy: state.plansPageState.sortBy,
	token: state.userData.tokenResponse.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
	approveSales: (payload) => dispatch(approveSalesAction(payload)),
	unapproveSales: (payload, token) => dispatch(unapproveSalesAction(payload, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	// fetchPlans: (payload, token) => dispatch(fetchPlansAssignment(FetchPlansAction, payload, token)),
	// getMechanics: (token) => dispatch(getMechanicsAction(token)),
	// getServiceOrder: () => dispatch(getServiceOrderAction()),
	// getSalesOrder: () => dispatch(getSalesFilteredAction()),
	// getSearchValue: (payload) => dispatch(getSearchValueAction(payload)),
	putDatatoPlanningApprove: (payload) => dispatch(putPlanningApprovedAction(payload)),
	fetchSalesOrder: (payload) => dispatch(fetchSalesAction(payload)),
	fetchServiceOrder: (payload) => dispatch(fetchServiceAction(payload)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	onSearch: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchSo: (keyword) => dispatch(searchSo(SearchSoAction, keyword)),
	pushTo: (url) => dispatch(push(url)),
	savePlanData: (data) => dispatch(storeDataAction(PLAN_DATA, StorageKey.PLAN_DATA, data)),
	selectFilter: (type, payload) => dispatch(selectFilterAction(type, payload)),
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