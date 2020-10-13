import { connect } from 'react-redux';
import { PlansReducers } from 'views/planning/details/DetailPages-reducer';
import { push } from 'connected-react-router';
import {
	putLifetimeCompAction,
	putSAPIssueAction,
	approveSalesAction,
	unapproveSalesAction,
	approveServiceAction,
	fetchSalesAction,
	fetchSearchSalesAction,
	fetchSearchServiceAction,
	salesParameterAction,
	fetchServiceAction,
	ClearSelectedPlans,
	UpdateServiceParameterAction,
	UpdateSalesParameterAction,
	UpdateSearchSalesAction,
	UpdateSearchServiceAction,
	searchSalesParameterAction,
	searchServiceParameterAction,
	searchAction,
	SearchSalesAction,
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
	storePlanDataAction, dateFilterAction, selectAllService, smrFilterAction, smrDateFilterAction, selectAllSales
} from 'views/planning/details/DetailPages-action';
import ApprovalPages from './ApprovalPages';

const mapStateToProps = (state) => ({
	location: state.router.location,
	displayMode: state.displayMode,
	salesOrderList: state.plansPageState.salesOrderList.data,
	serviceOrderList: state.plansPageState.serviceOrderList.data,
	salesParameter: state.plansPageState.salesParameter,
	filterParameter: state.plansPageState.filterParameter,
	filterLifetime: state.plansPageState.filterLifetime,
	filterSmr: state.plansPageState.filterSmr,
	filterDate: state.plansPageState.filterDate,
	filterDateSalesHO: state.plansPageState.filterDateSalesHO,
	filterDateSmr: state.plansPageState.filterDateSmr,
	filterDateSmrSalesHO: state.plansPageState.filterDateSmrSalesHO,
	indexFilterParameter: state.plansPageState.indexFilterParameter,
	serviceParameter: state.plansPageState.serviceParameter,
	searchSalesParameter: state.plansPageState.searchSalesParameter,
	searchServiceParameter: state.plansPageState.searchServiceParameter,
	salesSearch: state.plansPageState.salesSearch,
	salesRevisionSearch: state.plansPageState.salesRevisionSearch,
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
	fetchStatusSales: state.plansPageState.salesOrderList.status,
	fetchStatusPutLifetime: state.plansPageState.putLifetimeList.status,
	fetchStatusService: state.plansPageState.serviceOrderList.status,
	fetchStatusPutSAPIssue: state.plansPageState.putSAPIssue.status,
	fetchStatusUnapprove: state.plansPageState.unApprove.status,
	fetchStatusApprovedSales: state.plansPageState.salesApproved.status,
	fetchStatusApprovedService: state.plansPageState.serviceApproved.status,
	fetchStatusSalesDeleted: state.plansPageState.salesDeleted.status,
	fetchStatusServiceDeleted: state.plansPageState.serviceDeleted.status,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
	unapproveSales: (payload, token) => dispatch(unapproveSalesAction(payload, token)),
	clearSelectedSalesPlans: (payload) => dispatch(selectSalesPlansAction(ClearSelectedPlans, payload)),
	clearSelectedServicePlans: (payload) => dispatch(selectServicePlansAction(ClearSelectedPlans, payload)),
	putLifetimeComp: (payload, token) => dispatch(putLifetimeCompAction(payload, token)),
	putSAPIssue: (payload, token, whichTabs) => dispatch(putSAPIssueAction(payload, token, whichTabs)),
	approveSales: (payload, token) => dispatch(approveSalesAction(payload, token)),
	approveService: (payload, token) => dispatch(approveServiceAction(payload, token)),
	fetchSalesOrder: (payload, token) => dispatch(fetchSalesAction(payload, token)),
	fetchServiceOrder: (payload, token) => dispatch(fetchServiceAction(payload, token)),
	fetchSearchSales: (payload, token) => dispatch(fetchSearchSalesAction(payload, token)),
	fetchSearchService: (payload, token) => dispatch(fetchSearchServiceAction(payload, token)),
	onClickSortBy: (type) => dispatch(sortByAction(type)),
	onSearchSales: (keyword) => dispatch(searchAction(SearchSalesAction, keyword)),
	onSearchService: (category, keyword) => dispatch(searchAction(SearchServiceAction, category, keyword)),
	onSearchComp: (keyword, sort) => dispatch(searchCompAction(SearchCompAction, keyword, sort)),
	onSearchCompService: (keyword, sort) => dispatch(searchCompActionService(SearchCompActionService, keyword, sort)),
	lifetimeFilter: (type, payload, payload2, page) => dispatch(selectFilterAction(type, payload, payload2, page)),
	smrFilter: (type, payload, payload2, page) => dispatch(smrFilterAction(type, payload, payload2, page)),
	dateFilter: (type, payload, payload2, page) => dispatch(dateFilterAction(type, payload, payload2, page)),
	filterSmrDate: (type, payload, payload2, page) => dispatch(smrDateFilterAction(type, payload, payload2, page)),
	selectFilter2: (type, payload, head, page) => dispatch(selectFilterAction2(type, payload, head, page)),
	indexFilter: (type, payload) => dispatch(indexFilterAction(type, payload)),
	selectSalesPlan: (payload) => dispatch(selectSalesPlansAction(SelectSalesPlanAction, payload)),
	selectServicePlan: (payload) => dispatch(selectServicePlansAction(SelectServicePlanAction, payload)),
	storePlanData: (payload) => dispatch(storePlanDataAction(payload)),
	selectAllSales: (payload) => dispatch(selectAllSales(payload)),
	selectAllService: (payload) => dispatch(selectAllService(payload)),
	unselectServicePlan: (payload) => dispatch(selectServicePlansAction(UnselectServicePlanAction, payload)),
	unselectSalesPlan: (payload) => dispatch(selectSalesPlansAction(UnselectSalesPlanAction, payload)),
	updateSalesParameter: (payload) => dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	updateServiceParameter: (payload) => dispatch(serviceParameterAction(UpdateServiceParameterAction, payload)),
	updateSearchSales: (payload) => dispatch(searchSalesParameterAction(UpdateSearchSalesAction, payload)),
	updateSearchService: (payload) => dispatch(searchServiceParameterAction(UpdateSearchServiceAction, payload)),
});

const approvalPages = connect(mapStateToProps, mapDispatchToProps)(ApprovalPages);

export { approvalPages as ApprovalPages, PlansReducers };