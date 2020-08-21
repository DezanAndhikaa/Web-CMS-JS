import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { PlansReducers } from './DetailPages-reducer';
import {
  putLifetimeCompAction,
  approveSalesAction,
  unapproveSalesAction,
  approveServiceAction,
  deleteSalesAction,
  deleteServiceAction,
  fetchApprovedSalesAction,
  fetchApprovedServiceAction,
  fetchDeletedSalesAction,
  fetchDeletedServiceAction,
  fetchSearchSalesAction,
  searchSalesRevisionAction,
  fetchSalesAction,
  salesParameterAction,
  fetchServiceAction,
  ClearSelectedPlans,
  UpdateServiceParameterAction,
  UpdateSearchSalesRevisiAction,
  UpdateSalesParameterAction,
  UpdateSearchSalesAction,
  searchSalesParameterAction,
  UpdateSearchSalesRevisionAction,
  searchAction,
  SearchSalesAction,
  SearchSalesRevisiAction,
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
  selectLeaderAction,
  SelectSalesPlanAction,
  SelectServicePlanAction,
  selectMechanicAction,
  sortByAction,
  storePlanDataAction,
  dateFilterAction,
  smrDateFilterAction,
} from "./DetailPages-action";
import DetailPages from './DetailPages';

const mapStateToProps = (state) => ({
  location: state.router.location,
  displayMode: state.displayMode,
  salesOrderList: state.plansPageState.salesOrderList.data,
  salesOrderListApproved: state.plansPageState.salesOrderListApproved.data,
  salesOrderListDeleted: state.plansPageState.salesOrderListDeleted.data,
  serviceOrderList: state.plansPageState.serviceOrderList.data,
  serviceOrderListApproved: state.plansPageState.serviceOrderListApproved.data,
  serviceOrderListDeleted: state.plansPageState.serviceOrderListDeleted.data,
  salesParameter: state.plansPageState.salesParameter,
  filterParameter: state.plansPageState.filterParameter,
  filterLifetime: state.plansPageState.filterLifetime,
  filterDate: state.plansPageState.filterDate,
  filterDateSmr: state.plansPageState.filterDateSmr,
  indexFilterParameter: state.plansPageState.indexFilterParameter,
  serviceParameter: state.plansPageState.serviceParameter,
  salesSearch: state.plansPageState.salesSearch,
  searchSalesParameter: state.plansPageState.searchSalesParameter,
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
});

const mapDispatchToProps = (dispatch) => ({
  push: (path, whichTab) => dispatch(push(path, whichTab)),
  clearSelectedSalesPlans: (payload) =>
    dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
  clearSelectedServicePlans: (payload) =>
    dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
  putLifetimeComp: (payload, token) =>
    dispatch(putLifetimeCompAction(payload, token)),
  approveSales: (payload) => dispatch(approveSalesAction(payload)),
  unapproveSales: (payload) => dispatch(unapproveSalesAction(payload)),
  approveService: (payload) => dispatch(approveServiceAction(payload)),
  deleteSales: (payload) => dispatch(deleteSalesAction(payload)),
  deleteService: (payload) => dispatch(deleteServiceAction(payload)),
  fetchApprovedSales: (payload) => dispatch(fetchApprovedSalesAction(payload)),
  fetchApprovedService: (payload) =>
    dispatch(fetchApprovedServiceAction(payload)),
  fetchDeletedSales: (payload) => dispatch(fetchDeletedSalesAction(payload)),
  fetchDeletedService: (payload) =>
    dispatch(fetchDeletedServiceAction(payload)),
  fetchSalesOrder: (payload, token) =>
    dispatch(fetchSalesAction(payload, token)),
  fetchServiceOrder: (payload) => dispatch(fetchServiceAction(payload)),
  fetchSearchSales: (payload, token) =>
    dispatch(fetchSearchSalesAction(payload, token)),
  onClickSortBy: (type) => dispatch(sortByAction(type)),
  onSearchSales: (keyword) =>
    dispatch(searchAction(SearchSalesAction, keyword)),
  onSearchSalesRevisi: (keyword) =>
    dispatch(SearchSalesRevisiAction(SearchSalesRevisiAction, keyword)),
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
	
  selectFilter2: (type, payload, head, page) =>
    dispatch(selectFilterAction2(type, payload, head, page)),
  indexFilter: (type, payload) => dispatch(indexFilterAction(type, payload)),
  selectLeader: (type, payload) => dispatch(selectLeaderAction(type, payload)),
  selectMechanic: (type, payload) =>
    dispatch(selectMechanicAction(type, payload)),
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
  updateSearchSales: (payload) =>
    dispatch(searchSalesParameterAction(UpdateSearchSalesAction, payload)),
  updateSearchSalesRevisi: (payload) =>
    dispatch(
      UpdateSearchSalesRevisiAction(UpdateSearchSalesRevisionAction, payload)
    ),
  updateSearchSalesRevision: (payload) =>
    dispatch(
      searchSalesRevisionAction(UpdateSearchSalesRevisionAction, payload)
    ),
});

const detailPages = connect(mapStateToProps, mapDispatchToProps)(DetailPages);

export { detailPages as DetailPages, PlansReducers };