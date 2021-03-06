/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-computed-key */
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { ApiRequestActionsStatus } from 'core/RestClientHelpers';
import {
	ApproveSalesAction,
	ApproveServiceAction,
	UnapproveSalesAction,
	salesDownloadAction,
	serviceDownloadAction,
	ClearSelectedPlans,
	FetchApprovedSalesAction,
	FetchApprovedServiceAction,
	FetchDeletedSalesAction,
	FetchDeletedServiceAction,
	FetchSapSalesAction,
	FetchSapServiceAction,
	FetchRevisedSalesAction,
	DeleteSalesAction,
	DeleteServiceAction,
	UpdateSalesApprovedParameterAction,
	UpdateSalesDeletedParameterAction,
	UpdateSalesSapParameterAction,
	UpdateSalesParameterAction,
	UpdateSearchSalesRevisiAction,
	UpdateSalesRevisedParamAction,
	UpdateSearchSalesRevisionAction,
	ResetSelectedMechanicsAction,
	SearchSalesAction,
	SearchServiceAction,
	SearchSalesRevisiAction,
	UpdateServiceApprovedParameterAction,
	UpdateServiceDeletedParameterAction,
	UpdateServiceSapParameterAction,
	UpdateSearchSalesAction,
	UpdateSearchSalesApprovedAction,
	UpdateSearchSalesDeletedAction,
	UpdateSearchSalesSapAction,
	UpdateSearchServiceAction,
	UpdateSearchServiceApprovedAction,
	UpdateSearchServiceDeletedAction,
	UpdateSearchServiceSapAction,
	SearchCompAction,
	SearchCompActionApproved,
	SearchCompActionDeleted,
	SearchCompActionSap,
	SearchCompActionService,
	SelectSalesPlanAction,
	SelectServicePlanAction,
	SelectLeaderAction, SelectMechanicAction,
	SelectCustomerFilterAction, SelectComponentFilterAction,
	SelectSiteFilterAction, SelectUnitModelFilterAction,
	SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, 
	SortSalesByCompDesc, SortSalesByPlanType, UpdateServiceParameterAction,
	FetchSalesAction, PutLifetimeComp, PutSAPIssue,
	SortServiceByCustomer, SortServiceBySite, SortServiceByUnitModel, SortServiceByCompDesc, SortServiceByPlanType,
	UnselectSalesPlanAction, UnselectServicePlanAction,
	UnselectMechanicAction, StoreSelectedPlanDataAction, ResetSelectedLeaderAction, FetchServiceAction,
	IndexFilterAction, LifetimeFilterAction, DateFilterAction,
	SearchRevisedSalesOrder, UpdateSearchSalesRevAction, SelectAllSales, SelectAllService, SelectPlanTypeFilterAction, SmrFilterAction, SmrDateFilterAction
} from './DetailPages-action';

const initialSalesAssignment = {
	Meta:{
		totalItems: 0,
		totalPage: 1,
		pageNumber: 1,
		pageSize: 10,
		filter: {
			Customers: ['All Customer'],
			Sites: ['All Site'],
			UnitModels: ['All Unit Model'],
			ComponentDescriptions: ['All Component Description'],
			PlanType: ['All Plan Type'],
			SerialNumbers: [],
			LifeTimeComponents: [],
			PlanExecutions: [],
		},
		NextPage: false,
		PrevPage: false,
	},
	Data: {
		Lists: []
	},
};
const initialServiceAssignment = {
	Meta:{
		totalItems: 0,
		totalPages: 1,
		pageNumber: 1,
		pageSize: 10,
		hasNextPage: false,
		hasPreviousPage: false,
		TotalDataApproval: 0,
		TotalDataSAPIssue: 0,
		TotalDataRevision: 0,
		TotalDataLifetime: 0,
		filter: {
			Customers: ['All Customer'],
			Sites: ['All Site'],
			UnitModels: ['All Unit Model'],
			ComponentDescriptions: ['All Component Description'],
			PlanType: ['All Plan Type'],
			PartNumbers: [],
			UnitCodes: [],
			SerialNumbers: [],
			LifeTimeComponents: [],
			PlanExecutions: [],
		}
	},
	Data: {
		Lists: []
	}
};

const initialSelectedFilter = {
	customerType: 'All Customer',
	siteType: 'All Site',
	unitType: 'All Unit Model',
	compType: 'All Component',
	planType: 'All Plan Type'
};

