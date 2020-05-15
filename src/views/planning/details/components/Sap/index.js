import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import SapIssuePages from './SapIssuePages';
import {
	putSAPIssueAction,
	ClearSelectedPlans,
	UnselectSalesPlanAction, 
	UnselectServicePlanAction, 
	selectSalesPlansAction, 
	selectServicePlansAction, 
	SelectSalesPlanAction,
	SelectServicePlanAction,
	storePlanDataAction,
} from '../../DetailPages-action';

const mapStateToProps = (state) => ({
	token: state.userData.tokenResponse.accessToken,
	location : state.router.location,
	displayMode: state.displayMode,	
	selectedSalesPlans: state.plansPageState.selectedSalesPlans,
	selectedServicePlans: state.plansPageState.selectedServicePlans,
	fetchStatusPutSAPIssue: state.plansPageState.putSAPIssue.status,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	putSAPIssue : (payload, token, whichTabs) => dispatch(putSAPIssueAction(payload, token, whichTabs)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
});

const sapIssuepages = connect(mapStateToProps, mapDispatchToProps)(SapIssuePages);
export { sapIssuepages as SapIssuePages, PlansReducers };