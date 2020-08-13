import { RequestMethod } from '../../../constants';
import { callApi } from '../../../core/RestClientHelpers';

export const ApproveSalesAction = 'APPROVE_SALES';
export const ApproveServiceAction = 'APPROVE_SERVICE';
export const UnapproveSalesAction = 'UNAPPROVE_SALES';
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const FetchSalesAction = 'FETCH_SALES_ORDER';
export const PutLifetimeComp = 'PUT_LIFETIME_COMP';
export const PutSAPIssue = 'PUT_SAP_ISSUE';
export const PutSalesApproved = 'PUT_SALES_APPROVED';
export const PutServiceApproved = 'PUT_SERVICE_APPROVED';
export const FetchServiceAction = 'FETCH_SERVICE_ORDER';
export const FetchApprovedSalesAction = 'FETCH_APPROVED_SALES';
export const FetchApprovedServiceAction = 'FETCH_APPROVED_SERVICE';
export const FetchDeletedSalesAction = 'FETCH_DELETED_SALES';
export const FetchDeletedServiceAction = 'FETCH_DELETED_SERVICE';
export const FetchSapSalesAction = 'FETCH_SAP_SALES';
export const FetchSapServiceAction = 'FETCH_SAP_SERVICE';
export const FetchRevisedSalesAction = 'FETCH_REVISED_SALES';
export const DeleteSalesAction = 'DELETE_SALES';
export const DeletePermanentSalesAction = 'DELETE_PERMANENT_SALES';
export const DeleteServiceAction = 'DELETE_SERVICE';
export const DeletePermanentServiceAction = 'DELETE_PERMANENT_SERVICE';
export const GetMechanicsAction = 'GET_MECHANICS';
export const GetServiceOrderAction = 'GET_SERVICE_ORDER';
export const GetSalesOrderAction = 'GET_SALES_ORDER';
export const ResetAssignment = 'RESET_ASSIGNMENT';
export const ResetSelectedMechanicsAction = 'RESET_SELECTED_MECHANICS';
export const ResetSelectedLeaderAction = 'RESET_SELECTED_LEADER';
export const salesDownloadAction = 'DOWNLOAD_APPROVED_SALES';
export const serviceDownloadAction = 'DOWNLOAD_APPROVED_SERVICE';
export const SearchSalesAction = 'SEARCH_SALES_PLANS';
export const SearchSalesRevisiAction = 'SEARCH_SALES_REVISI_PLANS';
export const SearchServiceAction = 'SEARCH_SERVICE_PLANS';
export const SearchCompAction = 'SEARCH_BY_COMP';
export const SearchCompActionApproved = 'SEARCH_BY_COMP_APPROVED_SALES';
export const SearchCompActionDeleted = 'SEARCH_BY_COMP_DELETED_SALES';
export const SearchCompActionSap = 'SEARCH_BY_COMP_SAP_SALES';
export const SearchCompActionService = 'SEARCH_BY_COMP_SERVICE';
export const SearchCompActionServiceApproved = 'SEARCH_BY_COMP_APPROVED_SERVICE';
export const SearchCompActionServiceDeleted = 'SEARCH_BY_COMP__DELETED_SERVICE';
export const SearchCompActionServiceSap = 'SEARCH_BY_COMP_SAP_SERVICE';
export const SearchRevisedSalesOrder = 'SEARCH_REVISION_SALES';
export const SelectAllSalesPlanAction = 'SELECT_ALL_SALES_PLANS';
export const SelectServicePlanAction = 'SELECT_SERVICE_PLANS';
export const SelectSalesPlanAction = 'SELECT_SALES_PLANS';
export const SelectAllServicePlanAction = 'SELECT_ALL_SERVICE_PLANS';
export const SelectAllService = 'SELECT_ALL_SERVICE';
export const SelectPlansAssignmentFilterAction = 'SELECT_PLANS_ASSIGNMENT_FILTER';
export const SelectPlansTypeFilterAction = 'SELECT_PLANS_TYPE_FILTER';
export const SelectLeaderAction = 'SELECT_LEADER';
export const SelectMechanicAction = 'SELECT_MECHANIC';
export const SortSalesByCustomer = 'SORT_SALES_BY_CUSTOMER';
export const SortSalesBySite = 'SORT_SALES_BY_SITE';
export const SortSalesByUnitModel = 'SORT_SALES_BY_UNIT_MODEL';
export const SortSalesByCompDesc = 'SORT_SALES_BY_COMPONENT_DESCRIPTION';
export const SortSalesByPlanType = 'SORT_SALES_BY_PLAN_TYPE';
export const SortServiceByCustomer = 'SORT_SERVICE_BY_CUSTOMER';
export const SortServiceBySite = 'SORT_SERVICE_BY_SITE';
export const SortServiceByUnitModel = 'SORT_SERVICE_BY_UNIT_MODEL';
export const SortServiceByCompDesc = 'SORT_SERVICE_BY_COMPONENT_DESCRIPTION';
export const SortServiceByPlanType = 'SORT_SERVICE_BY_PLAN_TYPE';
export const StoreSelectedPlanDataAction = 'SELECTED_PLAN_DATA';
export const UnselectSalesPlanAction = 'UNSELECT_SALES_PLANS';
export const UnselectServicePlanAction = 'UNSELECT_SERVICE_PLANS';
export const UnselectMechanicAction = 'UNSELECT_MECHANIC';
export const UpdateSearchSalesAction = 'SALES_SEARCH_PARAMETER';
export const UpdateSearchSalesRevisiAction = 'SALES_SEARCH_REVISI_PARAMETER';
export const UpdateSearchSalesApprovedAction = 'SALES_SEARCH_APPROVED_PARAMETER';
export const UpdateSearchSalesDeletedAction = 'SALES_SEARCH_DELETED_PARAMETER';
export const UpdateSearchSalesSapAction = 'SALES_SEARCH_SAP_PARAMETER';
export const UpdateSearchSalesRevAction = 'SALES_SEARCH_REVISED_PARAMETER';
export const UpdateSearchServiceAction = 'SERVICE_SEARCH_PARAMETER';
export const UpdateSearchServiceApprovedAction = 'SERVICE_SEARCH_APPROVED_PARAMETER';
export const UpdateSearchServiceDeletedAction = 'SERVICE_SEARCH_DELETED_PARAMETER';
export const UpdateSearchSalesRevisionAction = 'SALES_SEARCH_REVISED_PARAMETER';
export const UpdateSearchServiceSapAction = 'SERVICE_SEARCH_SAP_PARAMETER';
export const UpdateSalesParameterAction = 'SALES_PARAMETER';
export const UpdateSalesApprovedParameterAction = 'SALES_APPROVED_PARAMETER';
export const UpdateSalesDeletedParameterAction = 'SALES_DELETED_PARAMETER';
export const UpdateSalesSapParameterAction = 'SALES_SAP_PARAMETER';
export const UpdateSalesRevisedParamAction = 'SALES_REVISED_PARAMETER';
export const UpdateServiceParameterAction = 'SERVICE_PARAMETER';
export const UpdateServiceApprovedParameterAction = 'SERVICE_APPROVED_PARAMETER';
export const UpdateServiceDeletedParameterAction = 'SERVICE_DELETED_PARAMETER';
export const UpdateServiceSapParameterAction = 'SERVICE_SAP_PARAMETER';
export const SalesOrderFilterAction = 'SALES_ORDER_FILTER';
export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectSiteFilterAction = 'SELECT_SITE_FILTER';
export const SelectUnitModelFilterAction = 'SELECT_UNIT_MODEL_FILTER';
export const SelectComponentFilterAction = 'SELECT_COMPONENT_FILTER';
export const SelectPlanTypeFilterAction = 'SELECT_PLAN_TYPE_FILTER';
export const IndexFilterAction = 'INDEX FILTER';
export const LifetimeFilterAction = 'SELECT_LIFETIME_FILTER';
export const SmrFilterAction = "SELECT_SMR_FILTER";
export const DateFilterAction = 'SELECT_DATE_FILTER';
export const SMRDateFilterAction = 'SELECT_SMRDATE_FILTER';

