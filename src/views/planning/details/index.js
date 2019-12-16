import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { PlansReducers } from './DetailPages-reducer';
import { storeDataAction } from '../../../core/storage-helper';
import { PLAN_DATA, StorageKey } from '../../../common/constants';
import {
	AssignPlansAction, assignPlansAction, 
	ClearSelectedPlans, FetchPlansAction, fetchPlansAssignment,
	getMechanicsAction, plansParameterAction, UpdatePlansParameterAction, searchAction,
	SearchPlansAction, selectFilterAction, SelectPlanAction, selectPlansAction, selectLeaderAction,
	selectMechanicAction, sortByAction, 
	unassignPlansAction, 
	UnselectPlanAction, storePlanDataAction,
} from './DetailPages-action';
import DetailPages from './DetailPages';

const mapStateToProps = (state) => ({
	assignPlansResponse: state.plansPageState.assignPlansStatus.response,
	displayMode: state.displayMode,
	plansData: state.plansPageState.PlansAssignmentSummary.data,
	mechanicList: state.plansPageState.mechanicList.data,
	parameter: state.plansPageState.plansParameter,
	searchValue: state.plansPageState.searchValue,
	requestAssignPlans: state.plansPageState.assignPlansStatus.status,
	requestPlans: state.plansPageState.PlansAssignmentSummary.status,
	requestMechanics: state.plansPageState.mechanicList.status,
	requestUnassignPlans: state.plansPageState.unassignPlansStatus.status,
	selectedFilters: state.plansPageState.selectedFilters,
	selectedPlans: state.plansPageState.selectedPlans,
	selectedLeader: state.plansPageState.selectedLeader,
	selectedMechanics: state.plansPageState.selectedMechanics,
	sortBy: state.plansPageState.sortBy,
	token: state.userData.tokenResponse.accessToken,
	unassignPlansResponse: state.plansPageState.unassignPlansStatus.response,
});

const mapDispatchToProps = (dispatch) => ({
	assignPlans: (payload, token) => dispatch(assignPlansAction(AssignPlansAction, payload, token)),
	clearSelectedPlans: (payload) => dispatch(selectPlansAction(ClearSelectedPlans, payload)),
	fetchPlans: (payload, token) => dispatch(fetchPlansAssignment(FetchPlansAction, payload, token)),
	getMechanics: (token) => dispatch(getMechanicsAction(token)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	onSearch: (keyword) => dispatch(searchAction(SearchPlansAction, keyword)),
	pushTo: (url) => dispatch(push(url)),
	savePlanData: (data) => dispatch(storeDataAction(PLAN_DATA, StorageKey.PLAN_DATA, data)),
	selectFilter: (type, payload) => dispatch(selectFilterAction(type, payload)),
	selectLeader: (type, payload) => dispatch(selectLeaderAction(type, payload)),
	selectMechanic: (type, payload) => dispatch(selectMechanicAction(type, payload)),
	selectPlan: (payload) => dispatch(selectPlansAction(SelectPlanAction, payload)),
	storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
	unassignPlans: (payload, token) => dispatch(unassignPlansAction(payload, token)),
	unselectPlan: (payload) => dispatch(selectPlansAction(UnselectPlanAction, payload)),
	updateParameter: (payload) => dispatch(plansParameterAction(UpdatePlansParameterAction, payload)),
});

const detailPages = connect(mapStateToProps, mapDispatchToProps)(DetailPages);

export { detailPages as DetailPages, PlansReducers };