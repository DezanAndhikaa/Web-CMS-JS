import { connect } from 'react-redux';
import { PlansReducers } from '../../details/DetailPages-reducer';
import { push } from 'connected-react-router';
import {
	putLifetimeCompAction,
	putSAPIssueAction,
	approveSalesAction,
	unapproveSalesAction,
	approveServiceAction,
	deleteSalesAction,
	deleteServiceAction,
	fetchApprovedSalesAction,
	fetchApprovedServiceAction,
	fetchDeletedSalesAction,
	fetchDeletedServiceAction,
	fetchSalesAction,
	salesParameterAction,
	fetchRevisedSalesAction,
	fetchServiceAction,
	searchSalesParameterAction,
	searchServiceParameterAction,
	UpdateSearchSalesAction,
	UpdateSearchServiceAction,
	ClearSelectedPlans,
	UpdateServiceParameterAction,
	UpdateSalesParameterAction,
	UpdateSalesRevisedParamAction,
	searchAction,
	SearchSalesAction, 
	SearchRevisedSalesOrder,
	SearchServiceAction,
	searchCompAction,
	SearchCompAction,
	SearchCompActionService,
	searchCompActionService,
	selectFilterAction,
	selectFilterAction2,
	indexFilterAction,
	UnselectSalesPlanAction,
	serviceParameterAction,
	UnselectServicePlanAction,
	selectSalesPlansAction,
	selectServicePlansAction,
	SelectSalesPlanAction,
	SelectServicePlanAction,
	sortByAction,
	storePlanDataAction,
	salesParameterRevAction,
	dateFilterAction, 
	smrDateFilterAction,
	searchSalesRevisionAction,
	UpdateSearchSalesRevAction,
	smrFilterAction
} from '../../details/DetailPages-action';
import DetailPagesSite from './DetailPagesSite';

const mapStateToProps = (state) => ({
  location: state.router.location,
  displayMode: state.displayMode,
  salesOrderList: state.plansPageState.salesOrderList.data,
  salesOrderListApproved: state.plansPageState.salesOrderListApproved.data,
  salesOrderListDeleted: state.plansPageState.salesOrderListDeleted.data,
  serviceOrderList: state.plansPageState.serviceOrderList.data,
  serviceOrderListApproved: state.plansPageState.serviceOrderListApproved.data,
  serviceOrderListDeleted: state.plansPageState.serviceOrderListDeleted.data,
  salesOrderRevised: state.plansPageState.salesOrderRevised.data,
  salesParameter: state.plansPageState.salesParameter,
  salesRevisedParam: state.plansPageState.salesRevisedParam,
  filterParameter: state.plansPageState.filterParameter,
  filterLifetime: state.plansPageState.filterLifetime,
  filterDate: state.plansPageState.filterDate,
  filterDateSmr: state.plansPageState.filterDateSmr,
  filterSmr: state.plansPageState.filterSmr,
  indexFilterParameter: state.plansPageState.indexFilterParameter,
  serviceParameter: state.plansPageState.serviceParameter,
  searchSalesParameter: state.plansPageState.searchSalesParameter,
  searchServiceParameter: state.plansPageState.searchServiceParameter,
  searchSalesRevParam: state.plansPageState.searchSalesRevParam,
  salesSearch: state.plansPageState.salesSearch,
  salesSearchRevision: state.plansPageState.salesSearchRevision,
  serviceSearch: state.plansPageState.serviceSearch,
  searchComp: state.plansPageState.searchComp,
  selectedFilters: state.plansPageState.selectedFilters,
  selectedSalesPlans: state.plansPageState.selectedSalesPlans,
  selectedServicePlans: state.plansPageState.selectedServicePlans,
  selectedLeader: state.plansPageState.selectedLeader,
  selectedMechanics: state.plansPageState.selectedMechanics,
  sortSalesBy: state.plansPageState.sortSalesBy,
  sortServiceBy: state.plansPageState.sortServiceBy,
  token: state.userData.tokenResponse.accessToken,
  approveSalesDownloaded: state.plansPageState.approveSalesDownloaded,
  approveServiceDownloaded: state.plansPageState.approveServiceDownloaded,
  fetchStatusSales: state.plansPageState.salesOrderList.status,
  fetchStatusPutLifetime: state.plansPageState.putLifetimeList.status,
  fetchStatusService: state.plansPageState.serviceOrderList.status,
  fetchStatusSalesApproved: state.plansPageState.salesOrderListApproved.status,
  fetchStatusServiceApproved:
    state.plansPageState.serviceOrderListApproved.status,
  fetchStatusPutSAPIssue: state.plansPageState.putSAPIssue.status,
  fetchStatusUnapprove: state.plansPageState.unApprove.status,
  fetchStatusApprovedSales: state.plansPageState.salesApproved.status,
  fetchStatusApprovedService: state.plansPageState.serviceApproved.status,
  fetchStatusSalesDeleted: state.plansPageState.salesDeleted.status,
  fetchStatusServiceDeleted: state.plansPageState.serviceDeleted.status,
  fetchStatusRevised: state.plansPageState.salesOrderRevised.status,
});

