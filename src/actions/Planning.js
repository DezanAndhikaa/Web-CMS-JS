import {PlanningApi} from 'api';
import {
    LOGOUT_TYPE,
    ApproveSalesAction,
    ApproveServiceAction,
    PutSalesApproved,
    PutServiceApproved,

    // Action type for unapprove function
    UnapproveSalesAction,

    // Action type for edit lifetime
    PutLifetimeComp,

    // Action type for submit sap issue
    PutSAPIssue,

    // Action type for fetch data
    FetchSalesAction,
    FetchServiceAction,
    FetchApprovedSalesAction,
    FetchApprovedServiceAction,
    FetchDeletedSalesAction,
    FetchDeletedServiceAction,
    FetchSapSalesAction,
    FetchSapServiceAction,
    FetchRevisedSalesAction,

    // Action type for delete function
    DeleteSalesAction,
    DeleteServiceAction,

    // Action type for delete permanent
    DeletePermanentSalesAction,
    DeletePermanentServiceAction,

    // Action type for download function
    salesDownloadAction,
    serviceDownloadAction,

    // Action type for global search
    SearchSalesAction,
    SearchServiceAction,

    // Action type for search per component
    SearchCompAction,
    SearchCompActionApproved,
    SearchCompActionDeleted,
    SearchCompActionSap,
    SearchCompActionService,
    SearchCompActionServiceApproved,
    SearchCompActionServiceDeleted,
    SearchCompActionServiceSap,

    // Action type for sorting
    SortSalesByCustomer,
    SortSalesBySite,
    SortSalesByUnitModel,
    SortSalesByCompDesc,
    SortServiceByCustomer,
    SortServiceBySite,
    SortServiceByUnitModel,
    SortServiceByCompDesc,

    // Action type for manage checkbox
    ClearSelectedPlans,
    StoreSelectedPlanDataAction,
    UnselectSalesPlanAction,
    UnselectServicePlanAction,
    SelectServicePlanAction,
    SelectSalesPlanAction,

    // Action type for update parameter
    UpdateSearchSalesAction,
    UpdateSearchSalesApprovedAction,
    UpdateSearchSalesDeletedAction,
    UpdateSearchSalesSapAction,
    UpdateSearchServiceAction,
    UpdateSearchServiceApprovedAction,
    UpdateSearchServiceDeletedAction,
    UpdateSearchServiceSapAction,
    UpdateSalesParameterAction,
    UpdateSalesApprovedParameterAction,
    UpdateSalesDeletedParameterAction,
    UpdateSalesSapParameterAction,
    UpdateSalesRevisedParamAction,
    UpdateServiceParameterAction,
    UpdateServiceApprovedParameterAction,
    UpdateServiceDeletedParameterAction,
    UpdateServiceSapParameterAction,

    //Action type for filter
    SalesOrderFilterAction,
    SelectCustomerFilterAction,
    SelectSiteFilterAction,
    SelectUnitModelFilterAction,
    SelectComponentFilterAction,
    IndexFilterAction,
    LifetimeFilterAction,
    DateFilterAction
} from 'actions/actionTypes'

const api = token => PlanningApi.newInstance(token);

export const approveSales = (token) => async dispatch => {
    dispatch({
        type:`${FETCH_LIST_MECHANIC}${REQUEST_TYPE}`
    })
	const requestConfig = {
		method: RequestMethod.PUT,
		url: `${process.env.REACT_APP_API_URL}/cms/v1/salesorder/approval`,
		headers: {
			'Accept': 'application/json; charset=utf-8',
			Authorization: `Bearer ${accessToken}`,
			'x-ibm-client-id' : process.env.REACT_APP_X_IBM_CLIENT_ID,
			'Content-Type': 'application/json; charset=utf-8',
		},
		data: payload,
	};
	return async (dispatch) => dispatch(callApi(ApproveSalesAction, requestConfig));
}

export const listOfMechanic = (token) => async dispatch => {
    dispatch({
        type:`${FETCH_LIST_MECHANIC}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).listMechanic(token);
        dispatch({
            type:`${FETCH_LIST_MECHANIC}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        });
    } catch (error) {
        console.log('errorListofMechanic:',error);
        dispatch({
            type:`${FETCH_LIST_MECHANIC}${FAILURE_TYPE}`
        })
    } 
}

export function logoutAction() {
	return { type: LOGOUT_TYPE };
}