const initialSalesParameter = {
	dataFilter: {
		PageNumber: 1,
		PageSize: 10,
		Sort: [],
		Filter: []
	},
	paramsData: {
		PageNumber: 0,
		Search: '',
		soValue: '',
		customerType: '',
		siteType: '',
		unitType: '',
		compType: '',
		plantype: '',
		assigmentFilter: true,
		inProgressFilter: false,
	}
};

const initialServiceParameter = {
	dataFilter: {
		PageNumber: 1,
		PageSize: 10,
		Sort: [],
		Filter: []
	},
	paramsData: {
		PageNumber: 0,
		searchValue: '',
		soValue: '',
		customerType: '',
		siteType: '',
		unitType: '',
		compType: '',
		planType: '',
		assigmentFilter: true,
		inProgressFilter: false,
	}
};

const initialSearchParameter = {
	Category: '',
	Keyword: '',
}

const initialFilterParameter = {
	Filter: []
};

const defaultState = { isActive: false, isAscending: true };
const salesSortbyInitialState = {
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
	PlanType: defaultState
};
const serviceSortbyInitialState = {
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
	PlanType: defaultState
};

const initialSearchCompParameter =
	[{
		Field: '',
		Operator: 'contains',
		Value: '',
		Logic: 'AND'
	}];

const intitialFiltersParameter =
[{
	Field: 'LifeTimeComponent',
	Operator: 'gte',
	Value: '',
	Logic: 'AND'
}, {
	Field: 'LifeTimeComponent',
	Operator: 'lte',
	Value: '',
	Logic: 'AND'
}]

const intitialFilterSmrParameter =[
	{
		Field: 'SMR',
		Operator: 'gte',
		Value: '',
		Logic: 'AND'
	}, {
		Field: 'SMR',
		Operator: 'lte',
		Value: '',
		Logic: 'AND'
	}
]

const initialDownloadState = { data: new Blob(), status: ApiRequestActionsStatus.IDLE };
const initialSalesState = { data: initialSalesAssignment, status: ApiRequestActionsStatus.IDLE };
const initialServiceState = { data: initialServiceAssignment, status: ApiRequestActionsStatus.IDLE };

export function fetchSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchPutLifetimeReducer(state = initialSalesState, action) {
	if (action.type === PutLifetimeComp) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function PutSAPIssueReducer(state = initialSalesState, action) {
	if (action.type === PutSAPIssue) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function deletedSalesReducer(state = initialSalesState, action) {
	if (action.type === DeleteSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function deletedServiceReducer(state = initialServiceState, action) {
	if (action.type === DeleteServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function approvedSalesReducer(state = initialSalesState, action) {
	if (action.type === ApproveSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function approvedServiceReducer(state = initialServiceState, action) {
	if (action.type === ApproveServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function unapproveSalesReducer(state = initialSalesState, action) {
	if (action.type === UnapproveSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchApprovedSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchApprovedSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchApprovedServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchApprovedServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchDeletedSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchDeletedSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchDeletedServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchDeletedServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchSapSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchSapSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchSapServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchSapServiceAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialServiceState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialServiceState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function fetchRevisedSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchRevisedSalesAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialSalesState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function downloadApprovedSalesReducer(state = initialDownloadState, action) {
	if (action.type === salesDownloadAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialDownloadState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialDownloadState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}
export function downloadApprovedServiceReducer(state = initialDownloadState, action) {
	if (action.type === serviceDownloadAction) {
		switch (action.status) {
			case ApiRequestActionsStatus.SUCCEEDED:
				return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
			case ApiRequestActionsStatus.FAILED:
				return {
					data: initialDownloadState.data,
					status: ApiRequestActionsStatus.FAILED,
					error: action.error,
				};
			default:
				return { data: initialDownloadState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function selectedFiltersReducer(state = initialSelectedFilter, action) {
	switch (action.type) {
		case SelectCustomerFilterAction:
			return { ...state, customerType: action.payload };
		case SelectSiteFilterAction:
			return { ...state, siteType: action.payload };
		case SelectUnitModelFilterAction:
			return { ...state, unitType: action.payload };
		case SelectComponentFilterAction:
			return { ...state, compType: action.payload };
		case SelectPlanTypeFilterAction:
		return { ...state, planType: action.payload };
		default:
			return state;
	}
}

export function searchSalesParameterReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesAction) return action.payload;
	return state;
}

export function searchSalesRevisiParameterReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesRevisiAction) return action.payload;
	return state;
}

export function searchSalesApprovedReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesApprovedAction) return action.payload;
	return state;
}

export function searchRevisionSalesReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesRevisionAction) return action.payload;
	return state;
}

export function searchSalesDeletedReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesDeletedAction) return action.payload;
	return state;
}

export function searchSalesSapReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesSapAction) return action.payload;
	return state;
}

export function searchServiceParameterReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchServiceAction) return action.payload;
	return state;
}

export function searchServiceApprovedReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchServiceApprovedAction) return action.payload;
	return state;
}

export function searchServiceDeletedReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchServiceDeletedAction) return action.payload;
	return state;
}

