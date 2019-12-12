

// import { RequestMethod, ApiUrlBase } from '../../../common/constants';
// import { callApi } from '../../../core/rest-client-helpers';

export const AssignPlansAction = 'ASSIGN_PLANS';
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const FetchPlansAction = 'FETCH_PLANS';
export const GetMechanicsAction = 'GET_MECHANICS';
export const ResetAssignment = 'RESET_ASSIGNMENT';
export const ResetSelectedMechanicsAction = 'RESET_SELECTED_MECHANICS';
export const ResetSelectedLeaderAction = 'RESET_SELECTED_LEADER';
export const SearchPlansAction = 'SEARCH_PLANS';
export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectPlanAction = 'SELECT_PLANS';
export const SelectPlansAssignmentFilterAction = 'SELECT_PLANS_ASSIGNMENT_FILTER';
export const SelectPlansTypeFilterAction = 'SELECT_PLANS_TYPE_FILTER';
export const SelectLeaderAction = 'SELECT_LEADER';
export const SelectMechanicAction = 'SELECT_MECHANIC';
export const SelectUnitModelFilterAction = 'SELECT_UNIT_MODEL_FILTER';
export const SortPlansByBacklogOpen = 'SORT_PLANS_BY_BACKLOG_OPEN';
export const SortPlansByCustomer = 'SORT_PLANS_BY_CUSTOMER';
export const SortPlansByPlanType = 'SORT_PLANS_BY_PLAN_TYPE';
export const SortPlansByUnitModel = 'SORT_PLANS_BY_UNIT_MODEL';
export const SortPlansByUnitCode = 'SORT_PLANS_BY_UNIT_CODE';
export const SortPlansByPlantExecution = 'SORT_PLANS_BY_PLANT_EXECUTION';
export const SortPlansByStaging = 'SORT_PLANS_BY_STAGING';
export const SortPlansByStatus = 'SORT_PLANS_BY_STATUS';
export const SortPlansByWorkOrder = 'SORT_PLANS_BY_WORK_ORDER';
export const StoreSelectedPlanDataAction = 'SELECTED_PLAN_DATA';
export const UnassignPlansAction = 'UNASSIGN_PLANS';
export const UnselectPlanAction = 'UNSELECT_PLANS';
export const UnselectMechanicAction = 'UNSELECT_MECHANIC';
export const UpdatePlansParameterAction = 'PLANS_PARAMETER';

// export function assignPlansAction(type, payload, accessToken) {
// 	const requestConfig = {
// 		method: RequestMethod.POST,
// 		url: `${ApiUrlBase.ASSIGNMENT_API_URL}AssignPlan`,
// 		data: payload,
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID, // eslint-disable-line no-undef
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return async (dispatch) => dispatch(callApi(type, requestConfig));
// }

// export function fetchPlansAssignment(type, payload, accessToken) {
// 	const requestConfig = {
// 		method: RequestMethod.POST,
// 		url: `${ApiUrlBase.WORK_ORDER_API_URL}ListOfPlanAssignment`,
// 		data: payload,
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID, // eslint-disable-line no-undef
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return async (dispatch) => dispatch(callApi(type, requestConfig));
// }

// export function getMechanicsAction(accessToken) {
// 	const requestConfig = {
// 		method: RequestMethod.GET,
// 		url: `${ApiUrlBase.ASSIGNMENT_API_URL}DummyMechanic`,
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID, // eslint-disable-line no-undef
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return async (dispatch) => dispatch(callApi(GetMechanicsAction, requestConfig));
// }

// export function unassignPlansAction(payload, accessToken) {
// 	const requestConfig = {
// 		method: RequestMethod.POST,
// 		url: `${ApiUrlBase.ASSIGNMENT_API_URL}UnassignPlan`,
// 		data: { workOrderId: payload },
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID, // eslint-disable-line no-undef
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return async (dispatch) => dispatch(callApi(UnassignPlansAction, requestConfig));
// }

export function planParameterAction(type, payload) {
	return { type, payload };
}

export function searchAction(type, payload) {
	return { type, payload };
}

export function selectFilterAction(type, payload) {
	return { type, payload };
}

export function selectPlansAction(type, payload) {
	return { type, payload };
}

export function selectLeaderAction(type, payload) {
	return { type, payload };
}

export function selectMechanicAction(type, payload) {
	return { type, payload };
}

export function sortByAction(type) {
	return { type };
}

export function storePlanDataAction(payload) {
	return { type: StoreSelectedPlanDataAction, payload };
}
