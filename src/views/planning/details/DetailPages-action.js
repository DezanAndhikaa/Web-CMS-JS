/* eslint-disable no-mixed-spaces-and-tabs */


import { RequestMethod, ApiUrlBase } from '../../../constants';
import { callApi } from '../../../core/RestClientHelpers';

export const ApproveSalesAction = 'APPROVE_SALES';
export const UnapproveSalesAction = 'UNAPPROVE_SALES';
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const FetchSalesAction = 'FETCH_SALES_ORDER';
export const PutPlanningApprove = 'PUT_PLANNING_APPROVE';
export const FetchServiceAction = 'FETCH_SERVICE_ORDER';
export const FetchPlansAction = 'FETCH_PLANS';
// export const FetchSearchValueAction = 'FETCH_SEARCH_VALUE';
export const GetMechanicsAction = 'GET_MECHANICS';
export const GetServiceOrderAction = 'GET_SERVICE_ORDER';
export const GetSalesOrderAction = 'GET_SALES_ORDER';
export const ResetAssignment = 'RESET_ASSIGNMENT';
export const ResetSelectedMechanicsAction = 'RESET_SELECTED_MECHANICS';
export const ResetSelectedLeaderAction = 'RESET_SELECTED_LEADER';
export const SearchSalesAction = 'SEARCH_PLANS';
export const SearchSoAction = 'SEARCH_SO';

export const SelectSalesPlanAction = 'SELECT_SALES_PLANS';
export const SelectServicePlanAction = 'SELECT_SERVICE_PLANS';
export const SelectPlansAssignmentFilterAction = 'SELECT_PLANS_ASSIGNMENT_FILTER';
export const SelectPlansTypeFilterAction = 'SELECT_PLANS_TYPE_FILTER';
export const SelectLeaderAction = 'SELECT_LEADER';
export const SelectMechanicAction = 'SELECT_MECHANIC';
// export const SelectUnitModelFilterAction = 'SELECT_UNIT_MODEL_FILTER';
export const SortSalesByCustomer = 'SORT_SALES_BY_CUSTOMER';
export const SortSalesBySite = 'SORT_SALES_BY_SITE';
export const SortSalesByUnitModel = 'SORT_SALES_BY_UNIT_MODEL';
export const SortSalesByCompDesc = 'SORT_SALES_BY_COMPONENT_DESCRIPTION';
export const SortServiceByCustomer = 'SORT_SERVICE_BY_CUSTOMER';
export const SortServiceBySite = 'SORT_SERVICE_BY_SITE';
export const SortServiceByUnitModel = 'SORT_SERVICE_BY_UNIT_MODEL';
export const SortServiceByCompDesc = 'SORT_SERVICE_BY_COMPONENT_DESCRIPTION';
export const StoreSelectedPlanDataAction = 'SELECTED_PLAN_DATA';
export const UnselectSalesPlanAction = 'UNSELECT_SALES_PLANS';
export const UnselectServicePlanAction = 'UNSELECT_SERVICE_PLANS';
export const UnselectMechanicAction = 'UNSELECT_MECHANIC';
export const UpdateSalesParameterAction = 'SALES_PARAMETER';
export const UpdateServiceParameterAction = 'SERVICE_PARAMETER';
export const SalesOrderFilterAction = 'SALES_ORDER_FILTER';

export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectSiteFilterAction = 'SELECT_SITE_FILTER'
export const SelectUnitModelFilterAction ='SELECT_UNIT_MODEL_FILTER'
export const SelectComponentFilterAction ='SELECT_COMPONENT_FILTER'

export function approveSalesAction (payload) {
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${ApiUrlBase.SALESORDER_API_URL}/Approval`,
		data: payload,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
	};
	return async (dispatch) => dispatch(callApi(ApproveSalesAction, requestConfig));
}

export function unapproveSalesAction(payload) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SALESORDER_API_URL}/Approval`,
		data: { workOrderId: payload },
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
	};
	return async (dispatch) => dispatch(callApi(UnapproveSalesAction, requestConfig));
}

// export function fetchPlansAssignment(type, payload, accessToken) {
// 	const requestConfig = {
// 		method: RequestMethod.POST,
// 		url: `${ApiUrlBase.SALESORDER_API_URL}Filters`,
// 		data: payload,
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID, // eslint-disable-line no-undef
// 			'Content-Type': 'application/json',
// 		},
// 	};
// 	return async (dispatch) => dispatch(callApi(type, requestConfig));
// }
export function putPlanningApprovedAction(payload){
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${ApiUrlBase.SALESORDER_API_URL}/Approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(PutPlanningApprove, requestConfig));
}

export function fetchSalesAction(payload) {
	console.log('ini type',FetchSalesAction);
	
	const filter = payload;
	console.log('isian filter : ',filter);
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SALESORDER_API_URL}/FilterUnapproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchSalesAction, requestConfig));
}

export function fetchServiceAction(payload) {
	console.log('ini type',FetchServiceAction);
	console.log(payload);
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/MasterData`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchServiceAction, requestConfig));
}
// export function getMechanicsAction(accessToken) {
// 	const requestConfig = {
// 		method : RequestMethod.POST,
// 		url: `${ApiUrlBase.SALESORDER_API_URL}/FilterGlobalUnapproved`,
// 		headers: {
// 			'Accept': 'application/json; charset=utf-8',
// 			'Content-Type': 'application/json; charset=utf-8',
// 		},
// 		data: payload,
// 	};
// 	return async (dispatch) => dispatch(callApi(FetchSearchValueAction, requestConfig));
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

export function getServiceOrderAction(payload) {
	// const data = {
	// 	isDeleted: false,
	// 	filter:{}
	// };
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/MasterData`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
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
	// const filter = payload;
	console.log('ini payload parameter', payload);
	return { type, payload };
}
export function serviceParameterAction(type, payload) {
	return { type, payload };
}

export function searchAction(type, payload) {
	console.log('search parameter', payload)
	return { type, payload };
}

export function searchSo(type, payload){
	return { type, payload };
}

export function selectFilterAction(type, payload) {
	console.log("ini punya si type : ",type)
	console.log("ini punya si payload : ", payload)
	return { type, payload };
}

export function selectFilterAction2(type, payload) {
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
