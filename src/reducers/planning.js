import {
  SUCCESS_TYPE,
  FAILURE_TYPE,
  APPROVE_SALES,
  APPROVE_SERVICE,
  UNAPPROVE_SALES,
  DOWNLOAD_SALES,
  DOWNLOAD_SERVICE,
  PUT_LIFETIME_COMP,
  PUT_SAP_ISSUE,
  DELETE_SALES,
  DELETE_SERVICE,
  FETCH_SALES_ORDER,
  FETCH_SERVICE_ORDER,
  FETCH_APPROVED_SALES,
  FETCH_APPROVED_SERVICE,
  FETCH_DELETED_SALES,
  FETCH_DELETED_SERVICE,
  FETCH_SAP_SALES,
  FETCH_SAP_SERVICE,
  FETCH_REVISED_SALES,
  SEARCH_SALES_PLANS,
  SEARCH_SERVICE_PLANS,
  SEARCH_REVISION_PLANS_SALES,
  SEARCH_BY_COMP,
  SEARCH_COMP_APPROVED_SALES,
  SEARCH_COMP_DELETED_SALES,
  SEARCH_COMP_SAP_SALES,
  SEARCH_COMP_SERVICE,
  SORT_SALES_BY_CUSTOMER,
  SORT_SALES_BY_SITE,
  SORT_SALES_BY_UNIT_MODEL,
  SORT_SALES_BY_COMP_DESC,
  SORT_SERVICE_BY_CUSTOMER,
  SORT_SERVICE_BY_SITE,
  SORT_SERVICE_BY_UNIT_MODEL,
  SORT_SERVICE_BY_COMP_DESC,
  CLEAR_SELECTED_PLANS,
  STORE_SELECTED_PLAN_DATA,
  UNSELECT_SALES_PLANS,
  UNSELECT_SERVICE_PLANS,
  SELECT_SERVICE_PLANS,
  SELECT_SALES_PLANS,
  UPDATE_SEARCH_SALES,
  UPDATE_SEARCH_APPROVED_SALES,
  UPDATE_SEARCH_DELETED_SALES,
  UPDATE_SEARCH_SAP_SALES,
  UPDATE_SEARCH_SERVICE,
  UPDATE_SEARCH_APPROVED_SERVICE,
  UPDATE_SEARCH_DELETED_SERVICE,
  UPDATE_SEARCH_SAP_SERVICE,
  UPDATE_SALES_PARAMETER,
  UPDATE_SALES_APPROVED_PARAMETER,
  UPDATE_SALES_DELETED_PARAMETER,
  UPDATE_SALES_SAP_PARAMETER,
  UPDATE_SALES_REVISED_PARAM,
  UPDATE_SERVICE_PARAMETER,
  UPDATE_SERVICE_APPROVED_PARAMETER,
  UPDATE_SERVICE_DELETED_PARAMETER,
  UPDATE_SERVICE_SAP_PARAMETER,
  SELECT_CUSTOMER_FILTER,
  SELECT_SITE_FILTER,
  SELECT_UNIT_MODEL_FILTER,
  SELECT_COMPONENT_FILTER,
  INDEX_FILTER,
  LIFETIME_FILTER,
  DATE_FILTER,
  SMR_DATE_FILTER,
} from "actions/actionTypes";

const initialSalesState = {
	TotalData: 0,
	TotalPage: 1,
	PageNumber: 1,
	PageSize: 10,
	Lists: [],
	NextPage: false,
	PrevPage: false,
	Customers: ['All Customer'],
	Sites: ['All Site'],
	UnitModels: ['All Unit Model'],
	ComponentDescriptions: ['All Component Description'],
	SerialNumbers: [],
	LifeTimeComponents: [],
	PlanExecutions: [],
};
const initialServiceState = {
	TotalData: 0,
	TotalPage: 1,
	PageNumber: 1,
	PageSize: 10,
	Lists: [],
	NextPage: false,
	PrevPage: false,
	Customers: ['ALL Customer'],
	Sites: ['ALL Site'],
	UnitModels: ['ALL Unit Model'],
	ComponentDescriptions: ['All Component Description'],
	SerialNumbers: [],
	LifeTimeComponents: [],
	PlanExecutions: [],
};