const mapDispatchToProps = (dispatch) => ({
  push: (path, whichTab) => dispatch(push(path, whichTab)),
  unapproveSales: (payload, token) =>
    dispatch(unapproveSalesAction(payload, token)),
  clearSelectedSalesPlans: (payload) =>
    dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
  clearSelectedServicePlans: (payload) =>
    dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
  putLifetimeComp: (payload, token) =>
    dispatch(putLifetimeCompAction(payload, token)),
  putSAPIssue: (payload, token) => dispatch(putSAPIssueAction(payload, token)),
  approveSales: (payload, token) =>
    dispatch(approveSalesAction(payload, token)),
  approveService: (payload, token) =>
    dispatch(approveServiceAction(payload, token)),
  deleteSales: (payload, token) => dispatch(deleteSalesAction(payload, token)),
  deleteService: (payload, token) =>
    dispatch(deleteServiceAction(payload, token)),
  fetchApprovedSales: (payload, token) =>
    dispatch(fetchApprovedSalesAction(payload, token)),
  fetchApprovedService: (payload, token) =>
    dispatch(fetchApprovedServiceAction(payload, token)),
  fetchDeletedSales: (payload, token) =>
    dispatch(fetchDeletedSalesAction(payload, token)),
  fetchDeletedService: (payload, token) =>
    dispatch(fetchDeletedServiceAction(payload, token)),
  fetchSalesOrder: (payload, token) =>
    dispatch(fetchSalesAction(payload, token)),
  fetchServiceOrder: (payload, token) =>
    dispatch(fetchServiceAction(payload, token)),
  fetchRevisedSales: (payload, token) =>
    dispatch(fetchRevisedSalesAction(payload, token)),
  onClickSortBy: (type) => dispatch(sortByAction(type)),
  onSearchSales: (keyword) =>
    dispatch(searchAction(SearchSalesAction, keyword)),
  onSearchSalesRev: (keyword) =>
    dispatch(searchAction(SearchRevisedSalesOrder, keyword)),
  onSearchService: (keyword) =>
    dispatch(searchAction(SearchServiceAction, keyword)),
  onSearchComp: (keyword, sort) =>
    dispatch(searchCompAction(SearchCompAction, keyword, sort)),
  onSearchCompService: (keyword, sort) =>
    dispatch(searchCompActionService(SearchCompActionService, keyword, sort)),
  lifetimeFilter: (type, payload, payload2, page) =>
    dispatch(selectFilterAction(type, payload, payload2, page)),
  dateFilter: (type, payload, payload2, page) =>
	dispatch(dateFilterAction(type, payload, payload2, page)),
	
  filterSmrDate: (type, payload, payload2, page) =>
	dispatch(smrDateFilterAction(type, payload, payload2, page)),
	
  smrFilter: (type, payload, payload2, page) =>
    dispatch(smrFilterAction(type, payload, payload2, page)),
  selectFilter2: (type, payload, head, page) =>
    dispatch(selectFilterAction2(type, payload, head, page)),
  indexFilter: (type, payload) => dispatch(indexFilterAction(type, payload)),
  selectSalesPlan: (payload) =>
    dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
  selectServicePlan: (payload) =>
    dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
  storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
  unselectServicePlan: (payload) =>
    dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
  unselectSalesPlan: (payload) =>
    dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
  updateSalesParameter: (payload) =>
    dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
  updateServiceParameter: (payload) =>
    dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
  updateSalesRevParameter: (payload) =>
    dispatch(salesParameterRevAction(UpdateSalesRevisedParamAction, payload)),
  updateSearchSales: (payload) =>
    dispatch(searchSalesParameterAction(UpdateSearchSalesAction, payload)),
  updateSearchService: (payload) =>
    dispatch(searchServiceParameterAction(UpdateSearchServiceAction, payload)),
  updateSearchRevSales: (payload) =>
    dispatch(searchSalesRevisionAction(UpdateSearchSalesRevAction, payload)),
});

const detailPagesSite = connect(mapStateToProps, mapDispatchToProps)(DetailPagesSite);

export { detailPagesSite as DetailPagesSite, PlansReducers };