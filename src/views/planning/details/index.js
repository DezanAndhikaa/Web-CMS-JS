import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { PlansReducers } from './DetailPages-reducer';
import { storeDataAction } from '../../../core/StorageHelper';
import { PLAN_DATA, StorageKey } from '../../../constants';
import {
	// AssignPlansAction,
	// assignPlansAction,
	getServiceOrderAction, fetchSalesAction, salesParameterAction,
	ClearSelectedPlans, 
	FetchPlansAction,
	fetchPlansAssignment,
	// getMechanicsAction,
	// plansParameterAction,
	UpdateSalesParameterAction, 
	searchAction,
	SearchPlansAction, 
	selectFilterAction, UnselectSalesPlanAction, planParameterAction, UpdatePlansParameterAction,
	UnselectServicePlanAction, selectSalesPlansAction, selectServicePlansAction, selectLeaderAction, SelectSalesPlanAction,
	SelectServicePlanAction, FetchSalesAction,
	selectMechanicAction, sortByAction, 
	// unassignPlansAction, 
	storePlanDataAction, 
	// getSelesOrderAction, 
} from './DetailPages-action';
import DetailPages from './DetailPages';

const mapStateToProps = (state) => ({
	// assignPlansResponse: state.plansPageState.assignPlansStatus.response,
	displayMode: state.displayMode,
	// plansData: state.plansPageState.PlansAssignmentSummary.data,
	// mechanicList: state.plansPageState.mechanicList.data,
	salesOrderList: state.plansPageState.salesOrderList.data,
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	parameter: state.plansPageState.salesParameter,
	searchValue: state.plansPageState.searchValue,
	// requestAssignPlans: state.plansPageState.assignPlansStatus.status,
	// requestPlans: state.plansPageState.PlansAssignmentSummary.status,
	// requestMechanics: state.plansPageState.mechanicList.status,
	// requestUnassignPlans: state.plansPageState.unassignPlansStatus.status,
	selectedFilters: state.plansPageState.selectedFilters,
	// selectedPlans: state.plansPageState.selectedPlans,
	selectedSalesPlans: state.plansPageState.selectedPlans,
	selectedServicePlans: state.plansPageState.selectedPlans,
	selectedLeader: state.plansPageState.selectedLeader,
	selectedMechanics: state.plansPageState.selectedMechanics,
	sortBy: state.plansPageState.sortBy,
	token: state.userData.tokenResponse.accessToken,
	// unassignPlansResponse: state.plansPageState.unassignPlansStatus.response,
});

const mapDispatchToProps = (dispatch) => ({
	// assignPlans: (payload, token) => dispatch(assignPlansAction(AssignPlansAction, payload, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	fetchPlans: (payload, token) => dispatch(fetchPlansAssignment(FetchPlansAction, payload, token)),
	// getMechanics: (token) => dispatch(getMechanicsAction(token)),
	getServiceOrder: () => dispatch(getServiceOrderAction()),
	// getSalesOrder: () => dispatch(getSalesFilteredAction()),
	fetchSalesOrder: (payload) => dispatch(fetchSalesAction(payload)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	onSearch: (keyword) => dispatch(searchAction(SearchPlansAction, keyword)),
	pushTo: (url) => dispatch(push(url)),
	savePlanData: (data) => dispatch(storeDataAction(PLAN_DATA, StorageKey.PLAN_DATA, data)),
	selectFilter: (type, payload) => dispatch(selectFilterAction(type, payload)),
	selectLeader: (type, payload) => dispatch(selectLeaderAction(type, payload)),
	selectMechanic: (type, payload) => dispatch(selectMechanicAction(type, payload)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
	// unassignPlans: (payload, token) => dispatch(unassignPlansAction(payload, token)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	updateParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
});

const detailPages = connect(mapStateToProps, mapDispatchToProps)(DetailPages);

export { detailPages as DetailPages, PlansReducers };