export const REQUEST_TYPE = '_REQUEST';
export const SUCCESS_TYPE = '_SUCCESS';
export const FAILURE_TYPE = '_FAILURE';
export const SET_LEADER_TYPE = 'SET_LEADER_TYPE';
export const LOGIN_TYPE = 'LOGIN';
export const LOGOUT_TYPE = 'LOGOUT_TYPE';

// Action type for approve function
export const ApproveSalesAction = 'APPROVE_SALES';
export const ApproveServiceAction = 'APPROVE_SERVICE';
export const PutSalesApproved = 'PUT_SALES_APPROVED';
export const PutServiceApproved = 'PUT_SERVICE_APPROVED';

// Action type for unapprove function
export const UnapproveSalesAction = 'UNAPPROVE_SALES';

// Action type for edit lifetime
export const PutLifetimeComp = 'PUT_LIFETIME_COMP';

// Action type for submit sap issue
export const PutSAPIssue = 'PUT_SAP_ISSUE';

// Action type for fetch data
export const FetchSalesAction = 'FETCH_SALES_ORDER';
export const FetchServiceAction = 'FETCH_SERVICE_ORDER';
export const FetchApprovedSalesAction = 'FETCH_APPROVED_SALES';
export const FetchApprovedServiceAction = 'FETCH_APPROVED_SERVICE';
export const FetchDeletedSalesAction = 'FETCH_DELETED_SALES';
export const FetchDeletedServiceAction = 'FETCH_DELETED_SERVICE';
export const FetchSapSalesAction = 'FETCH_SAP_SALES';
export const FetchSapServiceAction = 'FETCH_SAP_SERVICE';
export const FetchRevisedSalesAction = 'FETCH_REVISED_SALES';

// Action type for delete function
export const DeleteSalesAction = 'DELETE_SALES';
export const DeleteServiceAction = 'DELETE_SERVICE';

// Action type for delete permanent
export const DeletePermanentSalesAction = 'DELETE_PERMANENT_SALES';
export const DeletePermanentServiceAction = 'DELETE_PERMANENT_SERVICE';

// Action type for download function
export const salesDownloadAction = 'DOWNLOAD_APPROVED_SALES';
export const serviceDownloadAction = 'DOWNLOAD_APPROVED_SERVICE';

// Action type for global search
export const SearchSalesAction = 'SEARCH_SALES_PLANS';
export const SearchServiceAction = 'SEARCH_SERVICE_PLANS';

// Action type for search per component
export const SearchCompAction = 'SEARCH_BY_COMP';
export const SearchCompActionApproved = 'SEARCH_BY_COMP_APPROVED_SALES';
export const SearchCompActionDeleted = 'SEARCH_BY_COMP_DELETED_SALES';
export const SearchCompActionSap = 'SEARCH_BY_COMP_SAP_SALES';
export const SearchCompActionService = 'SEARCH_BY_COMP_SERVICE';
export const SearchCompActionServiceApproved = 'SEARCH_BY_COMP_APPROVED_SERVICE';
export const SearchCompActionServiceDeleted = 'SEARCH_BY_COMP__DELETED_SERVICE';
export const SearchCompActionServiceSap = 'SEARCH_BY_COMP_SAP_SERVICE';

// Action type for sorting
export const SortSalesByCustomer = 'SORT_SALES_BY_CUSTOMER';
export const SortSalesBySite = 'SORT_SALES_BY_SITE';
export const SortSalesByUnitModel = 'SORT_SALES_BY_UNIT_MODEL';
export const SortSalesByCompDesc = 'SORT_SALES_BY_COMPONENT_DESCRIPTION';
export const SortServiceByCustomer = 'SORT_SERVICE_BY_CUSTOMER';
export const SortServiceBySite = 'SORT_SERVICE_BY_SITE';
export const SortServiceByUnitModel = 'SORT_SERVICE_BY_UNIT_MODEL';
export const SortServiceByCompDesc = 'SORT_SERVICE_BY_COMPONENT_DESCRIPTION';

// Action type for manage checkbox
export const ClearSelectedPlans = 'CLEAR_SELECTED_PLANS';
export const StoreSelectedPlanDataAction = 'SELECTED_PLAN_DATA';
export const UnselectSalesPlanAction = 'UNSELECT_SALES_PLANS';
export const UnselectServicePlanAction = 'UNSELECT_SERVICE_PLANS';
export const SelectServicePlanAction = 'SELECT_SERVICE_PLANS';
export const SelectSalesPlanAction = 'SELECT_SALES_PLANS';

// Action type for update parameter
export const UpdateSearchSalesAction = 'SALES_SEARCH_PARAMETER';
export const UpdateSearchSalesApprovedAction = 'SALES_SEARCH_APPROVED_PARAMETER';
export const UpdateSearchSalesDeletedAction = 'SALES_SEARCH_DELETED_PARAMETER';
export const UpdateSearchSalesSapAction = 'SALES_SEARCH_SAP_PARAMETER';
export const UpdateSearchServiceAction = 'SERVICE_SEARCH_PARAMETER';
export const UpdateSearchServiceApprovedAction = 'SERVICE_SEARCH_APPROVED_PARAMETER';
export const UpdateSearchServiceDeletedAction = 'SERVICE_SEARCH_DELETED_PARAMETER';
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

//Action type for filter
export const SalesOrderFilterAction = 'SALES_ORDER_FILTER';
export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectSiteFilterAction = 'SELECT_SITE_FILTER';
export const SelectUnitModelFilterAction ='SELECT_UNIT_MODEL_FILTER';
export const SelectComponentFilterAction ='SELECT_COMPONENT_FILTER';
export const IndexFilterAction = 'INDEX FILTER';
export const LifetimeFilterAction = 'SELECT_LIFETIME_FILTER';
export const DateFilterAction = 'SELECT_DATE_FILTER';