export function searchServiceSapReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchServiceSapAction) return action.payload;
	return state;
}

export function salesParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesApprovedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesApprovedParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesDeletedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesDeletedParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesSapParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesSapParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceSapParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceSapParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesRevisedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesRevisedParamAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function filterLifetimeReducer(state = intitialFiltersParameter, action) {
	if (action.type === LifetimeFilterAction)
		state = { ...state, Filter: [{ Field: 'LifeTimeComponent', Operator: 'gte', Value: action.payload, Logic: 'and' }, { Field: 'LifeTimeComponent', Operator: 'lte', Value: action.payload2, Logic: 'and' }] };

	return state;
}

export function filterSmrReducer(state = intitialFilterSmrParameter, action) {
	if (action.type === SmrFilterAction)
		state = { ...state, Filter: [{ Field: 'SMR', Operator: 'gte', Value: action.payload, Logic: 'and' }, { Field: 'SMR', Operator: 'lte', Value: action.payload2, Logic: 'and' }] };
	return state;
}

export function filterDateReducer(state = initialFilterParameter, action) {
	if (action.type === DateFilterAction)
		state = { ...state, Filter: [{Field: 'SAPIssueMessage', Operator: 'eq', Value: '-', Logic: 'and'}, 
		{ Field: 'PlanExecutionDate', Operator: 'gte', Value: action.payload, Logic: 'and' }, 
		{ Field: 'PlanExecutionDate', Operator: 'lte', Value: action.payload2, Logic: 'and' }] 
	};
	return state;
}

export function filterDateSalesHOReducer(state = initialFilterParameter, action) {
	if (action.type === DateFilterAction)
		state = { ...state, 
		Filter: [
			{ Field: 'LifeTimeComponent',Operator: 'neq', Value: 0, Logic: 'and' },
			{ Field: 'SAPIssueMessage', Operator: 'eq', Value: '-', Logic: 'and' },
			{ Field: 'IsRevised', Operator: 'eq', Value: 'false', Logic: 'and' },
			{ Field: 'PlanExecutionDate', Operator: 'gte', Value: action.payload, Logic: 'and' }, 
			{ Field: 'PlanExecutionDate', Operator: 'lte', Value: action.payload2, Logic: 'and' }
		] 
	};
	return state;
}

export function filterDateSalesSiteReducer(state = initialFilterParameter, action) {
	if (action.type === DateFilterAction)
		state = { ...state, 
		Filter: [
			{ Field: 'LifeTimeComponent',Operator: 'eq', Value: 0, Logic: 'and' },
			{ Field: 'PlanExecutionDate', Operator: 'gte', Value: action.payload, Logic: 'and' }, 
			{ Field: 'PlanExecutionDate', Operator: 'lte', Value: action.payload2, Logic: 'and' }
		] 
	};
	return state;
}

export function filterDateSmrReducer(state = initialFilterParameter, action) {
	if (action.type === SmrDateFilterAction)
		state = {
		...state,
		Filter: [
			{ Field: 'SAPIssueMessage', Operator: 'eq', Value: '-', Logic: 'and' },
			{ Field: "SMRLastUpdate", Operator: "gte", Value: action.payload, Logic: "and" },
			{ Field: "SMRLastUpdate", Operator: "lte", Value: action.payload2, Logic: "and" },
		],
  	};
	return state;
}

