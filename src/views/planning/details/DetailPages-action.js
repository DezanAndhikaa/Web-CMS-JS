/* eslint-disable no-mixed-spaces-and-tabs */


import { RequestMethod, ApiUrlBase } from '../../../constants';
import { callApi } from '../../../core/RestClientHelpers';

export const AssignPlansAction = 'ASSIGN_PLANS';
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const FetchSalesAction = 'FETCH_SALES_ORDER';
export const GetMechanicsAction = 'GET_MECHANICS';
export const GetServiceOrderAction = 'GET_SERVICE_ORDER';
export const GetSalesOrderAction = 'GET_SALES_ORDER';
export const ResetAssignment = 'RESET_ASSIGNMENT';
export const ResetSelectedMechanicsAction = 'RESET_SELECTED_MECHANICS';
export const ResetSelectedLeaderAction = 'RESET_SELECTED_LEADER';
export const SearchPlansAction = 'SEARCH_PLANS';
export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectSalesPlanAction = 'SELECT_SALES_PLANS';
export const SelectServicePlanAction = 'SELECT_SERVICE_PLANS';
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
export const UnselectSalesPlanAction = 'UNSELECT_SALES_PLANS';
export const UnselectServicePlanAction = 'UNSELECT_SERVICE_PLANS';
export const UnselectMechanicAction = 'UNSELECT_MECHANIC';
export const UpdateSalesParameterAction = 'SALES_PARAMETER';
export const SalesOrderFilterAction = 'SALES_ORDER_FILTER';

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
export function fetchSalesAction(payload) {
	console.log('ini type',FetchSalesAction);
	console.log(payload);
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SALESORDER_API_URL}/Filters`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchSalesAction, requestConfig));
}

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

export function getServiceOrderAction() {
	// const data = {
	// 	isDeleted: false,
	// 	filter:{}
	// };
	const requestConfig = {
		method: RequestMethod.GET,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/MasterData`,
		// headers: {
		// 	Authorization: 'anbiya',
		// 	'Content-Type':'application/json'
		// },
		// data: { payload },
		// body:JSON.stringify(data)
		
	};
	return async (dispatch) => dispatch(callApi(GetServiceOrderAction, requestConfig));
}
// export function getSalesFilteredAction() {
// 	// const data = {
// 	// 	isDeleted: false,
// 	// 	filter:{}
// 	// };
// 	const requestConfig = {
// 		method: RequestMethod.POST,
// 		url: `${ApiUrlBase.SALESORDER_API_URL}/Filters`,
// 		body: { 
// 			isDeleted : false,
// 			filter: {}
// 		},
// 		headers: {
// 			'Content-Type':'application/json'
// 		}
// 		// body:JSON.stringify(data)
		
// 	};
// 	return async (dispatch) => dispatch(callApi(GetSalesOrderAction, requestConfig));
// }
// export function getSelesOrderAction() {
// 	const requestConfig = {
// 		method: RequestMethod.GET,
// 		url: `${ApiUrlBase.SALESORDER_API_URL}`,
// 		// headers: {
// 		// 	Authorization: 'anbiya',
// 		// 	'Content-Type':'application/json'
// 		// },
// 		// data: { payload },
// 		// body:JSON.stringify(data)
		
// 	};
// 	return async (dispatch) => dispatch(callApi(GetSalesOrderAction, requestConfig));
// }

export function salesParameterAction(type, payload) {
	return { type, payload };
}

export function searchAction(type, payload) {
	return { type, payload };
}

export function selectFilterAction(type, payload) {
	return { type, payload };
}

export function selectSalesPlansAction(type, payload) {
	return { type, payload };
}
export function selectServicePlansAction(type, payload) {
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
