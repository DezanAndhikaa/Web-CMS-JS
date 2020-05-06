import {PlanningApi} from '../api';
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
} from './actionTypes'

const api = token => PlanningApi.newInstance(token);

export function logoutAction() {
	return { type: LOGOUT_TYPE };
}