export function approveSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(ApproveSalesAction, requestConfig));
}

export function approveServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(ApproveServiceAction, requestConfig));
}

export function unapproveSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/revision`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(UnapproveSalesAction, requestConfig));
}

export function downloadSalesAction(soId, accessToken) {
	const requestConfig = {
		responseType: 'blob',
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/downloadsalesorder`,
		data: { SoNumbers: soId },
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json',
		},
	};
	return async (dispatch) => dispatch(callApi(salesDownloadAction, requestConfig));
}
export function downloadServiceAction(woId, accessToken) {
	const requestConfig = {
		responseType: 'blob',
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/downloadserviceorder`,
		data: { WoNumbers: woId },
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json',
		},
	};
	return async (dispatch) => dispatch(callApi(serviceDownloadAction, requestConfig));
}

export function putLifetimeCompAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/lifetimecomponent`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(PutLifetimeComp, requestConfig));
}

export function putSAPIssueAction(payload, accessToken){
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/sapissue`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8; text/plain',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload
	};
	return async (dispatch) => dispatch(callApi(PutSAPIssue, requestConfig));
}

export function deleteSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/deleted`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(DeleteSalesAction, requestConfig));
}

export function deletePermanentSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/permanent`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(DeletePermanentSalesAction, requestConfig));
}

export function deleteServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/deleted`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(DeleteServiceAction, requestConfig));
}