const initialSelectedFilter = {
	customerType: 'All Customer',
	siteType: 'All Site',
	unitType: 'All Unit Model',
	compType: 'All Component'
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
};
const serviceSortbyInitialState = {
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
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

const initialDownloadState = {
	data: new Blob()
}

export const approveSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${APPROVE_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${APPROVE_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const approveService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${APPROVE_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${APPROVE_SERVICE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const uapproveSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${UNAPPROVE_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${UNAPPROVE_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const downloadSales = (state = { ...initialDownloadState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${DOWNLOAD_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${DOWNLOAD_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const downloadService = (state = { ...initialDownloadState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${DOWNLOAD_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${DOWNLOAD_SERVICE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const putLifetimeComp = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${PUT_LIFETIME_COMP}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${PUT_LIFETIME_COMP}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const putSapIssue = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${PUT_SAP_ISSUE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${PUT_SAP_ISSUE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const deleteSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${DELETE_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${DELETE_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const deleteService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${DELETE_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${DELETE_SERVICE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_SALES_ORDER}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_SALES_ORDER}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_SERVICE_ORDER}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_SERVICE_ORDER}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchApprovedSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_APPROVED_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_APPROVED_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchApprovedService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_APPROVED_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_APPROVED_SERVICE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchDeletedSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_DELETED_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_DELETED_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchDeletedService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_DELETED_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_DELETED_SERVICE}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchSapSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_SAP_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_SAP_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchSapService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_SAP_SERVICE}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_SERVICE_ORDER}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchRevisedSales = (state = { ...initialSalesState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_REVISED_SALES}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_REVISED_SALES}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
}

export const fetchService = (state = { ...initialServiceState }, action) => {
	const { payload, type } = action;
	switch (type) {
		case `${FETCH_SERVICE_ORDER}${SUCCESS_TYPE}`: {
			const { data } = payload
			return { ...state, data }
		}
		case `${FETCH_SERVICE_ORDER}${FAILURE_TYPE}`:
			return { ...state, ...payload }
		default:
			return state;
	}
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
		default:
			return state;
	}
}

export function searchSalesParameterReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_SALES) return action.payload;
	return state;
}

export function searchSalesApprovedReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_APPROVED_SALES) return action.payload;
	return state;
}

export function searchSalesDeletedReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_DELETED_SALES) return action.payload;
	return state;
}
export function searchSalesSapReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_SAP_SALES) return action.payload;
	return state;
}

export function searchServiceParameterReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_SERVICE) return action.payload;
	return state;
}

export function searchServiceApprovedReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_APPROVED_SERVICE) return action.payload;
	return state;
}

export function searchServiceDeletedReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_DELETED_SERVICE) return action.payload;
	return state;
}

export function searchServiceSapReducer(state = initialSearchParameter, action) {
	if (action.type === UPDATE_SEARCH_SAP_SERVICE) return action.payload;
	return state;
}

export function salesParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UPDATE_SALES_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesApprovedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UPDATE_SALES_APPROVED_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesDeletedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UPDATE_SALES_DELETED_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesSapParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UPDATE_SALES_SAP_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function salesRevisedParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UPDATE_SALES_REVISED_PARAM)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UPDATE_SERVICE_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceParameterApprovedReducer(state = initialServiceParameter, action) {
	if (action.type === UPDATE_SERVICE_APPROVED_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceParameterDeletedReducer(state = initialServiceParameter, action) {
	if (action.type === UPDATE_SERVICE_DELETED_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function serviceSapParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UPDATE_SERVICE_SAP_PARAMETER)
		return { ...state, dataFilter: action.payload };
	return state;
}

export function filterLifetimeReducer(state = intitialFiltersParameter, action) {
	if (action.type === LIFETIME_FILTER)
		state = { ...state, Filter: [{ Field: 'LifeTimeComponent', Operator: 'gte', Value: action.payload, Logic: 'and' }] }
	return state;
}

export function filterDateReducer(state = initialFilterParameter, action) {
	if (action.type === DATE_FILTER) {
		let filterRequest = []
		for (let i = 0; i < 2; i++) {
			if (i === 0) {
				filterRequest = { Field: 'PlanExecutionDate', Operator: 'gte', Value: action.payload, Logic: 'and' };
			} else if (i === 1) {
				filterRequest = { ...filterRequest, Field: 'PlanExecutionDate', Operator: 'lte', Value: action.payload2, Logic: 'and' };
			}
		}
		state = { ...state.filter, Filter: [...filterRequest] }
	}
	return state;
}

export function filterSMRDateReducer(state = initialFilterParameter, action) {
  if (action.type === SMR_DATE_FILTER) {
    let filterRequest = [];
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        filterRequest = {
          Field: "SMRLastUpdate",
          Operator: "gte",
          Value: action.payload,
          Logic: "and",
        };
      } else if (i === 1) {
        filterRequest = {
          ...filterRequest,
          Field: "SMRLastUpdate",
          Operator: "lte",
          Value: action.payload2,
          Logic: "and",
        };
      }
    }
    state = { ...state.filter, Filter: [...filterRequest] };
  }
  return state;
}

