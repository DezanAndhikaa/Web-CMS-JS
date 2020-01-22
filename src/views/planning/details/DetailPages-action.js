/* eslint-disable no-mixed-spaces-and-tabs */

import { RequestMethod, ApiUrlBase } from '../../../constants';
import { callApi } from '../../../core/RestClientHelpers';

export const ApproveSalesAction = 'APPROVE_SALES';
export const ApproveServiceAction = 'APPROVE_SERVICE';
export const UnapproveSalesAction = 'UNAPPROVE_SALES';
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const FetchSalesAction = 'FETCH_SALES_ORDER';
export const PutLifetimeComp = 'PUT_LIFETIME_COMP';
export const PutSalesApproved = 'PUT_SALES_APPROVED';
export const PutServiceApproved = 'PUT_SERVICE_APPROVED';
export const FetchServiceAction = 'FETCH_SERVICE_ORDER';
export const FetchApprovedSalesAction = 'FETCH_APPROVED_SALES';
export const FetchApprovedServiceAction = 'FETCH_APPROVED_SERVICE';
export const FetchDeletedSalesAction = 'FETCH_DELETED_SALES';
export const FetchDeletedServiceAction = 'FETCH_DELETED_SERVICE';
export const DeleteSalesAction = 'DELETE_SALES';
export const DeleteServiceAction = 'DELETE_SERVICE';
// export const FetchSearchValueAction = 'FETCH_SEARCH_VALUE';
export const GetMechanicsAction = 'GET_MECHANICS';
export const GetServiceOrderAction = 'GET_SERVICE_ORDER';
export const GetSalesOrderAction = 'GET_SALES_ORDER';
export const ResetAssignment = 'RESET_ASSIGNMENT';
export const ResetSelectedMechanicsAction = 'RESET_SELECTED_MECHANICS';
export const ResetSelectedLeaderAction = 'RESET_SELECTED_LEADER';
export const SearchSalesAction = 'SEARCH_SALES_PLANS';
export const SearchServiceAction = 'SEARCH_SERVICE_PLANS';
export const SearchCompAction = 'SEARCH_BY_COMP';
export const SearchCompActionService = 'SEARCH_BY_COMP_SERVICE';
export const SelectAllSalesPlanAction = 'SELECT_ALL_SALES_PLANS';
export const SelectServicePlanAction = 'SELECT_SERVICE_PLANS';
export const SelectSalesPlanAction = 'SELECT_SALES_PLANS';
export const SelectAllServicePlanAction = 'SELECT_ALL_SERVICE_PLANS';
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
export const IndexFilterAction = 'INDEX FILTER';

export function approveSalesAction(payload){
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${ApiUrlBase.SALESORDER_API_URL}/Approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
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

export function putLifetimeCompAction(payload){
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${ApiUrlBase.SALESORDER_API_URL}`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(PutLifetimeComp, requestConfig));
}

export function approveServiceAction(payload){
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/Approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(ApproveServiceAction, requestConfig));
}

export function deleteSalesAction(payload){
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${ApiUrlBase.SALESORDER_API_URL}/DataAction/Delete`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(ApproveSalesAction, requestConfig));
}

export function deleteServiceAction(payload){
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/DataAction/Delete`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(DeleteServiceAction, requestConfig));
}

export function fetchSalesAction(payload) {
	const filter = payload;
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
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/FilterUnapproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchServiceAction, requestConfig));
}

export function fetchApprovedSalesAction(payload){
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SALESORDER_API_URL}/FilterApproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchApprovedSalesAction, requestConfig));
}

export function fetchApprovedServiceAction(payload){
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/FilterApproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchApprovedServiceAction, requestConfig));
}

export function fetchDeletedSalesAction(payload){
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SALESORDER_API_URL}/FilterDeleted`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchDeletedSalesAction, requestConfig));
}

export function fetchDeletedServiceAction(payload){
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/FilterDeleted`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchDeletedServiceAction, requestConfig));
}

export function getServiceOrderAction(payload) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${ApiUrlBase.SERVICEORDER_API_URL}/FilterUnapproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(GetServiceOrderAction, requestConfig));
}

export function salesParameterAction(type, payload) {
	return { type, payload };
}
export function serviceParameterAction(type, payload) {
	return { type, payload };
}

export function searchAction(type, payload) {
	return { type, payload };
}

export function searchCompAction(type, payload, sort){
	return { type, payload, sort };
}

export function searchCompActionService(type, payload, sort){
	return { type, payload, sort };
}

export function selectFilterAction(type, payload) {
	return { type, payload };
}

export function selectFilterAction2(type, payload, head) {
	return { type, payload, head };
}

export function indexFilterAction(type, payload){
	return { type, payload }
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