export function deletePermanentServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.DELETE,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/permanent`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(DeletePermanentServiceAction, requestConfig));
}

export function fetchSearchSalesAction(payload, accessToken) {
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchSalesAction, requestConfig));
}

export function fetchSearchServiceAction(payload, accessToken) {
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchServiceAction, requestConfig));
}

export function fetchSalesAction(payload, accessToken) {
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Accept': 'application/json; charset=utf-8',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchSalesAction, requestConfig));
}

export function fetchServiceAction(payload, accessToken) {
	const filter = payload;
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: filter,
	};
	return async (dispatch) => dispatch(callApi(FetchServiceAction, requestConfig));
}

export function fetchApprovedSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchApprovedSalesAction, requestConfig));
}

export function fetchApprovedServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchApprovedServiceAction, requestConfig));
}

export function fetchDeletedSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterdeleted`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchDeletedSalesAction, requestConfig));
}

export function fetchDeletedServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterdeleted`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchDeletedServiceAction, requestConfig));
}

export function fetchRevisedSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchRevisedSalesAction, requestConfig));
}

export function fetchSapSalesAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchSapSalesAction, requestConfig));
}

export function fetchSapServiceAction(payload, accessToken) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterunapproved`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(FetchSapServiceAction, requestConfig));
}

export function getServiceOrderAction(payload) {
	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/serviceorder/filterunapproved`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(GetServiceOrderAction, requestConfig));
}

export function searchSalesParameterAction(type, payload) {
	return { type, payload };
}

export function searchSalesApprovedAction(type, payload) {
	return { type, payload };
}

export function searchSalesRevisionAction(type, payload) {
	return { type, payload }
}

export function searchSalesDeletedAction(type, payload) {
	return { type, payload };
}

export function searchSalesSapAction(type, payload) {
	return { type, payload };
}

export function searchServiceParameterAction(type, payload) {
	return { type, payload };
}

export function searchServiceApprovedAction(type, payload) {
	return { type, payload };
}

export function searchServiceDeletedAction(type, payload) {
	return { type, payload };
}

export function searchServiceSapAction(type, payload) {
	return { type, payload };
}

export function salesParameterAction(type, payload) {
	return { type, payload };
}
export function salesParameterApprovedAction(type, payload) {
	return { type, payload };
}
export function salesParameterDeletedAction(type, payload) {
	return { type, payload };
}
export function salesParameterSapAction(type, payload) {
	return { type, payload };
}
export function serviceParameterAction(type, payload) {
	return { type, payload };
}
export function serviceParameterApprovedAction(type, payload) {
	return { type, payload };
}
export function serviceParameterDeletedAction(type, payload) {
	return { type, payload };
}
export function serviceParameterSapAction(type, payload) {
	return { type, payload };
}
export function salesParameterRevAction(type, payload) {
	return { type, payload };
}
export function searchAction(type, payload) {
	return { type, payload };
}

export function searchRevisiGlobalAction(type, payload) {
	return { type, payload };
}

export function searchCompAction(type, payload, sort) {
	return { type, payload, sort };
}
export function searchCompActionService(type, payload, sort) {
	return { type, payload, sort };
}
export function dateFilterAction(type, payload, payload2, page) {
	return { type, payload, payload2, page };
}

export function smrDateFilterAction(type, payload, payload2, page) {
	return { type, payload, payload2, page };
}

export function smrFilterAction(type, payload, payload2, page) {
	return { type, payload, payload2, page };
}
export function selectFilterAction(type, payload, payload2, page) {
	return { type, payload, payload2, page };
}
export function selectFilterAction2(type, payload, head, page) {
	return { type, payload, head, page };
}
export function indexFilterAction(type, payload) {
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

export function selectAllService(payload) {
	return {type: SelectAllService, payload}
}