export function filterParameterReducer(state = initialFilterParameter, action) {
	if (action.type === SELECT_CUSTOMER_FILTER)
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
	if (action.type === SELECT_SITE_FILTER)
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
	if (action.type === SELECT_UNIT_MODEL_FILTER)
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
	if (action.type === SELECT_COMPONENT_FILTER)
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
	return state;
}

export function indexFilterParameterReducer(state = '', action) {
	if (action.type === INDEX_FILTER) {
		return { ...state, indexTabParameter: action.payload };
	}
	return state;
}

export function searchSalesReducer(state = '', action) {
	if (action.type === SEARCH_SALES_PLANS) return action.payload;
	return state;
}

export function searchRevisionSalesReducer(state = '', action) {
	if (action.type === SEARCH_REVISION_PLANS_SALES) return action.payload;
	return state;
}

export function searchServiceReducer(state = '', action) {
	if (action.type === SEARCH_SERVICE_PLANS) return action.payload;
	return state;
}

export function searchCompReducer(state = initialSearchCompParameter, action) {
	if (action.type === SEARCH_BY_COMP) {
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
	} else if (action.type === SEARCH_COMP_APPROVED_SALES) {
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
	} else if (action.type === SEARCH_COMP_DELETED_SALES) {
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
	} else if (action.type === SEARCH_COMP_SAP_SALES) {
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
	} else if (action.type === SEARCH_COMP_SERVICE) {
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
		case SELECT_SALES_PLANS: {
			return [...state, action.payload];
		}
		case UNSELECT_SALES_PLANS: {
			return [...state.filter(((item) => item.SoNumber !== action.payload.SoNumber))];
		}
		case CLEAR_SELECTED_PLANS:
			return [];
		default:
			return state;
	}
}
export function selectServicePlansReducer(state = [], action) {
	switch (action.type) {
		case SELECT_SERVICE_PLANS: {
			return [...state, action.payload];
		}
		case UNSELECT_SERVICE_PLANS: {
			return [...state.filter(((item) => item.WoNumber !== action.payload.WoNumber))];
		}
		case CLEAR_SELECTED_PLANS:
			return [];
		default:
			return state;
	}
}

export function sortSalesByReducer(state = salesSortbyInitialState, action) {
	switch (action.type) {
		case SORT_SALES_BY_CUSTOMER:
			return {
				...salesSortbyInitialState,
				Customer: { isActive: true, isAscending: !state.Customer.isAscending },
			};
		case SORT_SALES_BY_SITE:
			return {
				...salesSortbyInitialState,
				Site: { isActive: true, isAscending: !state.Site.isAscending },
			};
		case SORT_SALES_BY_UNIT_MODEL:
			return {
				...salesSortbyInitialState,
				UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
			};
		case SORT_SALES_BY_COMP_DESC:
			return {
				...salesSortbyInitialState,
				CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
			};
		default:
			return state;
	}
}

export function sortServiceByReducer(state = serviceSortbyInitialState, action) {
	switch (action.type) {
		case SORT_SERVICE_BY_CUSTOMER:
			return {
				...serviceSortbyInitialState,
				Customer: { isActive: true, isAscending: !state.Customer.isAscending },
			};
		case SORT_SERVICE_BY_SITE:
			return {
				...serviceSortbyInitialState,
				Site: { isActive: true, isAscending: !state.Site.isAscending },
			};
		case SORT_SERVICE_BY_UNIT_MODEL:
			return {
				...serviceSortbyInitialState,
				UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
			};
		case SORT_SERVICE_BY_COMP_DESC:
			return {
				...serviceSortbyInitialState,
				CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
			};
		default:
			return state;
	}
}

export function storePlanDataReducer(state = {}, action) {
	if (action.type === STORE_SELECTED_PLAN_DATA) return action.payload;
	return { ...state };
}