export function filterDateSmrSalesHOReducer(state = initialFilterParameter, action) {
	if (action.type === SmrDateFilterAction)
		state = {
		...state,
		Filter: [
			{ Field: 'LifeTimeComponent',Operator: 'neq', Value: 0, Logic: 'and' },
			{ Field: 'SAPIssueMessage', Operator: 'eq', Value: '-', Logic: 'and' },
			{ Field: 'IsRevised', Operator: 'eq', Value: 'false', Logic: 'and' },
			{ Field: "SMRDate", Operator: "gte", Value: action.payload, Logic: "and" },
			{ Field: "SMRDate", Operator: "lte", Value: action.payload2, Logic: "and" },
		],
  	};
	return state;
}

export function filterDateSmrSalesSiteReducer(state = initialFilterParameter, action) {
	if (action.type === SmrDateFilterAction)
		state = {
		...state,
		Filter: [
			{ Field: 'LifeTimeComponent',Operator: 'neq', Value: 0, Logic: 'and' },
			{ Field: "SMRDate", Operator: "gte", Value: action.payload, Logic: "and" },
			{ Field: "SMRDate", Operator: "lte", Value: action.payload2, Logic: "and" },
		],
  	};
	return state;
}

export function filterParameterReducer(state = initialFilterParameter, action) {
	if (action.type === SelectCustomerFilterAction)
		if (state.Filter.length === 0) {
			return { ...state, Filter: [{ Field: 'CustomerName', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		} else {
			for (let i = 0; i < state.Filter.length; i++) {
				if (state.Filter[i].Field === action.head) {
					if (action.payload.includes('All')) {
						state.Filter.splice(i, 1);
						return { ...state, Filter: state.Filter };
					}
					return { ...state, Filter: state.Filter.map(el => (el.Field === action.head ? { ...el, Value: action.payload } : el)) };
				}
			}
			return { ...state, Filter: [...state.Filter, { Field: 'CustomerName', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		}
	if (action.type === SelectSiteFilterAction)
		if (state.Filter.length === 0) {
			return { ...state, Filter: [{ Field: 'SiteCode', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		} else {
			for (let i = 0; i < state.Filter.length; i++) {
				if (state.Filter[i].Field === action.head) {
					if (action.payload.includes('All')) {
						state.Filter.splice(i, 1);
						return { ...state, Filter: state.Filter };
					}
					return { ...state, Filter: state.Filter.map(el => (el.Field === action.head ? { ...el, Value: action.payload } : el)) };
				}
			}
			return { ...state, Filter: [...state.Filter, { Field: 'SiteCode', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		}
	if (action.type === SelectUnitModelFilterAction)
		if (state.Filter.length === 0) {
			return { ...state, Filter: [{ Field: 'UnitModel', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		} else {
			for (let i = 0; i < state.Filter.length; i++) {
				if (state.Filter[i].Field === action.head) {
					if (action.payload.includes('All')) {
						state.Filter.splice(i, 1);
						return { ...state, Filter: state.Filter };
					}
					return { ...state, Filter: state.Filter.map(el => (el.Field === action.head ? { ...el, Value: action.payload } : el)) };
				}
			}
			return { ...state, Filter: [...state.Filter, { Field: 'UnitModel', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		}
	if (action.type === SelectComponentFilterAction)
		if (state.Filter.length === 0) {
			return { ...state, Filter: [{ Field: 'ComponentDescription', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		} else {
			for (let i = 0; i < state.Filter.length; i++) {
				if (state.Filter[i].Field === action.head) {
					if (action.payload.includes('All')) {
						state.Filter.splice(i, 1);
						return { ...state, Filter: state.Filter };
					}
					return { ...state, Filter: state.Filter.map(el => (el.Field === action.head ? { ...el, Value: action.payload } : el)) };
				}
			}
			return { ...state, Filter: [...state.Filter, { Field: 'ComponentDescription', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		}
	if (action.type === SelectPlanTypeFilterAction)
		if (state.Filter.length === 0) {
			return { ...state, Filter: [{ Field: 'PlanType', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		} else {
			for (let i = 0; i < state.Filter.length; i++) {
				if (state.Filter[i].Field === action.head) {
					if (action.payload.includes('All')) {
						state.Filter.splice(i, 1);
						return { ...state, Filter: state.Filter };
					}
					return { ...state, Filter: state.Filter.map(el => (el.Field === action.head ? { ...el, Value: action.payload } : el)) };
				}
			}
			return { ...state, Filter: [...state.Filter, { Field: 'PlanType', Operator: 'eq', Value: action.payload, Logic: 'and' }] };
		}
	return state;
}

export function indexFilterParameterReducer(state = '', action) {
	if (action.type === IndexFilterAction) {
		return { ...state, indexTabParameter: action.payload };
	}
	return state;
}

export function serviceParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceParameterApprovedReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceApprovedParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceParameterDeletedReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceDeletedParameterAction)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function searchSalesReducer(state = '', action) {
	if (action.type === SearchSalesAction) return action.payload;
	return state;
}

export function searchSalesRevisiReducer(state = '', action) {
	if (action.type === SearchSalesRevisiAction) return action.payload;
	return state;
}

export function searchServiceReducer(state = '', action) {
	if (action.type === SearchServiceAction) return action.payload;
	return state;
}

export function searchCompReducer(state = initialSearchCompParameter, action) {
	if (action.type === SearchCompAction) {
		if (action.sort === 'SoNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'PartNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'UnitCode') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		}
	} else if (action.type === SearchCompActionApproved) {
		if (action.sort === 'SoNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'PartNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'UnitCode') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		}
	} else if (action.type === SearchCompActionDeleted) {
		if (action.sort === 'SoNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'PartNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'UnitCode') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		}
	} else if (action.type === SearchCompActionSap) {
		if (action.sort === 'SoNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'PartNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'UnitCode') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		}
	} else if (action.type === SearchCompActionService) {
		if (action.sort === 'WoNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'PartNumber') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else if (action.sort === 'UnitCode') {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		} else {
			let updatedArray = update(state, { [0]: { Field: { $set: action.sort }, Value: { $set: action.payload } } });
			return updatedArray;
		}
	}
	return state;
}

export function selectSalesPlansReducer(state = [], action) {
	switch (action.type) {
		case SelectSalesPlanAction: {
			return [...state, action.payload];
		}
		case UnselectSalesPlanAction: {
			return [...state.filter(((item) => item.SoNumber !== action.payload.SoNumber))];
		}
		case ClearSelectedPlans:
			return [];
		case SelectAllSales:
			if(action.payload.length > 0) {
				return action.payload;
			}
			return [];
		default:
			return state;
	}
}
export function selectServicePlansReducer(state = [], action) {
	switch (action.type) {
		case SelectServicePlanAction: {
			return [...state, action.payload];
		}
		case UnselectServicePlanAction: {
			return [...state.filter(((item) => item.WoNumber !== action.payload.WoNumber))];
		}
		case ClearSelectedPlans:
			return [];
		case SelectAllService:
			if(action.payload.length > 0) {
				return action.payload;
			}
			return [];
		default:
			return state;
	}
}

export function selectLeaderReducer(state = {}, action) {
	switch (action.type) {
		case SelectLeaderAction:
			if (action.payload) return action.payload;
			return { ...state };
		case ResetSelectedLeaderAction:
			return {};
		default:
			return state;
	}
}

export function selectMechanicsReducer(state = [], action) {
	switch (action.type) {
		case SelectMechanicAction:
			if (action.payload) return [...state, action.payload];
			return [...state];
		case UnselectMechanicAction:
			return [...state.filter(((item) => item !== action.payload))];
		case ResetSelectedMechanicsAction:
			return [];
		default:
			return state;
	}
}

export function sortSalesByReducer(state = salesSortbyInitialState, action) {
	switch (action.type) {
		case SortSalesByCustomer:
			return {
				...salesSortbyInitialState,
				Customer: { isActive: true, isAscending: !state.Customer.isAscending },
			};
		case SortSalesBySite:
			return {
				...salesSortbyInitialState,
				Site: { isActive: true, isAscending: !state.Site.isAscending },
			};
		case SortSalesByUnitModel:
			return {
				...salesSortbyInitialState,
				UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
			};
		case SortSalesByCompDesc:
			return {
				...salesSortbyInitialState,
				CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
			};
		case SortSalesByPlanType:
			return {
				...salesSortbyInitialState,
				PlanType: { isActive: true, isAscending: !state.PlanType.isAscending },
			};
		default:
			return state;
	}
}

export function sortServiceByReducer(state = serviceSortbyInitialState, action) {
	switch (action.type) {
		case SortServiceByCustomer:
			return {
				...serviceSortbyInitialState,
				Customer: { isActive: true, isAscending: !state.Customer.isAscending },
			};
		case SortServiceBySite:
			return {
				...serviceSortbyInitialState,
				Site: { isActive: true, isAscending: !state.Site.isAscending },
			};
		case SortServiceByUnitModel:
			return {
				...serviceSortbyInitialState,
				UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
			};
		case SortServiceByCompDesc:
			return {
				...serviceSortbyInitialState,
				CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
			};
		case SortServiceByPlanType:
			return {
				...serviceSortbyInitialState,
				PlanType: { isActive: true, isAscending: !state.PlanType.isAscending },
			};
		default:
			return state;
	}
}

export function storePlanDataReducer(state = {}, action) {
	if (action.type === StoreSelectedPlanDataAction) return action.payload;
	return { ...state };
}

export function searchSalesRevParamReducer(state = initialSearchParameter, action) {
	if (action.type === UpdateSearchSalesRevAction) return action.payload;
	return state;
}

export function searchSalesRevReducer(state = '', action) {
	if (action.type === SearchRevisedSalesOrder) return action.payload;
	return state;
}

const PlansReducers = combineReducers({
	selectedLeader: selectLeaderReducer,
	selectedFilters: selectedFiltersReducer,
	serviceOrderList: fetchServiceReducer,
	salesOrderList: fetchSalesReducer,
	salesOrderListApproved: fetchApprovedSalesReducer,
	serviceOrderListApproved: fetchApprovedServiceReducer,
	salesOrderListDeleted: fetchDeletedSalesReducer,
	serviceOrderListDeleted: fetchDeletedServiceReducer,
	salesOrderListSap: fetchSapSalesReducer,
	serviceOrderListSap: fetchSapServiceReducer,
	salesOrderRevised: fetchRevisedSalesReducer,
	selectedSalesPlans: selectSalesPlansReducer,
	selectedServicePlans: selectServicePlansReducer,
	selectedMechanics: selectMechanicsReducer,
	unApprove: unapproveSalesReducer,
	salesParameter: salesParameterReducer,
	salesApprovedParameter: salesApprovedParameterReducer,
	salesDeletedParameter: salesDeletedParameterReducer,
	salesSapParameter: salesSapParameterReducer,
	salesRevisedParam: salesRevisedParameterReducer,
	serviceParameter: serviceParameterReducer,
	serviceApprovedParameter: serviceParameterApprovedReducer,
	serviceDeletedParameter: serviceParameterDeletedReducer,
	serviceSapParameter: serviceSapParameterReducer,
	filterParameter: filterParameterReducer,
	indexFilterParameter: indexFilterParameterReducer,
	sortSalesBy: sortSalesByReducer,
	sortServiceBy: sortServiceByReducer,
	salesSearch: searchSalesReducer,
	serviceSearch: searchServiceReducer,
	searchSalesParameter: searchSalesParameterReducer,
	searchSalesRevisiParameter: searchSalesRevisiParameterReducer,
	searchSalesRevisionParameter: searchRevisionSalesReducer,
	searchSalesApprovedParam: searchSalesApprovedReducer,
	searchSalesDeletedParam: searchSalesDeletedReducer,
	searchSalesSapParam: searchSalesSapReducer,
	searchServiceParameter: searchServiceParameterReducer,
	searchServiceApprovedParam: searchServiceApprovedReducer,
	searchServiceDeletedParam: searchServiceDeletedReducer,
	searchServiceSapParam: searchServiceSapReducer,
	searchComp: searchCompReducer,
	selectedPlanData: storePlanDataReducer,
	approveSalesDownloaded: downloadApprovedSalesReducer,
	approveServiceDownloaded: downloadApprovedServiceReducer,
	putLifetimeList: fetchPutLifetimeReducer,
	putSAPIssue: PutSAPIssueReducer,
	salesApproved: approvedSalesReducer,
	serviceApproved: approvedServiceReducer,
	salesDeleted: deletedSalesReducer,
	serviceDeleted: deletedServiceReducer,
	filterLifetime: filterLifetimeReducer,
	filterSmr: filterSmrReducer,
	filterDateSmr: filterDateSmrReducer,
	filterDateSmrSalesHO: filterDateSmrSalesHOReducer,
	filterDateSmrSalesSite: filterDateSmrSalesSiteReducer,
	filterDate: filterDateReducer,
	filterDateSalesHO: filterDateSalesHOReducer,
	filterDateSalesSite: filterDateSalesSiteReducer,
	salesSearchRevision: searchSalesRevReducer,
	searchSalesRevParam: searchSalesRevParamReducer	
});

export { PlansReducers };